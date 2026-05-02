"use client";

import Link from "next/link";
import { Search, Bell, History } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#081425]/60 backdrop-blur-[24px] border-t border-white/10 flex justify-between items-center w-full px-8 h-20 shadow-[0_20px_40px_rgba(8,20,37,0.4)]">
      <div className="flex items-center gap-12">
        <Link href="/dashboard" className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] bg-clip-text text-transparent">
          Sarthi
        </Link>
        <nav className="hidden md:flex gap-8">
          {[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Features', href: '/features' },
            { label: 'Analytics', href: '/analytics' }
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label}
                href={link.href} 
                className={`${isActive ? 'text-[#c0c1ff] border-b-2 border-[#c0c1ff]' : 'text-slate-400'} pb-1 font-medium transition-colors duration-200 hover:text-white`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-white/5">
          <Search className="text-outline mr-2 w-4 h-4" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface placeholder:text-outline/50" 
            placeholder="Search projects..." 
            type="text"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer" onClick={() => alert('No new notifications')}>
            <Bell className="text-slate-400 group-hover:text-white transition-colors w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full border-2 border-[#081425]"></span>
          </div>
          <History className="text-slate-400 hover:text-white transition-colors cursor-pointer w-5 h-5" onClick={() => alert('No recent history')} />
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 cursor-pointer hover:border-primary/40 transition-colors">
              <div className="w-full h-full rounded-full bg-surface-container-high overflow-hidden">
                 {/* Avatar Placeholder */}
                 <div className="w-full h-full flex items-center justify-center text-xs font-bold text-primary">U</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
