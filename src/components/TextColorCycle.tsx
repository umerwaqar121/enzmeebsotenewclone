import { motion } from 'motion/react';

interface TextColorCycleProps {
  children: string;
  colors?: string[];
  className?: string;
}

/**
 * Looping text color-cycle animation (21st.dev/@aliimam/components/text-color —
 * exact source is gated behind the registry CLI, so this rebuilds the documented
 * behavior: text smoothly cycles through a set of colors on a loop).
 */
export default function TextColorCycle({
  children,
  colors = ['#FF6B00', '#ffffff', '#FF6B00'],
  className = '',
}: TextColorCycleProps) {
  return (
    <motion.span
      className={className}
      animate={{ color: colors }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  );
}
