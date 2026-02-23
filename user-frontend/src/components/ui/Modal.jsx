import Card from './Card';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <Card className="w-full max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} type="button" className="rounded bg-white/10 px-2 py-1 text-xs text-slate-200 hover:bg-white/20">
            Close
          </button>
        </div>
        {children}
      </Card>
    </div>
  );
}
