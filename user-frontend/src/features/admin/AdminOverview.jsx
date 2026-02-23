import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import { getOverview } from './adminService';

function MetricCard({ title, value }) {
  return (
    <Card>
      <p className="text-sm text-slate-300">{title}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value ?? 0}</p>
    </Card>
  );
}

export default function AdminOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadOverview = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getOverview();
        if (isActive) setData(response);
      } catch (err) {
        if (isActive) setError(err?.response?.data?.message || 'Failed to fetch overview');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadOverview();
    return () => {
      isActive = false;
    };
  }, []);

  const chart = useMemo(() => {
    const revenue = data?.totalRevenue || 0;
    const purchases = data?.totalPurchases || 0;
    const paid = data?.paidTransactions || 0;
    const max = Math.max(revenue || 1, purchases || 1, paid || 1);

    return [
      { label: 'Revenue', value: revenue, percent: (revenue / max) * 100, color: 'bg-red-500' },
      { label: 'Purchases', value: purchases, percent: (purchases / max) * 100, color: 'bg-orange-500' },
      { label: 'Paid', value: paid, percent: (paid / max) * 100, color: 'bg-emerald-500' }
    ];
  }, [data]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-rose-300">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Total Movies" value={data?.totalMovies} />
        <MetricCard title="Total Users" value={data?.totalUsers} />
        <MetricCard title="Total Purchases" value={data?.totalPurchases} />
        <MetricCard title="Paid Transactions" value={data?.paidTransactions} />
        <MetricCard title="Revenue" value={`Rs. ${data?.totalRevenue || 0}`} />
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-white">Revenue / Purchases Chart</h2>
        <div className="space-y-4">
          {chart.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-xs text-slate-300">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
