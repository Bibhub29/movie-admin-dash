import { Link } from 'react-router-dom';
import { getToken, removeToken } from '../../services/tokenService';

export default function Navbar() {
  const isLoggedIn = Boolean(getToken());

  return (
    <nav className="sticky top-0 z-20 bg-slate-900 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="text-lg font-bold">MovieDash</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/movies">Movies</Link>
          {isLoggedIn ? (
            <>
              <Link to="/my-movies">My Movies</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={() => { removeToken(); window.location.href = '/login'; }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
