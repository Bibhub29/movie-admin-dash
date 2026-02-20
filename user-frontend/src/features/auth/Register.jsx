import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { register } from './authService';
import { setToken } from '../../services/tokenService';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await register(form);
      setToken(data.token);
      navigate('/movies');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-md space-y-4 rounded bg-white p-6 shadow">
          <h1 className="text-xl font-semibold">Register</h1>
          <Input label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full">Create account</Button>
          <p className="text-sm">Already have account? <Link className="text-blue-600" to="/login">Login</Link></p>
        </form>
      </Container>
      <Footer />
    </>
  );
}
