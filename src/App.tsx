import { useState, useEffect, useCallback } from 'react';
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
import { RecruiterHub } from './components/RecruiterHub';
import { CareersPage } from './components/CareersPage';
import { PartnersPage } from './components/PartnersPage';
import { IntroPage } from './components/IntroPage';
import type { Page } from './types';
import { readRoute, pathFor, type Route } from './lib/nav';

const DEFAULT_TITLE = 'Emma Louise King | Director of People & Performance';
const TITLES: Partial<Record<Page, string>> = {
  careers: 'Careers at Baytify | Emma Louise King',
  partners: 'Partner with Baytify | Emma Louise King',
};

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const [bioModalOpen, setBioModalOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = readRoute();
      setRoute(next);
      if (next.page === 'blogs') window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  useEffect(() => {
    if (route.page !== 'intro') document.title = TITLES[route.page] ?? DEFAULT_TITLE;
  }, [route.page]);

  // "Contact" buttons open the visitor's email app directly (no pop-up)
  const openContactEmail = () => {
    window.location.href = `mailto:emma@baytify.com?subject=${encodeURIComponent('Inquiry from Emma King website')}`;
  };

  const handleNavigate = useCallback((page: Page, sectionId?: string) => {
    // Path-based pages: careers, partners, intro
    if (page === 'careers' || page === 'partners' || page === 'intro') {
      const target = pathFor(page, sectionId);
      if (window.location.pathname !== target) window.history.pushState(null, '', target);
      setRoute(readRoute());
      window.scrollTo({ top: 0 });
      return;
    }

    // Home and blogs live at "/" and use the hash, as before
    if (window.location.pathname !== '/') window.history.pushState(null, '', '/');

    if (page === 'blogs') {
      setRoute({ page: 'blogs' });
      window.location.hash = 'blogs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute({ page: 'home' });
    if (sectionId) {
      window.location.hash = sectionId;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 80);
    } else {
      if (window.location.hash) window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const renderPage = () => {
    switch (route.page) {
      case 'blogs':
        return <BlogsPage onBackToHome={() => handleNavigate('home')} onOpenWorkModal={openContactEmail} />;
      case 'careers':
        return <CareersPage key={route.slug ?? 'all'} roleSlug={route.slug} />;
      case 'partners':
        return <PartnersPage onNavigate={handleNavigate} />;
      case 'intro':
        return <IntroPage slug={route.slug!} onNavigate={handleNavigate} />;
      default:
        return (
          <>
            <Hero onOpenWorkModal={() => handleNavigate('partners')} />
            <AboutStory />
            <RecruiterHub onNavigate={handleNavigate} />
            <CareerTimeline />
            <PillarsOfPractice onOpenWorkModal={() => handleNavigate('partners')} />
            <ImpactMetrics />
            <BaytifyInside onOpenWorkModal={() => handleNavigate('careers')} />
            <Endorsements />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E232A]">
      <Navbar
        currentPage={route.page}
        onNavigate={handleNavigate}
        onOpenWorkModal={openContactEmail}
        onOpenBioModal={() => setBioModalOpen(true)}
      />

      <main className="flex-1">{renderPage()}</main>

      <Footer
        onNavigate={handleNavigate}
        onOpenWorkModal={() => handleNavigate('partners')}
        onOpenBioModal={() => setBioModalOpen(true)}
      />

      <ExecutiveBioModal isOpen={bioModalOpen} onClose={() => setBioModalOpen(false)} />
    </div>
  );
}
