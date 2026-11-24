import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { waMessages } from '../config/siteConfig.js';
import { ease } from '../utils/motion.js';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/drivers', label: 'Drivers' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300 ${scrolled ? 'border-quartz/60 bg-snow/85 shadow-soft backdrop-blur-xl' : 'border-transparent bg-snow/0'
        }`}
    >
      <div className={`container-page flex items-center justify-between transition-[height] duration-300 ${scrolled ? 'h-16' : 'h-[4.5rem] md:h-20'}`}>
        <Logo className="h-8 sm:h-10" />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex lg:gap-10">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `relative py-2 text-sm font-semibold transition-colors ${isActive ? 'text-red' : 'text-deep hover:text-ink'}`}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-red" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <WhatsAppButton variant="outline" size="sm" message={waMessages.general()} arrow={false}>
          <span className="hidden sm:inline">Hubungi Kami</span>
          <span className="sm:hidden">Chat</span>
        </WhatsAppButton>
      </div>
    </motion.header>
  );
}
