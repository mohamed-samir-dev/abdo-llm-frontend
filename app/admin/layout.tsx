'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);

  const sidebarWidth = collapsed ? 72 : 240;

  useEffect(() => {
    if (pathname === '/admin/login') { setReady(true); return; }
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    if (!token || !user) { router.replace('/admin/login'); return; }
    try {
      const u = JSON.parse(user);
      if (!['admin', 'instructor'].includes(u.role)) { router.replace('/admin/login'); return; }
    } catch { router.replace('/admin/login'); return; }
    setReady(true);
  }, [pathname, router]);

  if (!ready) return null;
  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div style={{ fontFamily: "'Tajawal',sans-serif", direction: 'rtl', background: '#f9f9fd', minHeight: '100vh' }}>
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} />
      <AdminHeader sidebarWidth={sidebarWidth} />
      <main style={{
        marginRight: sidebarWidth, paddingTop: 64,
        minHeight: '100vh', transition: 'margin-right .25s',
      }}>
        <div style={{ padding: '28px 32px' }}>{children}</div>
      </main>
    </div>
  );
}
