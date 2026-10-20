import { ArrowRight, Landmark, Building2, Handshake, UserRoundSearch } from 'lucide-react';
import type { Page } from '../types';

interface RecruiterHubProps {
  onNavigate: (page: Page, slug?: string) => void;
}

const DOORS = [
  { icon: UserRoundSearch, label: 'Brokers & candidates', desc: 'See open roles at Baytify and introduce yourself in confidence.', cta: 'View careers', go: { page: 'careers' as Page } },
  { icon: Landmark, label: 'Corporate HR & mobility', desc: 'One trusted contact for relocating staff and leadership to Dubai.', cta: 'For HR teams', go: { page: 'partners' as Page, q: 'corporate' } },
  { icon: Building2, label: 'Developers', desc: 'Trained, accountable sales teams for your projects and launches.', cta: 'For developers', go: { page: 'partners' as Page, q: 'developer' } },
  { icon: Handshake, label: 'Brokerages & industry', desc: 'Co-broking, referrals, speaking and people-practice collaboration.', cta: 'For the industry', go: { page: 'partners' as Page, q: 'brokerage' } },
];

export const RecruiterHub = ({ onNavigate }: RecruiterHubProps) => (
  <section id="work-with-emma" className="py-20 lg:py-24 bg-[#F3EDE4] border-y border-[#E8E1D5] scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="max-w-2xl mb-10">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#9C7A4A] mb-3">Work with Emma</p>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
          How can I help you?
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DOORS.map(({ icon: Icon, label, desc, cta, go }) => (
          <button
            key={label}
            onClick={() => {
              if (go.q) window.history.pushState(null, '', `/partners?for=${go.q}`);
              onNavigate(go.page);
            }}
            className="group text-left flex flex-col rounded-2xl bg-white border border-[#E8E1D5] p-6 hover:border-[#9C7A4A] hover:shadow-lg transition cursor-pointer"
          >
            <Icon className="w-6 h-6 text-[#9C7A4A] mb-4" />
            <p className="text-base font-semibold text-[#1E232A] mb-1.5">{label}</p>
            <p className="text-sm text-[#5C5347] leading-relaxed flex-1">{desc}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9C7A4A]">
              {cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);
