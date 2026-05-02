"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FileCode } from "lucide-react";

type Project = {
  id: string;
  name: string;
};

type FileType = {
  id: string;
  name: string;
  content: string;
  project_id: string;
};

function ProjectViewerContent() {
  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  const searchParams = useSearchParams();
  const projectId = searchParams?.get("id");

  // 🔹 Fetch Project
  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProject(data);
    };

    fetchProject();
  }, [projectId]);

  // 🔹 Fetch Files
  useEffect(() => {
    if (!projectId) return;

    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from("project_files")
        .select("*")
        .eq("project_id", projectId);

      if (error) {
        console.error(error);
        return;
      }

      setFiles(data || []);
      if (data && data.length > 0) {
        setSelectedFile(data[0]);
      }
    };

    fetchFiles();
  }, [projectId]);

  return (
    <div className="bg-[#081425] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex pt-20 flex-1">
        
        {/* FILE EXPLORER */}
        <div className="w-64 bg-[#0d1625] p-4 border-r border-white/5">
          <h2 className="text-white font-bold mb-4">Files</h2>

          {files.length === 0 ? (
            <p className="text-slate-500 text-sm">No files yet</p>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={
                  "p-2 rounded cursor-pointer text-sm " +
                  (selectedFile?.id === file.id
                    ? "bg-[#1f2a3c] text-white"
                    : "text-slate-400 hover:bg-[#1f2a3c]")
                }
              >
                {file.name}
              </div>
            ))
          )}

          {/* ADD FILE */}
          <button
            onClick={async () => {
              const name = prompt("Enter file name");
              if (!name || !projectId) return;

              const { data, error } = await supabase
                .from("project_files")
                .insert([
                  {
                    name,
                    content: "// New file",
                    project_id: projectId,
                  },
                ])
                .select()
                .single();

              if (error) {
                console.error(error);
                return;
              }

              if (data) {
                setFiles((prev) => [...prev, data]);
                setSelectedFile(data);
              }
            }}
            className="mt-4 w-full bg-[#c0c1ff] text-black py-2 rounded"
          >
            + Add File
          </button>
        </div>

        {/* EDITOR */}
        <main className="flex-1 p-6">
          {!projectId ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <FileCode className="w-16 h-16 mb-4 text-slate-600" />
              <h2 className="text-xl font-bold text-white mb-2">No Project Selected</h2>
              <p>Please select a project from the dashboard to view and edit files.</p>
            </div>
          ) : (
            <>
              <h1 className="text-white text-xl font-bold mb-4">
                {project?.name || "Loading..."}
              </h1>

              {selectedFile ? (
            <>
              <div className="mb-2 text-slate-400 text-sm flex items-center gap-2">
                <FileCode size={16} />
                {selectedFile.name}
              </div>

              <textarea
                value={selectedFile.content}
                onChange={(e) =>
                  setSelectedFile({
                    ...selectedFile,
                    content: e.target.value,
                  })
                }
                className="w-full h-[70vh] bg-[#111c2d] text-white p-4 rounded font-mono"
              />

              <button
                onClick={async () => {
                  if (!selectedFile) return;

                  const { error } = await supabase
                    .from("project_files")
                    .update({ content: selectedFile.content })
                    .eq("id", selectedFile.id);

                  if (error) {
                    console.error(error);
                    return;
                  }

                  alert("Saved ✅");
                }}
                className="mt-4 bg-green-500 px-4 py-2 rounded text-black"
              >
                Save
              </button>
            </>
          ) : (
            <p className="text-slate-400">Select a file</p>
          )}
          </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProjectViewer() {
  return (
    <Suspense fallback={<div className="bg-[#081425] min-h-screen text-white flex items-center justify-center">Loading...</div>}>
      <ProjectViewerContent />
    </Suspense>
  );
}