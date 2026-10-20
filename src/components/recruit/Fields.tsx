import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

const base =
  'w-full rounded-lg border border-[#E3D9CC] bg-white px-3.5 py-2.5 text-sm text-[#1E232A] placeholder:text-[#A39886] focus:outline-none focus:border-[#9C7A4A] focus:ring-2 focus:ring-[#9C7A4A]/15 transition';

export const Label = ({ children, required }: { children: ReactNode; required?: boolean }) => (
  <span className="block text-xs font-semibold text-[#50483E] mb-1.5">
    {children}
    {required && <span className="text-[#9C7A4A]"> *</span>}
  </span>
);

type FieldProps = { label: string; required?: boolean; className?: string };

export const TextField = ({ label, required, className = '', ...rest }: FieldProps & InputHTMLAttributes<HTMLInputElement>) => (
  <label className={`block ${className}`}>
    <Label required={required}>{label}</Label>
    <input className={base} required={required} {...rest} />
  </label>
);

export const TextArea = ({ label, required, className = '', ...rest }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <label className={`block ${className}`}>
    <Label required={required}>{label}</Label>
    <textarea className={`${base} min-h-[110px] resize-y`} required={required} {...rest} />
  </label>
);

export const SelectField = ({
  label,
  required,
  options,
  className = '',
  ...rest
}: FieldProps & { options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) => (
  <label className={`block ${className}`}>
    <Label required={required}>{label}</Label>
    <select className={`${base} appearance-none`} required={required} {...rest}>
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </label>
);

export const SubmitButton = ({ busy, children }: { busy: boolean; children: ReactNode }) => (
  <button
    type="submit"
    disabled={busy}
    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E232A] hover:bg-[#9C7A4A] disabled:opacity-60 disabled:cursor-wait text-white text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
  >
    {busy ? 'Sending…' : children}
  </button>
);

export const FormSuccess = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-2xl border border-[#D9C9AE] bg-[#F6F0E6] p-8 text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9C7A4A] text-white text-xl">✓</div>
    <h3 className="font-editorial text-2xl font-semibold text-[#1E232A] mb-2">{title}</h3>
    <p className="text-sm text-[#4E463C] leading-relaxed max-w-md mx-auto">{children}</p>
  </div>
);

export const FormError = ({ message }: { message: string }) => (
  <p role="alert" className="text-sm text-[#9B2C2C] bg-[#FBEDED] border border-[#F0CFCF] rounded-lg px-3.5 py-2.5">
    {message}
  </p>
);

// Hidden field that humans never fill; bots usually do.
export const Honeypot = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <input
    type="text"
    name="company_website"
    tabIndex={-1}
    autoComplete="off"
    aria-hidden="true"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="absolute -left-[9999px] h-0 w-0 opacity-0"
  />
);
