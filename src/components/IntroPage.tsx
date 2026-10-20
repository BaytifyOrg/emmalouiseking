import { useEffect, useState } from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';
import type { Audience, IntroLink, Page } from '../types';
import { fetchIntro } from '../lib/api';
import { AUDIENCE_TRACKS, CANDIDATE_PROMISE } from '../recruitData';
import { HERO_DATA, LINKEDIN_PROFILE_URL, ENDORSEMENTS } from '../data';
import { ASSETS } from '../assets';
import { EnquiryForm } from './recruit/EnquiryForm';
import { BookCall } from './recruit/BookCall';

interface IntroPageProps {
  slug: string;
  onNavigate: (page: Page, slug?: string) => void;
}

export const IntroPage = ({ slug, onNavigate }: IntroPageProps) => {
  const [intro, setIntro] = useState<IntroLink | null | undefined>(undefined);

  useEffect(() => {
    fetchIntro(slug).then(setIntro).catch(() => setIntro(null));
  }, [slug]);

  useEffect(() => {
    if (intro) document.title = `For ${intro.company} | Emma Louise King`;
  }, [intro]);

  if (intro === undefined) {
    return <div className="pt-40 pb-32 text-center text-sm text-[#7A7061]">Preparing your introduction…</div>;
  }

  if (intro === null) {
    return (
      <div className="pt-40 pb-32 max-w-xl mx-auto px-6 text-center">
        <h1 className="font-editorial text-3xl font-semibold mb-3">This introduction link has expired</h1>
        <p className="text-sm text-[#4E463C] mb-6">You can still find out how Emma works with partners and candidates.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => onNavigate('partners')} className="px-5 py-2.5 rounded-lg bg-[#1E232A] text-white text-sm font-semibold cursor-pointer">Partner with Baytify</button>
          <button onClick={() => onNavigate('careers')} className="px-5 py-2.5 rounded-lg border border-[#E3D9CC] text-sm font-semibold cursor-pointer">Careers</button>
        </div>
      </div>
    );
  }

  const isCandidate = intro.audience === 'candidate';
  const track = AUDIENCE_TRACKS.find((t) => t.id === intro.audience);
  const greeting = intro.contact_name ? `Hello ${intro.contact_name},` : 'Hello,';
  const headline =
    intro.headline ||
    (isCandidate
      ? `A personal note for you from Emma`
      : `An introduction to Baytify, prepared for ${intro.company}`);
  const points = isCandidate ? CANDIDATE_PROMISE : track?.offers ?? [];
  const endorsement = ENDORSEMENTS[2];

  return (
    <div className="pt-28 lg:pt-36">
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="inline-block text-xs font-semibold tracking-wide text-[#9C7A4A] bg-[#F3EDE4] border border-[#E8DCC8] rounded-full px-3 py-1 mb-6">
              Prepared for {intro.company}
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.12] mb-6">{headline}</h1>
            <div className="space-y-4 text-base text-[#4E463C] leading-relaxed max-w-2xl">
              <p>{greeting}</p>
              {intro.message ? (
                intro.message.split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>Thank you for taking a moment to look. Below is a short overview of who I am and how Baytify could help.</p>
              )}
              <p className="pt-2">
                Warm regards,
                <br />
                <span className="font-editorial text-2xl text-[#1E232A]">Emma Louise King</span>
                <br />
                <span className="text-sm text-[#7A7061]">{HERO_DATA.badge}</span>
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E3D9CC] shadow-xl bg-white">
              <img src={ASSETS.emmaPortrait} alt="Emma Louise King" className="w-full aspect-[4/5] object-cover object-top" />
              <div className="p-5 grid grid-cols-2 gap-4">
                {HERO_DATA.quickStats.slice(0, 4).map((s) => (
                  <div key={s.label}>
                    <p className="font-editorial text-2xl font-semibold">{s.value}</p>
                    <p className="text-[11px] text-[#7A7061] leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-[#F0EAE1] py-3 text-sm font-semibold text-[#0A66C2] hover:bg-[#F6F9FC]"
              >
                <Linkedin className="w-4 h-4" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EDE4] border-y border-[#E8E1D5] py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h2 className="font-editorial text-3xl font-semibold mb-8">
            {isCandidate ? 'What working with Emma looks like' : `How Baytify can support ${intro.company}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {points.map((p) => (
              <div key={p.title} className="rounded-xl bg-white border border-[#E8E1D5] p-5">
                <p className="text-sm font-semibold mb-1.5">{p.title}</p>
                <p className="text-sm text-[#5C5347] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <figure className="mt-10 max-w-3xl">
            <blockquote className="text-base italic text-[#4E463C] leading-relaxed">"{endorsement.quote}"</blockquote>
            <figcaption className="text-xs text-[#7A7061] mt-2">— {endorsement.author}, {endorsement.title}, {endorsement.organization}</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            {isCandidate ? (
              <>
                <h2 className="font-editorial text-3xl font-semibold mb-3">Next step</h2>
                <p className="text-sm text-[#4E463C] mb-6">Have a look at the roles that are open and introduce yourself — it goes straight to me.</p>
                <button
                  onClick={() => onNavigate('careers')}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#1E232A] hover:bg-[#9C7A4A] text-white text-sm font-semibold shadow-md transition cursor-pointer"
                >
                  View open roles <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <h2 className="font-editorial text-3xl font-semibold mb-2">Reply to Emma</h2>
                <p className="text-sm text-[#7A7061] mb-8">Your note goes straight to my inbox.</p>
                <EnquiryForm
                  audience={intro.audience as Audience}
                  introSlug={intro.slug}
                  defaultCompany={intro.company}
                  defaultName={intro.contact_name ?? undefined}
                />
              </>
            )}
          </div>
          <div className="lg:col-span-5">
            <BookCall context={intro.company} />
          </div>
        </div>
      </section>
    </div>
  );
};
