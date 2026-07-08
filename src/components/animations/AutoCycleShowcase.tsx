import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { DiaTextReveal } from '../DiaText';
import { AnalyzeAnimation } from './AnalyzeAnimation';
import { ThinkAnimation } from './ThinkAnimation';
import { ConnectAnimation } from './ConnectAnimation';
import { IntenseAnimation } from './IntenseAnimation';
import { DeepAnimation } from './DeepAnimation';
import { TransferAnimation } from './TransferAnimation';

const CATEGORIES = ['Commercial', 'Residential', 'Sports & Play', 'Line Markings', 'Civil', 'Bespoke Works'];

const ANIMATION_BY_CATEGORY: Record<string, ComponentType> = {
  'Commercial': ConnectAnimation,
  'Residential': ThinkAnimation,
  'Sports & Play': IntenseAnimation,
  'Line Markings': TransferAnimation,
  'Civil': DeepAnimation,
  'Bespoke Works': AnalyzeAnimation,
};

export default function AutoCycleShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CATEGORIES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const category = CATEGORIES[index];
  const Animation = ANIMATION_BY_CATEGORY[category];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Animation key={category} />
      <div className="absolute inset-x-0 top-[22%] sm:top-[26%] flex justify-center pointer-events-none z-10 px-4">
        <h3 className="font-display text-7xl sm:text-9xl lg:text-[10rem] text-white text-center uppercase leading-none">
          <DiaTextReveal text={category} />
        </h3>
      </div>
    </div>
  );
}
