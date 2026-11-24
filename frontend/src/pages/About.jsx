import { Ban, MapPin, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import SafeImage from '../components/SafeImage.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { siteConfig, waMessages } from '../config/siteConfig.js';
import { aboutContent } from '../config/content.js';

const notList = [
  'Bukan aplikasi ride-hailing atau ojek online.',
  'Bukan rental atau penyewaan mobil — Kendaraan anda sendiri.',
  'Tidak ada akun, formulir booking, atau pembayaran di website. Semua disepakati lewat WhatsApp.',
];

export default function About() {
  usePageMeta('Tentang Kami', 'Tentang DRIVORA: platform informasi dan katalog jasa pengemudi profesional di Semarang dan sekitarnya.');
  return (
    <>
      <PageHeader title="Tentang DRIVORA" description="Platform informasi dan katalog jasa pengemudi profesional — membantu Anda menemukan pengemudi yang sesuai dengan kebutuhan perjalanan." />

      <section className="container-page grid items-center gap-14 pb-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SafeImage src="/images/about/about-team.svg" alt="Kemudi mobil dan jalan — ilustrasi" className="mx-auto aspect-[10/14] w-[min(80vw,340px)] rounded-[999px] shadow-lift lg:w-full lg:max-w-[380px]" />
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Tidak ingin mengemudi? Kami yang siapkan pengemudinya</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.8] text-deep">DRIVORA hadir untuk memudahkan masyarakat yang membutuhkan pengemudi profesional. Di website ini Anda dapat melihat layanan, mengenal profil pengemudi, lalu berkonsultasi langsung lewat WhatsApp.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 rounded-[1.75rem] bg-quartz/35 p-6 sm:p-7">
            <h3 className="text-lg">Yang perlu Anda ketahui</h3>
            <ul className="mt-4 space-y-3">
              {notList.map((t) => <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink"><Ban size={18} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />{t}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-quartz/25 py-20 sm:py-24">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[2rem] border border-quartz/60 bg-white p-8 shadow-soft sm:p-10">
            <h2 className="text-2xl">Visi</h2>
            <p className="mt-4 text-base leading-[1.8] text-deep">{aboutContent.vision}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] border border-quartz/60 bg-white p-8 shadow-soft sm:p-10">
            <h2 className="text-2xl">Misi</h2>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-deep">
              {aboutContent.mission.map((m) => <li key={m} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />{m}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading title="Nilai dan keunggulan layanan" />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((v) => (
              <StaggerItem key={v.title} className="rounded-[1.75rem] border border-quartz/60 bg-white p-6 shadow-soft">
                <h3 className="text-lg">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-page pb-24">
        <Reveal className="grid gap-10 rounded-[2.5rem] bg-quartz/45 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">Hubungi kami</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-deep">Ceritakan kebutuhan perjalanan Anda. Ketersediaan pengemudi, jadwal, dan tarif dibahas langsung lewat WhatsApp.</p>
            <WhatsAppButton size="lg" className="mt-7" message={waMessages.general()}>Chat via WhatsApp</WhatsAppButton>
          </div>
          <ul className="space-y-5 text-sm text-ink">
            <li className="flex gap-3"><MapPin size={20} className="mt-0.5 shrink-0 text-red" aria-hidden="true" /><span><strong className="block font-semibold">Area layanan</strong><span className="text-deep">{siteConfig.serviceArea}</span></span></li>
            <li className="flex gap-3"><MessageCircle size={20} className="mt-0.5 shrink-0 text-red" aria-hidden="true" /><span><strong className="block font-semibold">WhatsApp</strong><span className="text-deep">+{siteConfig.whatsappNumber}</span>{siteConfig.isDummyWhatsapp && <span className="mt-1 block text-xs text-deep">Nomor contoh untuk demo — bukan kontak resmi DRIVORA.</span>}</span></li>
          </ul>
        </Reveal>
      </section>
    </>
  );
}
