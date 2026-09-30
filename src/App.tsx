/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { WorkPage } from './components/WorkPage';
import { ExperiencePage } from './components/ExperiencePage';
import { ContactPage } from './components/ContactPage';
import { ProjectPlayerModal } from './components/ProjectPlayerModal';
import { DesignLightboxModal } from './components/DesignLightboxModal';
import { ContentEditorModal } from './components/ContentEditorModal';
import { CvModal } from './components/CvModal';
import { Footer } from './components/Footer';

import { USER_PROFILE, WORK_PROJECTS, CREATIVE_GALLERY_ITEMS } from './data/portfolioData';
import { PageSection, ProjectItem, CreativeDesignItem, UserProfile } from './types/portfolio';

export default function App() {
  const [activeSection, setActiveSection] = useState<PageSection>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedDesignItem, setSelectedDesignItem] = useState<CreativeDesignItem | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Content Editor Modal state
  const [isContentEditorOpen, setIsContentEditorOpen] = useState(false);
  const [contentEditorTab, setContentEditorTab] = useState<string>('profile');

  // Maintain User Profile state (persisted in localStorage)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('xinyi_portfolio_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        delete parsed.chineseName;
        const isOldLinkedin = parsed.linkedin && (parsed.linkedin.includes('/xinyileong') || parsed.linkedin === 'https://www.linkedin.com/in/xinyileong');
        return {
          ...USER_PROFILE,
          ...parsed,
          linkedin: isOldLinkedin ? USER_PROFILE.linkedin : (parsed.linkedin || USER_PROFILE.linkedin),
          phone: parsed.phone || USER_PROFILE.phone,
          phoneRaw: parsed.phoneRaw || USER_PROFILE.phoneRaw,
        };
      }
    } catch (e) {
      console.error('Failed reading user profile from storage', e);
    }
    return USER_PROFILE;
  });

  // Maintain projects state with custom texts & video insertions (persisted in localStorage)
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const savedTexts = localStorage.getItem('xinyi_portfolio_custom_projects');
      const savedVideos = localStorage.getItem('xinyi_portfolio_custom_videos');
      const textMap = savedTexts ? JSON.parse(savedTexts) : {};
      const videoMap = savedVideos ? JSON.parse(savedVideos) : {};

      return WORK_PROJECTS.map((p) => {
        let base = { ...p };
        if (textMap[p.id]) {
          base = { ...base, ...textMap[p.id] };
        }
        if (videoMap[p.id]) {
          base.customVideoUrl = videoMap[p.id].url;
          base.customVideoType = videoMap[p.id].type;
        }
        return base;
      });
    } catch (err) {
      console.error('Failed reading custom projects from storage', err);
    }
    return WORK_PROJECTS;
  });

  // Maintain exactly 3 posters state with custom upload insertions (persisted in localStorage)
  const [posters, setPosters] = useState<CreativeDesignItem[]>(() => {
    try {
      const saved = localStorage.getItem('xinyi_portfolio_3_posters');
      if (saved) {
        const parsedMap = JSON.parse(saved);
        return CREATIVE_GALLERY_ITEMS.slice(0, 3).map((item) => {
          if (parsedMap[item.id]) {
            return {
              ...item,
              image: parsedMap[item.id].image || item.image,
              title: parsedMap[item.id].title || item.title,
              dimensions: parsedMap[item.id].dimensions || item.dimensions,
              purpose: parsedMap[item.id].purpose || item.purpose,
              description: parsedMap[item.id].description || item.description,
            };
          }
          return item;
        });
      }
    } catch (err) {
      console.error('Failed reading custom posters from storage', err);
    }
    return CREATIVE_GALLERY_ITEMS.slice(0, 3);
  });

  const handleNavigate = (section: PageSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContentEditor = (tab?: string) => {
    if (tab) {
      setContentEditorTab(tab);
    }
    setIsContentEditorOpen(true);
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('xinyi_portfolio_user_profile', JSON.stringify(updatedProfile));
    } catch (e) {
      console.error('Failed saving user profile', e);
    }
  };

  const handleSaveProjects = (updatedProjects: ProjectItem[]) => {
    setProjects(updatedProjects);
    try {
      const storageMap: Record<string, Partial<ProjectItem>> = {};
      updatedProjects.forEach((p) => {
        storageMap[p.id] = {
          title: p.title,
          company: p.company,
          resultMetric: p.resultMetric,
          subtitle: p.subtitle,
          objective: p.objective,
          roleList: p.roleList,
          resultDescription: p.resultDescription,
          keyHighlights: p.keyHighlights,
          videoDuration: p.videoDuration,
          fullNarrative: p.fullNarrative,
        };
      });
      localStorage.setItem('xinyi_portfolio_custom_projects', JSON.stringify(storageMap));
    } catch (e) {
      console.error('Failed saving custom project texts', e);
    }
  };

  const handleSavePosters = (updatedPosters: CreativeDesignItem[]) => {
    setPosters(updatedPosters);
    try {
      const storageMap: Record<string, Partial<CreativeDesignItem>> = {};
      updatedPosters.forEach((item) => {
        storageMap[item.id] = {
          image: item.image,
          title: item.title,
          dimensions: item.dimensions,
          purpose: item.purpose,
          description: item.description,
        };
      });
      localStorage.setItem('xinyi_portfolio_3_posters', JSON.stringify(storageMap));
    } catch (e) {
      console.error('Failed saving custom posters', e);
    }
  };

  const handleResetAllDefaults = () => {
    localStorage.removeItem('xinyi_portfolio_user_profile');
    localStorage.removeItem('xinyi_portfolio_custom_projects');
    localStorage.removeItem('xinyi_portfolio_3_posters');
    setUserProfile(USER_PROFILE);
    setProjects(WORK_PROJECTS);
    setPosters(CREATIVE_GALLERY_ITEMS.slice(0, 3));
  };

  const handleUpdateProjectVideo = (
    projectId: string,
    videoUrl: string | undefined,
    videoType?: ProjectItem['customVideoType']
  ) => {
    setProjects((prev) => {
      const updated = prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            customVideoUrl: videoUrl,
            customVideoType: videoType,
          };
        }
        return p;
      });

      // Persist persistent URLs (YouTube, Vimeo, Drive, direct URLs) to localStorage
      try {
        const storageMap: Record<string, { url: string; type?: string }> = {};
        updated.forEach((p) => {
          if (p.customVideoUrl && !p.customVideoUrl.startsWith('blob:')) {
            storageMap[p.id] = { url: p.customVideoUrl, type: p.customVideoType };
          }
        });
        localStorage.setItem('xinyi_portfolio_custom_videos', JSON.stringify(storageMap));
      } catch (e) {
        console.error('Failed saving custom videos', e);
      }

      return updated;
    });

    // Also update currently open modal project in real time
    setSelectedProject((prev) => {
      if (prev && prev.id === projectId) {
        return {
          ...prev,
          customVideoUrl: videoUrl,
          customVideoType: videoType,
        };
      }
      return prev;
    });
  };

  const handleUpdatePoster = (
    posterId: string,
    newImageUrl: string,
    newTitle?: string,
    newDescription?: string
  ) => {
    setPosters((prev) => {
      const updated = prev.map((item) => {
        if (item.id === posterId) {
          return {
            ...item,
            image: newImageUrl,
            title: newTitle || item.title,
            description: newDescription || item.description,
          };
        }
        return item;
      });

      // Persist non-blob URLs to localStorage
      try {
        const storageMap: Record<string, { image: string; title?: string; description?: string }> = {};
        updated.forEach((item) => {
          if (!item.image.startsWith('blob:')) {
            storageMap[item.id] = { image: item.image, title: item.title, description: item.description };
          }
        });
        localStorage.setItem('xinyi_portfolio_3_posters', JSON.stringify(storageMap));
      } catch (e) {
        console.error('Failed saving custom posters', e);
      }

      return updated;
    });

    // Also update currently open lightbox item in real time
    setSelectedDesignItem((prev) => {
      if (prev && prev.id === posterId) {
        return {
          ...prev,
          image: newImageUrl,
          title: newTitle || prev.title,
          description: newDescription || prev.description,
        };
      }
      return prev;
    });
  };

  return (
    <div className="relative min-h-screen bg-[#090511] text-[#ede8f5] font-sans flex flex-col selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* Dark Gradient Purple Ambient Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Top ambient violet-purple aurora glow */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.18)_0%,_rgba(109,40,217,0.1)_40%,_transparent_75%)] blur-[90px]" />
        
        {/* Mid-left atmospheric purple bloom */}
        <div className="absolute top-[35%] -left-[10%] w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(124,58,237,0.11)_0%,_transparent_70%)] blur-[100px]" />
        
        {/* Lower-right deep aubergine-indigo bloom */}
        <div className="absolute top-[65%] -right-[10%] w-[850px] h-[850px] bg-[radial-gradient(circle,_rgba(91,33,182,0.13)_0%,_transparent_70%)] blur-[110px]" />
        
        {/* Smooth full-page vertical gradient sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0717]/80 via-[#090511]/50 to-[#050208]/90" />
      </div>

      {/* 5-Page Top Navigation Bar with Edit Text button */}
      <div className="relative z-40">
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenCv={() => setIsCvOpen(true)}
          onOpenContentEditor={() => handleOpenContentEditor('profile')}
          userProfile={userProfile}
        />
      </div>

      {/* Main Page Content Router */}
      <main className="relative z-10 flex-grow">
        {activeSection === 'home' && (
          <HomePage
            userProfile={userProfile}
            onNavigate={handleNavigate}
            onSelectProject={(project) => setSelectedProject(project)}
            workProjects={projects}
            posters={posters}
            onOpenLightbox={(item) => setSelectedDesignItem(item)}
            onOpenContentEditor={handleOpenContentEditor}
          />
        )}

        {activeSection === 'about' && (
          <AboutPage
            userProfile={userProfile}
            onNavigate={handleNavigate}
            onOpenCv={() => setIsCvOpen(true)}
            onOpenContentEditor={handleOpenContentEditor}
          />
        )}

        {activeSection === 'work' && (
          <WorkPage
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenLightbox={(item) => setSelectedDesignItem(item)}
            workProjects={projects}
            posters={posters}
            onUpdatePoster={handleUpdatePoster}
            onOpenContentEditor={handleOpenContentEditor}
          />
        )}

        {activeSection === 'experience' && (
          <ExperiencePage
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'contact' && (
          <ContactPage
            userProfile={userProfile}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCv={() => setIsCvOpen(true)}
        userProfile={userProfile}
      />

      {/* Interactive Project Player Modal (For Video & Podcast Projects) */}
      <ProjectPlayerModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onUpdateProjectVideo={handleUpdateProjectVideo}
        onOpenEditProject={(projectId) => {
          setSelectedProject(null);
          handleOpenContentEditor(projectId);
        }}
      />

      {/* Creative Design 3-Posters Lightbox (Allows Uploading & Enlarge Poster) */}
      <DesignLightboxModal
        item={selectedDesignItem}
        onClose={() => setSelectedDesignItem(null)}
        onUpdatePosterImage={handleUpdatePoster}
      />

      {/* Printable Interactive CV Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
      />

      {/* Comprehensive In-App Text Content Editor Modal */}
      <ContentEditorModal
        isOpen={isContentEditorOpen}
        onClose={() => setIsContentEditorOpen(false)}
        userProfile={userProfile}
        projects={projects}
        posters={posters}
        initialActiveTab={contentEditorTab}
        onSaveProfile={handleSaveProfile}
        onSaveProjects={handleSaveProjects}
        onSavePosters={handleSavePosters}
        onResetAllDefaults={handleResetAllDefaults}
      />
    </div>
  );
}
