import { useState } from 'react';
import { X, Copy, Check, Printer, Building2, MapPin, Award } from 'lucide-react';
import { HERO_DATA, ABOUT_STORY, STAT_METRICS } from '../data';

interface ExecutiveBioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveBioModal = ({ isOpen, onClose }: ExecutiveBioModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const executiveBioText = `EMMA LOUISE KING
Director of People & Performance | Baytify Real Estate (Dubai, UAE)

HEADLINE:
Twenty years in people. A decade in Dubai real estate.

EXECUTIVE SUMMARY:
Emma Louise King is Director of People & Performance at Baytify Real Estate. Over a 20-year career spanning Dublin to Dubai, Emma has led retail store management on the shop floor (2004), managed retail operations across six UAE stores for Al Tayer Group (2006), and spent a decade at the forefront of Dubai's real estate talent ecosystem. 

Starting as a Senior Consultant, she rose to Head of Operations, building high-performing recruitment desks and helping grow placements 40% year-on-year. Today, she architects that exact talent and performance framework from the inside for Baytify Real Estate's team.

CORE METRICS:
• 20+ Years in People Leadership
• 10+ Years in Dubai Real Estate
• 40% YoY Placement Growth Driven
• 6 Flagship Stores Managed (Al Tayer Group)
• 92% 1-Year Broker Retention Rate
• 500+ Real Estate Professionals Mentored & Recruited`;

  const handleCopy = () => {
    navigator.clipboard.writeText(executiveBioText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white border border-[#E3D9CC] rounded-2xl shadow-2xl p-6 sm:p-10 my-8 text-[#1E232A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EDE4D6] mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9C7A4A]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6E5D]">
              Executive Bio One-Pager
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-[#50483E] hover:text-[#1E232A] bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#E2D8C8] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Bio'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-[#50483E] hover:text-[#1E232A] bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#E2D8C8] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[#7A6F60] hover:text-[#1E232A] hover:bg-[#F2ECE3] transition-colors cursor-pointer"
              aria-label="Close bio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Bio Content */}
        <div className="space-y-6">
          
          {/* Header info */}
          <div>
            <h2 className="font-editorial text-3xl font-bold text-[#1E232A]">
              Emma Louise King
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B5F4F] mt-1 font-medium">
              <span className="flex items-center gap-1 text-[#9C7A4A] font-semibold">
                <Building2 className="w-3.5 h-3.5" />
                Director of People & Performance · Baytify Real Estate
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Dubai, UAE (formerly Dublin, Ireland)
              </span>
            </div>
          </div>

          {/* Headline quote */}
          <div className="p-4 bg-[#FAF8F5] border-l-3 border-[#9C7A4A] rounded-r-lg">
            <h3 className="font-editorial text-xl font-semibold text-[#1E232A]">
              "{HERO_DATA.headline}"
            </h3>
          </div>

          {/* Core narrative bio */}
          <div className="text-xs sm:text-sm text-[#453D32] leading-relaxed space-y-3">
            <p>
              {HERO_DATA.subheadline}
            </p>
            <p>
              {ABOUT_STORY.paragraphs[0]}
            </p>
            <p>
              {ABOUT_STORY.paragraphs[2]}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="pt-4 border-t border-[#EDE4D6]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6E5D] block mb-3">
              Performance Track Record
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              {STAT_METRICS.slice(0, 4).map((m) => (
                <div key={m.id} className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E8DFC9]">
                  <span className="font-editorial text-xl font-bold text-[#1E232A] block">
                    {m.value}
                  </span>
                  <span className="text-[10px] text-[#7A6E5D] leading-tight block">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
