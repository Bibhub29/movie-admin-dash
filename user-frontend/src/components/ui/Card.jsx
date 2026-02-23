export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
