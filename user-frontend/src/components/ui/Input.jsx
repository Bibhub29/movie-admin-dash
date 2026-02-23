export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm font-medium text-slate-200">{label}</span> : null}
      <input
        className={`w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:border-red-500/50 focus:outline-none ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
