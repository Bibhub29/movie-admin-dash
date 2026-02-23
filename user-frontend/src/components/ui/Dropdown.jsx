import { useEffect, useRef, useState } from 'react';

export default function Dropdown({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm text-slate-100 transition hover:bg-white/20"
      >
        {trigger}
        <span className={`text-xs transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}>v</span>
      </button>

      <div
        role="menu"
        tabIndex={-1}
        className={`absolute z-50 mt-2 min-w-[190px] rounded-xl border border-white/10 bg-slate-900/90 p-2 shadow-2xl backdrop-blur transition-all duration-200 ${
          align === 'right' ? 'right-0' : 'left-0'
        } ${open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'}`}
      >
        {children({ close: () => setOpen(false) })}
      </div>
    </div>
  );
}
