import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, MapPin, Calendar, Award, CheckCircle2, BookOpen } from 'lucide-react';

export const EducationTimeline: React.FC = () => {
  return (
    <section id="academics" className="py-24 relative bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Academic Foundation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            A sustained record of high academic performance from foundational STEM schooling through university computer science coursework.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-6 space-y-12">
          {PORTFOLIO_DATA.education.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10 group">
              
              {/* Timeline Node Dot */}
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-brand-500 group-hover:border-brand-400 group-hover:scale-110 transition-all flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
              </div>

              {/* Card Container */}
              <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/90 group-hover:border-slate-700 transition-colors space-y-4">
                
                {/* Degree & Grade Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-brand-400 mt-0.5">
                      {item.institution}
                    </p>
                  </div>

                  {/* Grade Pill */}
                  <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/30 font-mono text-xs text-brand-400 font-bold">
                    {item.grade}
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <ul className="space-y-2 pt-2 border-t border-slate-800/60">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
