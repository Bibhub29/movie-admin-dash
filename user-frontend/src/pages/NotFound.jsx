import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mb-4">Page not found.</p>
        <Link className="text-blue-600" to="/">Go Home</Link>
      </div>
    </div>
  );
}
