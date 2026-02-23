export default function Spinner({ size = 'md' }) {
  const sizeClass = size === 'sm' ? 'h-5 w-5 border-2' : 'h-10 w-10 border-[3px]';
  return <div className={`animate-spin rounded-full border-red-400/90 border-t-transparent ${sizeClass}`} />;
}
