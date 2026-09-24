import { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenWorkModal: () => void;
  onOpenBioModal: () => void;
  currentPage?: 'home' | 'blogs';
  onNavigate?: (page: 'home' | 'blogs', sectionId?: string) => void;
}

export const Navbar = ({ 
  onOpenWorkModal, 
  onOpenBioModal,
  currentPage = 'home',
  onNavigate 
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'My Story', sectionId: 'story' },
    { name: 'Career Timeline', sectionId: 'timeline' },
    { name: 'Pillars & Practice', sectionId: 'pillars' },
    { name: 'Track Record', sectionId: 'metrics' },
    { name: 'Blogs', isBlogPage: true },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.isBlogPage) {
      if (onNavigate) {
        onNavigate('blogs');
      } else {
        window.location.hash = 'blogs';
      }
    } else {
      if (onNavigate) {
        onNavigate('home', link.sectionId);
      } else {
        window.location.hash = link.sectionId || '';
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentPage === 'blogs'
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E1D5] shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button 
          onClick={() => {
            if (onNavigate) onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex flex-col text-left cursor-pointer"
        >
          <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#1E232A] group-hover:text-[#9C7A4A] transition-colors">
            Emma Louise King
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = link.isBlogPage && currentPage === 'blogs';
            return (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#9C7A4A] font-semibold after:w-full'
                    : 'text-[#50483E] hover:text-[#1E232A]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#9C7A4A] ${
                  isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                } after:transition-all after:duration-200`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            id="nav-work-btn"
            onClick={onOpenWorkModal}
            className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-[#1E232A] hover:bg-[#9C7A4A] rounded-md transition-all shadow-xs cursor-pointer"
          >
            <span>Contact me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E232A] hover:text-[#9C7A4A] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E1D5] px-6 py-5 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className={`text-base font-medium text-left transition-colors py-1 cursor-pointer ${
                  link.isBlogPage && currentPage === 'blogs'
                    ? 'text-[#9C7A4A] font-semibold'
                    : 'text-[#3A332B] hover:text-[#9C7A4A]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-[#E8E1D5] flex flex-col gap-2.5">
              <button
                id="mobile-bio-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBioModal();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#50483E] bg-[#F0EAE1] rounded-md"
              >
                <FileText className="w-4 h-4 text-[#9C7A4A]" />
                <span>View Executive Bio</span>
              </button>
              <button
                id="mobile-work-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWorkModal();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white bg-[#1E232A] hover:bg-[#9C7A4A] rounded-md"
              >
                <span>Contact me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
