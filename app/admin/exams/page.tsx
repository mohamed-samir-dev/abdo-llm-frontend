'use client';
import { useEffect, useState } from 'react';
import API from '../../lib/adminApi';

interface Course { _id: string; title: string; }
interface Quiz { _id: string; title: string; duration?: number; passingScore?: number; questions?: unknown[]; isPublished?: boolean; }

export default function ExamsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', duration: 30, passingScore: 60, shuffleQuestions: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get('/courses').then(r => setCourses(r.data?.data?.courses || r.data?.courses || []));
  }, []);

  const loadQuizzes = (id: string) => {
    setLoading(true);
    API.get(`/courses/${id}/quizzes`).then(r => setQuizzes(r.data?.data?.quizzes || r.data?.quizzes || [])).finally(() => setLoading(false));
  };

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1.5px solid #ebebf5', borderRadius: 10, fontSize: 14, fontFamily: "'Tajawal',sans-serif", outline: 'none' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#16133a' }}>إدارة الامتحانات</h1>
        {selectedCourse && (
          <button onClick={() => setShowForm(true)} style={{ background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff', padding: '10px 22px', borderRadius: 12, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: "'Tajawal',sans-serif" }}>+ إنشاء امتحان</button>
        )}
      </div>

      <select value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); if (e.target.value) loadQuizzes(e.target.value); }}
        style={{ padding: '11px 16px', border: '1.5px solid #ebebf5', borderRadius: 12, fontSize: 14, fontFamily: "'Tajawal',sans-serif", outline: 'none', minWidth: 280, cursor: 'pointer', marginBottom: 20 }}>
        <option value="">اختر كورساً...</option>
        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
      </select>

      {loading ? <div style={{ color: '#7c7a9a', padding: 40, textAlign: 'center' }}>جاري التحميل...</div> : selectedCourse ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
          {quizzes.length ? quizzes.map(q => (
            <div key={q._id} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 12 }}>📝 {q.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#7c7a9a' }}>⏱️ المدة: {q.duration || 0} دقيقة</div>
                <div style={{ fontSize: 13, color: '#7c7a9a' }}>✅ درجة النجاح: {q.passingScore || 0}%</div>
                <div style={{ fontSize: 13, color: '#7c7a9a' }}>❓ عدد الأسئلة: {q.questions?.length || 0}</div>
              </div>
              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: q.isPublished ? '#d1fae5' : '#fef3c7', color: q.isPublished ? '#065f46' : '#92400e' }}>
                {q.isPublished ? 'منشور' : 'مسودة'}
              </span>
            </div>
          )) : <div style={{ color: '#7c7a9a', padding: 40, gridColumn: '1/-1', textAlign: 'center' }}>لا توجد امتحانات لهذا الكورس</div>}
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', border: '1px solid #ebebf5', color: '#7c7a9a' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>اختر كورساً لعرض امتحاناته</div>
        </div>
      )}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }} onClick={() => setShowForm(false)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: 460, boxShadow: '0 8px 40px rgba(0,0,0,.15)' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>إنشاء امتحان جديد</h2>
            <form onSubmit={async (e) => {
              e.preventDefault(); setSaving(true);
              try { await API.post(`/courses/${selectedCourse}/quizzes`, form); setShowForm(false); loadQuizzes(selectedCourse); }
              catch { alert('فشل الإنشاء'); }
              finally { setSaving(false); }
            }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="عنوان الامتحان" style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#7c7a9a', display: 'block', marginBottom: 4 }}>المدة (دقيقة)</label>
                  <input type="number" min={1} value={form.duration} onChange={e => setForm(p => ({ ...p, duration: +e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#7c7a9a', display: 'block', marginBottom: 4 }}>درجة النجاح %</label>
                  <input type="number" min={1} max={100} value={form.passingScore} onChange={e => setForm(p => ({ ...p, passingScore: +e.target.value }))} style={inputStyle} />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.shuffleQuestions} onChange={e => setForm(p => ({ ...p, shuffleQuestions: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#6c63ff' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#16133a' }}>ترتيب الأسئلة عشوائياً</span>
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif" }}>
                  {saving ? 'جاري الحفظ...' : 'إنشاء'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '12px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif" }}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
