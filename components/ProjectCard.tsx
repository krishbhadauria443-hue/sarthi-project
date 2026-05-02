"use client";

import { FileText, Database, Clock, MoreHorizontal, Download } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  fileCount: number;
  size: string;
  lastUpdated: string;
  statusColor: string;
  statusGlow: string;
  isLarge?: boolean;
}

export default function ProjectCard({
  title,
  description,
  fileCount,
  size,
  lastUpdated,
  statusColor,
  statusGlow,
  isLarge = false,
}: ProjectCardProps) {
  return (
    <div className={`group bg-[#1f2a3c] rounded-xl p-8 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(8,20,37,0.4)] hover:-translate-y-1 relative overflow-hidden ${isLarge ? 'lg:col-span-2' : ''}`}>
      <div className="absolute top-0 right-0 p-6 flex gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${statusColor} ${statusGlow}`}></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#c0c1ff] transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{description}</p>
          </div>

          <div className="flex items-center gap-6 mb-8 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              {fileCount} files
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              {size}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {lastUpdated}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div className="flex gap-3">
              <button className="bg-[#c0c1ff] text-[#0d0096] px-6 py-2.5 rounded-full text-sm font-bold active:scale-95 transition-all">
                Open {isLarge ? 'Editor' : ''}
              </button>
              <button className="bg-[#2a3548]/40 text-[#c7c4d7] px-4 py-2.5 rounded-full border border-white/10 hover:bg-[#2a3548]/60 transition-all">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isLarge && (
           <div className="w-full md:w-64 h-48 md:h-auto rounded-lg overflow-hidden bg-[#040e1f] relative">
             <div className="w-full h-full bg-gradient-to-br from-[#1f2a3c] to-[#040e1f] opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#1f2a3c] to-transparent"></div>
           </div>
        )}
      </div>
    </div>
  );
}
