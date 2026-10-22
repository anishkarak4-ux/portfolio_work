import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface DeveloperConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const DeveloperConsole: React.FC<DeveloperConsoleProps> = ({ isOpen, onClose, onOpenResume }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-brand-400 font-bold">
            Anish Karak [Developer Console v2.4.0]
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-cyan-400 font-bold">help</span> to view available system commands. Try <span className="text-brand-400 font-bold">wyvern</span>, <span className="text-brand-400 font-bold">skills</span>, <span className="text-brand-400 font-bold">resume</span>, or <span className="text-brand-400 font-bold">contact</span>.
          </p>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Listen for Ctrl+K global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent, but if closed, we can invoke toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCommandList((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-brand-400 font-semibold mb-1">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300">
              <div><span className="text-cyan-400 font-mono w-24 inline-block">whoami</span> - Candidate profile & academic status</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">skills</span> - Technical skills breakdown</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">projects</span> - Summary of featured engineering systems</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">wyvern</span> - Deep dive: Amazon ML Challenge Engine</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">tensoredge</span> - Deep dive: Edge Anomaly Engine</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">karigar</span> - Deep dive: Smart India Hackathon finalist</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">academics</span> - KIIT university standing & CGPA (9.24)</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">metrics</span> - Verified benchmark numbers</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">resume</span> - Open official verified resume PDF</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">contact</span> - Direct recruiter reach-out links</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">clear</span> - Clear terminal screen</div>
              <div><span className="text-cyan-400 font-mono w-24 inline-block">exit</span> - Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'about':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p><strong className="text-white">Name:</strong> {PORTFOLIO_DATA.personal.name}</p>
            <p><strong className="text-white">Education:</strong> {PORTFOLIO_DATA.personal.cohort}</p>
            <p><strong className="text-white">Academic Standing:</strong> Current CGPA: <span className="text-brand-400 font-bold">{PORTFOLIO_DATA.personal.currentCGPA}</span></p>
            <p><strong className="text-white">Focus:</strong> High-Throughput ML Pipelines, Quantized Edge Vision, Entity Deduplication</p>
            <p><strong className="text-white">Location:</strong> {PORTFOLIO_DATA.personal.location}</p>
            <p><strong className="text-white">Status:</strong> {PORTFOLIO_DATA.personal.statusBadge}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-brand-400 font-semibold">Technical Arsenal:</p>
            {PORTFOLIO_DATA.skills.map((cat, i) => (
              <div key={i} className="space-y-0.5">
                <span className="text-cyan-400 font-bold font-mono">[{cat.title}]: </span>
                <span className="text-slate-300 font-mono">
                  {cat.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-brand-400 font-semibold">Featured Repositories & Systems:</p>
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={i} className="border-l-2 border-slate-700 pl-2 py-0.5">
                <span className="text-white font-bold">{p.title}</span>
                <span className="text-slate-500 font-mono text-[10px] ml-2">({p.date})</span>
                <p className="text-slate-400">{p.subtitle}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'wyvern':
        output = (
          <div className="space-y-1 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <p className="text-brand-400 font-bold">WYVERN: Amazon ML Challenge 2026 (Top 500 Placement)</p>
            <p>• 1.73M multi-lingual commercial records resolved across 336.9M candidate pairs.</p>
            <p>• 8-Rule inverted blocking engine achieving &gt;99.99% search space reduction.</p>
            <p>• 46 dense pairwise similarity features (lexical, phonetic, address token overlap).</p>
            <p>• 1,000-tree XGBoost classifier with dynamic relative-gap pruning -&gt; 0.805 Macro F0.5 score.</p>
            <p className="text-cyan-400 font-mono pt-1">Repo: https://github.com/anishkarak4-ux/Wyvern</p>
          </div>
        );
        break;

      case 'tensoredge':
        output = (
          <div className="space-y-1 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <p className="text-cyan-400 font-bold">TensorEdge-Vision: High-Throughput Edge Anomaly Engine</p>
            <p>• Sub-20ms edge visual defect inspection pipeline using INT8 quantized TFLite.</p>
            <p>• Grad-CAM explainable visual heatmaps & dynamic threshold contours.</p>
            <p>• FastAPI production serving with 18/18 passing PyTests & Docker packaging.</p>
          </div>
        );
        break;

      case 'karigar':
        output = (
          <div className="space-y-1 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <p className="text-amber-400 font-bold">KarigarSaathi: Smart India Hackathon (SIH) 2026 Finalist</p>
            <p>• Core vision microservice in FastAPI using ONNX-quantized u2netp under 512MB RAM ceiling.</p>
            <p>• Sarvam AI Indic speech-to-text integration across 5 regional languages.</p>
            <p>• Offline-first React/TypeScript PWA with tamper-proof QR Craft Passports & ONDC schemas.</p>
            <p className="text-cyan-400 font-mono pt-1">Repo: https://github.com/anishkarak4-ux/karigarsaathi</p>
          </div>
        );
        break;

      case 'academics':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-brand-400 font-bold">Academic Transcript Highlights:</p>
            <p>• Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar</p>
            <p>• B.Tech Computer Science & Engineering (2024 - 2028)</p>
            <p>• Current Standing: 3rd Year / 5th Sem | CGPA: <strong className="text-white">9.24 / 10.0</strong></p>
            <p>• Purv International School (CBSE XII) | St. Xavier's School (ICSE X - 95.0%)</p>
          </div>
        );
        break;

      case 'metrics':
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {PORTFOLIO_DATA.stats.map((s, i) => (
              <div key={i} className="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span className="text-brand-400 font-mono font-bold block">{s.value}</span>
                <span className="text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'resume':
        onOpenResume();
        output = (
          <p className="text-xs text-brand-400 font-mono">
            Launching verified Resume modal and download dialog...
          </p>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-brand-400 font-bold">Recruiter Outreach Details:</p>
            <p>📧 Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.email}</a></p>
            <p>📱 Phone: <span className="text-white font-mono">{PORTFOLIO_DATA.personal.phone}</span></p>
            <p>🔗 LinkedIn: <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.linkedin}</a></p>
            <p>🐙 GitHub: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.github}</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs text-rose-400 font-mono">
            Command not recognized: '{cmd}'. Type <span className="text-brand-400 font-bold">help</span> to view available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx = historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInput(commandList[commandList.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandList[commandList.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#090d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
        
        {/* Terminal Title Bar */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-brand-400" />
              <span>anish@system:~ (zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-brand-400 font-bold">❯</span>
                <span className="text-slate-100">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2">
          <span className="text-brand-400 font-mono font-bold text-sm">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'wyvern', 'skills', 'contact', 'resume'..."
            className="flex-1 bg-transparent text-sm text-slate-100 font-mono focus:outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-brand-400 transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
