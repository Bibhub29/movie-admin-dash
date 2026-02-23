import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import { getAdminPurchases } from './adminService';

export default function AdminPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadPurchases = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAdminPurchases();
        if (isActive) setPurchases(data);
      } catch (err) {
        if (isActive) setError(err?.response?.data?.message || 'Failed to fetch purchases');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadPurchases();
    return () => {
      isActive = false;
    };
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-rose-300">{error}</p>;

  return (
    <Card>
      <h1 className="mb-4 text-2xl font-semibold text-white">Purchases</h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-white/10 text-slate-200">
              <th className="py-2">User</th>
              <th className="py-2">Movie</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((item) => (
              <tr key={item.id || item._id} className="border-b border-white/5">
                <td className="py-2">{item.user?.name || item.userId?.name || '-'}</td>
                <td className="py-2">{item.movie?.title || item.movieId?.title || '-'}</td>
                <td className="py-2">Rs. {item.amount || item.price || 0}</td>
                <td className="py-2">{item.status || (item.isPaid ? 'paid' : 'pending')}</td>
                <td className="py-2">{new Date(item.createdAt || item.paidAt || Date.now()).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
