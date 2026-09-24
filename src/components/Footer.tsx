import { Linkedin, Instagram, Building2, MapPin, ArrowUp } from 'lucide-react';
import { LINKEDIN_PROFILE_URL, INSTAGRAM_PROFILE_URL, BAYTIFY_WEBSITE_URL, BAYTIFY_MAPS_URL } from '../data';

interface FooterProps {
  onOpenWorkModal: () => void;
  onOpenBioModal?: () => void;
  onNavigate?: (page: 'home' | 'blogs', sectionId?: string) => void;
}

export const Footer = ({ onOpenWorkModal, onNavigate }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (sectionId?: string, isBlog = false) => {
    if (isBlog) {
      if (onNavigate) onNavigate('blogs');
      else window.location.hash = 'blogs';
    } else {
      if (onNavigate) onNavigate('home', sectionId);
      else window.location.hash = sectionId || '';
    }
  };

  return (
    <footer className="bg-[#181C22] text-[#B0A79A] border-t border-[#2A313C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C333E] items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-6">
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2">
              Emma Louise King
            </h3>
            <p className="text-xs uppercase tracking-wider text-[#9C7A4A] font-semibold mb-4">
              Director of People & Performance · Baytify Real Estate
            </p>
            <p className="text-xs sm:text-sm text-[#8F8578] max-w-md leading-relaxed mb-6 font-normal">
              Twenty years in people. A decade in Dubai real estate. Managing teams from Dublin to Dubai, building recruitment desks to Head of Operations, and scaling high-performance brokerage culture from the inside.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#8F8578]">
              <a
                href={BAYTIFY_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
                title="Visit Baytify Real Estate official website (opens in new tab)"
              >
                <Building2 className="w-3.5 h-3.5 text-[#9C7A4A] group-hover:text-[#D4AF37] transition-colors" />
                <span className="underline-offset-4 group-hover:underline">Baytify Real Estate</span>
                <span className="text-[10px] text-[#9C7A4A] group-hover:text-white transition-colors">↗</span>
              </a>
              <span>·</span>
              <a
                href={BAYTIFY_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
                title="View Baytify office location on Google Maps (opens in new tab)"
              >
                <MapPin className="w-3.5 h-3.5 text-[#9C7A4A] group-hover:text-[#D4AF37] transition-colors" />
                <span className="underline-offset-4 group-hover:underline">Dubai, United Arab Emirates</span>
                <span className="text-[10px] text-[#9C7A4A] group-hover:text-white transition-colors">↗</span>
              </a>
            </div>
          </div>

          {/* Overview Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Overview
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => handleLink('story')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About me
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('timeline')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Milestones
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('pillars')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pillars & Practice
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('metrics')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Record
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink(undefined, true)} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left font-medium flex items-center gap-1.5"
                >
                  <span>Blogs</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-[#D4AF37]">New</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-1">
              Direct Inquiries
            </h4>
            <button
              onClick={onOpenWorkModal}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#9C7A4A] hover:bg-[#b08b56] rounded-md transition-colors cursor-pointer text-center"
            >
              Work With Me
            </button>
            <div className="flex items-center gap-2.5">
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
                title="LinkedIn"
                className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4 fill-white text-white" />
              </a>
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on Instagram"
                title="Instagram"
              className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F665A]">
          <p>
            © {new Date().getFullYear()} Emma Louise King. Director of People & Performance at Baytify Real Estate.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
