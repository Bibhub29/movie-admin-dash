export default function CategoryFilter({ categories = [], value, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:border-red-500/50 focus:outline-none"
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category._id || category.id} value={category._id || category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
