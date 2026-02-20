export default function RatingStars({ rating = 0 }) {
  const filled = Math.round(rating / 2);
  return <div className="text-yellow-500">{'★'.repeat(filled)}{'☆'.repeat(5 - filled)}</div>;
}
