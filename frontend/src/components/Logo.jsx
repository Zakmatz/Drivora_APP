import { Link } from 'react-router-dom';

/** Logo DRIVORA. File ada di public/branding/ — timpa dengan logo asli tanpa mengubah kode. */
export default function Logo({ variant = 'horizontal', className = 'h-9', to = '/' }) {
  const isMark = variant === 'mark';
  const img = (
    <img
      src={isMark ? '/branding/drivora-mark.svg' : '/branding/drivora-logo.png'}
      alt="DRIVORA"
      width={isMark ? 40 : 150}
      height={40}
      className={`w-auto ${className}`}
      decoding="async"
    />
  );
  if (!to) return img;
  return <Link to={to} aria-label="DRIVORA — kembali ke beranda" className="inline-flex shrink-0 items-center">{img}</Link>;
}
