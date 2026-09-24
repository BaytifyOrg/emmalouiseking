import { useState } from 'react';
import { Briefcase, MapPin, Award, Lightbulb, ChevronRight, Check } from 'lucide-react';
import { CAREER_MILESTONES } from '../data';

export const CareerTimeline = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0); // Defaults to Present (Baytify)
  const current = CAREER_MILESTONES[selectedIdx];

  return (
    <section id="timeline" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#9C7A4A] mb-2 block">
            Progressive Leadership
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E232A] mb-4">
            Career Milestones & Evolution
          </h2>
          <p className="text-[#554C40] text-base sm:text-lg leading-relaxed">
            From directing internal people architecture at Baytify Real Estate back through heading operations with 40% YoY growth to frontline store leadership.
          </p>
        </div>

        {/* Milestone Navigation Bar (Interactive Horizontal Stepper) */}
        <div className="mb-10 overflow-x-auto pb-4 pt-2">
          <div className="flex items-center min-w-[620px] justify-between relative">
            
            {/* Background connecting line */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#E2D8C9] -translate-y-1/2 -z-0" />
            
            {CAREER_MILESTONES.map((milestone, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={milestone.year}
                  onClick={() => setSelectedIdx(idx)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#1E232A] text-white ring-4 ring-[#E8DEC9] scale-110 shadow-md'
                        : 'bg-white text-[#786D5E] border-2 border-[#D8CCB8] group-hover:border-[#9C7A4A] group-hover:text-[#1E232A]'
                    }`}
                  >
                    {milestone.year === 'Present' ? 'NOW' : milestone.year}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium whitespace-nowrap transition-colors ${
                      isSelected ? 'text-[#1E232A] font-semibold' : 'text-[#7D7364] group-hover:text-[#1E232A]'
                    }`}
                  >
                    {milestone.organization}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Detailed Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Card (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E3D9CC] rounded-xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              {/* Meta tags */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#EDE4D6] mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#F5EFE6] border border-[#E0D4C3] text-[#9C7A4A] rounded-md text-xs font-bold tracking-wider">
                    {current.period}
                  </span>
                  <span className="text-xs font-medium text-[#7A7061] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9C7A4A]" />
                    {current.location}
                  </span>
                </div>
                <div className="text-xs font-medium text-[#5C5346] bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E8DFC0]">
                  {current.roleType}
                </div>
              </div>

              {/* Title and Org */}
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1E232A] mb-1">
                {current.title}
              </h3>
              <p className="text-sm font-medium text-[#9C7A4A] mb-4">
                {current.organization}
              </p>

              {/* Description */}
              <p className="text-base text-[#4A4237] leading-relaxed mb-6 font-normal">
                {current.description}
              </p>

              {/* Quantified Achievements */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#736859] mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#9C7A4A]" />
                  <span>Key Impact & Milestones</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.achievements.map((ach, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E372E] bg-[#FAF8F5] p-3 rounded-lg border border-[#EFE8DC]"
                    >
                      <Check className="w-4 h-4 text-[#9C7A4A] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Badges */}
            <div className="pt-6 border-t border-[#EDE4D6] flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#7A7061] font-medium mr-1">Specializations:</span>
              {current.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#F2EDE4] text-[#4A4237] font-medium border border-[#E2D8C9]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Key Takeaway & Quick Selector Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Takeaway Card */}
            <div className="bg-[#1E232A] text-white rounded-xl p-7 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#E5D7C5] mb-4">
                  <Lightbulb className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h4 className="text-xs uppercase tracking-wider text-[#C0B4A0] font-semibold mb-2">
                  Operational Insight
                </h4>
                <p className="font-editorial text-lg text-[#F2ECE4] italic leading-relaxed">
                  "{current.keyTakeaway}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#A89F93]">
                Core Competency Phase: <span className="text-white font-medium">{current.roleType}</span>
              </div>
            </div>

            {/* Quick Milestone List */}
            <div className="bg-white border border-[#E3D9CC] rounded-xl p-5 shadow-xs flex-1 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7A7061] mb-3 block">
                All Timeline Stages
              </span>
              <div className="space-y-1.5">
                {CAREER_MILESTONES.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      selectedIdx === idx
                        ? 'bg-[#F2EDE4] font-semibold text-[#1E232A]'
                        : 'text-[#61574A] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono font-medium text-[#9C7A4A] w-14 shrink-0">{m.year}</span>
                      <span className="truncate">{m.title}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${selectedIdx === idx ? 'text-[#9C7A4A]' : 'text-[#B8AB99]'}`} />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
