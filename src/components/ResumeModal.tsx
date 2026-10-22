import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Download, FileText, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'pdf' | 'text'>('pdf');

  if (!isOpen) return null;

  const atsResumeText = `
ANISH KARAK
+91 9832305709 | anishkarak4@gmail.com | linkedin.com/in/anish-karak-182661336 | github.com/anishkarak4-ux

EDUCATION
Kalinga Institute of Industrial Technology, Bhubaneswar, India
B.Tech in Computer Science and Engineering; Current CGPA: 9.24 (Aug. 2024 – May 2028)
Purv International School, Durgapur, India | CBSE (Class XII)
St. Xavier’s School, Durgapur, India | ICSE (Class X); Grade: 95.0%

TECHNICAL SKILLS
Languages: Python, C++, TypeScript, SQL, JavaScript, C, HTML/CSS
Frameworks/Libraries: FastAPI, OpenCV, YOLOv8, ONNX Runtime, XGBoost, Scikit-Learn, NumPy, Pandas, React, Next.js, Tailwind CSS
Databases & Cloud: PostgreSQL, SQLite, SQLAlchemy, Firebase Firestore, Cloudinary
Tools & Platforms: Git, GitHub, Linux/Unix, Docker, Postman, Vite, VS Code
Core Concepts: Data Structures & Algorithms, Machine Learning, Entity Resolution, Digital Image Processing, OOP, DBMS, OS, Networks

FEATURED PROJECTS
Amazon ML Challenge – Multilingual Entity Resolution (Sep. 2026) | Python, XGBoost, Scikit-Learn, Pandas
• Engineered large-scale entity resolution pipeline resolving 1.73M noisy records across 336.9M candidate pairs.
• Designed 8-rule inverted-index blocking engine achieving >99.99% search space reduction.
• Engineered 46 dense pairwise similarity features (lexical, phonetic, address token overlap); trained 1,000-tree XGBoost classifier with dynamic relative-gap pruning -> 0.805 Macro F0.5.
• Top 500 placement nationwide with zero data leakage via isolated entity-cluster validation.

Real-Time Object Tracking & DIP Inspection Suite (Aug. 2026) | Python, OpenCV, YOLOv8, NumPy
• Architected modular tracking system benchmarking classical filters (CSRT, KCF, MOSSE) against YOLOv8n with BoT-SORT/ByteTrack.
• Engineered target ROI selection, trajectory telemetry, and template-matching recovery.
• Engineered freeze-frame diagnostic canvas executing 8-stage image processing (CLAHE, 256-bin histograms, spatial gradients); 100% CSRT tracking success across 200 frames at 35.88 mean FPS.

KarigarSaathi – AI-Driven Artisan Market Linkage (Aug. 2026) | FastAPI, ONNX Runtime, OpenCV, React
• Engineered core computer-vision microservice in FastAPI using ONNX-quantized u2netp & OpenCV CLAHE (sub-512MB RAM).
• Integrated Sarvam AI Indic speech-to-text models across 5 regional languages into structured bilingual catalog schemas.
• Selected as finalist for Smart India Hackathon (SIH) 2026; connected vision pipeline to offline-first React/TypeScript PWA with QR Craft Passports & ONDC export.

Wasabi – Autonomous Web Intelligence (June 2026) | Next.js, FastAPI, Python, Groq (Llama 3), Bright Data
• Scraping real-time market signals via Bright Data proxies and synthesizing executive memos using Llama 3 on Groq LPUs.
• In-memory caching & state synchronization store in FastAPI decoupling real-time UI dashboards from scraping latency.

HONORS & ACHIEVEMENTS
• CodeSprint 3.0 (USC.KIIT): Top 12 Finalist with 100% consistency; active LeetCode solver.
• Smart India Hackathon (SIH) 2026: Finalist selected nationwide.
• Amazon ML Challenge 2026: Top 500 Placement.
• Chess & Strategic Pursuits: ~1500 rating on Chess.com; regular distance endurance runner.
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(atsResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#090d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Anish Karak — Audited Technical Resume
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                B.Tech CSE @ KIIT (9.24 CGPA) • Pre-Final Year (Class of 2028)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs font-mono">
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'pdf' ? 'bg-brand-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'text' ? 'bg-brand-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                ATS Text
              </button>
            </div>

            {/* Direct Download */}
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              download="ANISH_RESUME.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 border border-brand-500/40 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 bg-slate-950 overflow-hidden relative">
          {activeTab === 'pdf' ? (
            <div className="w-full h-full flex flex-col">
              <iframe
                src={PORTFOLIO_DATA.personal.resumeUrl}
                title="Anish Karak Resume"
                className="w-full flex-1 border-none"
              />
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Rendering official verified PDF: ANISH_RESUME.pdf</span>
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Open in native browser tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full p-6 overflow-y-auto space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">Clean ATS Plain Text (Optimized for Screeners & Parsers)</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-brand-400 hover:bg-slate-800 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy ATS Text'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed select-all bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {atsResumeText}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
