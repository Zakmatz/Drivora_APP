import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import Footer from '../components/Footer.jsx';
import OfflineBanner from '../components/OfflineBanner.jsx';
import { Skeleton } from '../components/Skeletons.jsx';
import { ease } from '../utils/motion.js';

function PageFallback() {
  return (
    <div className="container-page pt-36" aria-busy="true" aria-label="Memuat halaman">
      <Skeleton className="h-14 w-2/3 max-w-xl" />
      <Skeleton className="mt-5 h-5 w-1/2 max-w-md" />
      <div className="mt-12 grid gap-6 md:grid-cols-3"><Skeleton className="h-72" /><Skeleton className="h-72" /><Skeleton className="h-72" /></div>
    </div>
  );
}

export default function MainLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#konten" className="sr-only z-[100] rounded-full bg-red px-4 py-2 text-snow focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Lewati ke konten</a>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="konten"
          key={pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="flex-1 pb-24 md:pb-0"
        >
          <Suspense fallback={<PageFallback />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BottomNav />
      <OfflineBanner />
    </div>
  );
}
