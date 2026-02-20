export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
