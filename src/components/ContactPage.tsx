import React, { useState } from 'react';
import { Mail, Linkedin, Phone, MessageCircle, Check, Copy, MapPin, ExternalLink } from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';
import { UserProfile } from '../types/portfolio';

interface ContactPageProps {
  userProfile?: UserProfile;
}

export const ContactPage: React.FC<ContactPageProps> = ({ userProfile = USER_PROFILE }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);

  const phoneDisplay = userProfile.phone || '+60 11-6410 6487';
  const phoneRaw = userProfile.phoneRaw || '601164106487';
  const linkedinDisplay = userProfile.linkedin
    ? userProfile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/?(\?.*)?$/, '')
    : 'linkedin.com/in/xinyi-leong-a393a7195';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userProfile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyLinkedin = () => {
    navigator.clipboard.writeText(userProfile.linkedin);
    setCopiedLinkedin(true);
    setTimeout(() => setCopiedLinkedin(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
          Direct Contact
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Let’s start a conversation.
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          Whether you're looking for a communication-focused marketing talent, employer branding specialist, or want to discuss a creative content collaboration—reach out directly below.
        </p>
      </div>

      {/* Direct Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Phone & WhatsApp Card */}
        <div className="p-7 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl space-y-5 transition-all shadow-xl shadow-purple-950/20 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Phone className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Phone & WhatsApp</span>
              </div>
              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-[#160b24] hover:bg-[#201033] rounded-md border border-[#281542] transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <a
                href={`tel:+${phoneRaw}`}
                className="text-xl sm:text-2xl font-bold text-white hover:text-emerald-400 transition-colors block font-mono-code"
              >
                {phoneDisplay}
              </a>
              <span className="text-xs text-neutral-400 font-mono-code mt-0.5 block">
                Direct Mobile: +{phoneRaw}
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Available for quick phone calls, text inquiries, and WhatsApp messaging for project discussions.
            </p>
          </div>

          <div className="pt-4 border-t border-[#24153b] flex items-center gap-3">
            <a
              href={`https://wa.me/${phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href={`tel:+${phoneRaw}`}
              className="flex items-center justify-center px-4 py-2.5 text-xs font-medium text-neutral-200 hover:text-white bg-[#160b24] hover:bg-[#201033] border border-[#281542] rounded-lg transition-colors cursor-pointer"
            >
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* Email Card */}
        <div className="p-7 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl space-y-5 transition-all shadow-xl shadow-purple-950/20 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-purple-400">
                <Mail className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Email Me Directly</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-[#160b24] hover:bg-[#201033] rounded-md border border-[#281542] transition-colors cursor-pointer"
                title="Copy email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <a
                href={`mailto:${userProfile.email}`}
                className="text-base sm:text-lg font-bold text-white hover:text-purple-300 transition-colors block font-mono-code truncate"
              >
                {userProfile.email}
              </a>
              <span className="text-xs text-neutral-400 font-mono-code mt-0.5 block">
                Primary Inbox
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Feel free to send over job descriptions, interview invitations, or detailed collaboration briefs. Replies within 24 hours.
            </p>
          </div>

          <div className="pt-4 border-t border-[#24153b]">
            <a
              href={`mailto:${userProfile.email}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-sm hover:shadow-purple-900/30 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* LinkedIn Card */}
        <div className="p-7 bg-[#12091c]/90 border border-[#25153a] hover:border-purple-500/40 rounded-2xl space-y-5 transition-all shadow-xl shadow-purple-950/20 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sky-400">
                <Linkedin className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">LinkedIn Network</span>
              </div>
              <button
                onClick={handleCopyLinkedin}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-[#160b24] hover:bg-[#201033] rounded-md border border-[#281542] transition-colors cursor-pointer"
                title="Copy LinkedIn profile link"
              >
                {copiedLinkedin ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <div className="text-base sm:text-lg font-bold text-white truncate">
                {userProfile.name}
              </div>
              <a
                href={userProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-sky-400 transition-colors font-mono-code mt-0.5 block truncate"
              >
                {linkedinDisplay}
              </a>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Connect to view career endorsements, mutual professional connections, and employer branding updates.
            </p>
          </div>

          <div className="pt-4 border-t border-[#24153b]">
            <a
              href={userProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0077b5] hover:bg-[#006097] rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <span>Visit LinkedIn Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Location & Availability Footer Banner */}
      <div className="p-6 bg-[#12091c]/90 border border-[#25153a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-300 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#160b24] rounded-lg text-purple-400 border border-[#281542]">
            <MapPin className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="font-semibold text-white">Based in {userProfile.location}</div>
            <div className="text-neutral-400">{userProfile.education} · Open to hybrid, on-site, and remote marketing opportunities</div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono-code text-[11px] text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Actively Open to Opportunities</span>
        </div>
      </div>

    </div>
  );
};
