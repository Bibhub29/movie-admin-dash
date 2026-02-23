import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import useAuth from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';

export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await loginAdmin(form);
      showToast({ type: 'success', title: 'Admin logged in' });
      navigate('/admin');
    } catch (error) {
      showToast({ type: 'error', title: 'Admin login failed', message: error?.response?.data?.message || 'Invalid credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-8">
        <Card className="mx-auto max-w-md">
          <h1 className="mb-4 text-2xl font-semibold text-white">Admin Login</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Signing in...' : 'Login as Admin'}</Button>
          </form>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
