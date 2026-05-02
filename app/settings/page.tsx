"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Settings, Bell, Palette, Monitor, Globe, Shield } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("Dark");
  const [notifications, setNotifications] = useState({
    "Email alerts on deployment success": true,
    "Browser notifications for sync errors": false,
    "Weekly project activity digest": true,
  });

  const toggleNotification = (key: string) => {
    setNotifications((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#081425] min-h-screen text-[#d8e3fb]">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-1 md:ml-72 p-8 lg:p-12 min-h-screen">
          <header className="mb-12">
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-[#c0c1ff] mb-2">Configure Workspace</p>
            <h1 className="text-4xl font-bold text-white">Project Settings</h1>
          </header>

          <div className="max-w-4xl space-y-8">
            <div className="bg-[#111c2d] p-8 rounded-xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#c0c1ff]" /> Preference
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Interface Theme</p>
                    <p className="text-sm text-slate-500">Customize how Sarthi looks on your device.</p>
                  </div>
                  <div className="flex bg-[#040e1f] p-1 rounded-lg">
                    {["Dark", "Light", "System"].map((t) => (
                      <button 
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${theme === t ? 'bg-[#2a3548] text-white' : 'text-slate-500'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111c2d] p-8 rounded-xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#f7be1d]" /> Notifications
              </h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([item, isOn], i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-white">{item}</span>
                    <div 
                      onClick={() => toggleNotification(item)}
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${isOn ? 'bg-[#4ae176]' : 'bg-[#2a3548]'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isOn ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
