import { NavLink } from 'react-router';
import {
  LayoutDashboard, Users, Wrench, LayoutGrid, Briefcase, CalendarCheck,
  Gavel, Star, WalletMinimal, TicketPercent, Bell, MessagesSquare, MessageSquare, Settings,
  PanelLeftClose, PanelLeftOpen, BadgeCheck, CreditCard, Gift, LifeBuoy, ScrollText, Banknote, KeyRound, HardHat,
  Building2, UsersRound, Receipt,
  HelpCircle, FileText, Newspaper, MessageSquareQuote, Share2,
} from 'lucide-react';
import { cn } from './ui/utils';
import { isMock } from '../lib/api';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Overview',
    items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'People',
    items: [
      { to: '/users', label: 'Users', icon: Users },
      { to: '/providers', label: 'Providers', icon: Wrench },
      { to: '/contractors', label: 'Contractors', icon: HardHat },
      { to: '/verifications', label: 'Verifications', icon: BadgeCheck },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { to: '/categories', label: 'Categories', icon: LayoutGrid },
      { to: '/services', label: 'Services', icon: Briefcase },
    ],
  },
  {
    title: 'Operations',
    items: [
      { to: '/bookings', label: 'Bookings', icon: CalendarCheck },
      { to: '/tenders', label: 'Tenders & Bids', icon: Gavel },
      { to: '/sites', label: 'Sites & Crews', icon: Building2 },
      { to: '/reviews', label: 'Reviews', icon: Star },
      { to: '/engagement-reviews', label: 'Crew Ratings', icon: UsersRound },
      { to: '/tickets', label: 'Support Tickets', icon: LifeBuoy },
      { to: '/conversations', label: 'Support Chats', icon: MessagesSquare },
      { to: '/faqs', label: 'FAQs', icon: HelpCircle },
      { to: '/legal', label: 'Legal Pages', icon: FileText },
    ],
  },
  // The public website's content, separate from Operations: nothing here moves
  // a booking, and everything here is visible to people who have never signed in.
  {
    title: 'Website',
    items: [
      { to: '/blog', label: 'Blog', icon: Newspaper },
      { to: '/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
      { to: '/social-links', label: 'Social Links', icon: Share2 },
    ],
  },
  {
    title: 'Finance & Growth',
    items: [
      { to: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
      { to: '/payments', label: 'Payments', icon: CreditCard },
      // The gateway's own record, next to the booking-shaped one.
      { to: '/gateway-payments', label: 'Gateway payments', icon: Receipt },
      { to: '/payouts', label: 'Payouts', icon: Banknote },
      { to: '/wallets', label: 'Wallets', icon: WalletMinimal },
      { to: '/coupons', label: 'Coupons', icon: TicketPercent },
      { to: '/referrals', label: 'Referrals', icon: Gift },
      { to: '/notifications', label: 'Notifications', icon: Bell },
      { to: '/messages', label: 'Message Log', icon: MessageSquare },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/audit', label: 'Audit Log', icon: ScrollText },
      { to: '/login-audit', label: 'Login Audit', icon: KeyRound },
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

/**
 * The console's navigation.
 *
 * `collapsed` folds it to an icon rail (desktop only — the mobile drawer is
 * always full width). Section titles give way to a thin divider, and each
 * item keeps its label as a tooltip so nothing becomes guesswork.
 */
export function Sidebar({
  onNavigate,
  collapsed = false,
  onToggle,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
  /** Shown as the collapse/expand control when given. */
  onToggle?: () => void;
}) {
  return (
    <aside
      className={cn(
        'shrink-0 h-full border-r bg-sidebar flex flex-col transition-[width] duration-200',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      <div className={cn('h-16 flex items-center border-b', collapsed ? 'justify-center px-2' : 'gap-2.5 px-4')}>
        <img src="/janshram-mark.png" alt="JanShram" className="size-10 shrink-0 object-contain" />
        {!collapsed && (
          <div className="leading-tight min-w-0">
            <div className="text-[17px] font-bold tracking-tight">
              <span className="text-[#0B3B91] dark:text-[#5b8def]">Jan</span>
              <span className="text-[#F47B20]">shram</span>
            </div>
            <div className="text-[11px] text-muted-foreground">Admin Console</div>
          </div>
        )}
      </div>

      <nav className={cn('flex-1 overflow-y-auto py-4 scrollbar-hide', collapsed ? 'px-2' : 'px-3')}>
        {sections.map((section, si) => (
          <div key={section.title} className={collapsed ? 'mb-2' : 'mb-5'}>
            {collapsed ? (
              si > 0 && <div className="mx-3 mb-2 border-t" aria-hidden="true" />
            ) : (
              <div className="px-2 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center rounded-lg text-sm transition-colors',
                      collapsed ? 'justify-center size-11 mx-auto' : 'gap-3 px-3 py-2',
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/70 hover:bg-accent hover:text-foreground',
                    )
                  }
                >
                  <item.icon className={cn('shrink-0', collapsed ? 'size-5' : 'size-4')} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {onToggle && (
        <div className="p-2 border-t">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              'w-full flex items-center rounded-lg py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors',
              collapsed ? 'justify-center' : 'gap-3 px-3',
            )}
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
            title={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-4" />}
            {!collapsed && <span>Collapse menu</span>}
          </button>
        </div>
      )}

      {/* Only in mock mode. Shown unconditionally this reads as "nothing you do
          here is permanent", which is dangerously wrong when the console is
          pointed at a real backend and the actions include deletes. */}
      {isMock && !collapsed && (
        <div className="p-3 border-t">
          <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
            <div className="font-medium text-foreground mb-0.5">Demo mode</div>
            Data is in-memory and resets on reload.
          </div>
        </div>
      )}
    </aside>
  );
}
