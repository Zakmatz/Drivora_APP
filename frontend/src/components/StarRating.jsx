import { Star } from 'lucide-react';
import { formatRating } from '../utils/format.js';

export default function StarRating({ value = 0, size = 16, showValue = false, count, className = '' }) {
  const pct = (Math.max(0, Math.min(5, value)) / 5) * 100;
  const stars = [0, 1, 2, 3, 4].map((i) => <Star key={i} size={size} fill="currentColor" strokeWidth={0} className="shrink-0" />);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative inline-flex" role="img" aria-label={`Rating ${formatRating(value)} dari 5`}>
        <span className="flex text-quartz">{stars}</span>
        <span className="absolute inset-y-0 left-0 flex overflow-hidden text-red" style={{ width: `${pct}%` }}>{stars}</span>
      </span>
      {showValue && <span className="text-sm font-semibold text-ink">{formatRating(value)}</span>}
      {count != null && <span className="text-sm text-deep">({count})</span>}
    </span>
  );
}
