
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '../components/Navbar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import Footer from '../components/Footer.jsx';
import OfflineBanner from '../components/OfflineBanner.jsx';
import { Skeleton } from '../components/Skeletons.jsx';
import { ease } from '../utils/motion.js';

// Urutan navigasi DRIVORA
const TAB_PATHS = [
  '/',
  '/services',
  '/drivers',
  '/reviews',
  '/about',
];

// Mengidentifikasi halaman berdasarkan URL
function getTabIndex(pathname) {
  if (pathname === '/') return 0;

  if (pathname === '/services' || pathname.startsWith('/services/')) {
    return 1;
  }

  if (pathname === '/drivers' || pathname.startsWith('/drivers/')) {
    return 2;
  }

  if (pathname === '/reviews' || pathname.startsWith('/reviews/')) {
    return 3;
  }

  if (pathname === '/about' || pathname.startsWith('/about/')) {
    return 4;
  }

  return -1;
}

// Variasi animasi halaman
const pageVariants = {
  enter: (direction) => ({
    x: direction === 0 ? 0 : `${direction * 100}%`,
    opacity: 0,
  }),

  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: {
        type: 'spring',
        stiffness: 260,
        damping: 30,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },

  exit: (direction) => ({
    x: direction === 0 ? 0 : `${direction * -100}%`,
    opacity: 0,
    transition: {
      x: {
        duration: 0.22,
        ease,
      },
      opacity: {
        duration: 0.16,
      },
    },
  }),
};

function PageFallback() {
  return (
    <div
      className="container-page pt-36"
      aria-busy="true"
      aria-label="Memuat halaman"
    >
      <Skeleton className="h-14 w-2/3 max-w-xl" />
      <Skeleton className="mt-5 h-5 w-1/2 max-w-md" />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

export default function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  const currentTabIndex = getTabIndex(pathname);

  // Menyimpan posisi tab sebelumnya
  const previousTabIndex = useRef(currentTabIndex);

  // Menentukan arah perpindahan
  const direction =
    currentTabIndex > previousTabIndex.current
      ? 1
      : currentTabIndex < previousTabIndex.current
        ? -1
        : 0;

  useLayoutEffect(() => {
    previousTabIndex.current = currentTabIndex;
  }, [currentTabIndex]);

  // Scroll kembali ke atas saat halaman berubah
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  // Gesture swipe kanan dan kiri
  const handlePanEnd = (event, info) => {
    if (currentTabIndex < 0) return;

    const target =
      event.target instanceof Element ? event.target : null;

    // Jangan mengganggu interaksi tombol, link, form, dan elemen khusus
    if (
      target?.closest(
        'a, button, input, textarea, select, [role="button"], [contenteditable="true"], [data-no-swipe], iframe, video'
      )
    ) {
      return;
    }

    const offsetX = info.offset.x;
    const offsetY = info.offset.y;
    const velocityX = info.velocity.x;

    // Prioritaskan scroll vertikal
    if (Math.abs(offsetX) < Math.abs(offsetY)) return;

    // Minimal jarak swipe 75px atau kecepatan 550px/detik
    if (
      Math.abs(offsetX) < 75 &&
      Math.abs(velocityX) < 550
    ) {
      return;
    }

    // Swipe kiri = tab berikutnya
    // Swipe kanan = tab sebelumnya
    const nextIndex =
      offsetX < 0
        ? currentTabIndex + 1
        : currentTabIndex - 1;

    // Jangan melewati batas navigasi
    if (nextIndex < 0 || nextIndex >= TAB_PATHS.length) {
      return;
    }

    navigate(TAB_PATHS[nextIndex]);
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">

      <a
        href="#konten"
        className="sr-only z-[100] rounded-full bg-red px-4 py-2 text-snow focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Lewati ke konten
      </a>

      <Navbar />

      <AnimatePresence
        mode="wait"
        initial={false}
        custom={direction}
      >
        <motion.main
          id="konten"
          key={pathname}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onPanEnd={handlePanEnd}
          style={{ touchAction: 'pan-y' }}
          className="relative w-full flex-1 pb-24 md:pb-0"
        >
          <Suspense fallback={<PageFallback />}>
            {outlet}
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />

      <BottomNav />

      <OfflineBanner />

    </div>
  );
}
