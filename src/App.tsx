import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LeftPanel } from './components/LeftPanel';
import { HeroCenter } from './components/HeroCenter';
import { RightPanel } from './components/RightPanel';
import { MobileFrame } from './components/MobileFrame';
import { HeroBackgroundVideo } from './components/HeroBackgroundVideo';
import { MachineryTelemetrySection } from './components/MachineryTelemetrySection';
import { PromptWorkbenchSection } from './components/PromptWorkbenchSection';
import { ResearchRadarSection } from './components/ResearchRadarSection';
import { ModelBenchmarksSection } from './components/ModelBenchmarksSection';
import { SDKHubSection } from './components/SDKHubSection';
import { CommunityFeedSection } from './components/CommunityFeedSection';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { COMPANIES, PROJECTS, PROMPTS, REVIEWS } from './data/mockData';
import { Company, Project, PromptTemplate, Review } from './types';

export default function App() {
  const [companies] = useState<Company[]>(COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState<Company>(COMPANIES[0]);
  const [projects] = useState<Project[]>(PROJECTS);
  const [prompts] = useState<PromptTemplate[]>(PROMPTS);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile-device' | 'stacked'>('desktop');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const heroProject = projects[0]; // Futuristic Machineries (03)
  const featuredProject = projects[1]; // Customer Segmentation (04)

  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  const handleOpenProjectDetail = (project: Project) => {
    setSelectedProjectForModal(project);
    setActiveModal('project-detail');
  };

  return (
    <div
      className={`min-h-screen font-sans relative overflow-x-hidden p-3 sm:p-6 md:p-8 transition-colors duration-500 ${
        isDarkMode
          ? 'bg-[#08090e] text-slate-100 selection:bg-cyan-400 selection:text-slate-950'
          : 'bg-[#f3f2f0] text-neutral-900 selection:bg-neutral-900 selection:text-white'
      }`}
    >
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar isDarkMode={isDarkMode} />

      {/* Background Architectural Grid Lines / Futuristic Cyber Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500">
        {isDarkMode ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#08090e] to-[#040508]">
            <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-dark" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dark)" />
              <path
                d="M -100 200 Q 400 100 800 600 T 1800 400"
                fill="none"
                stroke="rgba(6,182,212,0.15)"
                strokeWidth="1.5"
              />
              <path
                d="M 100 -50 Q 600 300 1200 100"
                fill="none"
                stroke="rgba(16,185,129,0.12)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        ) : (
          <div className="absolute inset-0 opacity-40">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path
                d="M -100 200 Q 400 100 800 600 T 1800 400"
                fill="none"
                stroke="rgba(0,0,0,0.02)"
                strokeWidth="1.5"
              />
              <path
                d="M 100 -50 Q 600 300 1200 100"
                fill="none"
                stroke="rgba(0,0,0,0.02)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col min-h-[calc(100vh-3rem)]">
        {/* Top Header Controls */}
        <HeaderNav
          onJoinUsClick={() => setActiveModal('join')}
          onEcosystemClick={() => setActiveModal('ecosystem')}
          viewMode={viewMode}
          setViewMode={setViewMode}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        />

        {/* Main Content Layout Container */}
        <div id="workspace">
          <HeroBackgroundVideo isDarkMode={isDarkMode}>
            {viewMode === 'mobile-device' ? (
              /* Side-by-side mode: Workspace Grid + Standalone Mobile Device Frame */
              <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 my-auto py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 flex-1 w-full">
                  <LeftPanel
                    companies={companies}
                    selectedCompany={selectedCompany}
                    onSelectCompany={setSelectedCompany}
                    onSeeAllCompanies={() => setActiveModal('all-companies')}
                    onVisitPortfolio={() => setActiveModal('portfolio')}
                    onOpenPromptCategory={() => setActiveModal('prompts')}
                    isDarkMode={isDarkMode}
                  />
                  <HeroCenter
                    currentProject={heroProject}
                    onDownloadApp={() => setActiveModal('download-app')}
                    onSeeReviews={() => setActiveModal('reviews')}
                    onVisitWebsite={() => handleOpenProjectDetail(heroProject)}
                    isDarkMode={isDarkMode}
                  />
                  <RightPanel
                    featuredProject={featuredProject}
                    onInviteFriends={() => setActiveModal('invite')}
                    onListOfPrompts={() => setActiveModal('prompts')}
                    onEcosystemSupport={() => setActiveModal('ecosystem')}
                    onOpenProjectDetail={handleOpenProjectDetail}
                    isDarkMode={isDarkMode}
                  />
                </div>

                {/* Mobile Device Frame Container (Matching right side of the user prompt screenshot) */}
                <div className="hidden xl:block">
                  <MobileFrame
                    company={selectedCompany}
                    project={heroProject}
                    onJoinUsClick={() => setActiveModal('join')}
                    onSeeAllCompanies={() => setActiveModal('all-companies')}
                    onSeeReviews={() => setActiveModal('reviews')}
                    onDownloadApp={() => setActiveModal('download-app')}
                    onOpenProjectDetail={handleOpenProjectDetail}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>
            ) : (
              /* Standard 3-Column Responsive Workspace Layout */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto py-2 w-full">
                <LeftPanel
                  companies={companies}
                  selectedCompany={selectedCompany}
                  onSelectCompany={setSelectedCompany}
                  onSeeAllCompanies={() => setActiveModal('all-companies')}
                  onVisitPortfolio={() => setActiveModal('portfolio')}
                  onOpenPromptCategory={() => setActiveModal('prompts')}
                  isDarkMode={isDarkMode}
                />
                <HeroCenter
                  currentProject={heroProject}
                  onDownloadApp={() => setActiveModal('download-app')}
                  onSeeReviews={() => setActiveModal('reviews')}
                  onVisitWebsite={() => handleOpenProjectDetail(heroProject)}
                  isDarkMode={isDarkMode}
                />
                <RightPanel
                  featuredProject={featuredProject}
                  onInviteFriends={() => setActiveModal('invite')}
                  onListOfPrompts={() => setActiveModal('prompts')}
                  onEcosystemSupport={() => setActiveModal('ecosystem')}
                  onOpenProjectDetail={handleOpenProjectDetail}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </HeroBackgroundVideo>
        </div>

        {/* Interactive Application Sections */}
        <div className="mt-8 space-y-8">
          <div id="telemetry"><MachineryTelemetrySection isDarkMode={isDarkMode} /></div>
          <div id="workbench"><PromptWorkbenchSection promptTemplates={prompts} isDarkMode={isDarkMode} /></div>
          <div id="radar"><ResearchRadarSection isDarkMode={isDarkMode} /></div>
          <div id="benchmarks"><ModelBenchmarksSection isDarkMode={isDarkMode} /></div>
          <div id="sdk-hub"><SDKHubSection isDarkMode={isDarkMode} /></div>
          <div id="community"><CommunityFeedSection isDarkMode={isDarkMode} /></div>
        </div>

        {/* Global Footer */}
        <Footer isDarkMode={isDarkMode} onOpenModal={(modal) => setActiveModal(modal)} />
      </div>

      {/* Global Modals for Interactive Features */}
      <Modals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        companies={companies}
        projects={projects}
        prompts={prompts}
        reviews={reviews}
        selectedCompany={selectedCompany}
        selectedProject={selectedProjectForModal}
        onSelectCompany={setSelectedCompany}
        onAddReview={handleAddReview}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
