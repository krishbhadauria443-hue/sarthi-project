"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { BarChart3, TrendingUp, Activity, PieChart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  return (
    <div className="bg-[#081425] min-h-screen text-on-background font-body antialiased">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-1 md:ml-72 p-8 lg:p-12">
          <header className="mb-12 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold tracking-[0.05em] uppercase text-primary mb-2">Performance Intelligence</p>
              <h1 className="text-5xl font-bold tracking-tight text-white italic">Architecture Analytics</h1>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
               <Activity className="w-4 h-4 text-secondary animate-pulse" />
               <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Real-time Stream</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: "Throughput", value: "1.2 TB/s", change: "+14%", icon: TrendingUp },
              { label: "Active Nodes", value: "4,821", change: "+8%", icon: Activity },
              { label: "Sync Latency", value: "12.4ms", change: "-2ms", icon: PieChart },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-container-high p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
              >
                <stat.icon className="w-8 h-8 text-primary mb-6" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="flex items-end gap-4">
                  <h3 className="text-4xl font-black text-white">{stat.value}</h3>
                  <span className="text-secondary flex items-center gap-1 font-bold text-sm mb-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-surface-container-high rounded-[3rem] p-12 border border-white/5 relative overflow-hidden h-[400px] flex items-end gap-4">
             <div className="absolute top-12 left-12">
                <h3 className="text-2xl font-bold text-white mb-2">Sync Volume (24h)</h3>
                <p className="text-slate-500 text-sm">Global synchronization traffic across all meshes</p>
             </div>
             {Array.from({ length: 24 }).map((_, i) => {
               const height = Math.random() * 80 + 20;
               return (
                 <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.05, duration: 1 }}
                    className="flex-1 bg-gradient-to-t from-primary/40 to-primary/10 rounded-t-lg border-t-2 border-primary/50 relative group"
                 >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-950 px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                       {Math.round(height)}%
                    </div>
                 </motion.div>
               );
             })}
          </div>
        </main>
      </div>
    </div>
  );
}
