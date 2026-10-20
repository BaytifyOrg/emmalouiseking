import { useState, type FormEvent } from 'react';
import type { Audience } from '../../types';
import { submitEnquiry } from '../../lib/api';
import { AUDIENCE_TRACKS, EMMA_EMAIL } from '../../recruitData';
import { TextField, TextArea, SelectField, SubmitButton, FormSuccess, FormError, Honeypot, Label } from './Fields';

interface EnquiryFormProps {
  audience: Audience;
  onAudienceChange?: (a: Audience) => void;
  introSlug?: string;
  defaultCompany?: string;
  defaultName?: string;
}

const AUDIENCE_CHOICES: { id: Audience; label: string }[] = [
  ...AUDIENCE_TRACKS.map((t) => ({ id: t.id as Audience, label: t.label })),
  { id: 'other', label: 'Something else' },
];

export const EnquiryForm = ({ audience, onAudienceChange, introSlug, defaultCompany, defaultName }: EnquiryFormProps) => {
  const [trap, setTrap] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const track = AUDIENCE_TRACKS.find((t) => t.id === audience);
  const interests = track?.interests ?? ['General introduction', 'Something else'];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trap) return setDone(true);
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    try {
      await submitEnquiry({
        audience,
        full_name: f.get('full_name'),
        email: f.get('email'),
        phone: f.get('phone'),
        company: f.get('company'),
        job_title: f.get('job_title'),
        interest: f.get('interest'),
        message: f.get('message'),
        intro_slug: introSlug ?? null,
      });
      setDone(true);
    } catch {
      setError(`Something went wrong sending your message. Please try again, or email ${EMMA_EMAIL} directly.`);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <FormSuccess title="Thank you — message received">
        Emma will reply personally, usually within one working day (Dubai time).
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Honeypot value={trap} onChange={setTrap} />

      {onAudienceChange && (
        <div className="sm:col-span-2">
          <Label required>I'm getting in touch as</Label>
          <div className="flex flex-wrap gap-2">
            {AUDIENCE_CHOICES.map((a) => (
              <button
                type="button"
                key={a.id}
                onClick={() => onAudienceChange(a.id)}
                aria-pressed={audience === a.id}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  audience === a.id
                    ? 'bg-[#1E232A] text-white border-[#1E232A]'
                    : 'bg-white text-[#50483E] border-[#E3D9CC] hover:border-[#9C7A4A]'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <TextField label="Full name" name="full_name" required minLength={2} maxLength={120} autoComplete="name" defaultValue={defaultName} />
      <TextField label="Work email" name="email" type="email" required maxLength={200} autoComplete="email" />
      <TextField label="Company" name="company" maxLength={160} autoComplete="organization" defaultValue={defaultCompany} />
      <TextField label="Job title" name="job_title" maxLength={120} autoComplete="organization-title" />
      <TextField label="Phone / WhatsApp" name="phone" type="tel" maxLength={40} autoComplete="tel" />
      <SelectField key={audience} label="What can Emma help with?" name="interest" options={interests} />
      <TextArea label="Message" name="message" maxLength={3000} placeholder="A little context helps Emma come back with something useful." className="sm:col-span-2" />

      {error && <div className="sm:col-span-2"><FormError message={error} /></div>}

      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-xs text-[#7A7061] max-w-sm">Your details go directly to Emma and are never shared.</p>
        <SubmitButton busy={busy}>Send to Emma</SubmitButton>
      </div>
    </form>
  );
};
