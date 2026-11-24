import { Link } from 'react-router-dom';
import { ArrowUpRight, Car, MapPin, MessageCircle, UserCheck } from 'lucide-react';
import HeroSection from '../components/home/HeroSection.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import DriverCard from '../components/DriverCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import SafeImage from '../components/SafeImage.jsx';
import StarRating from '../components/StarRating.jsx';
import Button from '../components/Button.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import { DriverCardSkeleton, ReviewCardSkeleton, ServiceCardSkeleton } from '../components/Skeletons.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx';
import { api } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { waMessages } from '../config/siteConfig.js';
import { whyChoose } from '../config/content.js';
import { formatRating } from '../utils/format.js';

const icons = { UserCheck, Car, MessageCircle, MapPin };

export default function Home() {
  usePageMeta('', 'DRIVORA: katalog jasa pengemudi profesional di Semarang dan sekitarnya. Daily, Trip, dan Monthly Driver — konsultasi lewat WhatsApp.');

  const services = useFetch((s) => api.services(s), []);
  const drivers = useFetch((s) => api.drivers({ limit: 6, sort: 'rating' }, s), []);
  const reviews = useFetch((s) => api.reviews({ limit: 4 }, s), []);

  const summary = reviews.data?.meta?.summary;
  const heroLoading = services.loading || drivers.loading || reviews.loading;

  return (
    <>
      <HeroSection
        services={services.data?.data || []}
        drivers={drivers.data?.data || []}
        driverTotal={drivers.data?.meta?.total}
        summary={summary}
        loading={heroLoading && !services.data}
      />

      {/* Our Services */}
      <section id="layanan" className="section-y scroll-mt-16">
        <div className="container-page">
          <SectionHeading
            title="Layanan untuk setiap kebutuhan perjalanan"
            description="Pilih sesuai pola perjalanan Anda — harian, antarkota, atau kontrak bulanan."
            action={<Button to="/services" variant="soft" size="sm" icon={<ArrowUpRight size={16} />}>Semua layanan</Button>}
          />
          <div className="mt-12">
            {services.error ? <ErrorState error={services.error} onRetry={services.reload} /> : services.loading ? (
              <div className="grid gap-6 md:grid-cols-3">{[0, 1, 2].map((i) => <ServiceCardSkeleton key={i} />)}</div>
            ) : (
              <Stagger className="grid gap-6 md:grid-cols-3">
                {services.data.data.map((s) => <StaggerItem key={s.slug}><ServiceCard service={s} /></StaggerItem>)}
              </Stagger>
            )}
          </div>
        </div>
      </section>

      {/* Meet Our Drivers */}
      <section className="section-y bg-quartz/25">
        <div className="container-page">
          <SectionHeading
            title="Kenali pengemudi kami"
            description="Setiap profil menampilkan pengalaman, kendaraan yang dikuasai, dan rating dari ulasan."
            action={<Button to="/drivers" variant="soft" size="sm" icon={<ArrowUpRight size={16} />}>Semua pengemudi</Button>}
          />
          <div className="mt-12">
            {drivers.error ? <ErrorState error={drivers.error} onRetry={drivers.reload} /> : drivers.loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <DriverCardSkeleton key={i} />)}</div>
            ) : (
              <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
                {drivers.data.data.map((d) => <StaggerItem key={d.slug}><DriverCard driver={d} /></StaggerItem>)}
              </Stagger>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose DRIVORA */}
      <section className="section-y">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[10/14] w-[min(80vw,340px)] lg:w-full lg:max-w-[380px]">
              <SafeImage src="/images/about/about-team.svg" alt="Kemudi dan jalan — ilustrasi" className="h-full w-full rounded-[999px] shadow-lift" />
              <div className="absolute -right-3 bottom-16 rounded-2xl bg-snow px-5 py-4 shadow-lift sm:-right-8">
                <p className="text-3xl font-medium leading-none tracking-tight">3<span className="text-red">+</span></p>
                <p className="mt-1 text-xs text-deep">Jenis layanan</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeading title="Kenapa memilih DRIVORA" description="Kami menyediakan pengemudi yang tepat untuk anda." />
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {whyChoose.map((w) => {
                const Icon = icons[w.icon];
                return (
                  <StaggerItem key={w.title} className="rounded-[1.75rem] border border-quartz/60 bg-white p-6 shadow-soft">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-quartz/45 text-red"><Icon size={20} aria-hidden="true" /></span>
                    <h3 className="mt-5 text-lg">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-deep">{w.text}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-y bg-quartz/25">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">Kata pelanggan</h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-deep">Ulasan dari pelanggan yang sudah menggunakan jasa kami.</p>
            <div className="mt-8 flex items-end gap-4">
              <p className="text-6xl font-medium leading-none tracking-tight">{summary ? formatRating(summary.average) : '–'}</p>
              <div className="pb-1"><StarRating value={summary?.average || 0} size={18} /><p className="mt-1 text-sm text-deep">dari {summary?.total ?? 0} ulasan</p></div>
            </div>
            <Button to="/reviews" variant="outline" className="mt-8" icon={<ArrowUpRight size={16} />}>Semua ulasan</Button>
          </Reveal>
          <div className="lg:col-span-8">
            {reviews.error ? <ErrorState error={reviews.error} onRetry={reviews.reload} /> : reviews.loading ? (
              <div className="grid gap-6 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <ReviewCardSkeleton key={i} />)}</div>
            ) : (
              <Stagger className="grid gap-6 md:grid-cols-2" gap={0.1}>
                {reviews.data.data.map((r) => <StaggerItem key={r.id}><ReviewCard review={r} /></StaggerItem>)}
              </Stagger>
            )}
          </div>
        </div>
      </section>

      {/* CTA penutup */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-quartz/45 px-7 py-16 sm:px-14 sm:py-20">
              <div aria-hidden="true" className="absolute -right-10 -top-16 hidden h-80 w-48 rounded-full bg-snow/60 sm:block lg:right-24" />
              <div aria-hidden="true" className="absolute right-44 top-10 hidden h-52 w-32 rounded-full border border-grey/30 lg:block" />
              <div className="relative max-w-xl">
                <h2 className="text-3xl leading-tight sm:text-5xl">Siap berangkat bersama <span className="display-serif text-red">DRIVORA</span>?</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-deep">Ceritakan kebutuhan perjalanan Anda. Ketersediaan, jadwal, tarif, dan informasi lebih lanjut hubungi melalui WhatsApp.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <WhatsAppButton size="lg" message={waMessages.general()}>Hubungi via WhatsApp</WhatsAppButton>
                  <Button to="/drivers" variant="light" size="lg">Lihat Pengemudi</Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
