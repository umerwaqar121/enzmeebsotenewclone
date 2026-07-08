import React, { useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  longDesc: string;
  bg: string;
  timeline: string;
  materials: string;
}

interface ImageGalleryProps {
  services: ServiceItem[];
  onSelect: (id: string) => void;
  setCursorHovered: (hovered: boolean) => void;
}

export default function ImageGallery({ services, onSelect, setCursorHovered }: ImageGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full select-none">
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-charcoal border border-border text-white flex items-center justify-center hover:bg-amber-primary hover:text-asphalt transition-all shadow-lg"
        onMouseEnter={() => setCursorHovered(true)}
        onMouseLeave={() => setCursorHovered(false)}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable belt */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => onSelect(service.id)}
            className="relative shrink-0 w-[300px] md:w-[340px] h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-charcoal cursor-none group"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${service.bg})` }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" />

            {/* Top label */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest text-amber-primary uppercase px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-amber-primary/20">
                {service.num}
              </span>
              <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-amber-primary group-hover:text-asphalt group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
              <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-amber-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-3">
                {service.desc}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[9px] font-mono text-amber-primary/80 uppercase tracking-wider">
                <span>Timeline: {service.timeline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-charcoal border border-border text-white flex items-center justify-center hover:bg-amber-primary hover:text-asphalt transition-all shadow-lg"
        onMouseEnter={() => setCursorHovered(true)}
        onMouseLeave={() => setCursorHovered(false)}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Hide scrollbar */}
      <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
