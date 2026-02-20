import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import RatingStars from './RatingStars';

export default function MovieCard({ movie }) {
  return (
    <Card className="space-y-3">
      <img src={movie.coverImageUrl} alt={movie.title} className="h-48 w-full rounded object-cover" />
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{movie.title}</h3>
        <Badge>₹{movie.price}</Badge>
      </div>
      <RatingStars rating={movie.rating} />
      <p className="line-clamp-2 text-sm text-slate-600">{movie.description}</p>
      <Link to={`/movies/${movie.id}`} className="text-sm font-medium text-blue-600">View Details</Link>
    </Card>
  );
}
