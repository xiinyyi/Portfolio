import React from 'react';
import { Building2, Award, Handshake, CheckCircle2, TrendingUp, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { PARTNER_BRANDS, SKILLS_CATEGORIES } from '../data/portfolioData';
import { PageSection } from '../types/portfolio';

interface ExperiencePageProps {
  onNavigate: (section: PageSection) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
          Professional Track Record
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Marketing, Employer Branding & Stakeholder Management
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Where creative storytelling meets business development and corporate relationship management.
        </p>
      </div>

      {/* Part 1: Primary Enterprise Experience */}
      <section className="space-y-8">
        <div className="p-8 sm:p-10 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl space-y-8 shadow-xl shadow-purple-950/20 transition-all">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#24153b] gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4" />
                <span>Mercedes-Benz Malaysia</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Marketing / Employer Branding & HR Intern
              </h2>
            </div>
            <div className="text-xs text-neutral-400 font-mono-code bg-[#160b24] px-3 py-1.5 rounded-lg border border-[#281542] self-start sm:self-auto">
              Selangor, Malaysia · On-Site
            </div>
          </div>

          {/* Core Overview */}
          <p className="text-base text-neutral-300 leading-relaxed max-w-4xl">
            Supported employer branding, internal communications and employee engagement initiatives through digital content, video production and campaign execution. Actively bridged internal employees with external lifestyle brand partners.
          </p>

          {/* Key Achievements Grid (Quantified) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-6 bg-[#160b24] border border-[#2b1744] rounded-xl space-y-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-code tabular-nums flex items-center gap-2">
                <span>56K → 77K</span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-neutral-200">
                LinkedIn Follower Growth
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Supported employer branding and culture stories contributing to +21K follower growth during tenure.
              </p>
            </div>

            <div className="p-6 bg-[#160b24] border border-[#2b1744] rounded-xl space-y-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-code tabular-nums flex items-center gap-2">
                <span>30K+</span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-neutral-200">
                Xiaohongshu Video Views
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Internship recruitment organic video campaign resonating across Malaysian student communities.
              </p>
            </div>

            <div className="p-6 bg-[#160b24] border border-[#2b1744] rounded-xl space-y-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-code tabular-nums flex items-center gap-2">
                <span>Multiple</span>
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-xs font-bold text-neutral-200">
                Video & Comms Productions
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Inaugural video podcast episodes, launch ceremony activations, and ongoing culture newsletters.
              </p>
            </div>
          </div>

          {/* Key Responsibilities Checklist */}
          <div className="space-y-3 pt-4 border-t border-[#24153b]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Primary Responsibilities & Deliverables:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5 p-3 bg-[#150a22] rounded-lg border border-[#281542]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Produced studio video podcast episodes from question design to final CapCut edit and teasers.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-[#150a22] rounded-lg border border-[#281542]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Scripted and edited viral Xiaohongshu student recruitment video reaching over 30,000 views.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-[#150a22] rounded-lg border border-[#281542]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Authored LinkedIn employer branding copy aligning with strict global tone-of-voice standards.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-[#150a22] rounded-lg border border-[#281542]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Developed concept, pacing, and visual soundtrack for landmark project launch ceremonies.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Part 2: Stakeholder & Partnership Management (Major Differentiator) */}
      <section className="space-y-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            Strategic Differentiator
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Building Partnerships Beyond Content
          </h2>
          <div className="mt-3 p-4 bg-[#150a22] border-l-4 border-purple-500 rounded-r-xl text-base text-neutral-200 italic max-w-3xl border border-[#281542]">
            "Marketing isn't only about creating content. It's also about building relationships that create value for the audience."
          </div>
        </div>

        <p className="text-base text-neutral-300 leading-relaxed max-w-4xl">
          During my HR internship, I supported employee perks and partnership initiatives by researching potential partners, communicating with external corporate stakeholders and coordinating partnership offerings that benefited hundreds of employees.
        </p>

        {/* Partners / Organisations Engaged */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Partners / Organisations Engaged:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PARTNER_BRANDS.map((partner) => (
              <div
                key={partner.name}
                className="p-5 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-xl space-y-2 transition-all shadow-sm hover:shadow-md"
              >
                <div className="text-xl font-extrabold text-white">
                  {partner.name}
                </div>
                <div className="text-xs font-semibold text-purple-400">
                  {partner.category}
                </div>
                <p className="text-[11px] text-neutral-400 leading-snug">
                  {partner.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* My Role Breakdown in Partnerships */}
        <div className="p-8 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl space-y-6 shadow-xl shadow-purple-950/20">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Handshake className="w-5 h-5 text-purple-400" />
            <span>My Role in Stakeholder & Partnership Execution:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-[#160b24] rounded-xl border border-[#281542] space-y-1.5">
              <span className="text-xs font-mono-code text-purple-400 font-bold">01. Research & Scout</span>
              <p className="text-xs text-neutral-300">
                Researched potential employee perks and prospective retail/hospitality brands aligned with workforce interests.
              </p>
            </div>

            <div className="p-4 bg-[#160b24] rounded-xl border border-[#281542] space-y-1.5">
              <span className="text-xs font-mono-code text-purple-400 font-bold">02. Evaluate Value</span>
              <p className="text-xs text-neutral-300">
                Identified suitable offerings and discount structures for employees, vetting feasibility and terms.
              </p>
            </div>

            <div className="p-4 bg-[#160b24] rounded-xl border border-[#281542] space-y-1.5">
              <span className="text-xs font-mono-code text-purple-400 font-bold">03. Initiate Outreach</span>
              <p className="text-xs text-neutral-300">
                Initiated formal corporate communication with external partner representatives and business development leads.
              </p>
            </div>

            <div className="p-4 bg-[#160b24] rounded-xl border border-[#281542] space-y-1.5">
              <span className="text-xs font-mono-code text-purple-400 font-bold">04. Coordinate Requirements</span>
              <p className="text-xs text-neutral-300">
                Coordinated documentation, terms, redeem codes, promo mechanics, and partner identity guidelines.
              </p>
            </div>

            <div className="p-4 bg-[#160b24] rounded-xl border border-[#281542] space-y-1.5">
              <span className="text-xs font-mono-code text-purple-400 font-bold">05. Professional Follow-up</span>
              <p className="text-xs text-neutral-300">
                Maintained timely follow-up schedules with external contacts to ensure mutual deliverables were met on time.
              </p>
            </div>

            <div className="p-4 bg-[#160b24] rounded-xl border border-[#281542] space-y-1.5">
              <span className="text-xs font-mono-code text-purple-400 font-bold">06. Internal Launch Comms</span>
              <p className="text-xs text-neutral-300">
                Designed internal communications, guides, and newsletter announcements to roll out perks to employees.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#100719] border border-[#24153b] rounded-xl text-xs text-neutral-400">
            <strong className="text-white">Why This Matters:</strong> This demonstrates stakeholder communication, external diplomacy, business development acumen, and project coordination—skills that set me apart from peers who only know how to design static social graphics.
          </div>
        </div>
      </section>

      {/* Part 3: Structured Skills Matrix */}
      <section className="space-y-8 pt-8 border-t border-[#24153b]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            Competencies & Toolset
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Core Skills Matrix
          </h2>
          <p className="text-sm text-neutral-300 mt-1">
            Categorized across strategic marketing, multimedia content, human communication, and production tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className="p-6 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-xl space-y-4 transition-all shadow-sm hover:shadow-md"
            >
              <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-purple-400 pb-2 border-b border-[#24153b]">
                {cat.category}
              </div>

              <ul className="space-y-2.5">
                {cat.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Next Step CTA */}
      <div className="pt-8 border-t border-[#24153b] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-base font-bold text-white">
            Interested in discussing potential opportunities?
          </div>
          <div className="text-xs text-neutral-400">
            Open to graduate marketing roles, employer branding specialist positions, and content strategy.
          </div>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm hover:shadow-purple-900/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Contact Me</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
