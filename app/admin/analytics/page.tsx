'use client';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../lib/adminApi';
import StatsCard from '../components/StatsCard';

interface Stats {
  totalStudents: number; totalCourses: number; totalOrders: number; totalRevenue: number;
  topCourses: { _id: string; title: string; totalStudents: number; rating: number }[];
  monthlyRevenue: { _id: number; revenue: number; count: number }[];
}

const MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(r => setStats(r.data?.data?.stats || r.data?.stats)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: '#7c7a9a', padding: 40, textAlign: 'center' }}>جاري التحميل...</div>;

  const maxRevenue = Math.max(...(stats?.monthlyRevenue?.map(m => m.revenue) || [1]));
  const maxStudents = Math.max(...(stats?.topCourses?.map(c => c.totalStudents) || [1]));

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#16133a', marginBottom: 24 }}>التحليلات</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 32 }}>
        <StatsCard icon="👥" label="إجمالي الطلاب" value={stats?.totalStudents || 0} color="#6c63ff" />
        <StatsCard icon="📚" label="الكورسات" value={stats?.totalCourses || 0} color="#10b981" />
        <StatsCard icon="🛒" label="الطلبات" value={stats?.totalOrders || 0} color="#f59e0b" />
        <StatsCard icon="💰" label="الإيرادات" value={`${(stats?.totalRevenue || 0).toLocaleString('ar-EG')} ج.م`} color="#ef4444" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Revenue Chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 24 }}>📈 الإيرادات الشهرية</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 160 }}>
            {stats?.monthlyRevenue?.map(m => (
              <div key={m._id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 9, color: '#7c7a9a', textAlign: 'center' }}>{m.revenue >= 1000 ? `${(m.revenue/1000).toFixed(1)}k` : m.revenue}</div>
                <div style={{
                  width: '100%', background: 'linear-gradient(180deg,#6c63ff,#4f46e5)',
                  borderRadius: '6px 6px 0 0', height: `${(m.revenue / maxRevenue) * 130}px`, minHeight: 4,
                }} />
                <div style={{ fontSize: 9, color: '#7c7a9a' }}>{MONTHS[(m._id - 1)]?.slice(0, 3)}</div>
              </div>
            ))}
            {!stats?.monthlyRevenue?.length && <div style={{ color: '#7c7a9a', fontSize: 14, margin: 'auto' }}>لا توجد بيانات</div>}
          </div>
        </div>

        {/* Top Courses Bar */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 24 }}>🏆 أكثر الكورسات طلاباً</h2>
          {stats?.topCourses?.map((c, i) => (
            <div key={c._id} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#16133a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{c.title}</span>
                <span style={{ fontSize: 13, color: '#7c7a9a' }}>{c.totalStudents} طالب</span>
              </div>
              <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 4,
                  background: ['#6c63ff','#10b981','#f59e0b','#ef4444','#8b5cf6'][i % 5],
                  width: `${(c.totalStudents / maxStudents) * 100}%`,
                  transition: 'width .5s',
                }} />
              </div>
            </div>
          ))}
          {!stats?.topCourses?.length && <div style={{ color: '#7c7a9a', fontSize: 14 }}>لا توجد بيانات</div>}
        </div>

        {/* Orders per month */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 24 }}>🛒 الطلبات الشهرية</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 160 }}>
            {stats?.monthlyRevenue?.map(m => {
              const maxCount = Math.max(...(stats.monthlyRevenue.map(x => x.count) || [1]));
              return (
                <div key={m._id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 9, color: '#7c7a9a' }}>{m.count}</div>
                  <div style={{
                    width: '100%', background: 'linear-gradient(180deg,#10b981,#059669)',
                    borderRadius: '6px 6px 0 0', height: `${(m.count / maxCount) * 130}px`, minHeight: 4,
                  }} />
                  <div style={{ fontSize: 9, color: '#7c7a9a' }}>{MONTHS[(m._id - 1)]?.slice(0, 3)}</div>
                </div>
              );
            })}
            {!stats?.monthlyRevenue?.length && <div style={{ color: '#7c7a9a', fontSize: 14, margin: 'auto' }}>لا توجد بيانات</div>}
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 24 }}>📊 ملخص الأداء</h2>
          {[
            { label: 'متوسط الإيراد لكل طالب', value: stats?.totalStudents ? `${Math.round((stats.totalRevenue || 0) / stats.totalStudents).toLocaleString('ar-EG')} ج.م` : '—' },
            { label: 'متوسط الطلاب لكل كورس', value: stats?.totalCourses ? Math.round((stats.totalStudents || 0) / stats.totalCourses) : '—' },
            { label: 'معدل التحويل', value: stats?.totalStudents ? `${Math.round(((stats.totalOrders || 0) / stats.totalStudents) * 100)}%` : '—' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f5f5f5' }}>
              <span style={{ fontSize: 14, color: '#7c7a9a' }}>{item.label}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#16133a' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
