import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(({ type = 'info', title, message, duration = 3000 }) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const toast = { id, type, title, message };

    setToasts((prev) => [toast, ...prev].slice(0, 4));
    window.setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[100] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-xl backdrop-blur ${
              toast.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-100'
                : toast.type === 'error'
                  ? 'border-rose-500/40 bg-rose-500/20 text-rose-100'
                  : 'border-slate-500/40 bg-slate-700/70 text-slate-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {toast.title ? <p className="font-semibold">{toast.title}</p> : null}
                {toast.message ? <p className="mt-0.5 text-xs text-slate-200">{toast.message}</p> : null}
              </div>
              <button
                className="pointer-events-auto rounded bg-white/10 px-2 py-0.5 text-xs"
                onClick={() => removeToast(toast.id)}
                type="button"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
