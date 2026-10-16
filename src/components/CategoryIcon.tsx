import { useEffect, useMemo, useRef, useState } from 'react';
import { DynamicIcon, iconNames, type IconName } from 'lucide-react/dynamic';
import { Icon as IconifyIcon } from '@iconify/react';
import { Shapes, Search, Upload, Trash2, Loader2, Sparkles } from 'lucide-react';
import { expandQuery, isIconifyId, searchIcons } from '../lib/iconSearch';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';

// All ~1600 lucide icon names, for search + validation. `iconNames` is a plain
// string array, so importing it is cheap — DynamicIcon lazy-loads the actual
// icon component only when rendered.
const ALL_ICONS = iconNames as unknown as string[];
const VALID = new Set<string>(ALL_ICONS);

// A category icon is EITHER a lucide icon name ("wrench") or a custom image the
// admin uploaded. Custom images are stored inline as a data URI in the same
// `Category.icon` column — small (~5-10KB at 96px), needs no object storage, and
// works identically in dev and prod. `https://` is also accepted so the column
// can hold a CDN URL if uploads are moved to R2 later.
export function isCustomIcon(icon?: string | null): boolean {
  if (!icon) return false;
  return icon.startsWith('data:image/') || icon.startsWith('http://') || icon.startsWith('https://');
}

// Normalizes a stored icon name — legacy PascalCase ("Wrench") or kebab-case
// ("air-vent", "flower-2") — to the kebab-case DynamicIcon expects.
export function toIconName(name?: string | null): string {
  if (!name) return '';
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')     // camelCase → kebab
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')  // ACRONYMCase → kebab
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')     // letter→digit (Flower2 → flower-2)
    .toLowerCase();
}

// Renders a category icon — custom upload or lucide name — with a graceful
// fallback. `className` carries the sizing, so custom images use object-contain
// to sit correctly inside whatever box the caller provides.
export function CategoryIcon({ icon, className = 'size-5' }: { icon?: string | null; className?: string }) {
  if (isCustomIcon(icon)) {
    return <CustomIcon src={icon!} className={className} />;
  }
  // "mdi:yoga" and the like — any of Iconify's sets, picked by service search.
  if (isIconifyId(icon)) {
    return <IconifyIcon icon={icon} className={className} fallback={<Shapes className={className} />} />;
  }
  const name = toIconName(icon);
  if (!VALID.has(name)) return <Shapes className={className} />;
  return <DynamicIcon name={name as IconName} className={className} fallback={() => <Shapes className={className} />} />;
}

