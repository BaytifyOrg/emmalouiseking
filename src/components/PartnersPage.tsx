import { useState } from 'react';
import { ArrowRight, Building2, Landmark, Handshake, Users } from 'lucide-react';
import type { Audience, Page } from '../types';
import { AUDIENCE_TRACKS } from '../recruitData';
import { STAT_METRICS, ENDORSEMENTS } from '../data';
import { EnquiryForm } from './recruit/EnquiryForm';
import { BookCall } from './recruit/BookCall';

const ICONS = { corporate: Landmark, developer: Building2, brokerage: Handshake } as const;

interface PartnersPageProps {
  onNavigate: (page: Page, slug?: string) => void;
}

const initialAudience = (): Audience => {
  const q = new URLSearchParams(window.location.search).get('for');
  return q && ['corporate', 'developer', 'brokerage', 'other'].includes(q) ? (q as Audience) : 'corporate';
};

export const PartnersPage = ({ onNavigate }: PartnersPageProps) => {
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const track = AUDIENCE_TRACKS.find((t) => t.id === audience) ?? AUDIENCE_TRACKS[0];
  const proof = STAT_METRICS.filter((s) => ['people-years', 'dubai-estate', 'growth-rate', 'retention-rate'].includes(s.id));

  const choose = (a: Audience) => {
    setAudience(a);
    const url = new URL(window.location.href);
    url.searchParams.set('for', a);
    window.history.replaceState(null, '', url);
  };

  return (
    <div className="pt-28 lg:pt-36">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-14">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#9C7A4A] mb-4">Partner with Baytify</p>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] mb-6 max-w-4xl">
          The people side of Dubai real estate, with one person accountable for it.
        </h1>
        <p className="text-base sm:text-lg text-[#4E463C] leading-relaxed max-w-2xl">
          Whether you're moving talent to Dubai, launching a project or building a team, I'm your direct line into Baytify Real Estate.
          Choose what fits and I'll take it from there.
        </p>

        {/* Audience switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {AUDIENCE_TRACKS.map((t) => {
            const Icon = ICONS[t.id];
            const active = audience === t.id;
            return (
              <button
                key={t.id}
                onClick={() => choose(t.id)}
                aria-pressed={active}
                className={`text-left rounded-2xl border p-5 transition cursor-pointer ${
                  active ? 'bg-[#1E232A] border-[#1E232A] text-white shadow-lg' : 'bg-white border-[#E8E1D5] hover:border-[#9C7A4A]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-3 ${active ? 'text-[#D4AF37]' : 'text-[#9C7A4A]'}`} />
                <p className="font-semibold text-sm">{t.label}</p>
                <p className={`text-xs mt-1 ${active ? 'text-[#C7BFB3]' : 'text-[#7A7061]'}`}>{t.eyebrow}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Track detail */}
      <section className="bg-[#F3EDE4] border-y border-[#E8E1D5] py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#9C7A4A] mb-3">{track.eyebrow}</p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold leading-tight mb-4">{track.title}</h2>
            <p className="text-sm sm:text-base text-[#4E463C] leading-relaxed">{track.intro}</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {track.offers.map((o) => (
              <div key={o.title} className="rounded-xl bg-white border border-[#E8E1D5] p-5">
                <p className="text-sm font-semibold text-[#1E232A] mb-1.5">{o.title}</p>
                <p className="text-sm text-[#5C5347] leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-[#E8E1D5]">
          {proof.map((s) => (
            <div key={s.id}>
              <p className="font-editorial text-4xl font-semibold text-[#1E232A]">{s.value}</p>
              <p className="text-xs font-semibold text-[#50483E] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
          {ENDORSEMENTS.slice(1, 3).map((e) => (
            <figure key={e.id} className="rounded-xl border border-[#E8E1D5] bg-white p-6">
              <blockquote className="text-sm text-[#4E463C] leading-relaxed italic">"{e.quote}"</blockquote>
              <figcaption className="text-xs text-[#7A7061] mt-3">
                — {e.author}, {e.title}{e.organization ? `, ${e.organization}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white border-t border-[#E8E1D5] py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold mb-2">Start the conversation</h2>
            <p className="text-sm text-[#7A7061] mb-8">Tell Emma a little about what you need.</p>
            <EnquiryForm audience={audience} onAudienceChange={choose} />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <BookCall />
            <button
              onClick={() => onNavigate('careers')}
              className="w-full flex items-center justify-between gap-3 rounded-2xl border border-[#E8E1D5] bg-[#FBF8F3] p-5 text-left hover:border-[#9C7A4A] transition cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#9C7A4A]" />
                <span>
                  <span className="block text-sm font-semibold">Looking for a role instead?</span>
                  <span className="block text-xs text-[#7A7061]">See open positions at Baytify</span>
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-[#9C7A4A]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
