import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Overview', path: '/admin' },
  { label: 'Movies', path: '/admin/movies' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Purchases', path: '/admin/purchases' }
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside
      className={`sticky top-20 h-[calc(100vh-6rem)] rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[220px]'}`}
    >
      <button
        onClick={onToggle}
        type="button"
        className="mb-3 w-full rounded-lg bg-white/10 px-2 py-2 text-xs text-slate-200 hover:bg-white/20"
      >
        {collapsed ? 'Open' : 'Collapse'}
      </button>
      <nav className="space-y-1">
        {links.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-lg px-3 py-2 text-sm transition ${
                active ? 'bg-red-500/30 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {collapsed ? item.label.slice(0, 1) : item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
