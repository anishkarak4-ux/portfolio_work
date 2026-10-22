import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Sliders, RefreshCw, Cpu, Database } from 'lucide-react';

interface PresetPair {
  name: string;
  recordA: { title: string; brand: string; address: string };
  recordB: { title: string; brand: string; address: string };
  isMatch: boolean;
  explanation: string;
}

const PRESET_PAIRS: PresetPair[] = [
  {
    name: "Amazon Product - Multi-Token Noisy Variant",
    recordA: {
      title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones - Black",
      brand: "Sony Electronics",
      address: "1-7-1 Konan Minato-ku Tokyo 108-0075"
    },
    recordB: {
      title: "SONY WH1000XM5/B Over-Ear Bluetooth Active Noise Cancelling Headset",
      brand: "Sony Corp",
      address: "Minato-ku, Tokyo, 108-0075, Japan"
    },
    isMatch: true,
    explanation: "High semantic token overlap, matching model number token 'WH1000XM5', normalized address zip 108-0075, identical brand soundex."
  },
  {
    name: "Different Models - High Lexical Confusion",
    recordA: {
      title: "Apple iPhone 15 Pro Max 256GB Natural Titanium Unlocked",
      brand: "Apple Inc.",
      address: "One Apple Park Way, Cupertino, CA 95014"
    },
    recordB: {
      title: "Apple iPhone 15 Pro 128GB Blue Titanium AT&T Locked",
      brand: "Apple",
      address: "1 Infinite Loop, Cupertino, CA 95014"
    },
    isMatch: false,
    explanation: "Token conflict on 'Max' vs non-Max and storage capacity (256GB vs 128GB). Wyvern's gap pruning rejects false match despite shared brand/zip."
  },
  {
    name: "Multilingual Transliteration / Phonetic Match",
    recordA: {
      title: "Samsung Galaxy S24 Ultra AI Smartphone 512GB Titanium Gray",
      brand: "Samsung Electronics Co",
      address: "129 Samsung-ro, Yeongtong-gu, Suwon-si"
    },
    recordB: {
      title: "SAMSUNG Galaxi S24-Ultra 5G Phone 512-GB Gray Int.",
      brand: "Samsung Tech",
      address: "Yeongtong-gu, Suwon-si, Gyeonggi-do 16677"
    },
    isMatch: true,
    explanation: "Soundex / phonetic match handles 'Galaxy' vs 'Galaxi', token prefix matching passes inverted blocking filter Rule 3 & 5."
  }
];

// Pure TS metric helpers
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const d: number[][] = [];

  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1].toLowerCase() === s2[j - 1].toLowerCase() ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }
  return d[m][n];
}

function tokenJaccard(s1: string, s2: string): number {
  const t1 = new Set(s1.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean));
  const t2 = new Set(s2.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean));
  if (t1.size === 0 && t2.size === 0) return 1.0;
  
  const intersection = new Set([...t1].filter(x => t2.has(x)));
  const union = new Set([...t1, ...t2]);
  return intersection.size / union.size;
}

function soundex(s: string): string {
  const a = s.toLowerCase().split('');
  const firstLetter = a[0]?.toUpperCase() || 'Z';
  const codes: Record<string, string> = {
    b: '1', f: '1', p: '1', v: '1',
    c: '2', g: '2', j: '2', k: '2', q: '2', s: '2', x: '2', z: '2',
    d: '3', t: '3',
    l: '4',
    m: '5', n: '5',
    r: '6'
  };

  const clean = a.map(c => codes[c] || '0');
  const filtered = [firstLetter];
  let prev = codes[a[0]] || '0';

  for (let i = 1; i < clean.length; i++) {
    const cur = clean[i];
    if (cur !== '0' && cur !== prev) {
      filtered.push(cur);
      prev = cur;
    } else if (cur === '0') {
      prev = '0';
    }
    if (filtered.length === 4) break;
  }

  while (filtered.length < 4) filtered.push('0');
  return filtered.join('');
}

