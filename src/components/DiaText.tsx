import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DiaTextProps {
  text: string[];
  repeat?: boolean;
  repeatDelay?: number;
  className?: string;
}

/**
 * Faithful reimplementation of the "Dia Text" cycling-word reveal
 * (21st.dev/@edwinvakayil/components/dia-text — exact source is gated
 * behind the registry CLI, so this rebuilds the documented behavior:
 * an array of strings, each sweeping in and holding before the next).
 */
/**
 * Controlled variant — parent drives which string shows via `text`, no internal timer.
 * Pass `colors` to also loop the text color (21st.dev/@aliimam/components/text-color style).
 * Pass `skipEntrance` for text that remounts often (e.g. a cycling label) so it doesn't
 * replay its fade-in on every switch; one-time headings should leave it false to animate in.
 */
export function DiaTextReveal({ text, className = '', colors, skipEntrance = false }: { text: string; className?: string; colors?: string[]; skipEntrance?: boolean }) {
  return (
    <span className={`relative inline-grid ${className}`}>
      <AnimatePresence mode="wait" initial={!skipEntrance}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: '60%', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: '0%', filter: 'blur(0px)', ...(colors ? { color: colors } : {}) }}
          exit={{ opacity: 0, y: '-60%', filter: 'blur(6px)' }}
          transition={
            colors
              ? { default: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }, color: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
              : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
          }
          className="col-start-1 row-start-1"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function DiaText({ text, repeat = false, repeatDelay = 1.1, className = '' }: DiaTextProps) {
  const [index, setIndex] = useState(0);
  const isLast = index === text.length - 1;

  useEffect(() => {
    if (isLast && !repeat) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % text.length);
    }, repeatDelay * 1000 + 900);
    return () => clearTimeout(id);
  }, [index, isLast, repeat, repeatDelay, text.length]);

  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: '60%', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-60%', filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`col-start-1 row-start-1 ${className}`}
        >
          {text[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
