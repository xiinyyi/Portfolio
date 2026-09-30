import React, { useState, useRef } from 'react';
import { Play, Eye, ArrowUpRight, CheckCircle, Sparkles, Film, Mic, Rocket, Palette, Upload, Link as LinkIcon, Check, Edit3 } from 'lucide-react';
import { ProjectItem, CreativeDesignItem } from '../types/portfolio';

interface WorkPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenLightbox: (item: CreativeDesignItem) => void;
  workProjects: ProjectItem[];
  posters: CreativeDesignItem[];
  onUpdatePoster: (posterId: string, newImageUrl: string, newTitle?: string, newDescription?: string) => void;
  onOpenContentEditor?: (tab?: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onSelectProject,
  onOpenLightbox,
  workProjects,
  posters,
  onUpdatePoster,
  onOpenContentEditor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // Hidden file inputs for the 3 posters
  const fileInputRef0 = useRef<HTMLInputElement>(null);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRefs = [fileInputRef0, fileInputRef1, fileInputRef2];

  const categories = [
    { id: 'All', label: 'All Projects', icon: Sparkles },
    { id: '01 — SHORT-FORM & SOCIAL CONTENT', label: '01 · Short-form & Social', icon: Film },
    { id: '02 — PODCAST & VIDEO PRODUCTION', label: '02 · Podcast & Video Production 🎙️', icon: Mic },
    { id: '03 — CAMPAIGN & PROJECT LAUNCHES', label: '03 · Campaign Launch & Activation 🚀', icon: Rocket },
    { id: '04 — CREATIVE DESIGN', label: '04 · Creative Design (3 Posters) 🎨', icon: Palette },
  ];

  // Video projects only (categories 01, 02, 03)
  const videoProjects = workProjects.filter((p) => p.category !== '04 — CREATIVE DESIGN');

  const filteredVideoProjects = selectedCategory === 'All'
    ? videoProjects
    : videoProjects.filter((p) => p.category === selectedCategory);

  const showVideoProjects = selectedCategory !== '04 — CREATIVE DESIGN';
  const showCreativePosters = selectedCategory === 'All' || selectedCategory === '04 — CREATIVE DESIGN';

  const handlePosterFileUpload = (posterId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      onUpdatePoster(posterId, blobUrl);
      setUploadNotice(`Loaded "${file.name}" for poster successfully!`);
      setTimeout(() => setUploadNotice(null), 3500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            Work Showcase
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Where ideas become content, campaigns and connections.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            From fast-paced viral social hooks to broadcast-grade internal podcast episodes, mainstage launch videos, and 3 featured creative posters.
          </p>
        </div>

        {onOpenContentEditor && (
          <button
            onClick={() => onOpenContentEditor()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#150c23] hover:bg-[#1f1134] border border-[#2b1844] rounded-xl shadow-sm transition-all cursor-pointer self-start md:self-auto"
            title="Edit titles, company, metrics, and details"
          >
            <Edit3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Edit Project Text</span>
          </button>
        )}
      </div>

      {/* Filter Tabs (Interactive functional buttons) */}
      <div className="flex items-center gap-2 p-1.5 bg-[#12091c]/80 border border-[#25153a] rounded-xl overflow-x-auto max-w-full">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1a0e28]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick feedback banner for poster uploads */}
      {uploadNotice && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            {uploadNotice}
          </span>
          <button onClick={() => setUploadNotice(null)} className="text-emerald-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Video & Multimedia Projects List (Categories 01, 02, 03) */}
      {showVideoProjects && (
        <div className="space-y-12">
          {filteredVideoProjects.map((project) => (
            <article
              key={project.id}
              className="p-6 sm:p-8 lg:p-10 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all shadow-md hover:shadow-xl hover:shadow-purple-950/20"
            >
              {/* Visual Media Showcase with Action Overlay */}
              <div
                className="lg:col-span-6 relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#160c24] group cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Action Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 py-2.5 bg-purple-600/90 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xl group-hover:scale-105 transition-transform backdrop-blur-sm">
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>
                      {project.mediaType === 'podcast'
                        ? 'WATCH EPISODE'
                        : project.mediaType === 'campaign'
                        ? 'WATCH LAUNCH VIDEO'
                        : 'WATCH PROJECT →'}
                    </span>
                  </div>
                </div>

                {/* Tag in corner */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono-code font-medium text-neutral-300 bg-black/70 px-2.5 py-1 rounded">
                    {project.categoryShort}
                  </span>
                  {project.customVideoUrl && (
                    <span className="text-[10px] font-medium bg-emerald-600/90 text-white px-2 py-0.5 rounded shadow-sm">
                      Custom Video Active
                    </span>
                  )}
                </div>
              </div>

              {/* Description & Role Checklist */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
                    <span className="text-purple-400 font-semibold">{project.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-mono-code font-semibold">{project.resultMetric}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white leading-tight">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Objective */}
                <div className="p-4 bg-[#150c22] border border-[#27173d] rounded-xl space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Objective
                  </div>
                  <p className="text-xs text-neutral-200 leading-relaxed">
                    {project.objective}
                  </p>
                </div>

                {/* My Role */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    My Role & Execution:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.roleList.slice(0, 4).map((role, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Interactive CTA */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>
                        {project.mediaType === 'podcast'
                          ? 'Watch Episode Details'
                          : project.mediaType === 'campaign'
                          ? 'Watch Launch Video'
                          : 'Watch Project Details →'}
                      </span>
                    </button>

                    {onOpenContentEditor && (
                      <button
                        onClick={() => onOpenContentEditor(project.id)}
                        className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-[#150c23] hover:bg-[#1f1134] border border-[#2b1844] rounded-lg transition-colors cursor-pointer"
                        title="Edit project text and metrics"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Edit Text</span>
                      </button>
                    )}
                  </div>

                  <span className="text-xs font-mono-code text-neutral-400">
                    {project.videoDuration ? `Runtime: ${project.videoDuration}` : 'Full Case Breakdown'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 04 — CREATIVE DESIGN (EXACTLY 3 POSTERS SHOWCASE) */}
      {showCreativePosters && (
        <section className={`space-y-8 ${selectedCategory === 'All' ? 'pt-16 border-t border-[#24153b]' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
                04 — Creative Design 🎨
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Selected Creative Works (3 Posters)
              </h2>
              <p className="text-sm text-neutral-300 mt-1 max-w-2xl">
                Showcasing 3 selected graphic posters. Click any poster to enlarge in high resolution, or click "Upload Poster" to insert your own designs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onOpenContentEditor && (
                <button
                  onClick={() => onOpenContentEditor('posters')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-[#150c23] hover:bg-[#1f1134] border border-[#2b1844] rounded-lg cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Edit Posters Text</span>
                </button>
              )}
              <div className="text-xs font-mono-code text-neutral-400 bg-[#140b20] px-3 py-1.5 rounded-lg border border-[#27163c] self-start sm:self-auto">
                3 Featured Poster Slots
              </div>
            </div>
          </div>

          {/* 3 Posters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posters.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="group bg-[#140b20] border border-[#27163c] hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl hover:shadow-purple-950/20"
              >
                {/* Poster Frame */}
                <div
                  onClick={() => onOpenLightbox(item)}
                  className="relative aspect-[4/3] w-full bg-[#160c24] overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Corner indicator */}
                  <div className="absolute top-3 left-3 text-[11px] font-mono-code font-bold text-white bg-black/75 px-2.5 py-1 rounded-md border border-white/10">
                    Poster 0{idx + 1}
                  </div>

                  <div className="absolute top-3 right-3 p-2 bg-black/80 rounded-lg text-white opacity-90 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[11px] font-mono-code text-purple-300 font-medium">
                      {item.dimensions}
                    </span>
                  </div>
                </div>

                {/* Poster Card Details */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono-code text-purple-400 font-semibold uppercase tracking-wider">
                      {item.type}
                    </div>
                    <h3
                      onClick={() => onOpenLightbox(item)}
                      className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Direct Actions: Inspect + Insert / Replace Poster */}
                  <div className="pt-3 border-t border-[#231438] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenLightbox(item)}
                      className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-[#150c23] hover:bg-[#201235] border border-[#27163c] rounded-lg transition-colors cursor-pointer"
                    >
                      Enlarge Poster
                    </button>

                    <div>
                      {/* Hidden file input for this poster slot */}
                      <input
                        type="file"
                        ref={fileInputRefs[idx]}
                        onChange={(e) => handlePosterFileUpload(item.id, e)}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRefs[idx].current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
                        title="Upload your poster image file"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Poster</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
