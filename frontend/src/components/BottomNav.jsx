import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, LayoutGrid, Users } from 'lucide-react';
import { ease } from '../utils/motion.js';

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/services', label: 'Services', icon: LayoutGrid },
  { to: '/drivers', label: 'Drivers', icon: Users },
  { to: '/about', label: 'About', icon: Info },
];

/** Bottom Navigation Bar — hanya tampil di mobile (< md). */
export default function BottomNav() {
  return (
    <nav aria-label="Navigasi bawah" className="pb-safe fixed inset-x-0 bottom-0 z-50 px-4 md:hidden">
      <motion.ul
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
        className="mx-auto flex max-w-md items-center rounded-full border border-quartz/70 bg-snow/90 p-1.5 shadow-lift backdrop-blur-xl"
      >
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink to={to} end={end} className="relative flex flex-col items-center gap-0.5 rounded-full py-2 text-[11px] font-semibold">
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="bottom-pill" className="absolute inset-0 rounded-full bg-red/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <Icon className={`relative h-5 w-5 transition-colors ${isActive ? 'text-red' : 'text-grey'}`} strokeWidth={isActive ? 2.4 : 2} aria-hidden="true" />
                  <span className={`relative transition-colors ${isActive ? 'text-red' : 'text-deep'}`}>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
}
