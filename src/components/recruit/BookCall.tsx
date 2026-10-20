import { CalendarClock, Download, Mail } from 'lucide-react';
import { CALENDLY_URL, EMMA_EMAIL, ONE_PAGER_URL } from '../../recruitData';

interface BookCallProps {
  context?: string; // e.g. company name, used in the fallback email subject
  dark?: boolean;
}

export const BookCall = ({ context, dark = false }: BookCallProps) => {
  const subject = `Intro call with Emma${context ? ` — ${context}` : ''}`;
  const mailto = `mailto:${EMMA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    'Hi Emma,\n\nI would like to book a short introductory call. A few times that work for me:\n\n- \n- \n\nThanks,\n',
  )}`;

  const card = dark
    ? 'bg-white/5 border-white/10 text-white'
    : 'bg-white border-[#E8E1D5] text-[#1E232A]';
  const muted = dark ? 'text-[#C7BFB3]' : 'text-[#4E463C]';

  return (
    <div className={`rounded-2xl border p-6 sm:p-8 ${card}`}>
      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 rounded-xl bg-[#9C7A4A] flex items-center justify-center shrink-0">
          <CalendarClock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-editorial text-2xl font-semibold mb-1">Book a 20-minute intro</h3>
          <p className={`text-sm leading-relaxed ${muted}`}>
            A short, no-obligation call to understand what you need and whether Baytify is the right fit.
          </p>
        </div>
      </div>

      {CALENDLY_URL ? (
        <div className="rounded-xl overflow-hidden border border-[#E8E1D5] bg-white">
          <iframe
            title="Book a call with Emma Louise King"
            src={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=9c7a4a`}
            className="w-full h-[640px]"
            loading="lazy"
          />
        </div>
      ) : (
        <a
          href={mailto}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9C7A4A] hover:bg-[#b08b56] text-white text-sm font-semibold transition"
        >
          <Mail className="w-4 h-4" />
          Request a call by email
        </a>
      )}

      <a
        href={ONE_PAGER_URL}
        download
        className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline ${
          dark ? 'text-[#EADAC5]' : 'text-[#9C7A4A]'
        }`}
      >
        <Download className="w-4 h-4" />
        Download Emma's introduction (PDF)
      </a>
    </div>
  );
};
