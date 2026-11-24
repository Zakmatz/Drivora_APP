import { motion } from 'framer-motion';
import { ease, fadeUp, stagger, viewportOnce } from '../utils/motion.js';

/** Muncul (fade + naik) saat masuk viewport. Dihormati prefers-reduced-motion lewat MotionConfig di App. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Kontainer stagger: anak <StaggerItem> muncul berurutan saat masuk viewport. */
export function Stagger({ children, className = '', gap = 0.1, as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={stagger(gap)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className = '', as = 'div' }) {
  const Tag = motion[as];
  return <Tag className={className} variants={fadeUp}>{children}</Tag>;
}
