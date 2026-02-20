export default function Input({ label, ...props }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input className="w-full rounded border border-slate-300 px-3 py-2" {...props} />
    </label>
  );
}
