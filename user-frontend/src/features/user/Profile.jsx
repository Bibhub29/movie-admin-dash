import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import useAuth from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';

function validate(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Name is required';
  if (!values.email?.trim()) errors.email = 'Email is required';
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Email format is invalid';
  if (values.password && values.password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
}

export default function Profile() {
  const { user, loading, fetchProfile, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name || '', email: user.email || '' }));
    }
  }, [user]);

  const submitDisabled = useMemo(() => saving || loading, [saving, loading]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    try {
      await updateProfile(form);
      setForm((prev) => ({ ...prev, password: '' }));
      showToast({ type: 'success', title: 'Profile updated', message: 'Your details were saved successfully.' });
    } catch (error) {
      showToast({ type: 'error', title: 'Update failed', message: error?.response?.data?.message || 'Unable to update profile' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-8">
        <Card className="mx-auto max-w-xl">
          <h1 className="mb-4 text-2xl font-semibold text-white">Edit Profile</h1>
          {loading ? <Spinner /> : null}
          {!loading ? (
            <form className="space-y-4" onSubmit={onSubmit}>
              <Input
                label="Name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                error={fieldErrors.name}
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                error={fieldErrors.email}
              />
              <Input
                label="New Password (optional)"
                type="password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                error={fieldErrors.password}
              />
              <Button type="submit" disabled={submitDisabled}>{saving ? 'Saving...' : 'Save Changes'}</Button>
            </form>
          ) : null}
        </Card>
      </Container>
      <Footer />
    </>
  );
}
