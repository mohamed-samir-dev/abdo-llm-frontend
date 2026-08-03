'use client';
import { useEffect, useState } from 'react';
import API from '../../lib/adminApi';

interface Coupon {
  _id: string; code: string; discount: number; discountType: string;
  maxUses: number; usedCount: number; expiresAt: string; isActive: boolean;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', discount: 10, discountType: 'percentage', maxUses: 100, expiresAt: '' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/coupons').then(r => setCoupons(r.data?.data?.coupons || r.data?.coupons || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try { await API.post('/coupons', form); setShowForm(false); load(); }
    catch { alert('فشل الإنشاء'); }
    finally { setSaving(false); }
  };

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1.5px solid #ebebf5', borderRadius: 10, fontSize: 14, fontFamily: "'Tajawal',sans-serif", outline: 'none' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#16133a' }}>الكوبونات</h1>
        <button onClick={() => setShowForm(true)} style={{
          background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff',
          padding: '10px 22px', borderRadius: 12, fontWeight: 700, fontSize: 14,
          border: 'none', cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
        }}>+ إنشاء كوبون</button>
      </div>

      {loading ? <div style={{ color: '#7c7a9a', padding: 40, textAlign: 'center' }}>جاري التحميل...</div> : (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #ebebf5', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f9f9fd', borderBottom: '1px solid #ebebf5' }}>
                {['الكود', 'الخصم', 'الاستخدام', 'تاريخ الانتهاء', 'الحالة', 'إجراءات'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'right', color: '#7c7a9a', fontWeight: 600, fontSize: 13 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.length ? coupons.map(c => (
                <tr key={c._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#eeeeff', color: '#6c63ff', padding: '4px 12px', borderRadius: 8, fontWeight: 700, fontSize: 13, fontFamily: 'monospace' }}>{c.code}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#f59e0b' }}>
                    {c.discount}{c.discountType === 'percentage' ? '%' : ' ج.م'}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#16133a' }}>{c.usedCount} / {c.maxUses}</td>
                  <td style={{ padding: '14px 16px', color: '#7c7a9a' }}>{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('ar-EG') : '—'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: c.isActive ? '#d1fae5' : '#fee2e2',
                      color: c.isActive ? '#065f46' : '#991b1b',
                    }}>{c.isActive ? 'نشط' : 'منتهي'}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={async () => { if (confirm('حذف الكوبون؟')) { await API.delete(`/coupons/${c._id}`); load(); } }} style={{
                      padding: '6px 14px', background: '#fee2e2', color: '#ef4444',
                      border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
                    }}>حذف</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#7c7a9a' }}>لا توجد كوبونات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}
          onClick={() => setShowForm(false)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: 440, boxShadow: '0 8px 40px rgba(0,0,0,.15)' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#16133a', marginBottom: 20 }}>إنشاء كوبون جديد</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input required value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="كود الكوبون (مثال: SAVE20)" style={{ ...inputStyle, fontFamily: 'monospace', textTransform: 'uppercase' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input required type="number" min={1} value={form.discount} onChange={e => setForm(p => ({ ...p, discount: +e.target.value }))} placeholder="قيمة الخصم" style={inputStyle} />
                <select value={form.discountType} onChange={e => setForm(p => ({ ...p, discountType: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="percentage">نسبة مئوية %</option>
                  <option value="fixed">مبلغ ثابت ج.م</option>
                </select>
              </div>
              <input type="number" min={1} value={form.maxUses} onChange={e => setForm(p => ({ ...p, maxUses: +e.target.value }))} placeholder="عدد مرات الاستخدام" style={inputStyle} />
              <input type="date" value={form.expiresAt} onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))} style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="submit" disabled={saving} style={{
                  flex: 1, padding: '12px', background: 'linear-gradient(135deg,#6c63ff,#4f46e5)', color: '#fff',
                  border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Tajawal',sans-serif",
                }}>{saving ? 'جاري الحفظ...' : 'إنشاء'}</button>
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
