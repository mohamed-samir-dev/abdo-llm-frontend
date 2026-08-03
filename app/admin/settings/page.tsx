'use client';
import { useEffect, useState, useRef } from 'react';
import { getProfile, updateProfile, changePassword } from '../../lib/adminApi';

interface User { name: string; email: string; phone?: string; avatar?: { url: string }; bio?: string; socialLinks?: { facebook?: string; twitter?: string; youtube?: string; linkedin?: string }; }

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', bio: '', facebook: '', twitter: '', youtube: '', linkedin: '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProfile().then(r => {
      const u = r.data?.data?.user || r.data?.user;
      setUser(u);
      setForm({ name: u.name || '', phone: u.phone || '', bio: u.bio || '', facebook: u.socialLinks?.facebook || '', twitter: u.socialLinks?.twitter || '', youtube: u.socialLinks?.youtube || '', linkedin: u.socialLinks?.linkedin || '' });
      setPreview(u.avatar?.url || '');
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMsg('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (avatar) fd.append('avatar', avatar);
      await updateProfile(fd);
      setMsg('تم الحفظ بنجاح ✅');
    } catch { setMsg('فشل الحفظ ❌'); }
    finally { setSaving(false); }
  };

  const handlePwChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { setPwMsg('كلمتا المرور غير متطابقتين'); return; }
    setPwSaving(true); setPwMsg('');
    try { await changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }); setPwMsg('تم تغيير كلمة المرور ✅'); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }
    catch { setPwMsg('فشل التغيير، تأكد من كلمة المرور الحالية'); }
    finally { setPwSaving(false); }
  };

  const inputStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid #ebebf5', borderRadius: 12, fontSize: 14, fontFamily: "'Tajawal',sans-serif", outline: 'none', color: '#16133a' };

  if (!user) return <div style={{ color: '#7c7a9a', padding: 40, textAlign: 'center' }}>جاري التحميل...</div>;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#16133a', marginBottom: 24 }}>الإعدادات</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Profile */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #ebebf5' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>الملف الشخصي</h2>
          {msg && <div style={{ background: msg.includes('✅') ? '#d1fae5' : '#fee2e2', color: msg.includes('✅') ? '#065f46' : '#991b1b', padding: '10px 14px', borderRadius: 10, marginBottom: 16, fontSize: 13 }}>{msg}</div>}
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div onClick={() => fileRef.current?.click()} style={{
                width: 72, height: 72, borderRadius: '50%', cursor: 'pointer',
                background: preview ? `url(${preview}) center/cover` : 'linear-gradient(135deg,#6c63ff,#4f46e5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 28, fontWeight: 700,
              }}>{!preview && user.name[0]}</div>
              <div>
                <button type="button" onClick={() => fileRef.current?.click()} style={{ background: '#eeeeff', color: '#6c63ff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif" }}>تغيير الصورة</button>
                <div style={{ fontSize: 12, color: '#7c7a9a', marginTop: 4 }}>JPG, PNG - حد أقصى 2MB</div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) { setAvatar(f); setPreview(URL.createObjectURL(f)); } }} />
            </div>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="الاسم الكامل" style={inputStyle} />
            <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="رقم الهاتف" style={inputStyle} />
            <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="نبذة عنك..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            <div style={{ borderTop: '1px solid #ebebf5', paddingTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#16133a', marginBottom: 10 }}>وسائل التواصل</div>
              {[['facebook', '📘 Facebook'], ['twitter', '🐦 Twitter'], ['youtube', '▶️ YouTube'], ['linkedin', '💼 LinkedIn']].map(([k, label]) => (
                <input key={k} value={form[k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={label} style={{ ...inputStyle, marginBottom: 10 }} />
              ))}
            </div>
            <button type="submit" disabled={saving} style={{ padding: '12px', background: saving ? '#a5a0ff' : 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'Tajawal',sans-serif" }}>
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </form>
        </div>

        {/* Password */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #ebebf5', height: 'fit-content' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>تغيير كلمة المرور</h2>
          {pwMsg && <div style={{ background: pwMsg.includes('✅') ? '#d1fae5' : '#fee2e2', color: pwMsg.includes('✅') ? '#065f46' : '#991b1b', padding: '10px 14px', borderRadius: 10, marginBottom: 16, fontSize: 13 }}>{pwMsg}</div>}
          <form onSubmit={handlePwChange} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input required type="password" value={pwForm.currentPassword} onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))} placeholder="كلمة المرور الحالية" style={inputStyle} />
            <input required type="password" value={pwForm.newPassword} onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))} placeholder="كلمة المرور الجديدة" style={inputStyle} />
            <input required type="password" value={pwForm.confirmPassword} onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="تأكيد كلمة المرور" style={inputStyle} />
            <button type="submit" disabled={pwSaving} style={{ padding: '12px', background: pwSaving ? '#a5a0ff' : 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: pwSaving ? 'not-allowed' : 'pointer', fontFamily: "'Tajawal',sans-serif" }}>
              {pwSaving ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
