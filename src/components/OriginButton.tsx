import * as React from 'react';
import { motion } from 'motion/react';

function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y)
      )
  );
}

type OriginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  fillColor?: string;
  fillTextColor?: string;
  contentClassName?: string;
};

export const OriginButton = React.forwardRef<HTMLButtonElement, OriginButtonProps>(
  (
    {
      children,
      className = '',
      disabled,
      fillColor = 'var(--color-amber-primary)',
      fillTextColor = 'var(--color-asphalt)',
      contentClassName = 'justify-center',
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      onPointerCancel,
      style,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [hovered, setHovered] = React.useState(false);
    const [pressed, setPressed] = React.useState(false);
    const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
    const [coverSize, setCoverSize] = React.useState(0);

    const updateOrigin = React.useCallback((x: number, y: number) => {
      const node = buttonRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setOrigin({ x, y });
      setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
    }, []);

    const showFill = !disabled && (hovered || pressed);

    return (
      <motion.button
        {...props}
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        disabled={disabled}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          if (disabled) return;
          const rect = e.currentTarget.getBoundingClientRect();
          updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
          setHovered(true);
        }}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          if (disabled) return;
          const rect = e.currentTarget.getBoundingClientRect();
          updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
          setPressed(true);
        }}
        onPointerUp={(e) => {
          onPointerUp?.(e);
          setPressed(false);
        }}
        onPointerCancel={(e) => {
          onPointerCancel?.(e);
          setPressed(false);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          setHovered(false);
          setPressed(false);
        }}
        style={{ ...style, color: showFill ? fillTextColor : style?.color }}
        className={`relative inline-flex items-center justify-center overflow-hidden transition-colors duration-300 ${className}`}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={false}
          animate={{ scale: showFill && coverSize > 0 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: coverSize, height: coverSize, left: origin.x, top: origin.y, background: fillColor }}
        />
        <span className={`relative z-10 inline-flex items-center gap-2 w-full ${contentClassName}`}>
          {children}
        </span>
      </motion.button>
    );
  }
);
OriginButton.displayName = 'OriginButton';
