import React from 'react';
import { ArrowUp, Mail, Linkedin, Phone, MessageCircle } from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';
import { PageSection, UserProfile } from '../types/portfolio';

interface FooterProps {
  onNavigate: (section: PageSection) => void;
  onOpenCv?: () => void;
  userProfile?: UserProfile;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, userProfile = USER_PROFILE }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneDisplay = userProfile.phone || '+60 11-6410 6487';
  const phoneRaw = userProfile.phoneRaw || '601164106487';

  return (
    <footer className="bg-[#06030a]/90 backdrop-blur-md border-t border-[#25153b] text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-[#1f1030]">
          
          {/* Brand & Brief */}
          <div className="space-y-2 max-w-sm">
            <button
              onClick={() => onNavigate('home')}
              className="text-base font-bold text-white hover:text-purple-300 transition-colors text-left cursor-pointer"
            >
              {userProfile.name}
            </button>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {userProfile.positioning} {userProfile.tagline}
            </p>
          </div>

          {/* 5 Clean Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
            <button onClick={() => onNavigate('home')} className="hover:text-purple-300 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-purple-300 transition-colors cursor-pointer">
              About Me
            </button>
            <button onClick={() => onNavigate('work')} className="hover:text-purple-300 transition-colors cursor-pointer">
              Work
            </button>
            <button onClick={() => onNavigate('experience')} className="hover:text-purple-300 transition-colors cursor-pointer">
              Experience
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-purple-300 transition-colors cursor-pointer">
              Contact
            </button>
          </div>

          {/* Contact Actions: Phone, WhatsApp, Email, LinkedIn */}
          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#140b22] hover:bg-[#201235] text-neutral-300 hover:text-emerald-400 rounded-lg border border-[#27163d] transition-colors"
              title={`WhatsApp: ${phoneDisplay}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`tel:+${phoneRaw}`}
              className="p-2 bg-[#140b22] hover:bg-[#201235] text-neutral-300 hover:text-emerald-400 rounded-lg border border-[#27163d] transition-colors"
              title={`Call: ${phoneDisplay}`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${userProfile.email}`}
              className="p-2 bg-[#140b22] hover:bg-[#201235] text-neutral-300 hover:text-white rounded-lg border border-[#27163d] transition-colors"
              title={`Email: ${userProfile.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={userProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#140b22] hover:bg-[#201235] text-neutral-300 hover:text-white rounded-lg border border-[#27163d] transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {userProfile.name} · {phoneDisplay} · All work samples showcase authentic internship and project execution.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
