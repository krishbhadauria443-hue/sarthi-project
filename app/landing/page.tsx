"use client";

import Link from "next/link";
import { Rocket, Shield, Cpu, Zap, Layers, Sparkles } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const Card3D = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 overflow-x-hidden relative selection:bg-blue-500/30">
      
      {/* Aurora Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Glass Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-3xl flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
              SARTHI
            </Link>
            <nav className="hidden lg:flex gap-10">
              {[
                { name: 'Home', href: '/' },
                { name: 'Features', href: '/features' },
                { name: 'Workflow', href: '/workflow' }
              ].map((item) => (
                <Link key={item.name} href={item.href} className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.2em]">{item.name}</Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.2em]">Login</Link>
            <Link href="/signup" className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-40 pb-20 px-6">
        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[15%] left-[10%] w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 hidden md:block"
           />
           <motion.div 
             animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[60%] right-[12%] w-32 h-32 bg-indigo-500/10 backdrop-blur-2xl rounded-full border border-white/5 hidden md:block"
           />
        </div>

        {/* Futuristic Hero Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40 relative z-10 px-6">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Next-Gen Architecture V4.0</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]"
            >
              Architect the <br/>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Invisible Network</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium"
            >
              Sarthi is the first decentralized project orchestrator. Sync, manage, and deploy your engineering workspace across a hyper-spatial cloud mesh.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 items-start"
            >
              <Link href="/signup" className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Initialize Workspace
              </Link>
              <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all shadow-xl">
                Explorer Mesh
              </button>
            </motion.div>
          </div>

          <div className="relative h-[500px] w-full mt-20 lg:mt-0">
             <Card3D className="h-full w-full">
                <div className="bg-[#111c2d]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-[0_0_100px_rgba(128,131,255,0.15)] h-full overflow-hidden flex flex-col">
                   <div className="flex gap-2 mb-8">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                   </div>
                   <div className="flex-1 font-mono text-sm space-y-2 opacity-80">
                      <div className="flex gap-4"><span className="text-slate-600">01</span><span className="text-blue-400">import</span> <span>&#123; Architect &#125;</span> <span className="text-blue-400">from</span> <span className="text-emerald-400">&quot;@sarthi/core&quot;</span>;</div>
                      <div className="flex gap-4"><span className="text-slate-600">02</span><span>&nbsp;</span></div>
                      <div className="flex gap-4"><span className="text-slate-600">03</span><span className="text-purple-400">const</span> <span>workspace</span> = <span className="text-blue-400">await</span> <span>Architect</span>.<span className="text-yellow-400">connect</span>(&#123;</div>
                      <div className="flex gap-4"><span className="text-slate-600">04</span><span className="ml-4 text-slate-400">id:</span> <span className="text-emerald-400">&quot;quantum-v4&quot;</span>,</div>
                      <div className="flex gap-4"><span className="text-slate-600">05</span><span className="ml-4 text-slate-400">mesh:</span> <span className="text-blue-400">true</span></div>
                      <div className="flex gap-4"><span className="text-slate-600">06</span><span>&#125;);</span></div>
                      <div className="flex gap-4"><span className="text-slate-600">07</span><span>&nbsp;</span></div>
                      <div className="flex gap-4"><span className="text-slate-600">08</span><span>workspace</span>.<span className="text-yellow-400">onSync</span>(() =&gt; &#123;</div>
                      <div className="flex gap-4"><span className="text-slate-600">09</span><span className="ml-4">console</span>.<span className="text-yellow-400">log</span>(<span className="text-emerald-400">&quot;Mesh replicated globally&quot;</span>);</div>
                      <div className="flex gap-4"><span className="text-slate-600">10</span><span>&#125;);</span></div>
                   </div>
                   <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node: San Francisco</span>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Latency: 12ms</div>
                   </div>
                </div>
             </Card3D>
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -z-10"></div>
             <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>
          </div>
        </section>

        {/* Central Glass Showcase with 3D Interaction */}
        <section className="max-w-6xl mx-auto mb-40 relative perspective-1000">
          <Card3D>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-1 shadow-2xl relative overflow-hidden">
               <div className="bg-[#020617]/40 rounded-[2.8rem] p-12 flex flex-col items-center">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
                    {[
                      { icon: Cpu, title: "Neural Sync", desc: "Instant sync across edge nodes", color: "text-blue-400" },
                      { icon: Shield, title: "Quantum Lock", desc: "AES-512 hyper-encryption", color: "text-indigo-400" },
                      { icon: Layers, title: "Stack Mesh", desc: "Unified workspace management", color: "text-purple-400" },
                      { icon: Rocket, title: "Hyper Deploy", desc: "Deploy in 400ms globally", color: "text-emerald-400" },
                    ].map((f, i) => (
                      <div key={i} className="group text-center space-y-4">
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto transition-all group-hover:scale-110 group-hover:border-white/20 ${f.color}`}>
                          <f.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{f.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </Card3D>
        </section>

        {/* Feature Bento Mesh with 3D Depth */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card3D className="h-full">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-12 flex flex-col justify-between group overflow-hidden relative h-full">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white mb-6">Autonomous Mesh <br/>Orchestration</h3>
                    <p className="text-slate-400 max-w-sm text-lg leading-relaxed">Let our AI agent handle the boring parts of project management. Sarthi anticipates your dependency moves.</p>
                  </div>
                  <div className="mt-12 h-64 bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl border border-white/5 flex items-end p-8 overflow-hidden pointer-events-none">
                     <div className="w-full flex justify-between gap-4">
                        {[40, 70, 45, 90, 65, 80, 55, 30].map((h, i) => (
                          <motion.div 
                            key={i} 
                            animate={{ height: [`${h}%`, `${h+10}%`, `${h}%`] }}
                            transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                            className="flex-1 bg-blue-400/30 rounded-t-lg" 
                          />
                        ))}
                     </div>
                  </div>
                </div>
              </Card3D>
            </div>
            
            <div>
              <Card3D className="h-full">
                <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center relative group h-full">
                   <Zap className="w-20 h-20 text-indigo-400 mb-8 animate-pulse" />
                   <h3 className="text-3xl font-black text-white mb-4">Zero Latency</h3>
                   <p className="text-slate-400">Global replication at sub-atomic speeds.</p>
                   <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                </div>
              </Card3D>
            </div>
          </div>
        </section>

        {/* CTA Footer Panel */}
        <section className="max-w-7xl mx-auto">
          <div className="bg-blue-600 rounded-[3rem] p-16 text-center shadow-[0_0_100px_rgba(37,99,235,0.3)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready for the Mesh?</h2>
              <p className="text-blue-100 text-xl mb-12 font-medium">Join the thousands of architects building the new internet on Sarthi.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-lg transition-all hover:shadow-2xl">
                  Get Started for Free
                </button>
                <Link href="/dashboard" className="bg-black/20 text-white border border-white/20 px-12 py-5 rounded-2xl font-black text-lg hover:bg-black/30 transition-all">
                  Try Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Subtle Footer */}
      <footer className="max-w-7xl mx-auto border-t border-white/5 py-20 px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500">
        <div className="flex items-center gap-4">
           <span className="text-lg font-bold text-slate-300">SARTHI OS</span>
           <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
           <span className="text-sm font-medium">© 2024 Spatial Mesh Inc.</span>
        </div>
        <div className="flex gap-12 text-sm font-bold uppercase tracking-widest">
           {['Security', 'Status', 'Terminal', 'API'].map(l => (
             <Link key={l} href="#" className="hover:text-blue-400 transition-colors">{l}</Link>
           ))}
        </div>
      </footer>
    </div>
  );
}
