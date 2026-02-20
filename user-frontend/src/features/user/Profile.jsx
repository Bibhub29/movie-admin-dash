import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/layout/Container';
import Card from '../../components/ui/Card';
import { getProfile } from './userService';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <>
      <Navbar />
      <Container>
        <Card className="mx-auto mt-8 max-w-md space-y-2">
          <h1 className="text-xl font-semibold">My Profile</h1>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
