import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { contactInfo, navLinks } from '../data/portfolioData';
import { BlockReveal, EASE_EDITORIAL, TextReveal } from '../components/MotionPrimitives';
import { SocialIcon } from '../components/FloatingConnectionHub';

const inquiryScopes = ['Frontend Website', 'React / Next.js App', 'UI Engineering', 'Full-Time Role'];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeHeaderField(value: string, maxLength: number): string {
  return value.replace(/[\r\n\x00-\x1F\x7F]/g, ' ').trim().slice(0, maxLength);
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [selectedScope, setSelectedScope] = useState<string>(inquiryScopes[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const safeName = sanitizeHeaderField(name, 100);
  const safeEmail = sanitizeHeaderField(email, 160);
  const safeMessage = message.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, 2000);
  const subjectText = `Portfolio Inquiry — ${sanitizeHeaderField(selectedScope, 60)}`;
  const bodyText = `Hi Shaik,\n\nName: ${safeName || '—'}\nReply Email: ${safeEmail || '—'}\n\n${safeMessage}`;
  const mailtoHref = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    contactInfo.email
  )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${contactInfo.email}\nSubject: ${subjectText}\n\n${bodyText}`
      );
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2400);
    } catch {
      setCopiedMessage(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!safeName || !safeEmail || !safeMessage) {
      setErrorMsg('Please fill out your name, email address, and message.');
      return;
    }
    if (!EMAIL_REGEX.test(safeEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative bg-[var(--bg-surface)]/84 px-5 pt-16 pb-10 md:px-12 md:pt-22 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <BlockReveal className="mb-10 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
          <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[var(--accent-primary)] uppercase md:text-sm">
            05. Get In Touch
          </p>
          <p className="hidden text-sm text-[var(--text-muted)] md:block">
            {contactInfo.location}
          </p>
        </BlockReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Left Column: Statement Headline + Signal Cadence + Direct Channels */}
          <div className="flex flex-col gap-8 lg:col-span-6">
            <div>
              <h2 className="font-display text-[clamp(2.85rem,5.2vw,5.5rem)] leading-[0.94] tracking-tight text-[var(--text-primary)] text-balance">
                <TextReveal delay={0.04}>
                  <span className="block">LET&apos;S BUILD</span>
                </TextReveal>
                <TextReveal delay={0.12}>
                  <span className="block">SOMETHING</span>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <span className="block">
                    GREAT<span className="text-[var(--accent-primary)]">.</span>
                  </span>
                </TextReveal>
              </h2>

              <BlockReveal delay={0.24} className="mt-5 max-w-md">
                <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                  Looking for a frontend developer who cares deeply about visual craft, responsiveness, and clean React architecture? Let&apos;s talk.
                </p>
              </BlockReveal>
            </div>

            {/* Subtle Tech-Forward Contact Signal Track */}
            <BlockReveal delay={0.28}>
              <div className="relative overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/70 px-4 py-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono-tabular font-medium tracking-[0.14em] text-[var(--accent-primary)] uppercase">
                    Direct Response Window
                  </span>
                  <span className="font-mono-tabular text-[var(--text-muted)]">
                    Within 24 Hours
                  </span>
                </div>

                {/* Sweeping Teal Signal Line */}
                <div
                  aria-hidden="true"
                  className="relative mt-2.5 h-px w-full overflow-hidden bg-[var(--border-hairline)]"
                >
                  <motion.span
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 3.4,
                      times: [0, 0.15, 0.85, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: EASE_EDITORIAL,
                    }}
                    className="absolute inset-0 block bg-gradient-to-r from-transparent via-[#38bdd4] to-transparent"
                  />
                </div>
              </div>
            </BlockReveal>

            {/* Direct Action Rows */}
            <BlockReveal delay={0.3} className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
              <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-mono-tabular text-xs text-[var(--text-muted)] uppercase">
                    Direct Email
                  </p>
                  <a
                    href="mailto:abdullashaik0208@gmail.com"
                    className="mt-1 inline-flex items-center gap-2 text-base font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)] md:text-lg"
                  >
                    <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                    <span>{contactInfo.email}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[40px] items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-mono-tabular text-xs text-[var(--text-muted)] uppercase">
                    Instagram
                  </p>
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-base font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)] md:text-lg"
                  >
                    <SocialIcon id="instagram" className="h-4 w-4 text-[var(--accent-primary)]" />
                    <span>@abdulla.shaik26</span>
                  </a>
                </div>

                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                >
                  <span>Visit Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </BlockReveal>
          </div>

          {/* Right Column: Clean Interactive Inquiry Composer */}
          <BlockReveal delay={0.2} className="lg:col-span-6">
            <div className="border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                  className="py-8"
                >
                  <p className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[var(--accent-primary)] uppercase">
                    Message Ready
                  </p>
                  <h3 className="font-display mt-3 text-3xl text-[var(--text-primary)]">
                    THANK YOU, {name.toUpperCase()}.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    Your inquiry about <span className="font-semibold text-[var(--text-primary)]">{selectedScope}</span> is prepared. Launch your mail app, compose directly in Gmail, or copy the formatted message below.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex min-h-[44px] items-center gap-2 bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[var(--accent-hover)]"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Open Email App</span>
                    </a>
                    <a
                      href={gmailHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                    >
                      <Mail className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                      <span>Open in Gmail</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--border-hairline)] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                          <span>Copied Message</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setCopiedMessage(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="inline-flex min-h-[44px] items-center border border-[var(--border-hairline)] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    >
                      Write Another Note
                    </button>
                  </div>

                  <p className="font-mono-tabular mt-5 text-[11px] text-[var(--text-muted)]">
                    No desktop mail app configured? Use Open in Gmail or Copy Message to send directly to {contactInfo.email}.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <p className="font-mono-tabular mb-3 text-xs font-medium tracking-[0.16em] text-[var(--text-muted)] uppercase">
                      Topic
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {inquiryScopes.map((scope) => {
                        const active = selectedScope === scope;
                        return (
                          <button
                            key={scope}
                            type="button"
                            onClick={() => setSelectedScope(scope)}
                            className={`min-h-[38px] border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                              active
                                ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white'
                                : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            {scope}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="min-h-[44px] w-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--accent-primary)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        maxLength={160}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="min-h-[44px] w-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--accent-primary)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]"
                    >
                      Project or Opportunity Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      maxLength={2000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about what you are building, timeline, or role..."
                      className="w-full resize-none border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--accent-primary)] focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <p role="alert" className="text-xs font-medium text-rose-500">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </BlockReveal>
        </div>

        {/* Quiet Editorial Footer */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[var(--border-hairline)] pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="font-display text-lg text-[var(--text-primary)]">
              SHAIK<span className="text-[var(--accent-primary)]">.</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>&copy; {new Date().getFullYear()} Shaik Abdulla</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[var(--text-muted)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-[var(--accent-primary)]"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#home"
              className="whitespace-nowrap text-[var(--accent-primary)] hover:underline"
            >
              Back to Top ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
