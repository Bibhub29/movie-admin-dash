import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import { getAdminUsers } from './adminService';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAdminUsers();
        if (isActive) setUsers(data);
      } catch (err) {
        if (isActive) setError(err?.response?.data?.message || 'Failed to fetch users');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadUsers();
    return () => {
      isActive = false;
    };
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-rose-300">{error}</p>;

  return (
    <Card>
      <h1 className="mb-4 text-2xl font-semibold text-white">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-white/10 text-slate-200">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user._id} className="border-b border-white/5">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.role || 'user'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
