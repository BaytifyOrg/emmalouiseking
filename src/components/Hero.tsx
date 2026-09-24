import { ArrowRight, Linkedin } from 'lucide-react';
import { HERO_DATA, LINKEDIN_PROFILE_URL } from '../data';
import { ASSETS } from '../assets';

interface HeroProps {
  onOpenWorkModal: () => void;
}

export const Hero = ({ onOpenWorkModal }: HeroProps) => {
  const handleLinkedIn = () => {
    window.open(LINKEDIN_PROFILE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Subtle architectural backdrop texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#1E232A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typography and Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Main Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1E232A] leading-[1.14] mb-6">
              {HERO_DATA.headline}
            </h1>

            {/* Subheadline verbatim from user prompt */}
            <p className="text-base sm:text-lg text-[#4E463C] leading-relaxed mb-8 max-w-2xl font-normal">
              {HERO_DATA.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              {/* Connect on LinkedIn */}
              <button
                id="hero-linkedin-btn"
                onClick={handleLinkedIn}
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-b from-[#0A66C2] to-[#08529C] hover:from-[#0957A8] hover:to-[#06427D] text-white text-sm font-semibold tracking-wide shadow-md shadow-[#0A66C2]/20 hover:shadow-xl hover:shadow-[#0A66C2]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer border border-[#1374D9]/40 overflow-hidden"
              >
                <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shadow-inner group-hover:bg-white/25 transition-colors shrink-0">
                  <Linkedin className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <span>Connect on LinkedIn</span>
                <span className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all text-xs font-mono">↗</span>
              </button>

              {/* Work With Me */}
              <button
                id="hero-work-btn"
                onClick={onOpenWorkModal}
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#1E232A] hover:bg-[#9C7A4A] text-white text-sm font-semibold tracking-wide border border-[#353D49] hover:border-[#9C7A4A] shadow-md shadow-[#1E232A]/15 hover:shadow-xl hover:shadow-[#9C7A4A]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <span>Work With Me</span>
                <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all group-hover:translate-x-0.5 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[#E8E1D5]">
              {HERO_DATA.quickStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E232A]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#7A7061] mt-0.5 font-medium leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Emma's Photo */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Subtle background offset frame */}
              <div className="absolute -inset-2.5 bg-[#EAE2D5] rounded-2xl -rotate-1 shadow-xs -z-10" />

              {/* Main portrait image card */}
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#E3D9CC] bg-[#FAF8F5]">
                <img
                  src={ASSETS.emmaPortrait}
                  alt="Emma Louise King - Director of People & Performance"
                  className="w-full aspect-[3/4] object-cover object-top"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle bottom gradient caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14171C]/90 via-[#14171C]/40 to-transparent p-5 text-white">
                  <h3 className="font-editorial text-xl font-semibold text-white tracking-wide">
                    Emma Louise King
                  </h3>
                  <p className="text-xs text-[#DCD4C7] font-normal mt-0.5">
                    Director of People & Performance
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
