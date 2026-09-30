import React from 'react';
import { ArrowRight, Play, Eye, Users, Sparkles, Building2, ExternalLink, Edit3 } from 'lucide-react';
import { HIGHLIGHT_STATS, PARTNER_BRANDS } from '../data/portfolioData';
import { PageSection, ProjectItem, CreativeDesignItem, UserProfile } from '../types/portfolio';

interface HomePageProps {
  userProfile: UserProfile;
  onNavigate: (section: PageSection) => void;
  onSelectProject: (project: ProjectItem) => void;
  workProjects: ProjectItem[];
  posters: CreativeDesignItem[];
  onOpenLightbox: (item: CreativeDesignItem) => void;
  onOpenContentEditor?: (tab?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  userProfile,
  onNavigate, 
  onSelectProject, 
  workProjects,
  posters,
  onOpenLightbox,
  onOpenContentEditor,
}) => {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero: Strong Visual Introduction */}
      <section className="relative pt-12 md:pt-20 border-b border-[#24153b] pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Quiet unboxed discipline kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-400">
                <span className="text-purple-400 font-semibold">Marketing & Employer Branding</span>
                <span aria-hidden="true" className="text-purple-900/60">·</span>
                <span>Content Creation & Podcasts</span>
                <span aria-hidden="true" className="text-purple-900/60">·</span>
                <span>Stakeholder Management</span>
              </div>

              {/* Tagline */}
              <h1 
                style={{ textWrap: 'balance' }} 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              >
                {userProfile.tagline}
              </h1>

              {/* Core Positioning */}
              <div className="space-y-3 max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed">
                <p className="font-medium text-white">
                  {userProfile.positioning}
                </p>
                <p className="text-sm sm:text-base text-neutral-400">
                  {userProfile.subTagline} {userProfile.education}, with hands-on experience at Mercedes-Benz Malaysia and leading external corporate partners.
                </p>
              </div>

              {/* Primary Call to Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('work')}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm hover:shadow-purple-900/30 transition-all cursor-pointer"
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-neutral-200 hover:text-white bg-[#150c23] hover:bg-[#1f1134] border border-[#2b1844] rounded-lg transition-colors cursor-pointer"
                >
                  <span>About My Background</span>
                </button>

                {onOpenContentEditor && (
                  <button
                    onClick={() => onOpenContentEditor('profile')}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white bg-[#12091d] hover:bg-[#1c0f2d] border border-[#2a1740] rounded-lg transition-colors cursor-pointer"
                    title="Edit profile & hero text"
                  >
                    <Edit3 className="w-4 h-4 text-purple-400" />
                    <span>Edit Profile Text</span>
                  </button>
                )}
              </div>

              {/* Highlight Metric Row with Tabular Numbers */}
              <div className="pt-8 border-t border-[#24153b] grid grid-cols-2 sm:grid-cols-4 gap-6">
                {HIGHLIGHT_STATS.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-code tabular-nums tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-neutral-200">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-neutral-400 leading-snug line-clamp-2">
                      {stat.context}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Visual: Editorial Profile & Core Identity */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-md bg-[#120a1c] border border-[#2a1742] rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/30">
                
                {/* Image Frame */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={userProfile.heroImage}
                    alt={userProfile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120a1c] via-transparent to-transparent opacity-75" />
                </div>

                {/* Profile Card Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        {userProfile.name}
                      </h2>
                      {userProfile.phone && (
                        <span className="text-xs text-neutral-400 font-mono-code block mt-0.5">
                          {userProfile.phone}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-medium text-purple-300 bg-purple-950/70 border border-purple-800/80 px-2.5 py-1 rounded-full">
                      Open to Opportunities
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {userProfile.positioning}
                  </p>

                  <div className="pt-4 border-t border-[#24153b] flex items-center justify-between text-xs text-neutral-400">
                    <span>{userProfile.location}</span>
                    <button
                      onClick={() => onNavigate('about')}
                      className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Selected Work Section (Visual Evidence First) */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#24153b]">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Featured Case Studies & Productions
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Selected Work & Campaigns
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
              From viral short-form recruitment videos and corporate video podcasts to mainstage ceremony launch visuals and software showcases.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {onOpenContentEditor && (
              <button
                onClick={() => onOpenContentEditor()}
                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-[#150c23] hover:bg-[#1f1134] px-3 py-1.5 rounded-lg border border-[#2b1844] transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                <span>Edit Project Content</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('work')}
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>View All Work Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Cards Bento Grid for Selected Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {workProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-purple-950/20"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/9] w-full bg-[#160c24] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12091c] via-black/20 to-transparent" />

                {/* Badge Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[11px] font-mono-code font-semibold px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-white">
                    {project.categoryShort}
                  </span>
                  {project.customVideoUrl && (
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-emerald-600/90 text-white rounded-md shadow-sm">
                      Video Added
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 p-2 bg-[#0c0d0e]/80 backdrop-blur-sm border border-white/10 rounded-lg text-white group-hover:bg-purple-600 transition-colors">
                  <Play className="w-4 h-4 fill-white" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                      <span className="text-purple-400 font-semibold">{project.company}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400 font-mono-code font-semibold">
                        {project.resultMetric}
                      </span>
                    </div>

                    {onOpenContentEditor && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenContentEditor(project.id);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-purple-400 hover:bg-[#1c0f2d] rounded-md transition-colors cursor-pointer"
                        title="Edit this project text"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Role Snippet */}
                <div className="pt-4 border-t border-[#231438] flex items-center justify-between text-xs text-neutral-400">
                  <span className="truncate max-w-[260px]">
                    Role: {project.roleList[0]}, {project.roleList[1]}
                  </span>
                  <span className="text-purple-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {project.customVideoUrl ? 'Play Video →' : 'Watch Video Details →'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Posters Showcase Row */}
        <div className="p-8 bg-[#12091c]/90 border border-[#25153a] rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                04 · Creative Design 🎨
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Selected Creative Works (3 Featured Posters)
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {onOpenContentEditor && (
                <button
                  onClick={() => onOpenContentEditor('posters')}
                  className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white bg-[#180d28] px-2.5 py-1.5 rounded-lg border border-[#2a1740] cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Edit Posters Info</span>
                </button>
              )}
              <button
                onClick={() => onNavigate('work')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors self-start sm:self-auto cursor-pointer"
              >
                Manage Posters on Work Page →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {posters.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className="group cursor-pointer bg-[#150c22] border border-[#28183e] hover:border-purple-500/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-[#170d26] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 text-[10px] font-mono-code font-bold bg-black/80 text-white px-2 py-0.5 rounded">
                    Poster 0{idx + 1}
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-1">
                    {item.purpose}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Partnerships Beyond Content Callout */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-8 sm:p-12 bg-gradient-to-b from-[#160c24] to-[#0e0717] border border-[#2b1842] rounded-3xl space-y-8 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>External Stakeholder Engagement</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Bridging Internal Culture with Renowned Brand Partnerships
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              During my tenure at Mercedes-Benz Malaysia, I engaged with external corporate partners to explore, coordinate, and establish meaningful employee perks, exclusive lifestyle privileges, and staff wellness activations.
            </p>
          </div>

          {/* Partner Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PARTNER_BRANDS.map((partner, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#140b20] border border-[#27163c] rounded-2xl flex flex-col justify-between space-y-3 hover:border-purple-500/40 transition-colors"
              >
                <div>
                  <div className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>{partner.name}</span>
                  </div>
                  <div className="text-[11px] font-mono-code text-neutral-400 mt-0.5">
                    {partner.category}
                  </div>
                </div>

                <div className="text-xs text-neutral-300 pt-3 border-t border-[#231438]">
                  <span className="text-purple-300 font-medium block mb-1">
                    {partner.benefit}
                  </span>
                  <span className="text-[11px] text-neutral-400 line-clamp-2">
                    {partner.tagline}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 border-t border-[#24153b] gap-4">
            <span>
              Demonstrating commercial diplomacy, professional correspondence, and cross-enterprise stakeholder management.
            </span>
            <button
              onClick={() => onNavigate('experience')}
              className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Explore Partnership Details in Experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
