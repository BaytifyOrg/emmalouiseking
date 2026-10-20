import { useState, type FormEvent } from 'react';
import { Paperclip } from 'lucide-react';
import type { Role } from '../../types';
import { submitApplication, uploadCv } from '../../lib/api';
import { EMMA_EMAIL } from '../../recruitData';
import { TextField, TextArea, SelectField, SubmitButton, FormSuccess, FormError, Honeypot, Label } from './Fields';

interface ApplyFormProps {
  roles: Role[];
  defaultRole?: string;
  introSlug?: string;
}

const MAX_CV = 10 * 1024 * 1024;
const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const ApplyForm = ({ roles, defaultRole, introSlug }: ApplyFormProps) => {
  const [role, setRole] = useState(defaultRole ?? '');
  const [cv, setCv] = useState<File | null>(null);
  const [trap, setTrap] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const roleOptions = roles.map((r) => r.title);

  const onFile = (file: File | null) => {
    setError('');
    if (!file) return setCv(null);
    if (!CV_TYPES.includes(file.type)) return setError('Please attach your CV as a PDF or Word document.');
    if (file.size > MAX_CV) return setError('That file is over 10 MB — please attach a smaller version.');
    setCv(file);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trap) return setDone(true);
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    try {
      const cv_path = cv ? await uploadCv(cv) : null;
      const chosen = roles.find((r) => r.title === role);
      await submitApplication({
        role_slug: chosen?.slug ?? (role || null),
        full_name: f.get('full_name'),
        email: f.get('email'),
        phone: f.get('phone'),
        current_company: f.get('current_company'),
        years_experience: f.get('years_experience'),
        rera_licensed: f.get('rera_licensed'),
        linkedin_url: f.get('linkedin_url'),
        message: f.get('message'),
        cv_path,
        intro_slug: introSlug ?? null,
      });
      setDone(true);
    } catch {
      setError(`Something went wrong sending your application. Please try again, or email ${EMMA_EMAIL} directly.`);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <FormSuccess title="Thank you — it's with Emma">
        Your application has been received and has gone straight to Emma. She will be in touch if there is a fit.
        Everything you shared stays confidential.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Honeypot value={trap} onChange={setTrap} />
      <SelectField
        label="Role"
        required
        options={roleOptions}
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="sm:col-span-2"
      />
      <TextField label="Full name" name="full_name" required minLength={2} maxLength={120} autoComplete="name" />
      <TextField label="Email" name="email" type="email" required maxLength={200} autoComplete="email" />
      <TextField label="Phone / WhatsApp" name="phone" type="tel" maxLength={40} autoComplete="tel" />
      <TextField label="Current company" name="current_company" maxLength={120} autoComplete="organization" />
      <SelectField label="Years in real estate" name="years_experience" options={['New to real estate', '1–2', '3–5', '6–10', '10+']} />
      <SelectField label="RERA licensed?" name="rera_licensed" options={['Yes', 'No', 'In progress']} />
      <TextField label="LinkedIn profile" name="linkedin_url" type="url" maxLength={300} placeholder="https://linkedin.com/in/…" className="sm:col-span-2" />
      <TextArea label="Anything Emma should know?" name="message" maxLength={3000} placeholder="Your track record, what you're looking for next, notice period…" className="sm:col-span-2" />

      <div className="sm:col-span-2">
        <Label>CV (PDF or Word, max 10 MB)</Label>
        <label className="flex items-center gap-3 rounded-lg border border-dashed border-[#D2C4AE] bg-[#FBF8F3] px-4 py-3.5 cursor-pointer hover:border-[#9C7A4A] transition">
          <Paperclip className="w-4 h-4 text-[#9C7A4A] shrink-0" />
          <span className="text-sm text-[#4E463C] truncate">{cv ? cv.name : 'Attach your CV'}</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {error && <div className="sm:col-span-2"><FormError message={error} /></div>}

      <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-xs text-[#7A7061] max-w-sm">Confidential. Your details are only used to consider you for roles at Baytify.</p>
        <SubmitButton busy={busy}>Send application</SubmitButton>
      </div>
    </form>
  );
};
