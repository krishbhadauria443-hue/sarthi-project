"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { User, Shield, Key, Code, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();

  // 🔐 PROTECT + FETCH USER
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [router]);

  // 👤 Generate initials
  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-[#081425] min-h-screen text-[#d8e3fb]">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />

        <main className="flex-1 md:ml-72 p-8 lg:p-12 min-h-screen">
          <header className="mb-12">
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-[#c0c1ff] mb-2">
              Account Settings
            </p>
            <h1 className="text-4xl font-bold text-white">
              Developer Profile
            </h1>
          </header>

          <div className="grid grid-cols-12 gap-8">
            {/* LEFT CARD */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-[#111c2d] p-8 rounded-xl border border-white/5 flex flex-col items-center text-center">
                
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full border-4 border-[#c0c1ff]/20 p-1 mb-6">
                  <div className="w-full h-full rounded-full bg-[#1f2a3c] flex items-center justify-center text-3xl font-bold text-[#c0c1ff]">
                    {getInitials()}
                  </div>
                </div>

                {/* Name (derived) */}
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user?.email?.split("@")[0] || "User"}
                </h2>

                <p className="text-[#c7c4d7] text-sm mb-6">
                  Authenticated User
                </p>

                <div className="flex gap-4">
                  <button onClick={() => router.push('/project')} className="p-2 rounded-full bg-[#2a3548] hover:bg-[#323f54] text-white transition-colors" title="View Projects">
                    <Code className="w-5 h-5" />
                  </button>
                  <button onClick={() => window.open('https://github.com/sarthi', '_blank')} className="p-2 rounded-full bg-[#2a3548] hover:bg-[#323f54] text-white transition-colors" title="Website/GitHub">
                    <Globe className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* PERSONAL INFO */}
              <div className="bg-[#111c2d] p-8 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#c0c1ff]" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#040e1f] rounded-lg px-4 py-3 text-white outline-none"
                      value={user?.email?.split("@")[0] || ""}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                      Email
                    </label>
                    <input
                      className="w-full bg-[#040e1f] rounded-lg px-4 py-3 text-white outline-none"
                      value={user?.email || ""}
                      readOnly
                    />
                  </div>

                </div>
              </div>

              {/* SECURITY */}
              <div className="bg-[#111c2d] p-8 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#4ae176]" />
                  Security
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#2a3548] rounded-lg border border-white/5">
                    <div className="flex items-center gap-4">
                      <Key className="w-5 h-5 text-[#c0c1ff]" />
                      <span>OAuth Authentication</span>
                    </div>
                    <span className="text-xs font-bold text-[#4ae176] uppercase">
                      Active
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}