// An uploaded icon can stop resolving — the file was deleted, or the URL
// predates a storage move. Falling back to the same generic shape an unknown
// lucide name gets keeps the tile looking deliberate rather than broken.
function CustomIcon({ src, className }: { src: string; className: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Shapes className={className} />;
  return (
    <img
      src={src}
      alt=""
      className={`${className} object-contain`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

// ───────────────────────── Custom image upload ─────────────────────────

const ICON_PX = 96;                          // stored icons are square, 96×96
const MAX_SOURCE_BYTES = 4 * 1024 * 1024;    // reject huge source files up front
const MAX_STORED_BYTES = 256 * 1024;         // safety net on the encoded result
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'];

// Downscales any uploaded image to a square ICON_PX PNG data URI, preserving
// aspect ratio (letterboxed, transparent padding) so non-square logos aren't
// stretched. Rasterizing everything — including SVG — keeps rendering uniform
// and avoids storing markup that would later be inlined into the app.
export async function fileToIconDataUri(file: File, px = ICON_PX): Promise<string> {
  const sourceUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read that file'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('That file is not a readable image'));
    el.src = sourceUrl;
  });

  const canvas = document.createElement('canvas');
  canvas.width = px;
  canvas.height = px;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available in this browser');

  // SVGs can report a zero intrinsic size; fall back to a square box.
  const iw = img.naturalWidth || img.width || px;
  const ih = img.naturalHeight || img.height || px;

  const scale = Math.min(px / iw, px / ih);
  const w = Math.max(1, Math.round(iw * scale));
  const h = Math.max(1, Math.round(ih * scale));
  ctx.drawImage(img, Math.round((px - w) / 2), Math.round((px - h) / 2), w, h);

  return canvas.toDataURL('image/png');
}

// File picker + live preview for a custom category icon.
export function IconUpload({ value, onChange }: { value: string; onChange: (icon: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const custom = isCustomIcon(value);

  const pick = async (file?: File) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      return toast.error('Use a PNG, JPG, WEBP, GIF or SVG image');
    }
    if (file.size > MAX_SOURCE_BYTES) {
      return toast.error('That image is over 4MB — pick a smaller one');
    }
    setBusy(true);
    try {
      const uri = await fileToIconDataUri(file);
      if (uri.length > MAX_STORED_BYTES) {
        return toast.error('That image is too detailed to store — try a simpler icon');
      }
      onChange(uri);
      toast.success('Custom icon ready — save the category to apply it');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not process that image');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = ''; // allow re-picking the same file
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 rounded-lg border border-dashed p-4">
        <div className="size-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 overflow-hidden">
          {busy ? <Loader2 className="size-5 animate-spin" /> : <CategoryIcon icon={value} className="size-8" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{custom ? 'Custom image' : 'No custom image'}</p>
          <p className="text-xs text-muted-foreground">
            {custom
              ? 'Shown in the app in place of a library icon.'
              : `PNG, JPG, WEBP, GIF or SVG — resized to ${ICON_PX}×${ICON_PX}.`}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
            <Upload className="size-4" /> {custom ? 'Replace' : 'Upload'}
          </Button>
          {custom && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onChange('wrench')}
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
    </div>
  );
}

/** Stored value as the picker compares it: Iconify ids as-is, lucide names normalised. */
const normalise = (v: string) => (isIconifyId(v) ? v : toIconName(v));

const STARTER = [
  'wrench', 'zap', 'hammer', 'sparkles', 'paintbrush', 'house', 'truck', 'scissors', 'leaf', 'shield', 'droplet',
  'car', 'heart-pulse', 'dumbbell', 'sofa', 'bath', 'utensils', 'camera', 'laptop', 'stethoscope',
  'graduation-cap', 'baby', 'flower-2', 'hand-platter',
];

/**
 * Searchable icon grid that understands services.
 *
 * Type "yoga", "massage", "website", "plumber" or "darzi" and the matching
 * icons come back from Iconify; with the box empty, it suggests icons for the
 * category name being typed (`suggestFor`). Lucide icons whose name matches are
 * shown too, and are all that is left when the Iconify API cannot be reached.
 */
export function IconPicker({
  value,
  onChange,
  suggestFor = '',
  limit = 64,
}: {
  value: string;
  onChange: (name: string) => void;
  /** The category name being entered; drives suggestions while the search box is empty. */
  suggestFor?: string;
  limit?: number;
}) {
  const [query, setQuery] = useState('');
  const [remote, setRemote] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);
  const [offline, setOffline] = useState(false);
  const selected = normalise(value);

  // What is being looked for: the typed search wins, else the category name.
  const typed = query.trim();
  const basis = typed || suggestFor.trim();
  const suggesting = !typed && !!basis;

  useEffect(() => {
    if (!basis) { setRemote([]); setSearching(false); return; }
    const controller = new AbortController();
    setSearching(true);
    // Debounced: the name field fires per keystroke.
    const timer = setTimeout(() => {
      searchIcons(basis, { limit, signal: controller.signal })
        .then((ids) => { setRemote(ids); setOffline(false); })
        .catch((e) => { if (e?.name !== 'AbortError') { setRemote([]); setOffline(true); } })
        .finally(() => { if (!controller.signal.aborted) setSearching(false); });
    }, 350);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [basis, limit]);

  // Lucide matches for the same expanded words, so a known lucide icon is never
  // hidden behind the remote results — and something shows when offline.
  const local = useMemo(() => {
    if (!basis) return [];
    const terms = expandQuery(basis);
    return ALL_ICONS.filter((n) => terms.some((t) => n.includes(t))).slice(0, 16);
  }, [basis]);

  const results = useMemo(() => {
    if (!basis) return Array.from(new Set([selected, ...STARTER].filter(Boolean))).slice(0, limit);
    return Array.from(new Set([...(selected ? [selected] : []), ...remote, ...local])).slice(0, limit);
  }, [basis, remote, local, selected, limit]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by service… (yoga, massage, website, plumber, darzi)"
          className="pl-9 bg-background"
        />
        {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 animate-spin text-muted-foreground" />}
      </div>
      {suggesting && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Sparkles className="size-3 text-primary" /> Suggested for “{basis}”
        </p>
      )}
      <div className="grid grid-cols-8 gap-1.5 max-h-56 overflow-y-auto p-0.5">
        {results.map((n) => (
          <button
            key={n}
            type="button"
            title={n}
            onClick={() => onChange(n)}
            className={`aspect-square rounded-lg flex items-center justify-center border transition-colors ${
              selected === n ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent'
            }`}
          >
            <CategoryIcon icon={n} className="size-5" />
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {offline
          ? 'Icon search is offline — showing built-in icons only.'
          : basis
            ? searching && !results.length
              ? 'Searching…'
              : results.length
                ? `${results.length} icons for “${basis}”. Selected: ${selected || 'none'}`
                : `Nothing for “${basis}” — try another word (e.g. the tool, not the trade).`
            : `Type a service to search 200,000+ icons. Selected: ${selected || 'none'}`}
      </p>
    </div>
  );
}
