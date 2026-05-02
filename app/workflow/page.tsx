"use client";

import Link from "next/link";
import { Terminal, Code, Rocket, CheckCircle2, ArrowRight, Share2, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkflowPage() {
  const steps = [
    {
      step: "01",
      title: "Connect Local Mesh",
      desc: "Install the Sarthi CLI and link your repository. Our daemon starts watching for atomic changes instantly.",
      icon: Terminal,
      color: "bg-blue-500"
    },
    {
      step: "02",
      title: "Real-time Reflection",
      desc: "Every save is mirrored to your private cloud mesh. Low-latency edge nodes ensure your code is always backed up.",
      icon: Globe,
      color: "bg-indigo-500"
    },
    {
      step: "03",
      title: "Collaborative Sync",
      desc: "Invite your team. Sarthi handles real-time state synchronization, making merge conflicts a thing of the past.",
      icon: Share2,
      color: "bg-purple-500"
    },
    {
      step: "04",
      title: "Hyper-Spatial Deploy",
      desc: "One click to push your architecture to production globally. Sarthi orchestrates the entire release cycle.",
      icon: Rocket,
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 overflow-x-hidden relative selection:bg-blue-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-3xl flex justify-between items-center shadow-2xl">
          <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
            SARTHI
          </Link>
          <Link href="/" className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.2em]">Back Home</Link>
        </div>
      </header>

      <main className="relative z-10 pt-44 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-32">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight italic">
            Atomic Workflow
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Eliminate friction from your development pipeline. Sarthi simplifies how you move from local code to global production.
          </p>
        </div>

        <div className="space-y-12 mb-40">
           {steps.map((s, i) => (
             <motion.div
               key={s.step}
               initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex flex-col md:flex-row items-center gap-12 group"
             >
                <div className={`w-24 h-24 rounded-[2rem] ${s.color} flex items-center justify-center text-white shrink-0 shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform`}>
                   <s.icon className="w-10 h-10" />
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-[3rem] flex-1 relative overflow-hidden">
                   <div className="absolute top-8 right-12 text-6xl font-black text-white/5 italic">{s.step}</div>
                   <h3 className="text-3xl font-black text-white mb-6 tracking-tight italic">{s.title}</h3>
                   <p className="text-lg text-slate-400 leading-relaxed font-medium mb-8 max-w-xl">{s.desc}</p>
                   <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-xs tracking-widest">
                      <span>Explore Stage</span>
                      <ArrowRight className="w-4 h-4" />
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-[4rem] p-20 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight italic relative z-10">Streamline Your Stack</h2>
            <p className="text-indigo-100 text-xl mb-12 font-medium relative z-10 opacity-80">Join the elite architects leveraging spatial synchronization.</p>
            <Link href="/signup" className="bg-white text-indigo-950 px-12 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 inline-block shadow-2xl relative z-10">Initialize Now</Link>
        </div>
      </main>
    </div>
  );
}
