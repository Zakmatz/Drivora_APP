import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import SafeImage from '../components/SafeImage.jsx';
import DriverCard from '../components/DriverCard.jsx';
import ErrorState from '../components/ErrorState.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { DemoBadge } from '../components/Badges.jsx';
import { DetailSkeleton } from '../components/Skeletons.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { api, isNotFound } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { waMessages } from '../config/siteConfig.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data, loading, error, reload } = useFetch((s) => api.service(slug, s), [slug]);
  const service = data?.data;
  usePageMeta(service?.name, service?.short_description);

  if (error && isNotFound(error)) return <NotFound message="Layanan yang Anda cari tidak ditemukan." />;
  if (error) return <div className="container-page pt-40 pb-20"><ErrorState error={error} onRetry={reload} /></div>;
  if (loading || !service) return <DetailSkeleton />;

  return (
    <>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.name }]} title={service.name} description={service.short_description}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <WhatsAppButton size="lg" message={waMessages.service(service.name)}>Tanya layanan ini</WhatsAppButton>
          <span className="chip !px-4 !py-2 text-sm">{service.price_description}</span>
        </div>
      </PageHeader>

      <section className="container-page pb-16">
        <Reveal><SafeImage src={service.image_url} alt={`Ilustrasi layanan ${service.name}`} priority className="aspect-[16/8] rounded-[2rem] shadow-lift" /></Reveal>
      </section>

      <section className="container-page grid gap-12 pb-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="text-2xl sm:text-3xl">Tentang layanan</h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.8] text-deep">{service.description}</p>
          <h3 className="mt-12 text-xl">Manfaat</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <li key={b} className="flex gap-3 rounded-2xl bg-quartz/30 p-4 text-sm leading-relaxed text-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />{b}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="space-y-6 lg:col-span-5">
          <Reveal delay={0.1} className="rounded-[2rem] border border-quartz/60 bg-white p-7 shadow-soft">
            <h3 className="flex items-center gap-2 text-lg"><MapPin size={18} className="text-red" aria-hidden="true" />Cakupan layanan</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-deep">
              {service.coverage.map((c) => <li key={c} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grey" />{c}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="rounded-[2rem] border border-quartz/60 bg-white p-7 shadow-soft">
            <h3 className="text-lg">Informasi penggunaan</h3>
            <ol className="mt-4 space-y-4 text-sm leading-relaxed text-deep">
              {service.usage_info.map((u, i) => (
                <li key={u} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red text-xs font-semibold text-snow">{i + 1}</span>{u}</li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {service.drivers?.length > 0 && (
        <section className="bg-quartz/25 py-20 sm:py-24">
          <div className="container-page">
            <SectionHeading title={`Pengemudi untuk ${service.name}`} description="Pengemudi yang melayani kategori ini." action={<DemoBadge label="Profil contoh" />} />
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.drivers.map((d) => <StaggerItem key={d.slug}><DriverCard driver={d} /></StaggerItem>)}
            </Stagger>
          </div>
        </section>
      )}

      <section className="section-y">
        <div className="container-page">
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[2.5rem] bg-quartz/45 p-8 sm:flex-row sm:items-center sm:p-12">
            <div>
              <h2 className="text-2xl sm:text-3xl">Tertarik dengan {service.name}?</h2>
              <p className="mt-2 text-sm text-deep">Tanyakan ketersediaan dan tarif langsung lewat WhatsApp.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton size="lg" message={waMessages.service(service.name)}>Hubungi via WhatsApp</WhatsAppButton>
              <Link to="/services" className="inline-flex h-14 items-center gap-1 rounded-full px-5 text-sm font-semibold text-ink hover:text-red">Layanan lain <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
