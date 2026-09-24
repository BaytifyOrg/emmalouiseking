import { useState, type FormEvent } from 'react';
import { X, Send, CheckCircle2, Linkedin, Mail, Paperclip } from 'lucide-react';
import { LINKEDIN_PROFILE_URL } from '../data';

interface WorkWithMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkWithMeModal = ({ isOpen, onClose }: WorkWithMeModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const mailtoHref = `mailto:emma@baytify.com?subject=${encodeURIComponent('Inquiry from Emma King website')}&body=${encodeURIComponent(
    `Hello Emma,\n\nMy name is ${name}.\nPhone: ${phone}\nEmail: ${email}\n\n${message}`
  )}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white border border-[#E3D9CC] rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-[#1E232A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A6F60] hover:text-[#1E232A] hover:bg-[#F2ECE3] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9C7A4A] block mb-1">
                Inquiry
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1E232A]">
                Work with me
              </h3>
              <p className="text-xs sm:text-sm text-[#665B4D] mt-1">
                Explore real estate careers, brokerage advisory, and executive partnerships with Baytify.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name, Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3D352B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#D8CEBF] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#9C7A4A] text-[#1E232A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D352B] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +971 50 123 4567"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#D8CEBF] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#9C7A4A] text-[#1E232A]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3D352B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#D8CEBF] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#9C7A4A] text-[#1E232A]"
                  />
                </div>
              </div>

              {/* CV note: attachments are added in the visitor's email app */}
              <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-lg border border-dashed border-[#D8CEBF] bg-[#FAF8F5] text-[11px] sm:text-xs text-[#50483E]">
                <Paperclip className="w-4 h-4 text-[#9C7A4A] shrink-0 mt-px" />
                <span>
                  <span className="font-semibold text-[#1E232A]">Sharing a CV?</span> Your email app opens in the next step. Attach your CV there before sending.
                </span>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#3D352B] mb-1">
                  Message / Context
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please outline what you'd like to discuss..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#D8CEBF] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#9C7A4A] text-[#1E232A]"
                />
              </div>

              {/* Submit button */}
              <div className="pt-1 flex items-center justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#1E232A] hover:bg-[#9C7A4A] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation View */
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#E5DACB] text-[#9C7A4A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#1E232A]">
              Inquiry Prepared
            </h3>
            <p className="text-xs sm:text-sm text-[#665B4D] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#1E232A]">{name || 'there'}</span>. Your message has been drafted for Emma Louise King. Click below to open it in your email app and send it (attach your CV there if you'd like to share one).
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={mailtoHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E232A] text-white text-xs font-semibold hover:bg-[#9C7A4A] transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Email Client</span>
              </a>

              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#084e96] transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 fill-white" />
                <span>Message on LinkedIn</span>
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="text-xs text-[#827566] hover:text-[#1E232A] underline cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
