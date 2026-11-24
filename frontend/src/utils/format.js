const dateFmt = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (iso) => (iso ? dateFmt.format(new Date(iso)) : '');
export const initials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
export const formatRating = (n) => (n ? Number(n).toFixed(1) : '–');
