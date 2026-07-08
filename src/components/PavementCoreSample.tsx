import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LayerInfo {
  name: string;
  thickness: string;
  desc: string;
  gradientTop: string;
  gradientSide: string;
  gradientSideRight: string;
  height: number; // visual height in pixels
}

const materialLayers: Record<string, LayerInfo[]> = {
  tarmac: [
    {
      name: 'Tarmacadam Wear Course',
      thickness: '40mm',
      desc: '6mm dense stone mastic hot-rolled mix',
      gradientTop: 'from-zinc-700 to-zinc-850',
      gradientSide: 'from-zinc-800 to-zinc-950',
      gradientSideRight: 'from-zinc-850 to-zinc-900',
      height: 18,
    },
    {
      name: 'Asphalt Binder Course',
      thickness: '60mm',
      desc: '20mm structural support macadam',
      gradientTop: 'from-zinc-800 to-zinc-950',
      gradientSide: 'from-zinc-900 to-black',
      gradientSideRight: 'from-zinc-950 to-zinc-900',
      height: 22,
    },
    {
      name: 'Granular Sub-Base',
      thickness: '150mm',
      desc: 'MOT Type 1 high compaction crushed limestone',
      gradientTop: 'from-zinc-500 to-zinc-650',
      gradientSide: 'from-zinc-600 to-zinc-800',
      gradientSideRight: 'from-zinc-650 to-zinc-700',
      height: 38,
    },
  ],
  sma: [
    {
      name: 'SMA Stone Mastic Wear Course',
      thickness: '45mm',
      desc: 'Premium polymer-modified mastic asphalt',
      gradientTop: 'from-neutral-700 to-neutral-850',
      gradientSide: 'from-neutral-800 to-neutral-950',
      gradientSideRight: 'from-neutral-850 to-neutral-900',
      height: 20,
    },
    {
      name: 'Heavy Duty Binder Course',
      thickness: '65mm',
      desc: 'Heavy load-bearing high-density asphalt core',
      gradientTop: 'from-zinc-800 to-zinc-950',
      gradientSide: 'from-zinc-900 to-black',
      gradientSideRight: 'from-zinc-950 to-zinc-900',
      height: 24,
    },
    {
      name: 'Compacted Limestone Sub-base',
      thickness: '150mm',
      desc: 'Sovereign MOT Type 1 aggregate base',
      gradientTop: 'from-zinc-400 to-zinc-550',
      gradientSide: 'from-zinc-500 to-zinc-700',
      gradientSideRight: 'from-zinc-550 to-zinc-600',
      height: 38,
    },
  ],
  tar_chip: [
    {
      name: 'Wicklow Gold Gravel Chips',
      thickness: '15mm',
      desc: 'Rustic gold granite chips embedded in hot tar',
      gradientTop: 'from-amber-700 to-amber-900',
      gradientSide: 'from-amber-850 to-amber-950',
      gradientSideRight: 'from-amber-900 to-amber-800',
      height: 14,
    },
    {
      name: 'Hot Bituminous Binder Spray',
      thickness: '10mm',
      desc: 'High viscosity liquid asphalt seal spray',
      gradientTop: 'from-neutral-900 to-neutral-950',
      gradientSide: 'from-neutral-950 to-black',
      gradientSideRight: 'from-black to-neutral-950',
      height: 10,
    },
    {
      name: 'Stabilized Roadbase Foundation',
      thickness: '150mm',
      desc: 'Double-compacted crushed granite rock core',
      gradientTop: 'from-zinc-500 to-zinc-650',
      gradientSide: 'from-zinc-600 to-zinc-800',
      gradientSideRight: 'from-zinc-650 to-zinc-700',
      height: 38,
    },
  ],
  resin: [
    {
      name: 'Seamless Resin Bound Veneer',
      thickness: '18mm',
      desc: 'Water-permeable contemporary quartz & polyurethane matrix',
      gradientTop: 'from-amber-500 to-amber-700',
      gradientSide: 'from-amber-600 to-amber-800',
      gradientSideRight: 'from-amber-700 to-amber-650',
      height: 16,
    },
    {
      name: 'Open-Graded Asphalt Substrate',
      thickness: '50mm',
      desc: 'Highly permeable open binder macadam',
      gradientTop: 'from-zinc-800 to-zinc-950',
      gradientSide: 'from-zinc-900 to-black',
      gradientSideRight: 'from-zinc-950 to-zinc-900',
      height: 20,
    },
    {
      name: 'Crushed Rock MOT Type 3 Sub-base',
      thickness: '150mm',
      desc: 'Clean gravel drainage foundation layers',
      gradientTop: 'from-zinc-400 to-zinc-550',
      gradientSide: 'from-zinc-500 to-zinc-700',
      gradientSideRight: 'from-zinc-550 to-zinc-600',
      height: 38,
    },
  ],
  wetpour: [
    {
      name: 'Vibrant EPDM Safety Cap',
      thickness: '15mm',
      desc: 'High-density color-fast EPDM safety rubber floor granules',
      gradientTop: 'from-emerald-500 to-emerald-700',
      gradientSide: 'from-emerald-600 to-emerald-800',
      gradientSideRight: 'from-emerald-700 to-emerald-650',
      height: 14,
    },
    {
      name: 'SBR Shock-Absorbing Cushion',
      thickness: '25mm',
      desc: 'Recycled rubber impact attenuation buffer',
      gradientTop: 'from-neutral-800 to-neutral-900',
      gradientSide: 'from-neutral-900 to-black',
      gradientSideRight: 'from-neutral-950 to-neutral-900',
      height: 18,
    },
    {
      name: 'Compacted Dry-Stone Base',
      thickness: '100mm',
      desc: 'Clean aggregate subgrade drainage bedding',
      gradientTop: 'from-zinc-550 to-zinc-650',
      gradientSide: 'from-zinc-600 to-zinc-750',
      gradientSideRight: 'from-zinc-650 to-zinc-700',
      height: 32,
    },
  ],
  thermoplastic: [
    {
      name: 'High-Reflector Thermoplastic',
      thickness: '5mm',
      desc: 'Department-grade hot-screeded marking with solid glass beads',
      gradientTop: 'from-yellow-400 to-yellow-500',
      gradientSide: 'from-yellow-500 to-yellow-600',
      gradientSideRight: 'from-yellow-550 to-yellow-500',
      height: 10,
    },
    {
      name: 'Asphalt Support Wear Course',
      thickness: '40mm',
      desc: 'Dense support asphalt surface layers',
      gradientTop: 'from-zinc-700 to-zinc-850',
      gradientSide: 'from-zinc-800 to-zinc-950',
      gradientSideRight: 'from-zinc-850 to-zinc-900',
      height: 18,
    },
    {
      name: 'Compacted Limestone Base',
      thickness: '150mm',
      desc: 'MOT Type 1 high compaction aggregate',
      gradientTop: 'from-zinc-500 to-zinc-650',
      gradientSide: 'from-zinc-600 to-zinc-800',
      gradientSideRight: 'from-zinc-650 to-zinc-700',
      height: 38,
    },
  ],
};

