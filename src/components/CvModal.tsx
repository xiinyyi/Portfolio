import React, { useEffect, useState } from 'react';
import { X, Download, Printer, Check, Mail, MapPin, Linkedin, Sparkles, Building2, GraduationCap, Phone } from 'lucide-react';
import { USER_PROFILE, PARTNER_BRANDS, SKILLS_CATEGORIES } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [downloadNotice, setDownloadNotice] = useState(false);

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

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-start p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121316] border border-[#2b2d35] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121316]/95 backdrop-blur-md border-b border-[#24262c]">
          <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
            <span className="text-white font-bold">{USER_PROFILE.name}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-400">Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-[#1a1b1f] border border-[#2b2d35] rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {downloadNotice ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-[#1a1b1f] hover:bg-[#25272e] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Printable Document Container */}
        <div className="p-8 sm:p-12 space-y-8 bg-[#0f1013] text-[#dedede] font-sans-clean max-h-[82vh] overflow-y-auto">
          
          {/* Header Lockup */}
          <div className="border-b border-[#24262c] pb-8 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {USER_PROFILE.name}
              </h1>
              <div className="text-xs text-blue-400 font-mono-code font-semibold">
                Marketing · Employer Branding · Stakeholder Management
              </div>
            </div>

            <p className="text-sm text-neutral-300 max-w-2xl">
              {USER_PROFILE.positioning} {USER_PROFILE.tagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-mono-code">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+60 11-6410 6487</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{USER_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>linkedin.com/in/xinyi-leong-a393a7195</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Work Experience
            </h2>

            <div className="p-5 bg-[#141519] border border-[#24262c] rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Marketing / Employer Branding & HR Intern
                  </h3>
                  <div className="text-xs text-blue-300 font-semibold">
                    Mercedes-Benz Malaysia
                  </div>
                </div>
                <div className="text-xs text-neutral-400 font-mono-code">
                  Internship Tenure
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Supported employer branding, internal communications and employee engagement initiatives through digital content, video production and campaign execution. Actively explored and coordinated external perks with corporate lifestyle partners.
              </p>

              <ul className="space-y-1.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Follower Growth:</strong> Supported LinkedIn content and employer branding stories, contributing to follower expansion from ~56K to 77K (+21K followers).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Viral Recruitment:</strong> Ideated, scripted, and edited internship recruitment video on Xiaohongshu (小红书), surpassing 30K+ views organically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Podcast & Video:</strong> Directed, produced, and edited inaugural internal studio video podcast episodes from question design to final mastering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Campaign Launches:</strong> Developed storyline, pacing, and visual soundtrack for landmark ceremony launch videos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Stakeholder Partnerships:</strong> Researched, communicated, and coordinated employee perks with leading brands including <em>AirAsia, Sony, Gamuda, Sunway, and Ogawa</em>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Education
            </h2>

            <div className="p-5 bg-[#141519] border border-[#24262c] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Bachelor of Arts in Chinese Language and Linguistics
                </h3>
                <div className="text-xs text-neutral-400">
                  Universiti Malaya (UM) · Malaysia's Top Premier University
                </div>
              </div>
              <div className="text-xs text-emerald-400 font-mono-code font-semibold self-start sm:self-auto">
                Final Year (Graduating 2026)
              </div>
            </div>
          </div>

          {/* Core Skills Matrix */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Skills & Tools
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-4 bg-[#141519] border border-[#24262c] rounded-lg space-y-1.5">
                  <div className="text-xs font-mono-code text-blue-400 font-bold">
                    {cat.category}
                  </div>
                  <div className="text-xs text-neutral-300">
                    {cat.skills.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Languages
            </h2>
            <div className="text-xs text-neutral-300">
              English (Fluent Professional) · Mandarin Chinese (Native Proficiency / Academic Linguistics) · Bahasa Melayu (Fluent)
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
