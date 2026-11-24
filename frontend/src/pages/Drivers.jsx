import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import DriverCard from '../components/DriverCard.jsx';
import SelectField from '../components/SelectField.jsx';
import ErrorState, { EmptyState } from '../components/ErrorState.jsx';
import Button from '../components/Button.jsx';
import { DriverCardSkeleton } from '../components/Skeletons.jsx';
import { Stagger, StaggerItem } from '../components/Reveal.jsx';
import { api } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

const EXP = [['', 'Semua pengalaman'], ['3', 'Min. 3 tahun'], ['5', 'Min. 5 tahun'], ['6', 'Min. 6 tahun']];
const RATING = [['', 'Semua rating'], ['4.5', 'Rating 4,5 ke atas'], ['4.7', 'Rating 4,7 ke atas']];
const SORT = [['rating', 'Rating tertinggi'], ['experience', 'Pengalaman terlama'], ['name', 'Nama A–Z']];
const LIMIT = 9;

export default function Drivers() {
  usePageMeta('Pengemudi', 'Katalog pengemudi profesional DRIVORA: cari berdasarkan nama, pengalaman, atau rating.');
  const [search, setSearch] = useState('');
  const [exp, setExp] = useState('');
  const [rating, setRating] = useState('');
  const [sort, setSort] = useState('rating');
  const [page, setPage] = useState(1);
  const dSearch = useDebounce(search.trim(), 350);

  const { data, loading, error, reload } = useFetch(
    (s) => api.drivers({ search: dSearch, min_experience: exp, min_rating: rating, sort, page, limit: LIMIT }, s),
    [dSearch, exp, rating, sort, page]
  );

  const change = (setter) => (v) => { setter(v); setPage(1); };
  const filtered = Boolean(search || exp || rating);
  const reset = () => { setSearch(''); setExp(''); setRating(''); setSort('rating'); setPage(1); };
  const meta = data?.meta;

  return (
    <>
      <PageHeader title="Pengemudi profesional untuk perjalanan Anda" description="Lihat profil, pengalaman, dan ulasan sebelum menghubungi kami lewat WhatsApp.">
      </PageHeader>

      <section className="container-page pb-24">
        <div role="search" className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <label className="relative block md:col-span-2 lg:col-span-1">
            <span className="sr-only">Cari pengemudi berdasarkan nama</span>
            <Search size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-grey" aria-hidden="true" />
            <input type="search" value={search} onChange={(e) => change(setSearch)(e.target.value)} placeholder="Cari nama pengemudi" className="field pl-12" maxLength={60} />
          </label>
          <SelectField label="Filter pengalaman" value={exp} onChange={change(setExp)} options={EXP} />
          <SelectField label="Filter rating" value={rating} onChange={change(setRating)} options={RATING} />
          <SelectField label="Urutkan" value={sort} onChange={change(setSort)} options={SORT} />
        </div>

        <div className="mt-6 flex min-h-8 items-center justify-between text-sm text-deep" aria-live="polite">
          <p>{meta ? `${meta.total} pengemudi ditemukan` : 'Memuat…'}</p>
          {filtered && <button type="button" onClick={reset} className="inline-flex items-center gap-1 font-semibold text-red hover:underline"><X size={14} />Reset filter</button>}
        </div>

        <div className={`mt-4 transition-opacity duration-300 ${loading && data ? 'opacity-50' : ''}`}>
          {error ? <ErrorState error={error} onRetry={reload} /> : !data ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <DriverCardSkeleton key={i} />)}</div>
          ) : data.data.length === 0 ? (
            <EmptyState title="Tidak ada pengemudi yang cocok" text="Coba ubah kata kunci atau longgarkan filter pengalaman dan rating." action={<Button variant="outline" size="sm" onClick={reset}>Reset filter</Button>} />
          ) : (
            <Stagger key={`${dSearch}-${exp}-${rating}-${sort}-${page}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
              {data.data.map((d) => <StaggerItem key={d.slug}><DriverCard driver={d} /></StaggerItem>)}
            </Stagger>
          )}
        </div>

        {meta && meta.totalPages > 1 && (
          <nav aria-label="Halaman" className="mt-12 flex items-center justify-center gap-4">
            <Button variant="soft" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="disabled:opacity-40"><ChevronLeft size={16} />Sebelumnya</Button>
            <span className="text-sm text-deep">Halaman {meta.page} dari {meta.totalPages}</span>
            <Button variant="soft" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)} className="disabled:opacity-40">Berikutnya<ChevronRight size={16} /></Button>
          </nav>
        )}
      </section>
    </>
  );
}
