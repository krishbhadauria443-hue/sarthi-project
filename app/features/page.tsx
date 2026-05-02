"use client";

import Link from "next/link";
import { Search, Rocket, Shield, Cpu, Zap, Layers, Sparkles, Network } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  const features = [
    {
      title: "Neural Synchronization",
      desc: "Instant state replication across thousands of edge nodes. No manual refreshes, no conflict resolution errors.",
      icon: Cpu,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Vault-Level Security",
      desc: "Every packet is wrapped in a dynamic encryption layer. Sarthi uses zero-knowledge proofs for all flows.",
      icon: Shield,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Multi-Stack Mesh",
      desc: "Manage Go, Rust, Node, and Python projects in a unified hyper-workspace with shared memory pooling.",
      icon: Layers,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Hyper-Velocity Deploy",
      desc: "Push your architecture to the edge in under 400ms. Distributed global load balancing handled automatically.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Spatial Intelligence",
      desc: "AI-driven architectural suggestions that anticipate bottlenecks before they happen.",
      icon: Sparkles,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Global CDN Mesh",
      desc: "A geographically distributed backbone that connects your local machine to the hyper-spatial cloud.",
      icon: Network,
      color: "from-blue-400 to-cyan-400"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 overflow-x-hidden relative selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-3xl flex justify-between items-center shadow-2xl">
          <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
            SARTHI
          </Link>
          <Link href="/" className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.2em]">Back Home</Link>
        </div>
      </header>

      <main className="relative z-10 pt-44 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
          >
            <Zap className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Core Engine Capabilities</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Built for the <br/>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent italic">Hyper-Developer</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Experience the next evolution of project orchestration. Sarthi combines cloud-native speed with local-first reliability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
           {features.map((f, i) => (
             <motion.div
               key={f.title}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] group hover:bg-white/10 transition-all shadow-xl"
             >
               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 shadow-lg shadow-blue-500/10`}>
                 <f.icon className="w-6 h-6 text-white" />
               </div>
               <h3 className="text-2xl font-black text-white mb-4 italic tracking-tight">{f.title}</h3>
               <p className="text-slate-400 leading-relaxed font-medium">{f.desc}</p>
             </motion.div>
           ))}
        </div>
      </main>
    </div>
  );
}
