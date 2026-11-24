import { AnimatePresence, motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus.js';

/** Memberi tahu pengguna saat offline agar data tersimpan tidak disangka data terbaru. */
export default function OfflineBanner() {
  const online = useOnlineStatus();
  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          role="status"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed bottom-24 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-snow shadow-lift md:bottom-6"
        >
          <WifiOff size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>Anda sedang offline. Data yang tampil mungkin bukan yang terbaru.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
