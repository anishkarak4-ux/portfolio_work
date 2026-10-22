import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowDown, Terminal, FileText, Sparkles, ChevronRight, CheckCircle2, Zap, Award, Layers } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenResume }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden grid-bg">
      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-brand-accent/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Intro & Headline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
              <span className="text-xs font-medium text-slate-300">
                {PORTFOLIO_DATA.personal.statusBadge}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-sm md:text-base font-mono uppercase tracking-widest text-brand-400 font-semibold">
                {PORTFOLIO_DATA.personal.name} • Applied ML & Systems
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Engineering <span className="text-gradient">High-Throughput</span> Machine Learning & <span className="text-gradient-purple">Edge Vision</span> Systems.
              </h1>
            </div>

            {/* Sub-headline / Narrative */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Pre-final year Computer Science student at <span className="text-white font-medium">KIIT (9.24 CGPA)</span>. Specialized in solving massive entity deduplication (<span className="text-brand-400 font-medium">1.73M records</span> resolved at <span className="text-white font-medium">0.805 F0.5</span>), edge-quantized computer vision (<span className="text-brand-accent font-medium">sub-20ms INT8</span>), and production distributed microservices.
            </p>

            {/* Micro Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Top 500 Amazon ML Challenge
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                <Zap className="w-3.5 h-3.5 text-brand-400" />
                Smart India Hackathon Finalist
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                CodeSprint 3.0 Top 12
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:scale-[1.02]"
              >
                <span>Explore Featured Systems</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#demos"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-sm transition-all hover:border-slate-600"
              >
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span>Interactive Sandboxes</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-brand-500/30 text-brand-400 font-mono text-xs transition-all hover:border-brand-400"
                title="Launch Developer Terminal (Ctrl+K)"
              >
                <Terminal className="w-4 h-4" />
                <span>Ctrl+K</span>
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Persona Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-500/30 via-brand-accent/20 to-brand-violet/30 rounded-3xl blur-xl opacity-75 animate-pulse-slow" />
              
              {/* Card Container */}
              <div className="relative glass-panel rounded-2xl p-6 border border-slate-700/70 shadow-2xl">
                
                {/* Header with terminal dot controls */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping" />
                    system_status: ready
                  </span>
                </div>

                {/* Profile Photo & Overview */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden border-2 border-brand-500/40 bg-slate-800 flex-shrink-0 shadow-md">
                    <img
                      src={PORTFOLIO_DATA.personal.avatarUrl}
                      alt={PORTFOLIO_DATA.personal.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-lg">
                      {PORTFOLIO_DATA.personal.name}
                    </h3>
                    <p className="text-xs font-mono text-brand-400">
                      B.Tech CSE • KIIT 2028
                    </p>
                    <p className="text-xs text-slate-400">
                      CGPA: <span className="text-white font-semibold">9.24 / 10.0</span>
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                      <span>📍 Bhubaneswar / Durgapur</span>
                    </div>
                  </div>
                </div>

                {/* Quick Spec Highlights */}
                <div className="space-y-2.5 text-xs font-mono bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500">primary_focus</span>
                    <span className="text-brand-400 font-medium">ML / Edge CV / Backend</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500">flagship_engine</span>
                    <span className="text-slate-200">Wyvern (Amazon ML)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500">records_resolved</span>
                    <span className="text-emerald-400 font-semibold">1,732,840</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500">macro_f0.5</span>
                    <span className="text-cyan-400 font-semibold">0.805 (Top 500)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-500">hackathon_rank</span>
                    <span className="text-amber-400 font-semibold">SIH 2026 Finalist</span>
                  </div>
                </div>

                {/* Verified Signature footer inside card */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                    <span>Audited Resume & Repos</span>
                  </div>
                  <img
                    src={PORTFOLIO_DATA.personal.signatureUrl}
                    alt="Anish Signature"
                    className="h-7 w-auto object-contain filter invert opacity-75"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Global Metrics Ribbon */}
        <div className="mt-16 pt-10 border-t border-slate-800/80">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 text-center mb-6">
            Key Verified Architectural & Academic Metrics
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PORTFOLIO_DATA.stats.map((stat, idx) => (
              <div 
                key={idx}
                className="glass-panel rounded-xl p-4 text-center border border-slate-800 hover:border-brand-500/40 transition-colors group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-brand-400 transition-colors font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-300 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
