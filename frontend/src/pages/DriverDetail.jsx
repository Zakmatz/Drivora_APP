import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Briefcase, ChevronRight, MessageSquareText, Star } from 'lucide-react';
import SafeImage from '../components/SafeImage.jsx';
import StarRating from '../components/StarRating.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import ErrorState from '../components/ErrorState.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import Button from '../components/Button.jsx';
import { AvailabilityChip } from '../components/Badges.jsx';
import { DetailSkeleton, ReviewCardSkeleton } from '../components/Skeletons.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { api, isNotFound } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { waMessages } from '../config/siteConfig.js';
import { formatRating } from '../utils/format.js';

function Group({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-deep">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

export default function DriverDetail() {
  const { slug } = useParams();
  const driverReq = useFetch((s) => api.driver(slug, s), [slug]);
  const reviewsReq = useFetch((s) => api.driverReviews(slug, { limit: 6 }, s), [slug]);
  const driver = driverReq.data?.data;
  usePageMeta(driver?.name, driver && `${driver.name} — ${driver.experience_years} tahun pengalaman. ${driver.description}`);

  if (driverReq.error && isNotFound(driverReq.error)) return <NotFound message="Profil pengemudi yang Anda cari tidak ditemukan." />;
  if (driverReq.error) return <div className="container-page pb-20 pt-40"><ErrorState error={driverReq.error} onRetry={driverReq.reload} /></div>;
  if (driverReq.loading || !driver) return <DetailSkeleton />;

  const reviews = reviewsReq.data?.data || [];

  return (
    <>
      <section className="container-page pb-16 pt-28 sm:pt-36">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-deep">
          <Link to="/" className="hover:text-red">Home</Link><ChevronRight size={14} className="text-grey" />
          <Link to="/drivers" className="hover:text-red">Drivers</Link><ChevronRight size={14} className="text-grey" />
          <span aria-current="page" className="font-medium text-ink">{driver.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <SafeImage src={driver.photo_url} alt={`Foto ilustrasi ${driver.name}`} priority className="aspect-[4/5] rounded-[2rem] shadow-lift" />
                <AvailabilityChip label={driver.availability_label} className="absolute left-5 top-5" />
              </div>

            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="text-4xl leading-tight sm:text-5xl">{driver.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <StarRating value={driver.rating_avg} size={18} showValue count={driver.review_count} />
              </div>
              <p className="mt-6 max-w-xl text-base leading-[1.8] text-deep">{driver.description}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid grid-cols-3 gap-3">
              {[[Briefcase, `${driver.experience_years} th`, 'Pengalaman'], [Star, formatRating(driver.rating_avg), 'Rating'], [MessageSquareText, driver.review_count, 'Ulasan']].map(([Icon, value, label]) => (
                <div key={label} className="rounded-2xl bg-quartz/30 p-4 sm:p-5">
                  <Icon size={18} className="text-red" aria-hidden="true" />
                  <p className="mt-3 text-2xl font-medium tracking-tight">{value}</p>
                  <p className="text-xs text-deep">{label}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-10 space-y-7">
              <Group title="Kendaraan yang dikuasai">{driver.vehicle_types.map((v) => <li key={v} className="chip !px-4 !py-1.5 text-sm">{v}</li>)}</Group>
              <Group title="Transmisi">{driver.transmission_types.map((v) => <li key={v} className="chip !px-4 !py-1.5 text-sm">{v}</li>)}</Group>
              <Group title="Spesialisasi perjalanan">{driver.specialties.map((v) => <li key={v} className="chip !px-4 !py-1.5 text-sm">{v}</li>)}</Group>
              <Group title="Layanan yang tersedia">
                {driver.services.map((s) => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`} className="inline-flex items-center gap-1 rounded-full border border-quartz bg-white px-4 py-1.5 text-sm font-medium transition hover:border-red hover:text-red">{s.name}<ArrowUpRight size={14} /></Link></li>
                ))}
              </Group>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 rounded-[2rem] bg-quartz/45 p-7 sm:p-8">
              <h2 className="text-xl">Tertarik dengan {driver.name.split(' ')[0]}?</h2>
              <p className="mt-2 text-sm text-deep">Tanyakan ketersediaan, jadwal, dan tarif langsung lewat WhatsApp.</p>
              <WhatsAppButton size="lg" className="mt-5" message={waMessages.driver(driver.name)}>Hubungi via WhatsApp</WhatsAppButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-quartz/25 py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl sm:text-4xl">Ulasan untuk {driver.name.split(' ')[0]}</h2>
            <Button to={`/reviews?driver=${driver.slug}`} variant="soft" size="sm" icon={<ArrowUpRight size={16} />}>Lihat di halaman ulasan</Button>
          </Reveal>
          <div className="mt-10">
            {reviewsReq.error ? <ErrorState error={reviewsReq.error} onRetry={reviewsReq.reload} /> : reviewsReq.loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <ReviewCardSkeleton key={i} />)}</div>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-deep">Belum ada ulasan untuk pengemudi ini.</p>
            ) : (
              <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r) => <StaggerItem key={r.id}><ReviewCard review={r} hideDriver /></StaggerItem>)}
              </Stagger>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