export const WyvernSimulator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [titleA, setTitleA] = useState(PRESET_PAIRS[0].recordA.title);
  const [titleB, setTitleB] = useState(PRESET_PAIRS[0].recordB.title);
  const [brandA, setBrandA] = useState(PRESET_PAIRS[0].recordA.brand);
  const [brandB, setBrandB] = useState(PRESET_PAIRS[0].recordB.brand);
  const [activeRule, setActiveRule] = useState<string>('Rule 1: Exact Token Overlap');

  const loadPreset = (idx: number) => {
    setSelectedPreset(idx);
    setTitleA(PRESET_PAIRS[idx].recordA.title);
    setTitleB(PRESET_PAIRS[idx].recordB.title);
    setBrandA(PRESET_PAIRS[idx].recordA.brand);
    setBrandB(PRESET_PAIRS[idx].recordB.brand);
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const fullA = `${titleA} ${brandA}`;
    const fullB = `${titleB} ${brandB}`;

    const jaccard = tokenJaccard(fullA, fullB);
    const maxLen = Math.max(fullA.length, fullB.length);
    const dist = levenshteinDistance(fullA, fullB);
    const levRatio = maxLen > 0 ? (maxLen - dist) / maxLen : 1;

    const brandSoundexA = soundex(brandA);
    const brandSoundexB = soundex(brandB);
    const soundexMatch = brandSoundexA === brandSoundexB;

    // Simulated 1,000-tree XGBoost weighted confidence
    const confidenceScore = Math.min(
      0.99,
      Math.max(
        0.02,
        jaccard * 0.45 + levRatio * 0.35 + (soundexMatch ? 0.2 : 0.0)
      )
    );

    const isMatch = confidenceScore >= 0.65;

    return {
      jaccard: (jaccard * 100).toFixed(1),
      levRatio: (levRatio * 100).toFixed(1),
      levDist: dist,
      brandSoundexA,
      brandSoundexB,
      soundexMatch,
      confidenceScore: (confidenceScore * 100).toFixed(1),
      isMatch
    };
  }, [titleA, titleB, brandA, brandB]);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Cpu className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Wyvern Live Entity Resolution Sandbox
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Simulating 8-Rule Inverted Blocking & 46-Feature Pairwise Scorer (Amazon ML Challenge Benchmark)
          </p>
        </div>

        {/* Preset Selectors */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Presets:</span>
          <div className="flex gap-1.5 overflow-x-auto">
            {PRESET_PAIRS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  selectedPreset === idx
                    ? 'bg-brand-500 text-slate-950 font-bold shadow-md shadow-brand-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        
        {/* Record A */}
        <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/90 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-brand-400 font-semibold">RECORD CANDIDATE A</span>
            <span>Source: Catalog Stream</span>
          </div>
          <div>
            <label className="text-[11px] font-mono text-slate-500 block mb-1">Product Title</label>
            <input
              type="text"
              value={titleA}
              onChange={(e) => setTitleA(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-brand-500/50 font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono text-slate-500 block mb-1">Brand / Entity</label>
            <input
              type="text"
              value={brandA}
              onChange={(e) => setBrandA(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-brand-500/50 font-mono"
            />
          </div>
          <div className="text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Soundex Code: <span className="text-slate-300 font-semibold">{metrics.brandSoundexA}</span></span>
          </div>
        </div>

        {/* Record B */}
        <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/90 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-semibold">RECORD CANDIDATE B</span>
            <span>Source: Incoming Stream</span>
          </div>
          <div>
            <label className="text-[11px] font-mono text-slate-500 block mb-1">Product Title</label>
            <input
              type="text"
              value={titleB}
              onChange={(e) => setTitleB(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono text-slate-500 block mb-1">Brand / Entity</label>
            <input
              type="text"
              value={brandB}
              onChange={(e) => setBrandB(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>
          <div className="text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Soundex Code: <span className="text-slate-300 font-semibold">{metrics.brandSoundexB}</span></span>
          </div>
        </div>

      </div>

      {/* Feature Telemetry & Match Verdict */}
      <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800 space-y-4">
        
        {/* Metric bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block">Token Jaccard</span>
            <span className="text-lg font-bold text-white font-mono">{metrics.jaccard}%</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block">Levenshtein Ratio</span>
            <span className="text-lg font-bold text-white font-mono">{metrics.levRatio}%</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block">Edit Distance</span>
            <span className="text-lg font-bold text-white font-mono">{metrics.levDist} chars</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block">Phonetic Soundex</span>
            <span className={`text-lg font-bold font-mono ${metrics.soundexMatch ? 'text-emerald-400' : 'text-rose-400'}`}>
              {metrics.soundexMatch ? 'MATCH' : 'MISMATCH'}
            </span>
          </div>
        </div>

        {/* Prediction Bar */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <span>XGBoost Confidence Metric:</span>
              <span className="text-brand-400">{metrics.confidenceScore}%</span>
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
              metrics.isMatch 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}>
              {metrics.isMatch ? 'Linked Same Entity' : 'Different Entities (Pruned)'}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                metrics.isMatch
                  ? 'bg-gradient-to-r from-brand-500 to-emerald-400'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500'
              }`}
              style={{ width: `${metrics.confidenceScore}%` }}
            />
          </div>
        </div>

        {/* Technical Insight */}
        <div className="text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 font-mono flex items-start gap-2">
          <Database className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-200">Production Insight:</strong> In the 72-hour Amazon ML Challenge, Anish processed 336.9M possible candidate pairs by evaluating 8 blocking filters in memory, reducing candidate evaluation overhead by <strong>&gt;99.99%</strong> before feeding pairs to the 1,000-tree model.
          </span>
        </div>

      </div>
    </div>
  );
};
