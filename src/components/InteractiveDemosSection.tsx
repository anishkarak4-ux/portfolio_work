import React from 'react';
import { WyvernSimulator } from './WyvernSimulator';
import { DIPPlayground } from './DIPPlayground';
import { Sparkles, Terminal, Cpu } from 'lucide-react';

export const InteractiveDemosSection: React.FC = () => {
  return (
    <section id="demos" className="py-24 relative bg-slate-950/40 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Real-Time Engineering Sandboxes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Test My Algorithms Live in Your Browser
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Directly test the mathematical and image processing engines engineered for the Amazon ML Challenge and Computer Vision Inspection projects.
          </p>
        </div>

        {/* Sandbox 1: Wyvern Entity Resolution Simulator */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span>EXPERIMENT 01 // ENTITY DEDUPLICATION & BLOCKING</span>
          </div>
          <WyvernSimulator />
        </div>

        {/* Sandbox 2: DIP Tracking & Filter Playground */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>EXPERIMENT 02 // COMPUTER VISION INSPECTION & TRACKING TELEMETRY</span>
          </div>
          <DIPPlayground />
        </div>

      </div>
    </section>
  );
};
