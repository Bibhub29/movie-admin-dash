export default function RatingStars({ rating = 0 }) {
  const outOfFive = Math.max(0, Math.min(5, Math.round((rating / 10) * 5) || 0));
  const full = '★'.repeat(outOfFive);
  const empty = '☆'.repeat(5 - outOfFive);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-amber-400">{full}{empty}</span>
      <span className="text-slate-400">{rating || 0}/10</span>
    </div>
  );
}
