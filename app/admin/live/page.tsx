'use client';
import { useEffect, useState } from 'react';
import { getLiveSessions, createLiveSession, deleteLiveSession } from '../../lib/adminApi';

interface LiveSession {
  _id: string; title: string; scheduledAt: string; meetingLink: string;
  platform: string; status: string; course?: { title: string };
}

export default function LivePage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', scheduledAt: '', meetingLink: '', platform: 'zoom', courseId: '' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getLiveSessions().then(r => setSessions(r.data?.data?.sessions || r.data?.sessions || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try { await createLiveSession(form); setShowForm(false); setForm({ title: '', scheduledAt: '', meetingLink: '', platform: 'zoom', courseId: '' }); load(); }
    catch { alert('فشل الإنشاء'); }
    finally { setSaving(false); }
  };

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1.5px solid #ebebf5', borderRadius: 10, fontSize: 14, fontFamily: "'Tajawal',sans-serif", outline: 'none' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#16133a' }}>البث المباشر</h1>
        <button onClick={() => setShowForm(true)} style={{
          background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff',
          padding: '10px 22px', borderRadius: 12, fontWeight: 700, fontSize: 14,
          border: 'none', cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
        }}>+ جدولة بث جديد</button>
      </div>

      {loading ? <div style={{ color: '#7c7a9a', padding: 40, textAlign: 'center' }}>جاري التحميل...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
          {sessions.length ? sessions.map(s => (
            <div key={s._id} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #ebebf5', boxShadow: '0 1px 4px rgba(80,70,200,.07)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#16133a' }}>{s.title}</div>
                <span style={{
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: s.status === 'live' ? '#fee2e2' : s.status === 'scheduled' ? '#fef3c7' : '#f3f4f6',
                  color: s.status === 'live' ? '#991b1b' : s.status === 'scheduled' ? '#92400e' : '#374151',
                }}>{s.status === 'live' ? '🔴 مباشر' : s.status === 'scheduled' ? '⏰ مجدول' : 'منتهي'}</span>
              </div>
              {s.course && <div style={{ fontSize: 13, color: '#7c7a9a', marginBottom: 8 }}>📚 {s.course.title}</div>}
              <div style={{ fontSize: 13, color: '#7c7a9a', marginBottom: 8 }}>
                📅 {new Date(s.scheduledAt).toLocaleString('ar-EG')}
              </div>
              <div style={{ fontSize: 13, color: '#7c7a9a', marginBottom: 16 }}>
                🔗 {s.platform === 'zoom' ? 'Zoom' : 'Google Meet'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={s.meetingLink} target="_blank" rel="noreferrer" style={{
                  flex: 1, padding: '8px', background: '#eeeeff', color: '#6c63ff',
                  borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: 'none', textAlign: 'center',
                }}>فتح الرابط</a>
                <button onClick={async () => { if (confirm('حذف؟')) { await deleteLiveSession(s._id); load(); } }} style={{
                  padding: '8px 14px', background: '#fee2e2', color: '#ef4444',
                  border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
                }}>حذف</button>
              </div>
            </div>
          )) : <div style={{ color: '#7c7a9a', padding: 40, gridColumn: '1/-1', textAlign: 'center' }}>لا توجد جلسات مجدولة</div>}
        </div>
      )}

      {/* Create Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}
          onClick={() => setShowForm(false)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: 480, boxShadow: '0 8px 40px rgba(0,0,0,.15)' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>جدولة بث مباشر</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="عنوان الجلسة" style={inputStyle} />
              <input required type="datetime-local" value={form.scheduledAt} onChange={e => setForm(p => ({ ...p, scheduledAt: e.target.value }))} style={inputStyle} />
              <select value={form.platform} onChange={e => setForm(p => ({ ...p, platform: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="zoom">Zoom</option>
                <option value="meet">Google Meet</option>
              </select>
              <input required value={form.meetingLink} onChange={e => setForm(p => ({ ...p, meetingLink: e.target.value }))} placeholder="رابط الاجتماع" style={inputStyle} />
              <input value={form.courseId} onChange={e => setForm(p => ({ ...p, courseId: e.target.value }))} placeholder="ID الكورس (اختياري)" style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="submit" disabled={saving} style={{
                  flex: 1, padding: '12px', background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff',
                  border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
                }}>{saving ? 'جاري الحفظ...' : 'جدولة'}</button>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  flex: 1, padding: '12px', background: '#f3f4f6', color: '#374151',
                  border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
                }}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
