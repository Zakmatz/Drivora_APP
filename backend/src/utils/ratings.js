/** Ringkasan rating dari daftar angka: rata-rata (1 desimal), total, dan distribusi 5..1. */
export function summarizeRatings(ratings) {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;
  for (const r of ratings) { distribution[r] += 1; sum += r; }
  const total = ratings.length;
  return { average: total ? Math.round((sum / total) * 10) / 10 : 0, total, distribution };
}
