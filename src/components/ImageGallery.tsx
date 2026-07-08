import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full select-none" id="image-gallery-container">
      {/* Desktop & Tablet Lg: Expanding Accordion Layout */}
      <div className="hidden lg:flex flex-row gap-3 h-[380px] w-full overflow-hidden items-stretch">
        {services.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={service.id}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setCursorHovered(true);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setCursorHovered(false);
              }}
              onClick={() => onSelect(service.id)}
              style={{ flex: isHovered ? '2.8 1 0%' : '1 1 0%' }}
              className="relative h-full rounded-2xl overflow-hidden border border-white/5 bg-charcoal cursor-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end p-6"
            >
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out" 
                style={{ 
                  backgroundImage: `url(${service.bg})`,
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)' 
                }}
              ></div>
              
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt/95 via-asphalt/50 to-transparent"></div>
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-40'}`}></div>

              {/* Top-Right Icon */}
              <div className={`absolute top-5 right-5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${isHovered ? 'bg-amber-primary text-asphalt rotate-45 border-transparent' : ''}`}>
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Text Information */}
              <div className="relative z-10 transition-transform duration-300">
                <span className="text-[9px] font-mono tracking-widest text-amber-primary block mb-1.5 uppercase">
                  {service.num}
                </span>
                <h3 className="text-base font-bold tracking-tight text-white mb-2 truncate">
                  {service.title}
                </h3>
                
                {/* Expandable description block */}
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ 
                    maxHeight: isHovered ? '110px' : '0px',
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? '8px' : '0px'
                  }}
                >
                  <p className="text-xs text-white/80 font-light leading-relaxed max-w-[280px]">
                    {service.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-[9px] font-mono text-amber-primary/90">
                    <span>TIMELINE: {service.timeline}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet Fallback Grid (Compact cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => onSelect(service.id)}
            className="relative h-[200px] rounded-2xl overflow-hidden border border-white/5 bg-charcoal p-5 flex flex-col justify-end cursor-none"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.bg})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-asphalt/95 via-asphalt/50 to-transparent"></div>
            
            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>

            <div className="relative z-10">
              <span className="text-[8px] font-mono tracking-widest text-amber-primary block mb-1 uppercase">
                {service.num}
              </span>
              <h3 className="text-sm font-bold text-white mb-1">
                {service.title}
              </h3>
              <p className="text-[11px] text-white/70 font-light line-clamp-2 leading-snug">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
