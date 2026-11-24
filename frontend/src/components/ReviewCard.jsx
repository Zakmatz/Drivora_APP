import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';
import { formatDate, initials } from '../utils/format.js';

export default function ReviewCard({ review, hideDriver = false }) {
  return (
    <figure className="flex h-full flex-col rounded-[2rem] border border-quartz/60 bg-white p-7 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <StarRating value={review.rating} size={16} />
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink">“{review.comment}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-quartz/50 pt-5">
        <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-quartz/50 text-sm font-semibold text-deep">{initials(review.customer_name)}</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{review.customer_name}</p>
          <p className="truncate text-xs text-deep">
            {!hideDriver && review.driver && (
              <>Mengulas <Link to={`/drivers/${review.driver.slug}`} className="font-medium text-red hover:underline">{review.driver.name}</Link> · </>
            )}
            <time dateTime={review.review_date}>{formatDate(review.review_date)}</time>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
