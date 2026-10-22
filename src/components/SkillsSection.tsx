import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Search, CheckCircle2, Code2, Layers, Server, BookOpen } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [skillSearch, setSkillSearch] = useState('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Core Languages': <Code2 className="w-4 h-4 text-brand-400" />,
    'AI, ML & Computer Vision': <Cpu className="w-4 h-4 text-cyan-400" />,
    'Frontend & Full Stack': <Layers className="w-4 h-4 text-purple-400" />,
    'Databases, Cloud & DevOps': <Server className="w-4 h-4 text-amber-400" />,
    'Computer Science Fundamentals': <BookOpen className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Competencies & Systems Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills, Frameworks & Tooling
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              An engineering repertoire spanning high-performance systems programming, vectorized tensor operations, edge vision, and cloud microservices.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Filter technologies..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50 font-mono"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {PORTFOLIO_DATA.skills.map((category, idx) => {
            const filteredSkills = category.skills.filter(s => 
              s.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
              (s.tag && s.tag.toLowerCase().includes(skillSearch.toLowerCase()))
            );

            if (skillSearch && filteredSkills.length === 0) return null;

            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {categoryIcons[category.title] || <Cpu className="w-4 h-4 text-brand-400" />}
                    </span>
                    <h3 className="font-bold text-white text-base">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Pill List */}
                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800 transition-all cursor-default"
                      >
                        <span className="text-xs font-mono text-slate-200 font-medium">
                          {skill.name}
                        </span>
                        {skill.level === 'Expert' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400" title="Expert" />
                        )}
                        {skill.tag && (
                          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline group-hover:text-slate-400">
                            • {skill.tag}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level legend footer */}
                <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{filteredSkills.length} competencies</span>
                  <span className="flex items-center gap-1 text-brand-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    Core Specialty
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
