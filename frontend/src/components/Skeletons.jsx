export const Skeleton = ({ className = '' }) => <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />;

export const ServiceCardSkeleton = () => (
  <div className="overflow-hidden rounded-[2rem] border border-quartz/50 bg-white" aria-hidden="true">
    <Skeleton className="aspect-[4/3] rounded-none" />
    <div className="space-y-3 p-7"><Skeleton className="h-7 w-1/2" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /><Skeleton className="mt-6 h-10 w-full rounded-full" /></div>
  </div>
);

export const DriverCardSkeleton = () => (
  <div className="overflow-hidden rounded-[2rem] border border-quartz/50 bg-white" aria-hidden="true">
    <Skeleton className="aspect-[4/5] rounded-none" />
    <div className="space-y-3 p-6"><Skeleton className="h-6 w-2/3" /><Skeleton className="h-4 w-1/3" /><Skeleton className="h-4 w-full" /><Skeleton className="mt-5 h-10 w-full rounded-full" /></div>
  </div>
);

export const ReviewCardSkeleton = () => (
  <div className="rounded-[2rem] border border-quartz/50 bg-white p-7" aria-hidden="true">
    <Skeleton className="h-4 w-28" /><Skeleton className="mt-6 h-4 w-full" /><Skeleton className="mt-2 h-4 w-full" /><Skeleton className="mt-2 h-4 w-2/3" />
    <div className="mt-8 flex items-center gap-3"><Skeleton className="h-11 w-11 rounded-full" /><Skeleton className="h-4 w-40" /></div>
  </div>
);

export const DetailSkeleton = () => (
  <div className="container-page pt-32 sm:pt-40" aria-busy="true" aria-label="Memuat">
    <div className="grid gap-10 lg:grid-cols-2">
      <Skeleton className="aspect-[4/3] rounded-[2rem]" />
      <div className="space-y-4"><Skeleton className="h-12 w-2/3" /><Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-5/6" /><Skeleton className="h-5 w-3/4" /><Skeleton className="mt-8 h-14 w-56 rounded-full" /></div>
    </div>
  </div>
);
