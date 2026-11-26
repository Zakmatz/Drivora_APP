import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-red text-snow shadow-red hover:-translate-y-0.5 hover:brightness-110',
  outline: 'border border-red bg-transparent text-red hover:bg-red hover:text-snow',
  soft: 'bg-quartz/45 text-ink hover:bg-quartz/80',
  light: 'bg-snow text-ink hover:bg-white',
};
const sizes = { sm: 'h-10 px-4 text-sm', md: 'h-12 px-6 text-sm', lg: 'h-14 px-8 text-base' };

/** Tombol/Link serbaya: <Button to> (router), <Button href> (anchor), atau <button>. */
export default function Button({ to, href, variant = 'primary', size = 'md', icon, className = '', children, ...rest }) {
  const cls = `group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition duration-300 active:scale-[.97] ${variants[variant]} ${sizes[size]} ${className}`;
  const body = (
    <>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{body}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{body}</a>;
  return <button type={rest.type || 'button'} className={cls} {...rest}>{body}</button>;
}
