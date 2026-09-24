import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutStory } from './components/AboutStory';
import { CareerTimeline } from './components/CareerTimeline';
import { PillarsOfPractice } from './components/PillarsOfPractice';
import { ImpactMetrics } from './components/ImpactMetrics';
import { BaytifyInside } from './components/BaytifyInside';
import { Endorsements } from './components/Endorsements';
import { Footer } from './components/Footer';
import { ExecutiveBioModal } from './components/ExecutiveBioModal';
import { BlogsPage } from './components/BlogsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'blogs'>(() => {
    return window.location.hash.startsWith('#blog') ? 'blogs' : 'home';
  });
  const [bioModalOpen, setBioModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog')) {
        setCurrentPage('blogs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // "Work With Me" / "Contact" buttons open the visitor's email app directly (no pop-up)
  const openContactEmail = () => {
    window.location.href = `mailto:emma@baytify.com?subject=${encodeURIComponent('Inquiry from Emma King website')}`;
  };

  const handleNavigate = (page: 'home' | 'blogs', sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'blogs') {
      window.location.hash = 'blogs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId) {
        window.location.hash = sectionId;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E232A]">
      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenWorkModal={openContactEmail}
        onOpenBioModal={() => setBioModalOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {currentPage === 'blogs' ? (
          <BlogsPage
            onBackToHome={() => handleNavigate('home')}
            onOpenWorkModal={openContactEmail}
          />
        ) : (
          <>
            <Hero onOpenWorkModal={openContactEmail} />
            <AboutStory />
            <CareerTimeline />
            <PillarsOfPractice onOpenWorkModal={openContactEmail} />
            <ImpactMetrics />
            <BaytifyInside onOpenWorkModal={openContactEmail} />
            <Endorsements />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWorkModal={openContactEmail}
        onOpenBioModal={() => setBioModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ExecutiveBioModal
        isOpen={bioModalOpen}
        onClose={() => setBioModalOpen(false)}
      />
    </div>
  );
}
