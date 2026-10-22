import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: 'Summer 2027 Internship',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      // Fallback gracefully for static hosting
    }

    const subject = encodeURIComponent(`[Portfolio Reach-Out] ${formData.role} - ${formData.name} (${formData.organization || 'Inquiry'})`);
    const body = encodeURIComponent(`Hello Anish,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}\n${formData.organization}`);
    
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Outreach & Identity */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>Recruiter Outreach & Contact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Build Something Exceptional Together.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
                Currently open for <strong className="text-white">Summer 2027 Engineering Internships</strong>, Applied AI research collaborations, and high-impact systems engineering roles.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-slate-900 text-brand-400 border border-slate-800">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">Direct Email</span>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-sm font-semibold text-white hover:text-brand-400 font-mono transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">Mobile Phone / WhatsApp</span>
                    <span className="text-sm font-semibold text-white font-mono">
                      {PORTFOLIO_DATA.personal.phone}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="p-2.5 rounded-lg bg-slate-900 text-purple-400 border border-slate-800">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block">Geographic Availability</span>
                  <span className="text-xs text-slate-200">
                    Bhubaneswar, Odisha & Durgapur, WB (Open to in-person & remote)
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-brand-400 text-xs font-mono transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative">
              
              <div className="pb-5 border-b border-slate-800 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Send a Direct Message</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Dispatches to anishkarak4@gmail.com with instant email client sync</p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 hidden sm:inline">
                  response_time: &lt; 24 hrs
                </span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Prepared!</h4>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Your default email client has been opened with your pre-filled message. Feel free to also ping me directly on LinkedIn or WhatsApp!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-500/50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-500/50 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Organization / Firm</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Amazon / Tech Startup / Lab"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-500/50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Inquiry Purpose</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-brand-500/50 font-mono"
                      >
                        <option value="Summer 2027 Internship">Summer 2027 Internship Opportunity</option>
                        <option value="Research Collaboration">AI/CV Research Collaboration</option>
                        <option value="Technical Interview / SDE">Engineering / Full-Stack Role</option>
                        <option value="General Conversation">Technical Discussion / Mentorship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Anish, we came across your Wyvern entity resolution and edge CV work and would love to connect regarding..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-500/50 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Dispatching...' : 'Send Message to Anish'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
