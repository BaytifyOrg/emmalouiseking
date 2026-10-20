import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Briefcase, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { Role } from '../types';
import { fetchRoles } from '../lib/api';
import { CANDIDATE_PROMISE } from '../recruitData';
import { ENDORSEMENTS } from '../data';
import { ASSETS } from '../assets';
import { ApplyForm } from './recruit/ApplyForm';

interface CareersPageProps {
  roleSlug?: string;
}

export const CareersPage = ({ roleSlug }: CareersPageProps) => {
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [open, setOpen] = useState<string | undefined>(roleSlug);
  const [applyFor, setApplyFor] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRoles()
      .then((r) => {
        setRoles(r);
        const match = r.find((x) => x.slug === roleSlug);
        if (match) setApplyFor(match.title);
      })
      .catch(() => {
        setRoles([]);
        setLoadError(true);
      });
  }, [roleSlug]);

  const apply = (role: Role) => {
    setApplyFor(role.title);
    window.history.replaceState(null, '', `/careers/${role.slug}`);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const quote = ENDORSEMENTS[0];

  return (
    <div className="pt-28 lg:pt-36">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#9C7A4A] mb-4">Careers at Baytify Real Estate</p>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] mb-6">
              Do the best work of your career, with someone in your corner.
            </h1>
            <p className="text-base sm:text-lg text-[#4E463C] leading-relaxed max-w-2xl mb-8">
              I spent a decade helping Dubai's brokerages hire. Now I build Baytify's own team — and I'd rather have one honest
              conversation with you than read a hundred CVs. Look at what's open, or simply introduce yourself.
            </p>
            <button
              onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#1E232A] hover:bg-[#9C7A4A] text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              See open roles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#E3D9CC] shadow-xl">
              <img src={ASSETS.coverBrokerageOffice} alt="Baytify office in Dubai" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14171C]/90 to-transparent p-5">
                <p className="text-sm text-white/90 italic leading-snug">"{quote.quote.split('. ').slice(1, 2).join('')}."</p>
                <p className="text-xs text-[#DCD4C7] mt-1.5">— {quote.author}, {quote.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-[#F3EDE4] border-y border-[#E8E1D5] py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CANDIDATE_PROMISE.map((p) => (
            <div key={p.title}>
              <CheckCircle2 className="w-5 h-5 text-[#9C7A4A] mb-3" />
              <p className="text-sm font-semibold text-[#1E232A] mb-1">{p.title}</p>
              <p className="text-sm text-[#5C5347] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="open-roles" className="max-w-4xl mx-auto px-6 sm:px-8 py-16 lg:py-20 scroll-mt-24">
        <h2 className="font-editorial text-3xl sm:text-4xl font-semibold mb-2">Open roles</h2>
        <p className="text-sm text-[#7A7061] mb-8">Dubai-based unless stated. Confidential conversations welcome.</p>

        {roles === null && <p className="text-sm text-[#7A7061]">Loading roles…</p>}
        {loadError && (
          <p className="text-sm text-[#7A7061]">
            Roles couldn't load just now — you can still introduce yourself with the form below.
          </p>
        )}

        <div className="space-y-3">
          {roles?.map((role) => {
            const isOpen = open === role.slug;
            return (
              <article key={role.slug} className="rounded-xl border border-[#E8E1D5] bg-white overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? undefined : role.slug)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-[#FBF8F3] transition"
                >
                  <div className="min-w-0">
                    <h3 className="font-editorial text-xl font-semibold text-[#1E232A]">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-[#7A7061]">
                      {role.team && <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{role.team}</span>}
                      {role.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{role.location}</span>}
                      {role.employment_type && <span>{role.employment_type}</span>}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#9C7A4A] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-[#F0EAE1] pt-4">
                    {role.summary && <p className="text-sm text-[#4E463C] leading-relaxed mb-4">{role.summary}</p>}
                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      {!!role.highlights?.length && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7A4A] mb-2">What you get</h4>
                          <ul className="space-y-1.5 text-sm text-[#4E463C]">
                            {role.highlights.map((h) => <li key={h}>· {h}</li>)}
                          </ul>
                        </div>
                      )}
                      {!!role.requirements?.length && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9C7A4A] mb-2">What you bring</h4>
                          <ul className="space-y-1.5 text-sm text-[#4E463C]">
                            {role.requirements.map((h) => <li key={h}>· {h}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => apply(role)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#9C7A4A] hover:bg-[#b08b56] text-white text-sm font-semibold transition cursor-pointer"
                    >
                      Apply for this role <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Apply */}
      <section ref={formRef} id="apply" className="bg-white border-t border-[#E8E1D5] py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold mb-2">Introduce yourself</h2>
          <p className="text-sm text-[#7A7061] mb-8">Takes about two minutes. Your application goes straight to Emma.</p>
          {roles && (
            <ApplyForm
              key={applyFor ?? 'none'}
              roles={roles.length ? roles : [{ slug: 'general-application', title: 'Join the Talent Pool' } as Role]}
              defaultRole={applyFor}
            />
          )}
        </div>
      </section>
    </div>
  );
};
