import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import SafeImage from '../SafeImage.jsx';
import WhatsAppButton from '../WhatsAppButton.jsx';
import Button from '../Button.jsx';
import { Skeleton } from '../Skeletons.jsx';
import { waMessages } from '../../config/siteConfig.js';
import { ease, fadeUp, stagger } from '../../utils/motion.js';
import { formatRating } from '../../utils/format.js';

/** Satu baris headline yang "naik" dari balik mask — momen orkestrasi utama saat halaman dibuka. */
function Line({ children, className = '' }) {
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <motion.span className={`block ${className}`} variants={{ hidden: { y: '115%' }, show: { y: 0, transition: { duration: 1, ease } } }}>
        {children}
      </motion.span>
    </span>
  );
}

function Stat({ value, suffix, label }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1 text-sm text-deep">{label}</dt>
      <dd className="text-4xl font-medium tracking-tight sm:text-5xl">{value}<span className="text-red">{suffix}</span></dd>
    </div>
  );
}

function HeroVisual({ sectionRef }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const cityY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '8%']);
  const carY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);

  return (
    <div className="relative mx-auto aspect-[10/14] w-[min(76vw,330px)] sm:w-[360px] lg:w-full lg:max-w-[400px]">
      {/* Lengkung kota — terbuka dari bawah ke atas */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px)' }}
        transition={{ duration: 1.3, ease, delay: 0.1 }}
        className="absolute inset-0 overflow-hidden rounded-[999px] bg-quartz/50 shadow-lift"
      >
        <motion.div style={{ y: cityY, scale: 1.1 }} className="h-full w-full">
          <SafeImage src="/images/hero/hero-city.svg" alt="Gedung-gedung perkotaan (ilustrasi)" priority className="h-full w-full" />
        </motion.div>
      </motion.div>

      {/* Mobil — keluar dari bingkai lengkung */}
      <motion.div
        style={{ y: carY }}
        initial={{ x: 180, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease, delay: 0.6 }}
        className="pointer-events-none absolute -bottom-3 left-[-15%] z-10 w-[130%] lg:-bottom-2 lg:left-[-14%] lg:w-[178%]"
      >
        <SafeImage src="/images/hero/hero-car.svg" alt="Sedan modern berwarna silver (ilustrasi)" priority bare imgClassName="!h-auto object-contain" />
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 1.2 }}
        className="absolute right-[-7%] top-[30%] z-20"
      >
        <Link to="/drivers" aria-label="Lihat pengemudi" className="grid h-16 w-16 place-items-center rounded-full bg-red text-snow shadow-red transition duration-300 hover:rotate-12 hover:scale-105 lg:h-20 lg:w-20">
          <ArrowUpRight className="h-7 w-7 lg:h-8 lg:w-8" />
        </Link>
      </motion.div>
    </div>
  );
}

export default function HeroSection({ services = [], drivers = [], summary, driverTotal, loading }) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const current = services[active];
  const go = (d) => setActive((i) => (i + d + services.length) % services.length);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip">

      <motion.div
        variants={stagger(0.12, 0.15)}
        initial="hidden"
        animate="show"
        className="container-page relative grid gap-x-6 gap-y-12 pb-16 pt-28 sm:pt-32 lg:min-h-[max(100svh,760px)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:pb-14"
      >
        {/* A — headline */}
        <div className="lg:col-span-4 lg:row-start-1">
          <h1 className="text-[2.9rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[3.9rem] xl:text-[4.25rem]">
            <Line>Driver untuk</Line>
            <Line>Setiap</Line>
            <Line className="display-serif text-red">Perjalanan.</Line>
          </h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-sm text-base leading-relaxed text-deep">
            Temukan pengemudi profesional untuk memenuhi kebutuhan perjalanan Anda — di Semarang dan sekitarnya.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton message={waMessages.general()}>Chat via WhatsApp</WhatsAppButton>
            <Button to="/services" variant="soft">Lihat Layanan</Button>
          </motion.div>
        </div>

        {/* B — visual lengkung + mobil */}
        <div className="relative lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:self-end">
          <HeroVisual sectionRef={sectionRef} />
        </div>

        {/* C — statistik + layanan unggulan */}
        <motion.div variants={stagger(0.1, 0.9)} className="flex flex-col gap-9 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:items-end lg:pt-2 lg:text-right">
          <motion.dl variants={fadeUp} className="flex gap-10 sm:gap-14">
            {loading ? (
              <><Skeleton className="h-16 w-28" /><Skeleton className="h-16 w-28" /></>
            ) : (
              <>
                <Stat value={driverTotal ?? drivers.length} suffix="+" label="Pengemudi" />
                <Stat value={formatRating(summary?.average)} suffix="/5" label="Rating" />
              </>
            )}
          </motion.dl>

          <motion.div variants={fadeUp} className="w-full max-w-sm">
            <p className="text-sm font-medium text-deep">Layanan unggulan</p>
            {loading || !current ? (
              <div className="mt-3 space-y-3"><Skeleton className="h-10 w-3/4 lg:ml-auto" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6 lg:ml-auto" /></div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div key={current.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease }}>
                    <h2 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">{current.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-deep">{current.short_description}</p>
                    <Link to={`/services/${current.slug}`} className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red">
                      Lihat detail <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-7 flex items-center gap-3 lg:justify-end">
                  {services.map((s, i) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Tampilkan layanan ${s.name}`}
                      aria-pressed={i === active}
                      className={`h-14 w-14 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-snow transition duration-300 ${i === active ? 'scale-105 ring-red' : 'opacity-70 ring-transparent hover:opacity-100'}`}
                    >
                      <SafeImage src={s.image_url} alt="" className="h-full w-full" />
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 lg:justify-end">
                  {[[-1, ArrowLeft, 'Layanan sebelumnya'], [1, ArrowRight, 'Layanan berikutnya']].map(([d, Icon, label]) => (
                    <button key={label} type="button" onClick={() => go(d)} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-quartz text-deep transition hover:border-red hover:text-red active:scale-90">
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* D — ulasan singkat */}
        <motion.div variants={fadeUp} className="self-end lg:col-span-4 lg:row-start-2">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {drivers.slice(0, 4).map((d) => (
                <SafeImage key={d.slug} src={d.photo_url} alt="" className="h-12 w-12 rounded-full ring-2 ring-snow" />
              ))}
            </div>
            <div>
              <p className="text-3xl font-medium leading-none tracking-tight">{summary?.total ?? '–'}<span className="text-red">+</span></p>
              <p className="mt-1 text-sm text-deep">Ulasan</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-deep">Pengemudi berpengalaman untuk kebutuhan harian, perjalanan, dan kontrak bulanan.</p>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={() => document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Gulir ke layanan"
        className="absolute bottom-8 right-8 z-20 hidden h-14 w-14 place-items-center rounded-full border border-quartz bg-snow/70 text-deep backdrop-blur transition hover:border-red hover:text-red lg:grid"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-ping2 rounded-full border border-quartz" />
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
