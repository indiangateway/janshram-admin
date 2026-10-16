import { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from './ui/utils';
import { Card } from './ui/card';

type Accent = 'primary' | 'green' | 'amber' | 'red' | 'violet' | 'orange';

const ACCENT: Record<Accent, { tile: string; bar: string; glow: string }> = {
  primary: { tile: 'from-sky-500 to-blue-600', bar: 'bg-blue-500', glow: 'bg-blue-500/10' },
  green: { tile: 'from-emerald-400 to-emerald-600', bar: 'bg-emerald-500', glow: 'bg-emerald-500/10' },
  amber: { tile: 'from-amber-400 to-amber-600', bar: 'bg-amber-500', glow: 'bg-amber-500/10' },
  red: { tile: 'from-rose-400 to-rose-600', bar: 'bg-rose-500', glow: 'bg-rose-500/10' },
  violet: { tile: 'from-violet-400 to-violet-600', bar: 'bg-violet-500', glow: 'bg-violet-500/10' },
  orange: { tile: 'from-orange-400 to-orange-600', bar: 'bg-orange-500', glow: 'bg-orange-500/10' },
};

export function StatCard({
  label,
  value,
  icon,
  hint,
  trend,
  accent = 'primary',
  to,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  hint?: string;
  trend?: { value: string; positive: boolean };
  accent?: Accent;
  /** Makes the whole card a link to the page behind the number. */
  to?: string;
}) {
  const a = ACCENT[accent];

  const card = (
    <Card
      className={cn(
        'relative h-full overflow-hidden p-5 transition-all',
        to && 'hover:-translate-y-0.5 hover:shadow-md cursor-pointer',
      )}
    >
      {/* Accent strip and a soft glow in the corner — colour without noise. */}
      <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1', a.bar)} />
      <span aria-hidden="true" className={cn('absolute -right-8 -top-8 size-28 rounded-full', a.glow)} />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-[28px] leading-none font-bold mt-2.5 tracking-tight truncate">{value}</p>
          {(hint || trend) && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5 text-xs">
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-1.5 py-0.5 font-semibold',
                    trend.positive
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      : 'bg-destructive/10 text-destructive',
                  )}
                >
                  {trend.positive ? '▲' : '▼'} {trend.value}
                </span>
              )}
              {hint && <span className="text-muted-foreground">{hint}</span>}
            </div>
          )}
        </div>
        <div
          className={cn(
            'size-11 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm bg-gradient-to-br',
            a.tile,
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );

  return to ? <Link to={to} className="block h-full">{card}</Link> : card;
}
