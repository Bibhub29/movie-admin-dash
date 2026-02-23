import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuth from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const authData = await login(form);
      console.log('token stored:', authData?.token);
      showToast({ type: 'success', title: 'Login successful' });
      navigate(location.state?.from || (authData?.user?.role === 'admin' ? '/admin' : '/movies'), { replace: true });
    } catch (error) {
      showToast({ type: 'error', title: 'Login failed', message: error?.response?.data?.message || error?.message || 'Unable to login' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-8">
        <Card className="mx-auto max-w-md">
          <h1 className="mb-4 text-2xl font-semibold text-white">Login</h1>
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
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 flex justify-between text-sm text-slate-300">
            <Link to="/register" className="text-red-300">Create account</Link>
            <Link to="/admin/login" className="text-red-300">Admin login</Link>
          </div>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
