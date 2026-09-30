import React, { useState, useEffect } from 'react';
import { 
  X, Check, RotateCcw, Edit3, User, Film, Palette, Sparkles, Plus, Trash2, 
  Layers, MessageSquare, Building2, TrendingUp 
} from 'lucide-react';
import { ProjectItem, CreativeDesignItem, UserProfile } from '../types/portfolio';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  projects: ProjectItem[];
  posters: CreativeDesignItem[];
  initialActiveTab?: string; // 'profile' | project.id | 'posters'
  onSaveProfile: (updatedProfile: UserProfile) => void;
  onSaveProjects: (updatedProjects: ProjectItem[]) => void;
  onSavePosters: (updatedPosters: CreativeDesignItem[]) => void;
  onResetAllDefaults: () => void;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  projects,
  posters,
  initialActiveTab = 'profile',
  onSaveProfile,
  onSaveProjects,
  onSavePosters,
  onResetAllDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);
  const [draftProfile, setDraftProfile] = useState<UserProfile>(userProfile);
  const [draftProjects, setDraftProjects] = useState<ProjectItem[]>(projects);
  const [draftPosters, setDraftPosters] = useState<CreativeDesignItem[]>(posters);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Sync state whenever props change or modal opens
  useEffect(() => {
    if (isOpen) {
      setDraftProfile(userProfile);
      setDraftProjects(projects);
      setDraftPosters(posters);
      if (initialActiveTab) {
        setActiveTab(initialActiveTab);
      }
    }
  }, [isOpen, userProfile, projects, posters, initialActiveTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveProfile(draftProfile);
    onSaveProjects(draftProjects);
    onSavePosters(draftPosters);
    setSuccessBanner('All text content updated and saved successfully!');
    setTimeout(() => {
      setSuccessBanner(null);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all customized text back to defaults?')) {
      onResetAllDefaults();
      setSuccessBanner('Reset all text to default content.');
      setTimeout(() => {
        setSuccessBanner(null);
        onClose();
      }, 1200);
    }
  };

  // Helper for updating draft project
  const updateProjectField = (
    projectId: string, 
    field: keyof ProjectItem, 
    value: string | string[]
  ) => {
    setDraftProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, [field]: value } : p))
    );
  };

  const updateRoleItem = (projectId: string, index: number, value: string) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newRoles = [...p.roleList];
          newRoles[index] = value;
          return { ...p, roleList: newRoles };
        }
        return p;
      })
    );
  };

  const addRoleItem = (projectId: string) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, roleList: [...p.roleList, 'New execution responsibility'] };
        }
        return p;
      })
    );
  };

  const removeRoleItem = (projectId: string, index: number) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newRoles = p.roleList.filter((_, idx) => idx !== index);
          return { ...p, roleList: newRoles };
        }
        return p;
      })
    );
  };

  const updateHighlightItem = (projectId: string, index: number, value: string) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const list = [...(p.keyHighlights || [])];
          list[index] = value;
          return { ...p, keyHighlights: list };
        }
        return p;
      })
    );
  };

  const addHighlightItem = (projectId: string) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const list = [...(p.keyHighlights || []), 'New execution highlight milestone'];
          return { ...p, keyHighlights: list };
        }
        return p;
      })
    );
  };

  const removeHighlightItem = (projectId: string, index: number) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const list = (p.keyHighlights || []).filter((_, idx) => idx !== index);
          return { ...p, keyHighlights: list };
        }
        return p;
      })
    );
  };

  const updateNarrativeParagraph = (projectId: string, index: number, value: string) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const list = [...(p.fullNarrative || [])];
          list[index] = value;
          return { ...p, fullNarrative: list };
        }
        return p;
      })
    );
  };

  const addNarrativeParagraph = (projectId: string) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const list = [...(p.fullNarrative || []), 'New behind the scenes and execution narrative paragraph.'];
          return { ...p, fullNarrative: list };
        }
        return p;
      })
    );
  };

  const removeNarrativeParagraph = (projectId: string, index: number) => {
    setDraftProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const list = (p.fullNarrative || []).filter((_, idx) => idx !== index);
          return { ...p, fullNarrative: list };
        }
        return p;
      })
    );
  };

  // Helper for updating draft posters
  const updatePosterField = (
    posterId: string, 
    field: keyof CreativeDesignItem, 
    value: string
  ) => {
    setDraftPosters((prev) =>
      prev.map((item) => (item.id === posterId ? { ...item, [field]: value } : item))
    );
  };

  const currentProject = draftProjects.find((p) => p.id === activeTab);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#10071c] border border-[#2d184d] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#140a24] border-b border-[#26143f] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-600/20 text-purple-400 rounded-lg">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Edit Content & Text
                <span className="text-[11px] font-mono-code font-normal text-purple-300 bg-[#1d0e34] px-2 py-0.5 rounded border border-[#331a57]">
                  Live In-App Editor
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Customize any title, metric, company, subtitle, or bio text. Changes save instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-[#190c2c] hover:bg-[#23123d] rounded-lg transition-colors cursor-pointer border border-[#2b1746]"
              title="Reset all customized text to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-[#190c2c] hover:bg-[#23123d] rounded-lg transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback Banner */}
        {successBanner && (
          <div className="px-6 py-2.5 bg-emerald-950/70 border-b border-emerald-800 text-emerald-300 text-xs flex items-center justify-between shrink-0 animate-fade-in">
            <span className="flex items-center gap-2 font-medium">
              <Check className="w-4 h-4" />
              {successBanner}
            </span>
          </div>
        )}

        {/* Main Body with Sidebar Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-grow overflow-hidden">
          
          {/* Section Navigation Tabs */}
          <div className="md:col-span-4 bg-[#0d0617] border-r border-[#26143f] p-4 overflow-y-auto space-y-1.5 shrink-0 max-h-[35vh] md:max-h-none">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1">
              General Information
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-300 hover:bg-[#180c2b] hover:text-white'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <div className="truncate">
                <div className="truncate">Profile & Bio Text</div>
                <div className="text-[10px] opacity-75 font-normal truncate">
                  {draftProfile.name} · Tagline & About
                </div>
              </div>
            </button>

            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 pt-3">
              Work Projects
            </div>

            {draftProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === project.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-neutral-300 hover:bg-[#180c2b] hover:text-white'
                }`}
              >
                <Film className="w-4 h-4 shrink-0" />
                <div className="truncate">
                  <div className="truncate">{project.title}</div>
                  <div className="text-[10px] opacity-75 font-normal truncate">
                    {project.company} · {project.resultMetric}
                  </div>
                </div>
              </button>
            ))}

            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 pt-3">
              Design Posters
            </div>

            <button
              onClick={() => setActiveTab('posters')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'posters'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-300 hover:bg-[#180c2b] hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4 shrink-0" />
              <div className="truncate">
                <div className="truncate">3 Creative Posters</div>
                <div className="text-[10px] opacity-75 font-normal truncate">
                  Titles, categories & descriptions
                </div>
              </div>
            </button>
          </div>

          {/* Editor Form Area */}
          <div className="md:col-span-8 p-6 sm:p-8 overflow-y-auto space-y-6 max-h-[60vh] md:max-h-none">
            
            {/* 1. Profile Editor */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    Profile, Hero & Bio Content
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Edit your primary name, taglines, positioning statement, and about paragraphs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={draftProfile.name}
                      onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Phone Number (Calls & WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={draftProfile.phone}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '');
                        setDraftProfile({ 
                          ...draftProfile, 
                          phone: e.target.value,
                          phoneRaw: raw || '601164106487',
                        });
                      }}
                      placeholder="e.g. +60 11-6410 6487"
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono-code"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Main Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={draftProfile.tagline}
                    onChange={(e) => setDraftProfile({ ...draftProfile, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Positioning Statement
                  </label>
                  <input
                    type="text"
                    value={draftProfile.positioning}
                    onChange={(e) => setDraftProfile({ ...draftProfile, positioning: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Sub-Tagline / Narrative Hook
                  </label>
                  <input
                    type="text"
                    value={draftProfile.subTagline}
                    onChange={(e) => setDraftProfile({ ...draftProfile, subTagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Education & Background
                  </label>
                  <input
                    type="text"
                    value={draftProfile.education}
                    onChange={(e) => setDraftProfile({ ...draftProfile, education: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={draftProfile.email}
                      onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={draftProfile.location}
                      onChange={(e) => setDraftProfile({ ...draftProfile, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    LinkedIn Profile Link
                  </label>
                  <input
                    type="url"
                    value={draftProfile.linkedin}
                    onChange={(e) => setDraftProfile({ ...draftProfile, linkedin: e.target.value })}
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono-code"
                  />
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-3 pt-2 border-t border-[#26143f]">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                    About Bio Paragraphs
                  </label>
                  {draftProfile.aboutBio.map((paragraph, pIdx) => (
                    <div key={pIdx} className="space-y-1">
                      <span className="text-[11px] text-purple-300 font-mono-code">
                        Paragraph {pIdx + 1}
                      </span>
                      <textarea
                        rows={2}
                        value={paragraph}
                        onChange={(e) => {
                          const newBio = [...draftProfile.aboutBio];
                          newBio[pIdx] = e.target.value;
                          setDraftProfile({ ...draftProfile, aboutBio: newBio });
                        }}
                        className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Specific Project Editor */}
            {currentProject && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="text-[11px] font-mono-code font-semibold uppercase tracking-wider text-purple-400 mb-1">
                    {currentProject.category}
                  </div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Film className="w-5 h-5 text-purple-400" />
                    Edit Project: {currentProject.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Modify the project name, company, highlighted metric, and case study narrative.
                  </p>
                </div>

                {/* Key Metadata Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={currentProject.title}
                      onChange={(e) => updateProjectField(currentProject.id, 'title', e.target.value)}
                      placeholder="e.g. Mysoftware Solutions"
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-purple-400" />
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={currentProject.company}
                      onChange={(e) => updateProjectField(currentProject.id, 'company', e.target.value)}
                      placeholder="e.g. Mysoftware Solutions"
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      Key Result Metric Badge
                    </label>
                    <input
                      type="text"
                      value={currentProject.resultMetric}
                      onChange={(e) => updateProjectField(currentProject.id, 'resultMetric', e.target.value)}
                      placeholder="e.g. 23K Views"
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono-code"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Runtime / Tagline Info
                    </label>
                    <input
                      type="text"
                      value={currentProject.videoDuration || ''}
                      onChange={(e) => updateProjectField(currentProject.id, 'videoDuration', e.target.value)}
                      placeholder="e.g. 1:15 or Full Case"
                      className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Subtitle / Hook */}
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Subtitle / Summary Hook
                  </label>
                  <textarea
                    rows={2}
                    value={currentProject.subtitle}
                    onChange={(e) => updateProjectField(currentProject.id, 'subtitle', e.target.value)}
                    placeholder="Short description displayed on card"
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                  />
                </div>

                {/* Objective */}
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Project Objective
                  </label>
                  <textarea
                    rows={2}
                    value={currentProject.objective}
                    onChange={(e) => updateProjectField(currentProject.id, 'objective', e.target.value)}
                    placeholder="What challenge or goal did this project solve?"
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                  />
                </div>

                {/* Result Description */}
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Impact & Result Description
                  </label>
                  <textarea
                    rows={2}
                    value={currentProject.resultDescription}
                    onChange={(e) => updateProjectField(currentProject.id, 'resultDescription', e.target.value)}
                    placeholder="Detailed explanation of the business outcome"
                    className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                  />
                </div>

                {/* Roles / Execution checklist */}
                <div className="space-y-3 pt-2 border-t border-[#26143f]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      My Role & Execution Bullet Points
                    </label>
                    <button
                      type="button"
                      onClick={() => addRoleItem(currentProject.id)}
                      className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Role Item</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentProject.roleList.map((role, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => updateRoleItem(currentProject.id, rIdx, e.target.value)}
                          className="flex-grow px-3 py-1.5 text-xs bg-[#160b24] border border-[#2b1744] rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeRoleItem(currentProject.id, rIdx)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Execution Highlights Editor */}
                <div className="space-y-3 pt-4 border-t border-[#26143f]">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                        Execution Highlights (Checklist)
                      </label>
                      <p className="text-[11px] text-neutral-400">
                        Key execution milestones displayed with checkmark badges.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addHighlightItem(currentProject.id)}
                      className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Highlight</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(currentProject.keyHighlights || []).map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => updateHighlightItem(currentProject.id, hIdx, e.target.value)}
                          placeholder="e.g. Achieved 23,000+ views"
                          className="flex-grow px-3 py-1.5 text-xs bg-[#160b24] border border-[#2b1744] rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlightItem(currentProject.id, hIdx)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove highlight"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {(!currentProject.keyHighlights || currentProject.keyHighlights.length === 0) && (
                      <p className="text-xs text-neutral-500 italic">No highlights added yet. Click "+ Add Highlight" to create one.</p>
                    )}
                  </div>
                </div>

                {/* Behind the Scenes & Execution Detail Editor */}
                <div className="space-y-3 pt-4 border-t border-[#26143f]">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                        Behind the Scenes & Execution Detail
                      </label>
                      <p className="text-[11px] text-neutral-400">
                        In-depth storytelling paragraphs breaking down behind-the-scenes execution.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addNarrativeParagraph(currentProject.id)}
                      className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(currentProject.fullNarrative || []).map((paragraph, nIdx) => (
                      <div key={nIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-purple-300 font-mono-code">
                            Paragraph {nIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeNarrativeParagraph(currentProject.id, nIdx)}
                            className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                            title="Remove paragraph"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          value={paragraph}
                          onChange={(e) => updateNarrativeParagraph(currentProject.id, nIdx, e.target.value)}
                          placeholder="Write detailed behind-the-scenes narrative here..."
                          className="w-full px-3 py-2 text-xs bg-[#160b24] border border-[#2b1744] rounded-xl text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                        />
                      </div>
                    ))}
                    {(!currentProject.fullNarrative || currentProject.fullNarrative.length === 0) && (
                      <p className="text-xs text-neutral-500 italic">No narrative paragraphs yet. Click "+ Add Paragraph" to add one.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. 3 Posters Editor */}
            {activeTab === 'posters' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-400" />
                    Edit 3 Creative Posters Information
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Edit the titles, dimensions, and creative rationale for the 3 featured posters.
                  </p>
                </div>

                <div className="space-y-6">
                  {draftPosters.slice(0, 3).map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-5 bg-[#140a22] border border-[#2a1745] rounded-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#24133b]">
                        <span className="text-xs font-mono-code font-bold text-purple-400">
                          Poster 0{idx + 1} ({item.id})
                        </span>
                        <span className="text-[11px] font-mono-code text-neutral-400">
                          {item.dimensions}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                            Poster Title
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updatePosterField(item.id, 'title', e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-[#10071c] border border-[#281542] rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                            Category / Purpose
                          </label>
                          <input
                            type="text"
                            value={item.purpose}
                            onChange={(e) => updatePosterField(item.id, 'purpose', e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-[#10071c] border border-[#281542] rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                          Description & Creative Rationale
                        </label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => updatePosterField(item.id, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-[#10071c] border border-[#281542] rounded-lg text-white leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#140a24] border-t border-[#26143f] shrink-0">
          <span className="text-xs text-neutral-400">
            All text changes are stored locally in your browser.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-[#190c2c] hover:bg-[#23123d] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Apply All</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
