'use client';
import { useEffect, useState } from 'react';
import { getStudents } from '../../lib/adminApi';

interface Student {
  _id: string; name: string; email: string; avatar?: { url: string };
  enrolledCourses: string[]; isActive: boolean; createdAt: string; lastLogin?: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Student | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getStudents().then(r => setStudents(r.data?.data?.users || r.data?.users || [])).finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#16133a', marginBottom: 24 }}>إدارة الطلاب</h1>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 ابحث باسم أو بريد..."
        style={{ padding: '11px 16px', border: '1.5px solid #ebebf5', borderRadius: 12, fontSize: 14, fontFamily: "'Tajawal',sans-serif", width: 300, outline: 'none', marginBottom: 20 }} />

      {loading ? <div style={{ color: '#7c7a9a', padding: 40, textAlign: 'center' }}>جاري التحميل...</div> : (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #ebebf5', overflow: 'hidden', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f9f9fd', borderBottom: '1px solid #ebebf5' }}>
                {['الطالب', 'البريد', 'الكورسات', 'الحالة', 'تاريخ التسجيل', 'إجراءات'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'right', color: '#7c7a9a', fontWeight: 600, fontSize: 13 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length ? filtered.map(s => (
                <tr key={s._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                        background: s.avatar?.url ? `url(${s.avatar.url}) center/cover` : 'linear-gradient(135deg,#6c63ff,#4f46e5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700,
                      }}>{!s.avatar?.url && s.name[0]}</div>
                      <span style={{ fontWeight: 600, color: '#16133a' }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#7c7a9a' }}>{s.email}</td>
                  <td style={{ padding: '14px 16px', color: '#16133a', fontWeight: 600 }}>{s.enrolledCourses?.length || 0}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: s.isActive ? '#d1fae5' : '#fee2e2',
                      color: s.isActive ? '#065f46' : '#991b1b',
                    }}>{s.isActive ? 'نشط' : 'موقوف'}</span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#7c7a9a' }}>{new Date(s.createdAt).toLocaleDateString('ar-EG')}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => setSelected(s)} style={{
                      padding: '6px 14px', borderRadius: 8, background: '#eeeeff',
                      color: '#6c63ff', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer',
                      fontFamily: "'Tajawal',sans-serif",
                    }}>رسالة</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#7c7a9a' }}>لا يوجد طلاب</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Modal */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: 440, boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}
            onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#16133a', marginBottom: 8 }}>إرسال رسالة</h2>
            <p style={{ color: '#7c7a9a', fontSize: 14, marginBottom: 20 }}>إلى: {selected.name}</p>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} placeholder="اكتب رسالتك هنا..."
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #ebebf5', borderRadius: 12, fontSize: 14, fontFamily: "'Tajawal',sans-serif", outline: 'none', resize: 'vertical' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={() => { alert('تم الإرسال (يحتاج API)'); setSelected(null); setMsg(''); }} style={{
                flex: 1, padding: '12px', background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff',
                border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
              }}>إرسال</button>
              <button onClick={() => setSelected(null)} style={{
                flex: 1, padding: '12px', background: '#f3f4f6', color: '#374151',
                border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
              }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
