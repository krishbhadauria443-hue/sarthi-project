"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  User,
  Settings,
  Rocket,
  FileCode,
  LogOut, // ✅ ADDED
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // ✅ ADDED

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Project Viewer", icon: FileCode, href: "/project" },
  { label: "Add Project", icon: PlusCircle, href: "/add-project" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 hidden md:flex flex-col py-8 h-screen w-72 rounded-r-[3rem] bg-[#111c2d] z-40 transition-all duration-300 border-r border-white/5">
      <div className="px-8 mb-12">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xl font-black text-[#c0c1ff]">
            Sarthi Studio
          </span>
        </div>
        <p className="text-[0.6875rem] font-medium tracking-wide uppercase text-slate-500">
          Premium Tier
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-4 transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-[#c0c1ff]/10 to-transparent text-[#c0c1ff] border-r-4 border-[#c0c1ff]"
                  : "text-slate-500 hover:bg-[#1f2a3c] hover:text-slate-200 hover:translate-x-1"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  isActive ? "fill-[#c0c1ff]/20" : ""
                }`}
              />
              <span className="text-sm font-medium tracking-wide uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* 🔥 BOTTOM SECTION */}
      <div className="px-6 mt-auto space-y-3">
        {/* Deploy Button */}
        <button 
          onClick={() => router.push('/add-project')}
          className="w-full bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#0d0096] font-bold py-4 rounded-xl active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 group"
        >
          <Rocket className="w-5 h-5 group-hover:animate-bounce" />
          <span>Deploy New</span>
        </button>

        {/* ✅ LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1f2a3c] text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}