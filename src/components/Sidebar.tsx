import {
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageCircle,
  Rss,
  BarChart3,
  Coins,
  Folder,
  GraduationCap,
  Bot,
  Brain,
} from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: CalendarDays, label: 'Calendar' },
    { icon: Users, label: 'Meetings' },
    { icon: MessageCircle, label: 'Team Chat' },
    { icon: Rss, label: 'Company Feed' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Coins, label: 'Finance' },
    { icon: Folder, label: 'Documents' },
    { icon: GraduationCap, label: 'Learning' },
    { icon: Bot, label: 'Automation' },
    { icon: Brain, label: 'Mercury AI', active: true },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] bg-[#141A21] border-r border-[#2A313C] flex flex-col items-center py-5 z-10">
      <div className="text-2xl font-bold text-emerald-400 tracking-tight mb-8 writing-mode-vertical-lr rotate-180">
        M<span className="text-amber-400">E</span>RC
      </div>
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`relative group w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
              active ? 'text-emerald-400' : 'text-[#7A879B] hover:text-emerald-400'
            }`}
          >
            <Icon size={20} strokeWidth={2} />
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#252E3A] text-[#DCE3ED] text-xs font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}
            </span>
          </div>
        ))}
      </nav>
      <div className="bg-emerald-700 text-white text-[10px] font-bold px-3 py-2 rounded-full text-center leading-tight">
        $0<br />FOREVER
      </div>
    </aside>
  );
}
