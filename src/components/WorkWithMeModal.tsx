import { useState, useRef, type FormEvent, type DragEvent, type ChangeEvent, type MouseEvent } from 'react';
import { X, Send, CheckCircle2, Linkedin, Mail, UploadCloud, FileText, Trash2 } from 'lucide-react';
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
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPortfolioFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPortfolioFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = (e: MouseEvent) => {
    e.stopPropagation();
    setPortfolioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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
    setPortfolioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

              {/* Minimized CV / Portfolio Upload Box */}
              <div>
                <label className="block text-xs font-semibold text-[#3D352B] mb-1">
                  Attach CV / Resume <span className="font-normal text-[#7A6F60] text-[11px]">(Optional · PDF, DOC, max 15MB)</span>
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="portfolio-upload-input"
                />

                {!portfolioFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-lg px-3.5 py-2 flex items-center justify-between cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#9C7A4A] bg-[#F5EFE6]'
                        : 'border-[#D8CEBF] hover:border-[#9C7A4A] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs text-[#50483E] truncate">
                      <UploadCloud className="w-4 h-4 text-[#9C7A4A] shrink-0" />
                      <span className="truncate">
                        <span className="font-medium text-[#1E232A]">Upload CV/Resume</span>
                        <span className="text-[#7A6F60] ml-1.5 hidden sm:inline">or drag & drop</span>
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#9C7A4A] hover:text-[#7A5D33] shrink-0 ml-2">
                      Browse
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#9C7A4A]/40 bg-[#FAF6F0]">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-[#9C7A4A] shrink-0" />
                      <span className="text-xs font-semibold text-[#1E232A] truncate">
                        {portfolioFile.name}
                      </span>
                      <span className="text-[11px] text-[#7A6F60] shrink-0">
                        ({formatFileSize(portfolioFile.size)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 rounded text-[#7A6F60] hover:text-[#B91C1C] hover:bg-white/80 transition-colors ml-2 shrink-0 cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
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
              Thank you, <span className="font-semibold text-[#1E232A]">{name || 'there'}</span>. Your message{portfolioFile ? ` and CV document (${portfolioFile.name})` : ''} have been drafted for Emma Louise King.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:emma@baytify.com?subject=Inquiry from Emma King Portfolio&body=Hello Emma,%0D%0A%0D%0AMy name is ${encodeURIComponent(name)}.%0D%0APhone: ${encodeURIComponent(phone)}%0D%0AEmail: ${encodeURIComponent(email)}${portfolioFile ? `%0D%0A[CV / Portfolio Attached: ${encodeURIComponent(portfolioFile.name)}]` : ''}%0D%0A%0D%0A${encodeURIComponent(message)}`}
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
