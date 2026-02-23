export default function Badge({ children, className = '' }) {
  return <span className={`rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-medium text-red-200 ${className}`}>{children}</span>;
}
