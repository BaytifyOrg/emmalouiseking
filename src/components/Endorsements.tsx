import { Quote } from 'lucide-react';
import { ENDORSEMENTS } from '../data';

export const Endorsements = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F4EFEA] border-b border-[#E2D8C9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#9C7A4A] mb-2 block">
            Industry Recognition
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E232A] mb-4">
            Colleague & Partner Endorsements
          </h2>
          <p className="text-[#554C40] text-base leading-relaxed">
            Real stories from leaders, candidates, and team members who scaled with Emma Louise King.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENDORSEMENTS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E3D9CC] rounded-xl p-7 shadow-xs flex flex-col justify-between hover:border-[#9C7A4A] transition-all"
            >
              <div>
                <Quote className="w-7 h-7 text-[#9C7A4A]/30 mb-4" />
                <p className="font-editorial text-base sm:text-lg text-[#2A241C] italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0E8DC] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5EFE6] border border-[#E0D4C3] flex items-center justify-center font-bold text-xs text-[#9C7A4A] shrink-0">
                  {item.avatarInitials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E232A]">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-[#7A6E5D] font-medium">
                    {item.title}{item.organization ? ` · ${item.organization}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
