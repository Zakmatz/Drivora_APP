import { Info } from 'lucide-react';

/** Penanda data demo/fiktif. */
export function DemoBadge({ label = 'Data contoh', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-quartz/50 px-2.5 py-1 text-[11px] font-semibold text-deep ${className}`} title="Data demo/fiktif — bukan pengemudi atau pelanggan asli">
      <Info size={12} aria-hidden="true" />{label}
    </span>
  );
}

export function AvailabilityChip({ label = 'Tersedia', className = '' }) {
  const live = label === 'Tersedia';
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-snow/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft backdrop-blur ${className}`}>
      <span className="relative flex h-2 w-2">
        {live && <span className="absolute inset-0 rounded-full bg-red animate-ping2" />}
        <span className={`relative h-2 w-2 rounded-full ${live ? 'bg-red' : 'bg-grey'}`} />
      </span>
      {label}
    </span>
  );
}
