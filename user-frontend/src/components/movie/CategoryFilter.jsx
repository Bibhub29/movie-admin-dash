export default function CategoryFilter({ categories = [], value, onChange }) {
  return (
    <select className="rounded border px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c._id} value={c._id}>{c.name}</option>
      ))}
    </select>
  );
}
