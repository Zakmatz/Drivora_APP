import { useState } from 'react';
import { CheckCircle2, Send, Star } from 'lucide-react';
import SelectField from './SelectField.jsx';
import Button from './Button.jsx';
import { api, getErrorMessage } from '../services/api.js';

const MAX = 500;

/** Formulir ulasan tanpa login. Nama diisi sendiri oleh pengunjung. */
export default function ReviewForm({ drivers = [], defaultDriver = '', onSubmitted }) {
    const [form, setForm] = useState({ name: '', driver: defaultDriver, rating: 0, comment: '', website: '' });
    const [hover, setHover] = useState(0);
    const [status, setStatus] = useState('idle'); // idle | sending | done | error
    const [error, setError] = useState('');
    const [published, setPublished] = useState(false);

    const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
    const valid = form.name.trim().length >= 2 && form.driver && form.rating >= 1 && form.comment.trim().length >= 10;
    const options = [['', 'Pilih pengemudi'], ...drivers.map((d) => [d.slug, d.name])];

    const submit = async (e) => {
        e.preventDefault();
        if (!valid || status === 'sending') return;
        setStatus('sending'); setError('');
        try {
            const res = await api.createReview({ customer_name: form.name, driver_slug: form.driver, rating: form.rating, comment: form.comment, website: form.website });
            setPublished(Boolean(res.data?.published));
            setStatus('done');
            onSubmitted?.(res.data);
        } catch (err) {
            setError(getErrorMessage(err));
            setStatus('error');
        }
    };

    if (status === 'done') {
        return (
            <div role="status" className="flex flex-col items-center rounded-[2rem] border border-quartz/60 bg-white px-8 py-14 text-center shadow-soft">
                <CheckCircle2 size={44} className="text-red" aria-hidden="true" />
                <h3 className="mt-5 text-2xl">Terima kasih atas ulasan Anda!</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-deep">
                    {published ? 'Ulasan Anda sudah tampil di daftar.' : 'Ulasan Anda akan tampil setelah kami tinjau.'}
                </p>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => { setForm({ name: '', driver: defaultDriver, rating: 0, comment: '', website: '' }); setStatus('idle'); }}>
                    Tulis ulasan lain
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={submit} noValidate className="relative rounded-[2rem] border border-quartz/60 bg-white p-7 shadow-soft sm:p-10">
            <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink">Nama Anda</span>
                    <input type="text" value={form.name} onChange={(e) => set('name')(e.target.value)} maxLength={60} autoComplete="name" placeholder="Contoh: Budi Santoso" className="field" required />
                </label>
                <div>
                    <span className="mb-2 block text-sm font-semibold text-ink">Pengemudi yang diulas</span>
                    <SelectField label="Pengemudi yang diulas" value={form.driver} onChange={set('driver')} options={options} />
                </div>
            </div>

            <div className="mt-6">
                <span id="rating-label" className="mb-1 block text-sm font-semibold text-ink">Penilaian</span>
                <div role="radiogroup" aria-labelledby="rating-label" className="flex gap-1" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => {
                        const on = (hover || form.rating) >= n;
                        return (
                            <button key={n} type="button" role="radio" aria-checked={form.rating === n} aria-label={`${n} bintang`} onClick={() => set('rating')(n)} onMouseEnter={() => setHover(n)} className="rounded-lg p-1 transition active:scale-90">
                                <Star size={34} fill={on ? 'currentColor' : 'none'} strokeWidth={1.6} className={`transition ${on ? 'text-red' : 'text-grey'}`} />
                            </button>
                        );
                    })}
                </div>
            </div>

            <label className="mt-6 block">
                <span className="mb-2 flex items-center justify-between text-sm font-semibold text-ink">
                    Ulasan Anda <span className="text-xs font-normal text-deep">{form.comment.length}/{MAX}</span>
                </span>
                <textarea value={form.comment} onChange={(e) => set('comment')(e.target.value)} maxLength={MAX} rows={4} placeholder="Ceritakan pengalaman Anda (min. 10 karakter)" className="w-full resize-y rounded-3xl border border-quartz bg-white px-5 py-4 text-sm text-ink placeholder:text-grey transition focus:border-red focus:outline-none focus:ring-4 focus:ring-red/10" required />
            </label>

            {/* Honeypot anti-bot: tersembunyi dari manusia */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(e) => set('website')(e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" />

            {status === 'error' && <p role="alert" className="mt-5 rounded-2xl bg-red/10 px-4 py-3 text-sm text-red">{error}</p>}

            <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" disabled={!valid || status === 'sending'} className="disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0" icon={<Send size={16} />}>
                    {status === 'sending' ? 'Mengirim…' : 'Kirim ulasan'}
                </Button>
                <p className="text-xs text-deep">Tanpa login. Nama Anda akan tampil bersama ulasan.</p>
            </div>
        </form>
    );
}