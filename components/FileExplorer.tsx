"use client";

import { Folder, FolderOpen, ChevronDown, ChevronRight, FileCode, FileJson, FileText, Settings, PlusSquare } from "lucide-react";
import { useState } from "react";

type FileNode = {
  name: string;
  type: string;
  isOpen?: boolean;
  children?: FileNode[];
  icon?: React.ElementType;
  color?: string;
  isActive?: boolean;
};

const fileTree = [
  {
    name: "src",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Navbar.tsx", type: "file", icon: FileCode, color: "text-[#c0c1ff]" },
          { name: "Sidebar.tsx", type: "file", icon: FileCode, color: "text-[#c0c1ff]" },
        ],
      },
      { name: "App.tsx", type: "file", icon: FileCode, color: "text-[#c0c1ff]", isActive: true },
      { name: "global.css", type: "file", icon: FileText, color: "text-[#4ae176]" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [{ name: "favicon.ico", type: "file", icon: FileText }],
  },
  { name: "package.json", type: "file", icon: FileJson, color: "text-[#f7be1d]" },
  { name: "tsconfig.json", type: "file", icon: Settings, color: "text-[#908fa0]" },
];

export default function FileExplorer() {
  return (
    <aside className="w-72 bg-[#111c2d] flex flex-col border-r border-white/5">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-widest text-[#c0c1ff] uppercase">EXPLORER</span>
          <PlusSquare className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
        </div>
        <h2 className="text-lg font-bold text-white">quantum-engine-v2</h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1">
          {fileTree.map((node) => (
            <FileTreeNode key={node.name} node={node} depth={0} />
          ))}
        </div>
      </nav>
      <div className="p-6">
        <button className="w-full py-4 bg-gradient-to-r from-[#c0c1ff] to-[#8083ff] text-[#1000a9] rounded-xl font-bold text-sm tracking-wide uppercase active:scale-95 transition-transform">
          Deploy New
        </button>
      </div>
    </aside>
  );
}

function FileTreeNode({ node, depth }: { node: FileNode; depth: number }) {
  const [isOpen, setIsOpen] = useState(node.isOpen || false);
  const Icon = node.icon || (isOpen ? FolderOpen : Folder);
  const paddingLeft = depth * 12 + 24;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1.5 transition-colors cursor-pointer group ${
          node.isActive ? "bg-[#c0c1ff]/10 text-[#c0c1ff] border-r-4 border-[#c0c1ff]" : "text-slate-400 hover:bg-[#1f2a3c]"
        }`}
        style={{ paddingLeft: `${paddingLeft}px`, paddingRight: "24px" }}
        onClick={() => node.type === "folder" && setIsOpen(!isOpen)}
      >
        {node.type === "folder" && (
          <span className="text-slate-600">
            {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </span>
        )}
        <Icon className={`w-4 h-4 ${node.color || (node.type === "folder" ? "text-[#c0c1ff]" : "")}`} />
        <span className="text-sm font-medium">{node.name}</span>
      </div>
      {node.type === "folder" && isOpen && (
        <div className="space-y-1">
          {node.children?.map((child: FileNode) => (
            <FileTreeNode key={child.name} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
