import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import SafeImage from './SafeImage.jsx';
import Button from './Button.jsx';
import StarRating from './StarRating.jsx';
import { AvailabilityChip } from './Badges.jsx';

export default function DriverCard({ driver }) {
  const href = `/drivers/${driver.slug}`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-quartz/60 bg-white shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={href} className="relative block overflow-hidden" aria-label={`Lihat profil ${driver.name}`}>
        <div className="transition duration-700 ease-out group-hover:scale-[1.04]">
          <SafeImage src={driver.photo_url} alt={`Foto ilustrasi ${driver.name}`} className="aspect-[4/5]" />
        </div>
        <AvailabilityChip label={driver.availability_label} className="absolute left-4 top-4" />
        {/* {driver.is_demo && <DemoBadge label="Demo" className="absolute right-4 top-4 bg-snow/90 backdrop-blur" />} */}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl"><Link to={href} className="hover:text-red">{driver.name}</Link></h3>
          <StarRating value={driver.rating_avg} size={14} showValue className="mt-1 shrink-0" />
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-deep">
          <Briefcase size={14} className="text-grey" aria-hidden="true" />
          {driver.experience_years} tahun pengalaman · {driver.review_count} ulasan
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-deep">{driver.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {driver.specialties.slice(0, 2).map((s) => <li key={s} className="chip">{s}</li>)}
        </ul>
        <Button to={href} variant="outline" size="sm" className="mt-auto w-full" icon={<ArrowUpRight size={16} />}>
          Lihat Profil
        </Button>
      </div>
    </article>
  );
}
