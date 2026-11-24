import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import StarRating from '../components/StarRating.jsx';
import SelectField from '../components/SelectField.jsx';
import ErrorState, { EmptyState } from '../components/ErrorState.jsx';
import Button from '../components/Button.jsx';
import { ReviewCardSkeleton, Skeleton } from '../components/Skeletons.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx';
import { api } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { formatRating } from '../utils/format.js';

const LIMIT = 9;

export default function Reviews() {
  usePageMeta('Ulasan', 'Ulasan pelanggan DRIVORA beserta ringkasan rating.');
  const [params, setParams] = useSearchParams();
  const driver = params.get('driver') || '';
  const [rating, setRating] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  const driversReq = useFetch((s) => api.drivers({ limit: 50, sort: 'name' }, s), []);
  const { data, loading, error, reload } = useFetch((s) => api.reviews({ driver, rating, page, limit: LIMIT }, s), [driver, rating, page]);

  useEffect(() => {
    if (!data) return;
    setItems((prev) => (data.meta.page === 1 ? data.data : [...prev, ...data.data.filter((r) => !prev.some((p) => p.id === r.id))]));
  }, [data]);

  const setDriver = (v) => { setParams(v ? { driver: v } : {}, { replace: true }); setPage(1); };
  const setRatingFilter = (v) => { setRating(v); setPage(1); };
  const summary = data?.meta?.summary;
  const total = data?.meta?.total ?? 0;
  const hasMore = data && data.meta.page < data.meta.totalPages;
  const driverOptions = [['', 'Semua pengemudi'], ...(driversReq.data?.data || []).map((d) => [d.slug, d.name])];

  return (
    <>
      <PageHeader title="Apa kata pelanggan" description="Ringkasan penilaian dan ulasan untuk setiap pengemudi.">
      </PageHeader>

      <section className="container-page pb-24">
        <Reveal className="grid gap-8 rounded-[2rem] border border-quartz/60 bg-white p-7 shadow-soft sm:p-10 md:grid-cols-[auto_1fr] md:gap-14">
          <div>
            {summary ? (
              <>
                <p className="text-7xl font-medium leading-none tracking-tight">{formatRating(summary.average)}</p>
                <StarRating value={summary.average} size={20} className="mt-4" />
                <p className="mt-2 text-sm text-deep">dari {summary.total} ulasan</p>
              </>
            ) : <><Skeleton className="h-16 w-28" /><Skeleton className="mt-4 h-5 w-32" /></>}
          </div>
          <div className="space-y-2.5" role="group" aria-label="Filter berdasarkan rating">
            {[5, 4, 3, 2, 1].map((n) => {
              const count = summary?.distribution?.[n] ?? 0;
              const pct = summary?.total ? (count / summary.total) * 100 : 0;
              const on = rating === String(n);
              return (
                <button key={n} type="button" aria-pressed={on} onClick={() => setRatingFilter(on ? '' : String(n))} className={`group flex w-full items-center gap-4 rounded-full px-3 py-1.5 text-sm transition ${on ? 'bg-red/10' : 'hover:bg-quartz/30'}`}>
                  <span className="w-12 shrink-0 text-left font-semibold">{n} bintang</span>
                  <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-quartz/50"><span className="absolute inset-y-0 left-0 rounded-full bg-red transition-[width] duration-700" style={{ width: `${pct}%` }} /></span>
                  <span className="w-6 shrink-0 text-right text-deep">{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <SelectField label="Filter pengemudi" value={driver} onChange={setDriver} options={driverOptions} className="sm:max-w-xs" />
          {(driver || rating) && <button type="button" onClick={() => { setDriver(''); setRatingFilter(''); }} className="justify-self-start text-sm font-semibold text-red hover:underline sm:justify-self-end">Reset filter</button>}
        </div>
        <p className="mt-5 text-sm text-deep" aria-live="polite">{data ? `${total} ulasan` : 'Memuat…'}</p>

        <div className="mt-4">
          {error ? <ErrorState error={error} onRetry={reload} /> : !data && items.length === 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <ReviewCardSkeleton key={i} />)}</div>
          ) : items.length === 0 && !loading ? (
            <EmptyState title="Belum ada ulasan" text="Tidak ada ulasan yang cocok dengan filter ini." />
          ) : (
            <Stagger key={`${driver}-${rating}`} className={`grid gap-6 transition-opacity md:grid-cols-2 lg:grid-cols-3 ${loading && page === 1 ? 'opacity-50' : ''}`} gap={0.06}>
              {items.map((r) => <StaggerItem key={r.id}><ReviewCard review={r} /></StaggerItem>)}
            </Stagger>
          )}
        </div>

        {hasMore && <div className="mt-10 text-center"><Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={loading}>{loading ? 'Memuat…' : 'Muat lebih banyak'}</Button></div>}
      </section>
    </>
  );
}
