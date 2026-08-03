'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '../../lib/adminApi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin(form);
      const user = res.data?.data?.user || res.data?.user;
      if (!user || !['admin', 'instructor'].includes(user.role)) {
        setError('ليس لديك صلاحية الوصول للوحة التحكم');
        setLoading(false);
        return;
      }
      const token = res.data?.data?.accessToken || res.data?.accessToken;
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      router.push('/admin');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || 'بيانات غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f0ff 0%, #e8e8ff 100%)',
      fontFamily: "'Tajawal', sans-serif", direction: 'rtl',
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 420,
        boxShadow: '0 8px 40px rgba(108,99,255,.15)', border: '1px solid #ebebf5',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg,#6c63ff,#4f46e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            fontSize: 28,
          }}>🎓</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#16133a', marginBottom: 4 }}>لوحة التحكم</h1>
          <p style={{ color: '#7c7a9a', fontSize: 14 }}>تسجيل دخول المدرسين والمشرفين فقط</p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2', color: '#991b1b', padding: '12px 16px',
            borderRadius: 10, marginBottom: 20, fontSize: 14, textAlign: 'center',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#16133a', marginBottom: 6 }}>
              البريد الإلكتروني
            </label>
            <input
              type="email" required value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="admin@example.com"
              style={{
                width: '100%', padding: '13px 16px', border: '1.5px solid #ebebf5',
                borderRadius: 12, fontSize: 15, fontFamily: "'Tajawal',sans-serif",
                outline: 'none', direction: 'rtl', color: '#16133a',
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#16133a', marginBottom: 6 }}>
              كلمة المرور
            </label>
            <input
              type="password" required value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '13px 16px', border: '1.5px solid #ebebf5',
                borderRadius: 12, fontSize: 15, fontFamily: "'Tajawal',sans-serif",
                outline: 'none', direction: 'rtl', color: '#16133a',
              }}
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px', background: loading ? '#a5a0ff' : 'linear-gradient(135deg,#6c63ff,#4f46e5)',
              color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700,
              fontFamily: "'Tajawal',sans-serif", cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all .2s',
            }}
          >
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
