import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { ease } from '../utils/motion.js';

export default function NotFound({ message = 'Halaman yang Anda tuju tidak ada atau sudah dipindahkan.' }) {
  usePageMeta('Halaman tidak ditemukan');
  const digit = 'text-[7rem] font-semibold leading-none tracking-tighter text-ink sm:text-[11rem] lg:text-[14rem]';
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:pt-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-5" aria-hidden="true">
          <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className={digit}>4</motion.span>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease, delay: 0.1 }} className="h-[7rem] w-[4.6rem] overflow-hidden rounded-[999px] shadow-lift sm:h-[11rem] sm:w-[7.2rem] lg:h-[14rem] lg:w-[9.2rem]">
            <SafeImage src="/images/hero/hero-city.svg" alt="" className="h-full w-full" priority />
          </motion.div>
          <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }} className={digit}>4</motion.span>
        </div>

        <div className="relative mt-2 h-12 w-full max-w-md overflow-hidden" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-2 border-t-2 border-dashed border-quartz" />
          <motion.div animate={{ x: [-110, 460] }} transition={{ repeat: Infinity, duration: 7, ease: 'linear' }} className="absolute bottom-2 w-24">
            <SafeImage src="/images/hero/hero-car.svg" alt="" bare imgClassName="!h-auto object-contain" />
          </motion.div>
        </div>

        <h1 className="mt-8 text-3xl sm:text-4xl">Rute tidak ditemukan</h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-deep">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg">Kembali ke Home</Button>
          <Button to="/services" variant="soft" size="lg">Lihat Layanan</Button>
        </div>
      </div>
    </section>
  );
}
