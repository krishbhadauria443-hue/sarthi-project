"use client";

import Sidebar from "@/components/Sidebar";
import { Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [localPath, setLocalPath] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    // ✅ Get logged-in user
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    const user = userData?.user;

    if (!user) {
      alert("Please login first");
      return;
    }

    // ✅ Insert project
    const { error } = await supabase.from("projects").insert([
      {
        name: projectName, // ✅ FIXED
        description,
        local_path: localPath, // ✅ FIXED
        user_id: user.id,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error creating project ❌");
    } else {
      alert("Project created successfully 🚀");

      // ✅ Reset form
      setProjectName("");
      setDescription("");
      setLocalPath("");

      // ✅ Navigate to dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-[#081425] min-h-screen text-[#d8e3fb] flex">
      <Sidebar />

      <main className="flex-1 md:ml-72 p-8 lg:p-12">
        <header className="mb-16 flex justify-between">
          <div>
            <p className="text-[#c0c1ff] text-sm mb-2">
              Workspace Initialization
            </p>
            <h2 className="text-4xl font-bold text-white">
              Start a New Project
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="text-[#4ae176]" />
            <span className="text-white">Pro Tier</span>
          </div>
        </header>

        <div className="bg-[#111c2d] p-8 rounded-xl space-y-6">
          {/* Project Name */}
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full bg-[#040e1f] rounded-xl px-6 py-4 text-white"
            placeholder="Project Name"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#040e1f] rounded-xl px-6 py-4 text-white"
            placeholder="Project Description"
            rows={4}
          />

          {/* Local Path */}
          <input
            value={localPath}
            onChange={(e) => setLocalPath(e.target.value)}
            className="w-full bg-[#040e1f] rounded-xl px-6 py-4 text-white"
            placeholder="Local folder path (e.g. C:/Users/HP/Desktop/project)"
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-5 bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] rounded-xl flex items-center justify-center gap-3"
          >
            <span className="text-lg font-bold text-[#0d0096]">
              Initialize Project
            </span>
            <ArrowRight className="w-5 h-5 text-[#0d0096]" />
          </button>
        </div>
      </main>
    </div>
  );
}