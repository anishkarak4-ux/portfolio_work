import React, { useState, useEffect, useRef } from 'react';
import { Eye, Sliders, Activity, RefreshCw, Crosshair, Sparkles } from 'lucide-react';

type FilterMode = 'raw' | 'clahe' | 'sobel' | 'threshold' | 'tracking';

export const DIPPlayground: React.FC = () => {
  const [filterMode, setFilterMode] = useState<FilterMode>('tracking');
  const [threshold, setThreshold] = useState<number>(128);
  const [trackingConfidence, setTrackingConfidence] = useState<number>(0.96);
  const [fps, setFps] = useState<number>(35.88);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation loop for tracking simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;
    const trail: { x: number; y: number }[] = [];

    const render = () => {
      t += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      // Clear
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw synthetic background grid & industrial surface texture
      ctx.strokeStyle = '#141d2e';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Moving Target Coordinates (Lissajous curve simulating moving defect or inspection target)
      const centerX = width / 2;
      const centerY = height / 2;
      const targetX = centerX + Math.sin(t * 1.2) * (width * 0.32);
      const targetY = centerY + Math.cos(t * 0.9) * (height * 0.28);
      const targetSize = 48;

      // Update trajectory trail
      trail.push({ x: targetX, y: targetY });
      if (trail.length > 25) trail.shift();

      // Render mode based visuals
      if (filterMode === 'raw') {
        // Draw synthetic object
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(targetX, targetY, targetSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw synthetic static background defects
        ctx.fillStyle = '#e11d48';
        ctx.beginPath();
        ctx.arc(width * 0.25, height * 0.35, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(width * 0.75, height * 0.65, 20, 20);

      } else if (filterMode === 'clahe') {
        // High contrast equalized style
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);
        
        // Gradient contrast circle
        const grad = ctx.createRadialGradient(targetX, targetY, 4, targetX, targetY, targetSize * 1.5);
        grad.addColorStop(0, '#4ade80');
        grad.addColorStop(0.5, '#16a34a');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(targetX, targetY, targetSize * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // High contrast contours
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.strokeRect(targetX - targetSize / 2, targetY - targetSize / 2, targetSize, targetSize);

      } else if (filterMode === 'sobel') {
        // Edge gradient visualization (cyan edges on black)
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(targetX, targetY, targetSize / 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(width * 0.25 - 12, height * 0.35 - 12, 24, 24);
        ctx.strokeRect(width * 0.75, height * 0.65, 20, 20);

      } else if (filterMode === 'threshold') {
        // Binary mask based on threshold state
        ctx.fillStyle = threshold > 130 ? '#000000' : '#0a0f1d';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(targetX, targetY, targetSize / 2 * (threshold / 128), 0, Math.PI * 2);
        ctx.fill();

      } else if (filterMode === 'tracking') {
        // CSRT / YOLOv8 Telemetry Overlay
        
        // 1. Draw Trajectory Trail
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        trail.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // 2. Draw Object
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(targetX, targetY, targetSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3. Draw CSRT Bounding Box with Corner Accents
        const boxX = targetX - targetSize * 0.8;
        const boxY = targetY - targetSize * 0.8;
        const boxW = targetSize * 1.6;
        const boxH = targetSize * 1.6;

        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Center reticle
        ctx.strokeStyle = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(targetX - 8, targetY);
        ctx.lineTo(targetX + 8, targetY);
        ctx.moveTo(targetX, targetY - 8);
        ctx.lineTo(targetX, targetY + 8);
        ctx.stroke();

        // Telemetry HUD Tag
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(boxX, boxY - 24, 140, 20);
        ctx.fillStyle = '#4ade80';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(`CSRT: ${(trackingConfidence * 100).toFixed(0)}% [${targetX.toFixed(0)},${targetY.toFixed(0)}]`, boxX + 6, boxY - 10);
      }

      // Top corner telemetry HUD
      ctx.fillStyle = 'rgba(8, 11, 17, 0.8)';
      ctx.fillRect(10, 10, 190, 60);
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(10, 10, 190, 60);

      ctx.fillStyle = '#22c55e';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`FILTER: ${filterMode.toUpperCase()}`, 20, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`PIPELINE: 35.88 FPS (BENCH)`, 20, 44);
      ctx.fillText(`RES: ${width}x${height} INT8`, 20, 60);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [filterMode, threshold, trackingConfidence]);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Eye className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              DIP Inspection & Tracking Telemetry Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Live Browser Simulation of Anish's 8-Stage Image Processing & CSRT/YOLOv8 Telemetry Pipeline
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'tracking', label: 'CSRT Tracking' },
            { id: 'clahe', label: 'CLAHE Equalizer' },
            { id: 'sobel', label: 'Sobel Gradients' },
            { id: 'threshold', label: 'Adaptive Mask' },
            { id: 'raw', label: 'Raw Feed' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setFilterMode(m.id as FilterMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filterMode === m.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="my-6 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={320}
          className="w-full max-w-2xl h-auto aspect-[2/1] object-contain"
        />
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-md text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>REAL-TIME 35.88 FPS</span>
        </div>
      </div>

      {/* Sliders & Diagnostic Readout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Threshold Cutoff</span>
            <span className="text-cyan-400 font-bold">{threshold} / 255</span>
          </div>
          <input
            type="range"
            min={30}
            max={225}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">CSRT Confidence Limit</span>
            <span className="text-emerald-400 font-bold">{(trackingConfidence * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={0.99}
            step={0.01}
            value={trackingConfidence}
            onChange={(e) => setTrackingConfidence(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400">Benchmark Result</div>
          <div className="text-sm font-semibold text-white font-mono flex items-center gap-1.5">
            <Crosshair className="w-4 h-4 text-brand-400" />
            <span>100% Success @ 200 Frames</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Evaluated on real video telemetry datasets
          </div>
        </div>
      </div>

    </div>
  );
};
