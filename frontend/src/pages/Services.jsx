import PageHeader from '../components/PageHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ErrorState from '../components/ErrorState.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { ServiceCardSkeleton } from '../components/Skeletons.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx';
import { api } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { waMessages } from '../config/siteConfig.js';
import { howItWorks } from '../config/content.js';

export default function Services() {
  usePageMeta('Layanan', 'Daily Driver, Trip Driver, dan Monthly Driver — pilih layanan pengemudi sesuai kebutuhan perjalanan Anda.');
  const { data, loading, error, reload } = useFetch((s) => api.services(s), []);

  return (
    <>
      <PageHeader title="Layanan pengemudi untuk setiap jenis kebutuhan" description="Tiga jenis layanan, satu cara memulai: pilih yang sesuai, lalu hubungi melalui WhatsApp." />
      <section className="container-page pb-20">
        {error ? <ErrorState error={error} onRetry={reload} /> : loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <ServiceCardSkeleton key={i} />)}</div>
        ) : (
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.data.map((s) => <StaggerItem key={s.slug}><ServiceCard service={s} /></StaggerItem>)}
          </Stagger>
        )}
      </section>

      <section className="bg-quartz/25 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading title="Cara memulai" description="Tanpa akun dan tanpa formulir — cukup chat." />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.1} className="rounded-[1.75rem] border border-quartz/60 bg-white p-7 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-red text-sm font-semibold text-snow">{i + 1}</span>
                <h3 className="mt-5 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep">{step.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10"><WhatsAppButton size="lg" message={waMessages.general()}>Konsultasi via WhatsApp</WhatsAppButton></Reveal>
        </div>
      </section>
    </>
  );
}
