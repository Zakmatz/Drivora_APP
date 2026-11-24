import { AlertTriangle, WifiOff } from 'lucide-react';
import Button from './Button.jsx';
import { getErrorMessage } from '../services/api.js';

export default function ErrorState({ error, onRetry, className = '' }) {
  const offline = typeof navigator !== 'undefined' && !navigator.onLine;
  const Icon = offline ? WifiOff : AlertTriangle;
  return (
    <div role="alert" className={`mx-auto flex max-w-md flex-col items-center rounded-[2rem] border border-quartz/60 bg-white px-8 py-12 text-center shadow-soft ${className}`}>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-quartz/40 text-red"><Icon size={26} /></span>
      <h3 className="mt-5 text-xl">{offline ? 'Anda sedang offline' : 'Data belum bisa dimuat'}</h3>
      <p className="mt-2 text-sm leading-relaxed text-deep">{getErrorMessage(error)}</p>
      {onRetry && <Button variant="outline" size="sm" className="mt-6" onClick={onRetry}>Coba lagi</Button>}
    </div>
  );
}

export function EmptyState({ title, text, action }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-deep">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
