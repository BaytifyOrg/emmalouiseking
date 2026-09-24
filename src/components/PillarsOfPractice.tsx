import { useState } from 'react';
import { PERFORMANCE_PILLARS } from '../data';
import { 
  Users, 
  TrendingUp, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  X,
  Sparkles
} from 'lucide-react';

interface PillarsProps {
  onOpenWorkModal: () => void;
}

export const PillarsOfPractice = ({ onOpenWorkModal }: PillarsProps) => {
  const [selectedId, setSelectedId] = useState<string>(PERFORMANCE_PILLARS[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);

  const getIcon = (id: string, className = "w-5 h-5") => {
    switch (id) {
      case 'acquisition':
        return <Users className={`${className} text-[#9C7A4A]`} />;
      case 'enablement':
        return <TrendingUp className={`${className} text-[#9C7A4A]`} />;
      case 'culture':
        return <HeartHandshake className={`${className} text-[#9C7A4A]`} />;
      default:
        return <ShieldCheck className={`${className} text-[#9C7A4A]`} />;
    }
  };

  const activeIndex = PERFORMANCE_PILLARS.findIndex((p) => p.id === selectedId);
  const activePillar = PERFORMANCE_PILLARS[activeIndex >= 0 ? activeIndex : 0];

  const handlePillarClick = (pillarId: string) => {
    if (selectedId === pillarId && isDropdownOpen) {
      // Toggle off if already open
      setIsDropdownOpen(false);
    } else {
      setSelectedId(pillarId);
      setIsDropdownOpen(true);
    }
  };

  return (
    <section id="pillars" className="py-20 lg:py-28 bg-[#F4EFEA] border-y border-[#E5DAC8] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] border border-[#DCD1BF] text-xs font-semibold text-[#8C6D3F] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Methodologies & Architecture</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E232A] mb-4">
              Pillars of People & Performance
            </h2>
            <p className="text-[#554C40] text-base leading-relaxed">
              Twenty years of people operations and a decade inside Dubai's real estate brokerage ecosystem distilled into four actionable pillars. Select any pillar to drop down the detailed framework.
            </p>
          </div>

          <button
            id="pillars-consult-cta"
            onClick={onOpenWorkModal}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1E232A] hover:bg-[#9C7A4A] text-white text-xs font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
          >
            <span>Consult on Brokerage Strategy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Pillars Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {PERFORMANCE_PILLARS.map((pillar, idx) => {
            const isSelected = pillar.id === selectedId;
            const isOpenAndSelected = isSelected && isDropdownOpen;

            return (
              <div
                key={pillar.id}
                id={`pillar-card-${pillar.id}`}
                onClick={() => handlePillarClick(pillar.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpenAndSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePillarClick(pillar.id);
                  }
                }}
                className={`relative p-5 sm:p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group text-left ${
                  isOpenAndSelected
                    ? 'bg-white border-[#9C7A4A] shadow-lg ring-2 ring-[#9C7A4A]/25 -translate-y-1'
                    : isSelected
                    ? 'bg-white border-[#C9B79D] shadow-sm'
                    : 'bg-[#FAF8F5]/80 hover:bg-white border-[#E2D8C9] hover:border-[#BFAF98] hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Top indicator row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors ${
                      isOpenAndSelected 
                        ? 'bg-[#F5EDE1] border-[#D9C4A6]' 
                        : 'bg-white border-[#E8DFC9] group-hover:bg-[#FAF6F0]'
                    }`}>
                      {getIcon(pillar.id, "w-5 h-5")}
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#EDE5D8]/70 text-[#7A6B58]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[#1E232A] mb-1.5 leading-snug group-hover:text-[#9C7A4A] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#706454] leading-relaxed line-clamp-2">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#EDE5D8] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-semibold text-[#8C7E6C] tracking-wider">
                      Impact
                    </span>
                    <span className="font-editorial text-base font-bold text-[#1E232A]">
                      {pillar.impactMetric}
                    </span>
                  </div>

                  <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
                    isOpenAndSelected
                      ? 'bg-[#1E232A] text-white'
                      : 'bg-[#EDE5D8]/80 text-[#5E5242] group-hover:bg-[#E0D4C0]'
                  }`}>
                    <span className="text-[11px]">Learn more</span>
                    {isOpenAndSelected ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    )}
                  </div>
                </div>

                {/* Dropdown Pointer Caret on Desktop */}
                {isOpenAndSelected && (
                  <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#9C7A4A] z-10" />
                )}
              </div>
            );
          })}
        </div>

        {/* Dropdown Box: Pops up directly under the pillar cards */}
        {isDropdownOpen && (
          <div 
            id="pillar-dropdown-box"
            className="mt-3 bg-white border border-[#DCD1BF] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl transition-all animate-fade-in relative overflow-hidden"
          >
            {/* Top Bar inside Dropdown Box */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EFE8DD]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E3D4BE] flex items-center justify-center shrink-0">
                  {getIcon(activePillar.id, "w-5 h-5")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C7A4A]">
                      Pillar 0{activeIndex + 1} of 04
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#D1C3AF]" />
                    <span className="text-xs text-[#706454] font-medium">{activePillar.metricLabel}</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#1E232A]">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              {/* Close button */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  title="Close dropdown box"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#554C40] hover:text-[#1E232A] text-xs font-semibold border border-[#E2D8C9] transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-[#8A7C6B]" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Deep Dive Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Narrative & Action Points */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h4 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1E232A] mb-3 leading-snug">
                    {activePillar.subtitle}
                  </h4>
                  <p className="text-base text-[#4D4539] leading-relaxed font-normal">
                    {activePillar.description}
                  </p>
                </div>

                {/* Structured Action Points with Checkmarks */}
                <div>
                  <h5 className="text-xs font-semibold text-[#8C7A64] uppercase tracking-wider mb-3">
                    Execution Framework & Measurable Deliverables
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.actionPoints.map((pt, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F7F3EC] border border-[#EBE2D5] text-xs sm:text-sm text-[#383127] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#9C7A4A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Metric Showcase */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="bg-[#FAF8F5] border border-[#E2D7C7] rounded-xl p-6 sm:p-7 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#9C7A4A]/5 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none" />
                  
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7A64] font-semibold block mb-1">
                    {activePillar.metricLabel}
                  </span>
                  <div className="font-editorial text-5xl sm:text-6xl font-bold text-[#1E232A] my-3">
                    {activePillar.impactMetric}
                  </div>
                  <p className="text-xs text-[#5F5445] leading-relaxed max-w-xs mx-auto">
                    Validated through long-term broker tracking and talent management across competitive Dubai brokerages.
                  </p>
                </div>

                {/* Action CTA inside dropdown */}
                <button
                  onClick={onOpenWorkModal}
                  className="w-full py-3 px-4 rounded-xl bg-[#1E232A] hover:bg-[#9C7A4A] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>Discover more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

