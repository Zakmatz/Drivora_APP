import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ease } from '../utils/motion.js';

/** Header halaman daftar/info dengan dekorasi lengkung khas DRIVORA. */
export default function PageHeader({ title, description, crumbs = [], children }) {
  return (
    <header className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-24 hidden h-72 w-44 rounded-full bg-quartz/35 md:block lg:right-24" />
      <div aria-hidden="true" className="pointer-events-none absolute right-40 top-40 hidden h-44 w-28 rounded-full border border-quartz md:block lg:right-56" />
      <div className="container-page relative">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-deep">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} className="text-grey" />}
                {c.to ? <Link to={c.to} className="hover:text-red">{c.label}</Link> : <span aria-current="page" className="font-medium text-ink">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
          {title}
        </motion.h1>
        {description && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }} className="mt-5 max-w-xl text-base leading-relaxed text-deep sm:text-lg">
            {description}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  );
}
