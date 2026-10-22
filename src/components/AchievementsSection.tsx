import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Award, Zap, Code2, Brain, Activity, Compass, CheckCircle2 } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-brand-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-rose-400" />;
      default: return <Award className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Recognition, Hackathons & Competitive Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Honors, Hackathons & Strategic Disciplines
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Competitive national hackathons, high-pressure machine learning sprints, algorithmic contests, and tactical chess rankings.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                
                {/* Header strip */}
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {getIcon(item.iconName)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Event */}
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5 mb-3">
                  {item.event} • {item.year}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

              </div>

              {/* Verified badge footer */}
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                <span>Verified Achievement</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
