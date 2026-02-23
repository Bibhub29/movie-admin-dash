import Card from '../ui/Card';
import Badge from '../ui/Badge';
import RatingStars from './RatingStars';

export default function MovieCard({ movie, onOpen }) {
  return (
    <Card className="group overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
      <button type="button" onClick={() => onOpen(movie.id || movie._id)} className="w-full text-left">
        <img
          src={movie.coverImageUrl}
          alt={movie.title}
          className="h-60 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-1 text-base font-semibold text-white">{movie.title}</h3>
            <Badge>{`Rs. ${movie.price}`}</Badge>
          </div>
          <RatingStars rating={movie.rating} />
          <p className="line-clamp-2 text-sm text-slate-300">{movie.description}</p>
        </div>
      </button>
    </Card>
  );
}
