import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Container from '../../components/layout/Container';
import Sidebar from '../../components/layout/Sidebar';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar />
      <Container className="py-6">
        <div className="grid gap-6 lg:grid-cols-[auto,1fr]">
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
          <main className="min-h-[70vh]">
            <Outlet />
          </main>
        </div>
      </Container>
    </>
  );
}
