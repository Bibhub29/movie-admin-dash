export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-400 hover:to-orange-400',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    danger: 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-500 hover:to-red-400',
    ghost: 'bg-transparent text-slate-200 hover:bg-white/10'
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
