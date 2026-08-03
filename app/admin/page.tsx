'use client';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '../lib/adminApi';
import StatsCard from './components/StatsCard';

interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalOrders: number;
  totalRevenue: number;
  topCourses: { _id: string; title: string; totalStudents: number; rating: number; thumbnail?: { url: string } }[];
  recentOrders: { _id: string; user?: { name: string; email: string }; totalAmount: number; createdAt: string }[];
  monthlyRevenue: { _id: number; revenue: number; count: number }[];
}

const MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardStats()
      .then(res => setStats(res.data?.data?.stats || res.data?.stats))
      .catch(() => setError('تعذر تحميل البيانات'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ height: 100, borderRadius: 16, background: 'linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      ))}
    </div>
  );

  if (error) return <div style={{ color: '#ef4444', padding: 20 }}>{error}</div>;

  const maxRevenue = Math.max(...(stats?.monthlyRevenue?.map(m => m.revenue) || [1]));

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#16133a', marginBottom: 24 }}>لوحة التحكم</h1>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 32 }}>
        <StatsCard icon="👥" label="إجمالي الطلاب" value={stats?.totalStudents || 0} color="#6c63ff" />
        <StatsCard icon="📚" label="الكورسات" value={stats?.totalCourses || 0} color="#10b981" />
        <StatsCard icon="🛒" label="الطلبات المكتملة" value={stats?.totalOrders || 0} color="#f59e0b" />
        <StatsCard icon="💰" label="إجمالي الإيرادات" value={`${(stats?.totalRevenue || 0).toLocaleString('ar-EG')} ج.م`} color="#ef4444" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Monthly Revenue Chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>الإيرادات الشهرية</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
            {stats?.monthlyRevenue?.map(m => (
              <div key={m._id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 10, color: '#7c7a9a' }}>{m.revenue.toLocaleString()}</div>
                <div style={{
                  width: '100%', background: 'linear-gradient(180deg,#6c63ff,#4f46e5)',
                  borderRadius: '6px 6px 0 0', height: `${(m.revenue / maxRevenue) * 100}px`,
                  minHeight: 4, transition: 'height .3s',
                }} />
                <div style={{ fontSize: 10, color: '#7c7a9a' }}>{MONTHS[(m._id - 1)]?.slice(0, 3)}</div>
              </div>
            ))}
            {(!stats?.monthlyRevenue?.length) && (
              <div style={{ color: '#7c7a9a', fontSize: 14, margin: 'auto' }}>لا توجد بيانات بعد</div>
            )}
          </div>
        </div>

        {/* Top Courses */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>أفضل الكورسات</h2>
          {stats?.topCourses?.length ? stats.topCourses.map((c, i) => (
            <div key={c._id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: '#eeeeff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#6c63ff', flexShrink: 0,
              }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#16133a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</div>
                <div style={{ fontSize: 12, color: '#7c7a9a' }}>{c.totalStudents} طالب · ⭐ {c.rating?.toFixed(1) || '0.0'}</div>
              </div>
            </div>
          )) : <div style={{ color: '#7c7a9a', fontSize: 14 }}>لا توجد كورسات بعد</div>}
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>آخر التسجيلات</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ebebf5' }}>
                {['الطالب', 'البريد', 'المبلغ', 'التاريخ'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'right', color: '#7c7a9a', fontWeight: 600, fontSize: 13 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.length ? stats.recentOrders.map(o => (
                <tr key={o._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#16133a' }}>{o.user?.name || '—'}</td>
                  <td style={{ padding: '12px', color: '#7c7a9a' }}>{o.user?.email || '—'}</td>
                  <td style={{ padding: '12px', color: '#10b981', fontWeight: 700 }}>{o.totalAmount?.toLocaleString('ar-EG')} ج.م</td>
                  <td style={{ padding: '12px', color: '#7c7a9a' }}>{new Date(o.createdAt).toLocaleDateString('ar-EG')}</td>
                </tr>
              )) : (
                <tr><td colSpan={4} style={{ padding: 20, textAlign: 'center', color: '#7c7a9a' }}>لا توجد طلبات بعد</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
