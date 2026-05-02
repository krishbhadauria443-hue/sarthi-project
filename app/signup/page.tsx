"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // ✅ ADDED
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });
    
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      alert("Check your email for the confirmation link!");
      router.push("/login");
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) console.log(error.message);
  };

  // ✅ GITHUB LOGIN
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) console.log(error.message);
  };

  return (
    <div className="antialiased text-[#d8e3fb] flex items-center justify-center min-h-screen overflow-hidden bg-[#081425] relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#8083ff]/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#8083ff]/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-black tracking-tighter bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] bg-clip-text text-transparent mb-2">
            Sarthi
          </Link>
          <p className="text-sm font-medium tracking-wide text-[#908fa0] uppercase">Create Your Workspace</p>
        </div>

        <div className="bg-[#2a3548]/40 backdrop-blur-3xl rounded-xl p-8 shadow-[0_20px_40px_rgba(8,20,37,0.6)] border-t border-white/10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Join the evolution</h2>
            <p className="text-[#c7c4d7] text-sm mt-1">Start architecting your projects today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* SAME UI — untouched */}
            <div className="grid grid-cols-2 gap-4">
              <input 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-[#040e1f] text-white rounded-xl px-4 py-3" 
                placeholder="John" 
                required 
              />
              <input 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-[#040e1f] text-white rounded-xl px-4 py-3" 
                placeholder="Doe" 
                required 
              />
            </div>

            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#040e1f] text-white rounded-xl px-4 py-3.5" 
              placeholder="dev@sarthi.io" 
              required 
              type="email" 
            />
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#040e1f] text-white rounded-xl px-4 py-3.5" 
              placeholder="••••••••" 
              required 
              type="password" 
            />

            <button 
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#0d0096] font-bold py-4 rounded-full mt-4 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[0.6875rem] uppercase tracking-widest">
              <span className="bg-[#111c2d] px-3 text-[#908fa0]">Or join with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* ✅ GOOGLE BUTTON CONNECTED */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full bg-[#2a3548]/50 hover:bg-[#2a3548] text-white border border-white/5 py-3.5 rounded-full"
            >
              <span className="text-sm font-semibold">Continue with Google</span>
            </button>

            {/* ✅ GITHUB BUTTON CONNECTED */}
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center gap-3 w-full bg-[#2a3548]/50 hover:bg-[#2a3548] text-white border border-white/5 py-3.5 rounded-full"
            >
              <Terminal className="w-5 h-5" />
              <span className="text-sm font-semibold">Continue with GitHub</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-[#c7c4d7]">
            Already have an account?
            <Link className="text-[#c0c1ff] font-bold ml-1" href="/login">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
}