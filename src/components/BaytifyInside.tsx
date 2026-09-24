import { Building2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSETS } from '../assets';

interface BaytifyInsideProps {
  onOpenWorkModal: () => void;
}

export const BaytifyInside = ({ onOpenWorkModal }: BaytifyInsideProps) => {
  return (
    <section id="baytify" className="py-20 lg:py-28 bg-[#1E232A] text-white relative overflow-hidden">
      {/* Subtle architectural overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8DFC0_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Context & Vision */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#EADAC5] mb-6">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Current Chapter</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-6">
              Building From The Inside For Baytify's Own Team
            </h2>

            <p className="text-base sm:text-lg text-[#C7BFB3] leading-relaxed mb-6 font-normal">
              "I spent years helping the market hire. Now, I bring every ounce of that operational experience inside to shape Baytify Real Estate into the premier home for top-tier Dubai property advisors."
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  title: "Elite Real Estate Talent Acquisition",
                  desc: "Attracting high-integrity sales consultants, off-plan specialists, and luxury leasing directors."
                },
                {
                  title: "Proprietary Enablement Matrix",
                  desc: "Custom training, deal execution clinics, and mentorship tailored to Dubai's rapid transaction pace."
                },
                {
                  title: "Sustainable Performance Culture",
                  desc: "An ecosystem where accountability and psychological safety coexist to eliminate broker burnout."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#B0A79A] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenWorkModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#9C7A4A] hover:bg-[#b08b56] text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Connect with Baytify Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#timeline"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md bg-transparent hover:bg-white/10 text-[#DDD4C7] text-xs sm:text-sm font-medium transition-colors border border-white/20"
              >
                <span>View Full Career Timeline</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#282E37]">

              <img
                src={ASSETS.baytifyImage}
                alt="Baytify Real Estate Dubai"
                className="w-full h-80 sm:h-96 object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] via-[#14171C]/50 to-transparent p-7 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold tracking-wider uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Baytify Real Estate</span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-white mb-2">
                  Dubai's Modern Property Ecosystem
                </h3>
                <p className="text-xs text-[#C2B8AC] leading-relaxed">
                  Headquartered in Dubai, Baytify combines technological agility with exceptional human advisory to deliver premier residential and investment results.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
