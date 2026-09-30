import React, { useState, useRef } from 'react';
import { 
  X, Play, Pause, Volume2, RotateCcw, Check, Sparkles, Clock, 
  Share2, Award, Upload, Link as LinkIcon, Trash2, Video, AlertCircle, Edit3 
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectPlayerModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onUpdateProjectVideo: (projectId: string, videoUrl: string | undefined, videoType?: ProjectItem['customVideoType']) => void;
  onOpenEditProject?: (projectId: string) => void;
}

export const ProjectPlayerModal: React.FC<ProjectPlayerModalProps> = ({
  project,
  onClose,
  onUpdateProjectVideo,
  onOpenEditProject,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [copiedLink, setCopiedLink] = useState(false);

  // Video insertion drawer state
  const [isInsertPanelOpen, setIsInsertPanelOpen] = useState(false);
  const [insertTab, setInsertTab] = useState<'upload' | 'url'>('upload');
  const [inputUrl, setInputUrl] = useState('');
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!project) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to extract clean embed URLs for YouTube, Vimeo, Drive, or raw MP4s
  const parseVideoSource = (url?: string, videoType?: ProjectItem['customVideoType']): { type: ProjectItem['customVideoType']; embedUrl: string } | null => {
    if (!url) return null;

    if (videoType === 'file' || url.startsWith('blob:')) {
      return { type: 'file', embedUrl: url };
    }

    // YouTube watch URL
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      };
    }

    // Google Drive share URL
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return {
        type: 'drive',
        embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      };
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[3]) {
      return {
        type: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
      };
    }

    // Fallback: direct mp4/webm link
    return { type: 'direct_url', embedUrl: url };
  };

  const hasCustomVideo = Boolean(project.customVideoUrl);
  const parsedVideo = parseVideoSource(project.customVideoUrl, project.customVideoType);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      onUpdateProjectVideo(project.id, blobUrl, 'file');
      setIsInsertPanelOpen(false);
      setUploadNotice(`Loaded video "${file.name}" successfully!`);
      setTimeout(() => setUploadNotice(null), 4000);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    const parsed = parseVideoSource(inputUrl.trim());
    onUpdateProjectVideo(project.id, inputUrl.trim(), parsed?.type || 'direct_url');
    setIsInsertPanelOpen(false);
    setInputUrl('');
    setUploadNotice('Connected video link successfully!');
    setTimeout(() => setUploadNotice(null), 4000);
  };

  const handleRemoveCustomVideo = () => {
    onUpdateProjectVideo(project.id, undefined);
    setUploadNotice('Reset back to default simulated video.');
    setTimeout(() => setUploadNotice(null), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#12091c] border border-[#2c1748] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#12091c] border-b border-[#25153a]">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="text-purple-400 font-semibold">{project.categoryShort}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white">{project.company}</span>
            {hasCustomVideo && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Custom Video Active
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Edit Project Text */}
            {onOpenEditProject && (
              <button
                onClick={() => onOpenEditProject(project.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1c0e30] hover:bg-[#25123f] text-neutral-200 border border-[#2f194c] transition-all cursor-pointer"
                title="Edit title, metric, company, and description text"
              >
                <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                <span>Edit Text</span>
              </button>
            )}

            {/* Insert / Replace Video Action */}
            <button
              onClick={() => setIsInsertPanelOpen(!isInsertPanelOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                hasCustomVideo
                  ? 'bg-[#1c0e30] hover:bg-[#25123f] text-neutral-200 border border-[#2f194c]'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-sm'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{hasCustomVideo ? 'Replace Video' : 'Insert Your Video'}</span>
            </button>

            {hasCustomVideo && (
              <button
                onClick={handleRemoveCustomVideo}
                className="p-1.5 text-neutral-400 hover:text-rose-400 bg-[#170c28] hover:bg-[#25123f] rounded-lg transition-colors cursor-pointer"
                title="Remove inserted video and reset to default preview"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleCopy}
              className="p-1.5 text-neutral-400 hover:text-white bg-[#170c28] rounded-lg transition-colors cursor-pointer"
              title="Share project"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-[#170c28] hover:bg-[#25123f] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Notice Banner if updated */}
        {uploadNotice && (
          <div className="px-6 py-2.5 bg-emerald-950/60 border-b border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              {uploadNotice}
            </span>
            <button onClick={() => setUploadNotice(null)} className="text-emerald-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Insert Video Dropdown / Drawer Panel */}
        {isInsertPanelOpen && (
          <div className="p-5 bg-[#160b24] border-b border-[#291744] space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-purple-400" />
                  Insert Your Video for "{project.title}"
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Choose how you want to load your video into this portfolio card.
                </p>
              </div>

              <div className="flex items-center gap-1 p-1 bg-[#12091c] border border-[#2c1748] rounded-lg">
                <button
                  type="button"
                  onClick={() => setInsertTab('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    insertTab === 'upload' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInsertTab('url')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    insertTab === 'url' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>Paste Link</span>
                </button>
              </div>
            </div>

            {insertTab === 'upload' ? (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="video/mp4,video/webm,video/quicktime,video/m4v,video/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#2f194c] hover:border-purple-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#140a20] hover:bg-[#180d28]"
                >
                  <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">
                    Click to select and upload your video file
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Supports .mp4, .mov, .webm videos directly from your phone or laptop
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/... or Google Drive / MP4 URL"
                    className="flex-grow px-3 py-2 text-xs bg-[#12091c] border border-[#2c1748] rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    Connect Video
                  </button>
                </div>
                <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span>Works with YouTube videos & Shorts, Vimeo, Google Drive share links, or direct MP4 links.</span>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[82vh] overflow-y-auto">
          
          {/* Real Video or Simulated Player Showcase */}
          <div className="relative aspect-[16/9] w-full bg-black rounded-xl overflow-hidden border border-[#291744] group">
            {hasCustomVideo && parsedVideo ? (
              parsedVideo.type === 'file' || parsedVideo.type === 'direct_url' ? (
                <video
                  src={parsedVideo.embedUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <iframe
                  src={parsedVideo.embedUrl}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )
            ) : (
              <>
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105 cursor-pointer backdrop-blur-sm"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 fill-white" />
                    ) : (
                      <Play className="w-8 h-8 fill-white ml-1" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsInsertPanelOpen(true)}
                    className="px-3 py-1.5 bg-black/75 hover:bg-black/90 text-neutral-300 hover:text-white text-xs rounded-full border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-purple-400" />
                    <span>Insert your actual video clip here</span>
                  </button>
                </div>

                {/* Bottom Media Scrub Bar Simulation */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 to-transparent space-y-2">
                  <div className="w-full bg-neutral-700/60 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all"
                      style={{ width: isPlaying ? '64%' : `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-300">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-code">
                        {isPlaying ? '01:14' : '00:32'} / {project.videoDuration || '02:30'}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {project.mediaType === 'podcast' ? 'Studio Stereo Master' : '1080p 60fps Master'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs font-mono-code text-emerald-400 font-semibold">
                        {project.resultMetric}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Title & Key Result */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
              Project Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-neutral-300">
              {project.subtitle}
            </p>
          </div>

          {/* 2-Column: Objective vs Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#160b24] border border-[#291744] rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Project Objective
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {project.objective}
              </p>
            </div>

            <div className="p-5 bg-[#190c2a] border border-purple-900/40 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Key Result & Impact
              </div>
              <div className="text-xl font-bold text-white font-mono-code">
                {project.resultMetric}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.resultDescription}
              </p>
            </div>
          </div>

          {/* My Role Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
              My Role & Contributions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.roleList.map((role, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 bg-[#160b24] border border-[#25153a] rounded-lg text-xs text-neutral-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Narrative Breakdown */}
          <div className="space-y-3 pt-4 border-t border-[#24153b]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                Behind the Scenes & Execution Detail
              </h3>
              {onOpenEditProject && (
                <button
                  onClick={() => onOpenEditProject(project.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-purple-400 hover:text-purple-300 bg-[#1a0e2a] hover:bg-[#231238] rounded-md border border-[#2e1848] transition-colors cursor-pointer"
                  title="Edit behind the scenes narrative paragraphs"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Narrative</span>
                </button>
              )}
            </div>

            {project.fullNarrative && project.fullNarrative.length > 0 ? (
              <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
                {project.fullNarrative.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 italic">
                No narrative detail added yet.{' '}
                {onOpenEditProject && (
                  <button
                    onClick={() => onOpenEditProject(project.id)}
                    className="text-purple-400 hover:underline cursor-pointer ml-1"
                  >
                    Click to write behind the scenes details.
                  </button>
                )}
              </p>
            )}
          </div>

          {/* Key Highlights Checklist */}
          <div className="p-4 bg-[#150a22] border border-[#291744] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-neutral-300">
                Execution Highlights
              </div>
              {onOpenEditProject && (
                <button
                  onClick={() => onOpenEditProject(project.id)}
                  className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-purple-400 hover:text-purple-300 bg-[#1a0e2a] hover:bg-[#231238] rounded border border-[#2e1848] transition-colors cursor-pointer"
                  title="Edit execution highlights"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Highlights</span>
                </button>
              )}
            </div>
            {project.keyHighlights && project.keyHighlights.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-neutral-400">
                {project.keyHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-neutral-500 italic">No highlights added yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