interface PavementCoreSampleProps {
  materialId: string;
}

export default function PavementCoreSample({ materialId }: PavementCoreSampleProps) {
  // Safe fallback to 'tarmac' if key not found
  const layers = materialLayers[materialId] || materialLayers['tarmac'];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-black/30 border border-white/5 rounded-2xl select-none overflow-hidden relative" id="core-sample-visualizer">
      {/* Visual background lights */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-amber-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-amber-primary/10 rounded-full blur-2xl"></div>

      <div className="w-full flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <span className="text-[10px] font-mono tracking-widest text-amber-primary uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-amber-primary rounded-full animate-pulse"></span>
          Interactive Spec Cross-Section (3D View)
        </span>
        <span className="text-[9px] font-mono text-zinc-500">CIRI STANDARD CODE: EN-2026</span>
      </div>

      <div className="relative w-full h-[220px] flex items-center justify-center pt-4">
        {/* The 3D isometric stack container */}
        <div className="relative w-[210px] h-[160px] [transform-style:preserve-3d] [perspective:800px] flex flex-col items-center">
          
          <AnimatePresence mode="popLayout">
            <motion.div
              key={materialId}
              initial={{ opacity: 0, y: 15, rotateX: 30, rotateY: -15, rotateZ: 5 }}
              animate={{ opacity: 1, y: 0, rotateX: 25, rotateY: -15, rotateZ: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Stack layout with computed gaps to look like a floating multi-tier road sample */}
              <div className="relative flex flex-col items-center gap-[4px]" style={{ transformStyle: 'preserve-3d' }}>
                {layers.map((layer, index) => {
                  return (
                    <motion.div
                      key={`${materialId}-${index}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        zIndex: 30 - index,
                      }}
                      className="relative cursor-none hover:translate-y-[-2px] transition-transform duration-200"
                    >
                      {/* Top Isometric Face */}
                      <div 
                        className={`w-[150px] h-[55px] bg-gradient-to-br ${layer.gradientTop} rounded-sm shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]`}
                        style={{
                          transform: 'rotateX(60deg) rotateZ(-45deg)',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                        }}
                      >
                        {/* Realistic speckle texture for aggregate look */}
                        <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none rounded-sm"></div>
                        
                        {/* Edge lighting */}
                        <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-sm"></div>
                      </div>

                      {/* Left Side Extruded Face (Simulated 3D Thickness) */}
                      <div 
                        className={`absolute left-[13px] top-[26px] w-[75px] bg-gradient-to-b ${layer.gradientSide} border-r border-black/30`}
                        style={{
                          height: `${layer.height}px`,
                          transform: 'skewY(20deg)',
                          transformOrigin: 'top left',
                        }}
                      >
                        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none"></div>
                      </div>

                      {/* Right Side Extruded Face (Simulated 3D Thickness) */}
                      <div 
                        className={`absolute right-[13px] top-[26px] w-[75px] bg-gradient-to-b ${layer.gradientSideRight} border-l border-white/5`}
                        style={{
                          height: `${layer.height}px`,
                          transform: 'skewY(-20deg)',
                          transformOrigin: 'top right',
                        }}
                      >
                        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none"></div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* HUD pointer lines overlay to add massive tech/luxury spec aesthetic */}
        <div className="absolute inset-0 pointer-events-none">
          {layers.map((layer, index) => {
            const isTop = index === 0;
            const isMid = index === 1;
            const isBottom = index === 2;

            // positions calculated to align elegantly around the 3D block
            let labelStyle = "absolute left-2";
            let lineX = "left-[95px]";
            let lineY = "top-[65px]";
            let pointStyle = "";

            if (isTop) {
              labelStyle = "absolute left-1 top-[20px] text-left";
            } else if (isMid) {
              labelStyle = "absolute right-1 top-[70px] text-right";
            } else if (isBottom) {
              labelStyle = "absolute left-1 bottom-[20px] text-left";
            }

            return (
              <motion.div 
                key={`label-${materialId}-${index}`}
                initial={{ opacity: 0, x: isMid ? 15 : -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={`${labelStyle} max-w-[100px] z-20`}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-zinc-100 font-sans tracking-tight leading-tight block">
                    {layer.name}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[8px] font-mono text-amber-primary font-black bg-amber-primary/10 px-1 py-px rounded border border-amber-primary/20">
                      {layer.thickness}
                    </span>
                    <span className="text-[7px] text-zinc-400 font-mono truncate">{index === 0 ? 'WEAR CAP' : index === 1 ? 'BINDER CORE' : 'FOUNDATION'}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Material Summary Card Footer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={materialId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full mt-2 bg-white/5 border border-white/5 rounded-xl p-3 text-center"
        >
          <p className="text-[10px] text-zinc-300 font-light leading-relaxed">
            <strong className="text-white font-semibold">Active Spec Structure:</strong> {layers.map(l => `${l.name} (${l.thickness})`).join(' over ')}. Engineered to exceed Irish highway standards.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
