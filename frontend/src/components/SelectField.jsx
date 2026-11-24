import { ChevronDown } from 'lucide-react';

export default function SelectField({ label, value, onChange, options, className = '' }) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field cursor-pointer appearance-none pr-11">
        {options.map(([v, text]) => <option key={v} value={v}>{text}</option>)}
      </select>
      <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey" aria-hidden="true" />
    </label>
  );
}
