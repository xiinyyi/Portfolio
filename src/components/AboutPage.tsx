import React from 'react';
import { ArrowRight, BookOpen, Sparkles, Users, Handshake, CheckCircle2, Edit3 } from 'lucide-react';
import { PageSection, UserProfile } from '../types/portfolio';

interface AboutPageProps {
  userProfile: UserProfile;
  onNavigate: (section: PageSection) => void;
  onOpenCv?: () => void;
  onOpenContentEditor?: (tab?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  userProfile, 
  onNavigate, 
  onOpenContentEditor,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">
      
      {/* Top Narrative Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Personal Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
              Personal Narrative
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              About Me
            </h1>
            <p className="mt-2 text-base font-editorial italic text-purple-300">
              Communication-focused. People-centered. Creative by nature.
            </p>
          </div>

          {/* Deep Narrative Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg text-neutral-300 leading-relaxed font-sans-clean">
            <p>
              I'm a final-year <strong className="text-white">Chinese Language and Linguistics student at Universiti Malaya</strong>, with hands-on experience across Marketing, Employer Branding, Internal Communications, and Human Resources.
            </p>
            <p>
              While my academic background is rooted in linguistics, my professional experiences have led me to discover a deep, genuine interest in <span className="text-white font-medium">how organisations communicate with their people and audiences</span>.
            </p>
            <p>
              During my HR internship at <strong className="text-white">Mercedes-Benz Malaysia</strong>, I had the privilege to work well beyond traditional administrative routines. I supported internal marketing and communications, produced employee-facing videos and podcast episodes, contributed to LinkedIn employer branding, and drove viral student recruitment content on Xiaohongshu.
            </p>
            <p>
              I also had the opportunity to work directly with external stakeholders and renowned partner brands—including <strong className="text-white">AirAsia, Sony, Gamuda, Sunway, and Ogawa</strong>—to research, explore, and coordinate corporate employee perks.
            </p>
          </div>

          {/* Highlight Quote */}
          <div className="p-6 bg-[#150a22]/80 border-l-4 border-purple-500 rounded-r-xl text-neutral-200 text-lg font-medium italic leading-relaxed border border-[#2b1844] shadow-md shadow-purple-950/20">
            "{userProfile.aboutBio[4] || userProfile.aboutBio[0]}"
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('work')}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm hover:shadow-purple-900/30 transition-all cursor-pointer"
            >
              <span>See My Work in Action</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenContentEditor && (
              <button
                onClick={() => onOpenContentEditor('profile')}
                className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white bg-[#150c23] hover:bg-[#1f1134] border border-[#2b1844] rounded-lg transition-colors cursor-pointer"
                title="Edit bio paragraphs and personal narrative"
              >
                <Edit3 className="w-4 h-4 text-purple-400" />
                <span>Edit Bio Text</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Visual Portrait & Linguistics As Differentiator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl overflow-hidden shadow-xl shadow-purple-950/20 transition-all">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#160c24]">
              <img
                src={userProfile.heroImage}
                alt={userProfile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-base font-bold text-white">
                Why Linguistics is My Marketing Edge
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Linguistics teaches how words construct reality, how syntax guides comprehension, and how semantics shift across cultural cohorts. Rather than guessing what copy works, I apply linguistic audience empathy to craft messaging that genuinely lands.
              </p>
              <div className="pt-3 border-t border-[#24153b] flex items-center justify-between text-xs text-neutral-400">
                <span>Degree</span>
                <span className="text-purple-300 font-medium">B.A. Chinese Language & Linguistics, UM</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Narrative Path Progression */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            The Progression Story
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Connecting the Dots: How My Journey Unfolds
          </h2>
          <p className="text-sm text-neutral-300 mt-1">
            How linguistics, marketing, employer branding, and external stakeholder management reinforce one another.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userProfile.narrativeSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-xl space-y-3 relative transition-all shadow-md hover:shadow-lg hover:shadow-purple-950/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code font-bold text-purple-400">
                  Step 0{idx + 1}
                </span>
                <span className="text-neutral-500 text-xs font-medium">
                  {idx < 3 ? '→' : 'Outcome'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* "What I Bring" Section (4 Cards) */}
      <section className="space-y-8 pt-8 border-t border-[#24153b]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            Core Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            What I Bring to the Table
          </h2>
          <p className="text-sm text-neutral-300 mt-1 max-w-2xl">
            A balanced mix of multimedia creation, employer branding acumen, external partnership diplomacy, and structured research.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProfile.whatIBring.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl space-y-4 transition-all hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-purple-950/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-4 border-t border-[#24153b] flex items-center gap-2 text-xs text-purple-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Hands-on enterprise execution verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
