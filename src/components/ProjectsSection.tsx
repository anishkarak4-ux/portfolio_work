import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { Search, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { ArchitectureModal } from './ArchitectureModal';

type CategoryFilter = 'All' | 'Applied ML & AI' | 'Computer Vision' | 'Systems & Backend' | 'Full Stack';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArchProject, setSelectedArchProject] = useState<Project | null>(null);

  const categories: CategoryFilter[] = [
    'All',
    'Applied ML & AI',
    'Computer Vision',
    'Systems & Backend',
    'Full Stack'
  ];

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Systems & Research Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering Architectures
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              High-throughput machine learning pipelines, edge-quantized computer vision microservices, and distributed algorithmic systems verified with rigorous benchmarks.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search systems, tags, algorithms..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50 font-mono"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 py-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-slate-950 font-bold shadow-md shadow-brand-500/20 scale-105'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs font-mono text-slate-500 ml-auto hidden sm:inline">
            Showing {filteredProjects.length} of {PORTFOLIO_DATA.projects.length} systems
          </span>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800/80 relative group"
            >
              <div>
                
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-brand-500/10 text-brand-400 border border-brand-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {project.date}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-brand-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-brand-accent mt-1 mb-4">
                  {project.subtitle}
                </p>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {project.summary}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-center"
                    >
                      <span className="text-[10px] font-mono text-slate-500 block truncate">
                        {m.label}
                      </span>
                      <span className="text-sm font-bold text-slate-200 font-mono">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Bullet Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Actions & Tags */}
              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedArchProject(project)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-brand-400" />
                      <span>Architecture Spec</span>
                    </button>

                    {project.interactiveType && (
                      <a
                        href="#demos"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/30 text-xs font-mono text-brand-accent transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Try Live Sandbox</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Architecture Spec Modal */}
      <ArchitectureModal
        project={selectedArchProject}
        onClose={() => setSelectedArchProject(null)}
      />
    </section>
  );
};
