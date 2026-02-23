import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';

function MenuLink({ to, children, onSelect }) {
  return (
    <Link
      to={to}
      onClick={onSelect}
      className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
      role="menuitem"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to={user?.role === 'admin' ? '/admin' : '/'} className="text-xl font-bold tracking-tight text-white">
          Movie<span className="text-red-400">Verse</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-slate-200 md:flex">
          <Link className={location.pathname.startsWith('/movies') ? 'text-white' : 'text-slate-300'} to="/movies">Movies</Link>
          {isAuthenticated && user?.role !== 'admin' ? <Link to="/my-movies">My Movies</Link> : null}
          {isAuthenticated && user?.role === 'admin' ? <Link to="/admin">Admin</Link> : null}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Dropdown trigger={<span>{user?.name || 'Account'}</span>}>
              {({ close }) => (
                <>
                  {user?.role !== 'admin' ? (
                    <MenuLink to="/profile" onSelect={close}>Profile</MenuLink>
                  ) : null}
                  {user?.role !== 'admin' ? (
                    <MenuLink to="/my-movies" onSelect={close}>My Movies</MenuLink>
                  ) : null}
                  {user?.role === 'admin' ? (
                    <MenuLink to="/admin" onSelect={close}>Admin Dashboard</MenuLink>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      handleLogout();
                    }}
                    className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-200 transition hover:bg-rose-500/20"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </>
              )}
            </Dropdown>
          ) : (
            <>
              <Link to="/login"><Button variant="secondary">Login</Button></Link>
              <Link to="/register"><Button>Join</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
