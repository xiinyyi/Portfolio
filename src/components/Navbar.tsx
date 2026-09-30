import React from 'react';
import { Menu, X, Edit3 } from 'lucide-react';
import { PageSection, UserProfile } from '../types/portfolio';

interface NavbarProps {
  activeSection: PageSection;
  onNavigate: (section: PageSection) => void;
  onOpenCv?: () => void;
  onOpenContentEditor: () => void;
  userProfile?: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate, 
  onOpenContentEditor,
  userProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: PageSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageSection) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const displayName = userProfile?.name || 'Xin Yi Leong';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0a0512]/85 border-b border-[#25153b] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer"
        >
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
            {displayName}
          </span>
        </button>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenContentEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#190f2b] hover:bg-[#23153e] border border-purple-500/40 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer hover:border-purple-400"
            title="Edit all content and text across the portfolio"
          >
            <Edit3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Edit Text</span>
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-[#0d0718] border-b border-[#25153b] space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2 text-sm font-medium ${
                activeSection === item.id ? 'text-purple-400 font-bold' : 'text-neutral-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#25153b]">
            <button
              onClick={() => {
                onOpenContentEditor();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-[#190f2b] border border-purple-500/40 rounded-lg cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-purple-400" />
              <span>Edit Text</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
