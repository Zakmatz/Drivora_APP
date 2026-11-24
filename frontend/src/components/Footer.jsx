import { Link } from 'react-router-dom';
import { MapPin, MessageCircle } from 'lucide-react';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { siteConfig, waMessages } from '../config/siteConfig.js';

const nav = [
  ['Home', '/'], ['Services', '/services'], ['Drivers', '/drivers'], ['Reviews', '/reviews'], ['About', '/about'],
];

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden bg-quartz/35">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center font-sans text-[22vw] font-extrabold leading-none tracking-tighter text-grey/10 md:-bottom-10">
        DRIVORA
      </div>
      <div className="container-page relative grid gap-12 pb-28 pt-16 md:grid-cols-12 md:pb-32">
        <div className="md:col-span-5">
          <Logo className="h-20" />
          <p className="mt-5 max-w-xs text-lg font-medium leading-snug text-ink">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-deep">Katalog penyedia jasa pengemudi profesional. Kendaraan anda, pengemudi kami.</p>
          <div className="mt-6"><WhatsAppButton message={waMessages.general()}>Hubungi via WhatsApp</WhatsAppButton></div>
        </div>

        <nav aria-label="Navigasi footer" className="md:col-span-3">
          <h2 className="text-sm font-semibold text-ink">Jelajahi</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map(([label, to]) => (
              <li key={to}><Link to={to} className="text-sm text-deep transition hover:text-red">{label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold text-ink">Kontak & area layanan</h2>
          <ul className="mt-4 space-y-3 text-sm text-deep">
            <li className="flex items-start gap-2.5"><MapPin size={18} className="mt-0.5 shrink-0 text-grey" aria-hidden="true" /><span>Area layanan: {siteConfig.serviceArea}</span></li>
            <li className="flex items-start gap-2.5"><MessageCircle size={18} className="mt-0.5 shrink-0 text-grey" aria-hidden="true" />
              <span>WhatsApp: +{siteConfig.whatsappNumber}{siteConfig.isDummyWhatsapp && <span className="mt-1 block text-xs text-grey">Nomor contoh untuk demo — bukan kontak resmi.</span>}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-quartz/70">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-deep sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DRIVORA. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
