import { Reveal } from './Reveal.jsx';

export default function SectionHeading({ title, description, action, eyebrow, className = '' }) {
  return (
    <Reveal className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-base leading-relaxed text-deep">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}
