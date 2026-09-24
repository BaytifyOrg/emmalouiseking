import { useState } from 'react';
import { Quote, BookOpen, Target, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { ABOUT_STORY } from '../data';
import { ASSETS } from '../assets';

export const AboutStory = () => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'principles'>('narrative');
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#F4EFEA] border-y border-[#E8DFC0]/40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E2D7C7]">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#9C7A4A] mb-2 block">
              Executive Background
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E232A]">
              My Story
            </h2>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="mt-4 md:mt-0 flex items-center bg-[#E8DFC0]/40 p-1 rounded-lg border border-[#DDD0B8]">
            <button
              id="tab-narrative-btn"
              onClick={() => setActiveTab('narrative')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'narrative'
                  ? 'bg-white text-[#1E232A] shadow-xs'
                  : 'text-[#6B6152] hover:text-[#1E232A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#9C7A4A]" />
              <span>The Narrative</span>
            </button>
            <button
              id="tab-principles-btn"
              onClick={() => setActiveTab('principles')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'principles'
                  ? 'bg-white text-[#1E232A] shadow-xs'
                  : 'text-[#6B6152] hover:text-[#1E232A]'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#9C7A4A]" />
              <span>Core Principles</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Story Content (Left Column) */}
          <div className="lg:col-span-7">
            {activeTab === 'narrative' ? (
              <div className="space-y-6 text-[#38322B] text-base sm:text-lg leading-relaxed font-normal">
                {/* First two paragraphs visible by default */}
                {ABOUT_STORY.paragraphs.slice(0, 2).map((para, idx) => (
                  <p key={idx} className={idx === 0 ? "text-lg sm:text-xl font-medium text-[#1E232A] leading-relaxed" : ""}>
                    {para}
                  </p>
                ))}

                {/* Last two paragraphs revealed upon clicking Read More */}
                {isExpanded && (
                  <div className="space-y-6 pt-1">
                    {ABOUT_STORY.paragraphs.slice(2).map((para, idx) => (
                      <p key={idx + 2} className="text-[#38322B] text-base sm:text-lg leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Read More / Read Less Toggle */}
                <div className="pt-2">
                  <button
                    id="story-read-more-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAF8F5] text-[#1E232A] text-xs font-semibold border border-[#DCD1BF] hover:border-[#9C7A4A] shadow-xs hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <span>{isExpanded ? "Read Less" : "Read More"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-[#9C7A4A] transition-transform" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[#9C7A4A] transition-transform group-hover:translate-y-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-base text-[#52493E] mb-6">
                  Two decades of high-stakes people leadership spanning Dublin retail floors and Dubai's premier real estate firms distill into three non-negotiable operational principles:
                </p>
                <div className="grid grid-cols-1 gap-5">
                  {ABOUT_STORY.coreValues.map((val, idx) => (
                    <div
                      key={idx}
                      className="bg-white/80 backdrop-blur-xs border border-[#E3D8C8] rounded-xl p-6 transition-all hover:border-[#9C7A4A] shadow-xs"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#FAF6F0] border border-[#E8DEC9] flex items-center justify-center shrink-0 text-[#9C7A4A]">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-editorial text-xl font-semibold text-[#1E232A] mb-1.5">
                            {val.title}
                          </h3>
                          <p className="text-sm text-[#5C5245] leading-relaxed">
                            {val.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Editorial Quote & Image Showcase */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Card with Dubai Skyline & Baytify Context */}
            <div className="relative rounded-xl overflow-hidden border border-[#E0D5C3] shadow-md group">
              
              <img
                src={ASSETS.storyImage}
                alt="Dubai Real Estate Architecture"
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#14171C]/90 via-[#14171C]/30 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-[11px] uppercase tracking-wider text-[#D8C7B0] font-semibold">
                  The Dubai Market Landscape
                </span>
                <p className="text-sm font-medium text-white/95 mt-1">
                  10+ Years Building High-Performance Advisory Desks in the GCC
                </p>
              </div>
            </div>

            {/* Editorial Quote Box */}
            <div className="bg-[#FAF8F5] border border-[#E3D9CC] rounded-xl p-7 shadow-xs relative">
              <Quote className="w-8 h-8 text-[#9C7A4A]/30 absolute top-5 right-5" />
              <p className="font-editorial text-lg sm:text-xl italic text-[#2D271F] leading-relaxed mb-4">
                "{ABOUT_STORY.quote}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#ECE3D5]">
                <div className="w-8 h-8 rounded-full bg-[#EAE2D5] flex items-center justify-center font-bold text-xs text-[#52493E]">
                  EK
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1E232A]">
                    Emma Louise King
                  </h4>
                  <span className="text-[11px] text-[#786D5E]">
                    Director of People & Performance
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
