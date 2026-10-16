import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Download, Loader2 } from 'lucide-react';
import { adminApi } from '../lib/api';
import { CATEGORY_CATALOGUE, planImport } from '../lib/categoryCatalogue';
import { useApi } from '../lib/useApi';
import { PageHeader } from '../components/PageHeader';
import { CategoryIcon, IconPicker, IconUpload, isCustomIcon } from '../components/CategoryIcon';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Skeleton } from '../components/ui/skeleton';
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '../components/ui/alert-dialog';
import type { Category } from '../lib/types';

export function Categories() {
  const { data, loading, refetch } = useApi(() => adminApi.categories.list(), []);
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [name, setName] = useState('');
  // Which category a new sub-category is being added under. Null = top level.
  const [parent, setParent] = useState<Category | null>(null);
  const [icon, setIcon] = useState('wrench');
  const [iconTab, setIconTab] = useState<'library' | 'custom'>('library');

  const openCreate = (under: Category | null = null) => {
    setEditing(null); setParent(under);
    setName(''); setIcon(under?.icon ?? 'wrench'); setIconTab('library'); setOpen(true);
  };
  const openEdit = (c: Category, under: Category | null = null) => {
    setEditing(c); setParent(under); setName(c.name); setIcon(c.icon ?? 'wrench');
    setIconTab(isCustomIcon(c.icon) ? 'custom' : 'library');
    setOpen(true);
  };

  const save = async () => {
    if (!name.trim()) return toast.error('Name is required');
    try {
      if (editing) {
        await adminApi.categories.update(editing.id, { name, icon });
        toast.success('Category updated');
      } else {
        await adminApi.categories.create({ name, icon, parentId: parent?.id ?? null });
        toast.success(parent ? `Added under ${parent.name}` : 'Category created');
      }
    } catch (e: any) {
      return toast.error(e?.message ?? 'Could not save the category');
    }
    setOpen(false);
    refetch();
  };

  // ── Import the standard catalogue ──
  // Built from the plan rather than blindly posting the list: anything that
  // already exists is left exactly as the admin has it, so a second import (or
  // one after a partial failure) only fills the gaps.
  const [importOpen, setImportOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const plan = importOpen && data ? planImport(data.categories) : null;

  const runImport = async () => {
    if (!plan) return;
    const total = plan.newCategories + plan.newSubCategories;
    setImporting(true);
    setProgress({ done: 0, total });
    let done = 0;
    const failed: string[] = [];
    // One at a time: the API gives each new row the next order slot, and
    // parallel creates would race for the same one.
    for (const step of plan.create) {
      let parentId = step.parentId;
      if (!parentId) {
        try {
          const { category } = await adminApi.categories.create({ name: step.entry.name, icon: step.entry.icon, parentId: null });
          parentId = category.id;
        } catch {
          failed.push(step.entry.name);
          done += 1 + step.children.length;
          setProgress({ done, total });
          continue;
        }
        done += 1;
        setProgress({ done, total });
      }
      for (const child of step.children) {
        try {
          await adminApi.categories.create({ name: child, icon: step.entry.icon, parentId });
        } catch {
          failed.push(child);
        }
        done += 1;
        setProgress({ done, total });
      }
    }
    setImporting(false);
    setImportOpen(false);
    refetch();
    if (failed.length) {
      toast.error(`${failed.length} could not be created: ${failed.slice(0, 5).join(', ')}${failed.length > 5 ? '…' : ''}. Run the import again to retry.`);
    } else {
      toast.success(`Imported ${plan.newCategories} categories and ${plan.newSubCategories} sub-categories`);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    await adminApi.categories.remove(toDelete.id);
    toast.success('Category deleted');
    setToDelete(null);
    refetch();
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Service categories shown across the app"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setImportOpen(true)} disabled={loading}>
              <Download className="size-4" /> Import catalogue
            </Button>
            <Button onClick={() => openCreate()}><Plus className="size-4" /> New category</Button>
          </div>
        }
      />

      <Dialog open={importOpen} onOpenChange={(o) => !importing && setImportOpen(o)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Import the JanShram catalogue</DialogTitle>
          </DialogHeader>
          {plan && (
            <div className="space-y-3 py-1 text-sm">
              <p className="text-muted-foreground">
                Adds the standard service list ({CATEGORY_CATALOGUE.length} categories). Nothing that already exists is
                renamed, moved or deleted.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border p-3">
                  <div className="text-2xl font-semibold">{plan.newCategories}</div>
                  <div className="text-xs text-muted-foreground">new categories</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-2xl font-semibold">{plan.newSubCategories}</div>
                  <div className="text-xs text-muted-foreground">new sub-categories</div>
                </div>
              </div>
              {plan.skipped.length > 0 && (
                <details className="rounded-lg border p-3">
                  <summary className="cursor-pointer text-xs text-muted-foreground">
                    {plan.skipped.length} already exist and will be skipped
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed">{plan.skipped.join(' · ')}</p>
                </details>
              )}
              {importing && (
                <div className="space-y-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{progress.done} of {progress.total}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportOpen(false)} disabled={importing}>Cancel</Button>
            <Button
              onClick={runImport}
              disabled={importing || !plan || plan.newCategories + plan.newSubCategories === 0}
            >
              {importing ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
              {plan && plan.newCategories + plan.newSubCategories === 0 ? 'Everything is already there' : 'Import'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
          : data?.categories.length === 0
            ? (
              <Card className="p-10 text-center text-sm text-muted-foreground">
                No categories yet. Add one, then add the services that sit under it.
              </Card>
            )
            : data?.categories.map((c) => (
              <Card key={c.id} className="p-5 group">
                <div className="flex items-start gap-4">
                  <div className="size-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CategoryIcon icon={c.icon} className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{c.name}</span>
                      {c.isActive === false && <Badge variant="secondary">Hidden</Badge>}
                      <span className="text-xs text-muted-foreground">
                        {(c.children?.length ?? 0)} sub-categor{(c.children?.length ?? 0) === 1 ? 'y' : 'ies'}
                        {' · '}{c.serviceCount} services
                      </span>
                    </div>

                    {/* The sub-categories, each editable in place. */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.children?.map((sub) => (
                        <span
                          key={sub.id}
                          className="group/sub inline-flex items-center gap-1 rounded-full border bg-muted/50 pl-2.5 pr-1 py-1 text-xs"
                        >
                          {sub.name}
                          {!!sub.serviceCount && (
                            <span className="text-muted-foreground">· {sub.serviceCount}</span>
                          )}
                          <button
                            onClick={() => openEdit(sub, c)}
                            className="opacity-0 group-hover/sub:opacity-100 transition-opacity p-0.5 hover:text-primary"
                            title={`Edit ${sub.name}`}
                          >
                            <Pencil className="size-3" />
                          </button>
                          <button
                            onClick={() => setToDelete(sub)}
                            className="opacity-0 group-hover/sub:opacity-100 transition-opacity p-0.5 hover:text-destructive"
                            title={`Delete ${sub.name}`}
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </span>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-full px-2.5 text-xs"
                        onClick={() => openCreate(c)}
                      >
                        <Plus className="size-3" /> Sub-category
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(c)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setToDelete(c)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing
                ? `Edit ${parent ? 'sub-category' : 'category'}`
                : parent ? `New sub-category in ${parent.name}` : 'New category'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Name</Label>
              <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pest Control" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Icon</Label>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center overflow-hidden">
                    <CategoryIcon icon={icon} className="size-3.5" />
                  </span>
                  {isCustomIcon(icon) ? 'custom image' : icon}
                </span>
              </div>
              <Tabs value={iconTab} onValueChange={(v) => setIconTab(v as 'library' | 'custom')}>
                <TabsList className="w-full">
                  <TabsTrigger value="library" className="flex-1">Icon library</TabsTrigger>
                  <TabsTrigger value="custom" className="flex-1">Custom image</TabsTrigger>
                </TabsList>
                <TabsContent value="library" className="mt-3">
                  <IconPicker value={isCustomIcon(icon) ? '' : icon} onChange={setIcon} suggestFor={name} />
                  {isCustomIcon(icon) && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      A custom image is set — picking a library icon here replaces it.
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="custom" className="mt-3">
                  <IconUpload value={icon} onChange={setIcon} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? 'Save changes' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{toDelete?.name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the category. Services in it must be reassigned. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className="bg-destructive text-white hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
