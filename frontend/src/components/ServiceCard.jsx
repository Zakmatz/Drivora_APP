import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import SafeImage from './SafeImage.jsx';
import Button from './Button.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { waMessages } from '../config/siteConfig.js';

export default function ServiceCard({ service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-quartz/60 bg-white shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={`/services/${service.slug}`} className="block overflow-hidden" aria-label={`Lihat detail ${service.name}`}>
        <div className="transition duration-700 ease-out group-hover:scale-[1.04]">
          <SafeImage src={service.image_url} alt={`Ilustrasi layanan ${service.name}`} className="aspect-[4/3]" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-deep">{service.short_description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.features.map((f) => (
            <li key={f} className="chip"><Check size={12} className="text-red" aria-hidden="true" />{f}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-3 pt-7">
          <Button to={`/services/${service.slug}`} variant="soft" size="sm" className="flex-1" icon={<ArrowUpRight size={16} />}>Lihat Detail</Button>
          <WhatsAppButton iconOnly message={waMessages.service(service.name)} ariaLabel={`Tanya layanan ${service.name} via WhatsApp`} />
        </div>
      </div>
    </article>
  );
}
