'use client';
import { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../../lib/adminApi';
import Link from 'next/link';

interface Course {
  _id: string; title: string; price: number; isPublished: boolean;
  totalStudents: number; rating: number; thumbnail?: { url: string };
  instructor?: { name: string };
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState('');

  const load = () => {
    setLoading(true);
    getCourses().then(r => setCourses(r.data?.data?.courses || r.data?.courses || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`هل تريد حذف كورس "${title}"؟`)) return;
    setDeleting(id);
    try { await deleteCourse(id); load(); } catch { alert('فشل الحذف'); }
    setDeleting('');
  };

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#16133a' }}>إدارة الكورسات</h1>
        <Link href="/admin/courses/new" style={{
          background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff',
          padding: '10px 22px', borderRadius: 12, fontWeight: 700, fontSize: 14,
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
        }}>+ إنشاء كورس جديد</Link>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 ابحث عن كورس..."
          style={{
            padding: '11px 16px', border: '1.5px solid #ebebf5', borderRadius: 12,
            fontSize: 14, fontFamily: "'Tajawal',sans-serif", width: 300, outline: 'none',
          }}
        />
      </div>

      {loading ? (
        <div style={{ color: '#7c7a9a', padding: 40, textAlign: 'center' }}>جاري التحميل...</div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #ebebf5', overflow: 'hidden', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f9f9fd', borderBottom: '1px solid #ebebf5' }}>
                {['الكورس', 'المدرس', 'السعر', 'الطلاب', 'التقييم', 'الحالة', 'إجراءات'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'right', color: '#7c7a9a', fontWeight: 600, fontSize: 13 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length ? filtered.map(c => (
                <tr key={c._id} style={{ borderBottom: '1px solid #f5f5f5', transition: 'background .15s' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: c.thumbnail?.url ? `url(${c.thumbnail.url}) center/cover` : '#eeeeff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                      }}>{!c.thumbnail?.url && '📚'}</div>
                      <span style={{ fontWeight: 600, color: '#16133a' }}>{c.title}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#7c7a9a' }}>{c.instructor?.name || '—'}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#6c63ff' }}>
                    {c.price === 0 ? 'مجاني' : `${c.price?.toLocaleString('ar-EG')} ج.م`}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#16133a' }}>{c.totalStudents || 0}</td>
                  <td style={{ padding: '14px 16px', color: '#f59e0b' }}>⭐ {c.rating?.toFixed(1) || '0.0'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: c.isPublished ? '#d1fae5' : '#fef3c7',
                      color: c.isPublished ? '#065f46' : '#92400e',
                    }}>{c.isPublished ? 'منشور' : 'مسودة'}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/admin/courses/${c._id}/edit`} style={{
                        padding: '6px 14px', borderRadius: 8, background: '#eeeeff',
                        color: '#6c63ff', fontWeight: 600, fontSize: 13, textDecoration: 'none',
                      }}>تعديل</Link>
                      <button onClick={() => handleDelete(c._id, c.title)} disabled={deleting === c._id} style={{
                        padding: '6px 14px', borderRadius: 8, background: '#fee2e2',
                        color: '#ef4444', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer',
                        fontFamily: "'Tajawal',sans-serif",
                      }}>{deleting === c._id ? '...' : 'حذف'}</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#7c7a9a' }}>لا توجد كورسات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
