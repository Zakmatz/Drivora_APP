import { useEffect, useRef, useState } from 'react';
import { ImageOff } from 'lucide-react';

const DEFAULT_FALLBACK = '/images/fallback.svg';

/**
 * Gambar dengan: lazy loading native, skeleton shimmer, reveal (fade + un-blur) saat selesai dimuat,
 * dan fallback otomatis jika gagal (tidak pernah broken image).
 * - priority: untuk gambar above-the-fold (eager).
 * - bare: tanpa latar/skeleton (untuk gambar transparan seperti cutout mobil).
 */
export default function SafeImage({ src, alt = '', className = '', imgClassName = '', priority = false, bare = false, fallback = DEFAULT_FALLBACK }) {
  const [current, setCurrent] = useState(src || fallback);
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  const ref = useRef(null);

  useEffect(() => { setCurrent(src || fallback); setStatus('loading'); }, [src, fallback]);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setStatus('loaded'); // sudah ada di cache
  }, [current]);

  const onError = () => {
    if (current !== fallback) setCurrent(fallback);
    else setStatus('error');
  };

  return (
    <div className={`relative overflow-hidden ${bare ? '' : 'bg-quartz/40'} ${className}`}>
      {!bare && status === 'loading' && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {status === 'error' ? (
        <div className="absolute inset-0 grid place-items-center text-grey" role="img" aria-label={alt || 'Gambar tidak tersedia'}>
          <ImageOff className="h-8 w-8" />
        </div>
      ) : (
        <img
          ref={ref}
          src={current}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={onError}
          className={`h-full w-full object-cover transition duration-[900ms] ease-out ${status === 'loaded' ? 'scale-100 opacity-100 blur-0' : 'scale-[1.06] opacity-0 blur-md'} ${imgClassName}`}
        />
      )}
    </div>
  );
}
