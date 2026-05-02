"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
  description: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  // 🔐 Protect page
  useEffect(() => {
    const checkUser = async () => {
      const { supabase } = await import("@/lib/supabase");
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        fetchProjects(data.user.id);
      }
    };

    checkUser();
  }, []);

  // ✅ Fetch ONLY user projects
  const fetchProjects = async (userId: string) => {
    const { supabase } = await import("@/lib/supabase");
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setProjects(data || []);
    }
  };

  return (
    <div className="bg-[#081425] min-h-screen text-[#d8e3fb] flex">
      <Sidebar />

      <main className="flex-1 md:ml-72 p-8 lg:p-12">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Your Projects
        </h1>

        <div className="grid gap-6">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-[#111c2d] rounded-xl border border-white/5 border-dashed">
              <p className="text-slate-400 mb-4">
                No projects yet. Get started by initializing your workspace.
              </p>
              <button 
                onClick={() => router.push('/add-project')}
                className="bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#0d0096] font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform"
              >
                Create your first project 🚀
              </button>
            </div>
          ) : (
            projects.map((project) => (
  <div
    key={project.id}
    onClick={() => router.push(`/project?id=${project.id}`)}
    className="bg-[#111c2d] p-6 rounded-xl border border-white/5 cursor-pointer hover:border-[#c0c1ff]/30 transition"
  >
    <h2 className="text-xl font-bold text-white">
      {project.name}
    </h2>

    <p className="text-slate-400 mt-2">
      {project.description}
    </p>

    {/* DELETE BUTTON */}
    <button
      onClick={async (e) => {
        e.stopPropagation(); // 🔥 VERY IMPORTANT

        const confirmDelete = confirm("Delete this project?");
        if (!confirmDelete) return;

        const { supabase } = await import("@/lib/supabase");
        await supabase
          .from("projects")
          .delete()
          .eq("id", project.id);

        const { data } = await supabase.auth.getUser();
        if (data.user) fetchProjects(data.user.id);
      }}
      className="mt-4 text-red-400 text-sm"
    >
      Delete
    </button>
  </div>
))
          )}
        </div>
      </main>
    </div>
  );
}