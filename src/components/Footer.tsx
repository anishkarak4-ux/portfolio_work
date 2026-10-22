import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080e] border-t border-slate-900 py-16 text-xs text-slate-400 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-brand-400 text-sm">
              AK
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight">{PORTFOLIO_DATA.personal.name}</h4>
              <p className="text-[11px] text-slate-500">Machine Learning Systems & Computer Vision Architect</p>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-brand-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-brand-400" />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All verified engineering metrics and source code licensed under MIT.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with React, TypeScript, Tailwind & Vite</span>
            <span>•</span>
            <a
              href="https://github.com/anishkarak4-ux/portfolio_work"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-brand-400 transition-colors underline"
            >
              github.com/anishkarak4-ux/portfolio_work
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
