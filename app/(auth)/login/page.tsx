'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { RiPhoneLine, RiLockPasswordLine, RiLoginCircleLine } from 'react-icons/ri';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ phone: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    // منع الإدخال لو مش بيبدأ بـ 01
    if (digits.length >= 2 && !digits.startsWith('01')) return;
    setForm(p => ({ ...p, phone: digits }));
    if (errors.phone) setErrors(p => ({ ...p, phone: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.phone) e.phone = 'رقم الهاتف مطلوب';
    else if (form.phone.length < 11) e.phone = 'رقم الهاتف يجب أن يكون 11 رقم';
    else if (!/^(010|011|012|015)\d{8}$/.test(form.phone)) e.phone = 'يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015';
    if (!form.password) e.password = 'كلمة المرور مطلوبة';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setApiError('');
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'حدث خطأ، حاول مرة أخرى');
      localStorage.setItem('accessToken', data.data.accessToken);
      router.push(data.data.user?.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Tajawal', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          background: linear-gradient(135deg, #f0effe 0%, #f9f9fd 50%, #eef2ff 100%);
          padding: 24px 16px;
        }
        .left-panel {
          width: 100%;
          max-width: 520px;
          background: #fff;
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(108,99,255,0.15), 0 4px 16px rgba(0,0,0,0.06);
          border: 1.5px solid rgba(108,99,255,0.1);
          padding: clamp(32px, 6vw, 52px) clamp(28px, 6vw, 52px);
          animation: fadeUp .5s ease both;
        }
        .form-inner { width: 100%; }
        .logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
        }
        .logo-box {
          width: 72px; height: 72px;
          border-radius: 20px;
          background: linear-gradient(135deg, #f0effe, #e8e6ff);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(108,99,255,0.2);
          margin-bottom: 16px;
        }
        .welcome-title {
          font-size: 26px;
          font-weight: 900;
          color: #1a1060;
          margin-bottom: 6px;
          text-align: center;
        }
        .welcome-sub {
          font-size: 14px;
          color: #8b8aad;
          font-weight: 500;
          text-align: center;
        }
        .input-wrap {
          position: relative;
          margin-bottom: 18px;
        }
        .field-input {
          width: 100%;
          padding: 15px 48px 15px 48px;
          border: 2px solid #e8e6f9;
          border-radius: 14px;
          font-size: 15px;
          font-family: 'Tajawal', sans-serif;
          color: #1a1060;
          background: #f8f7ff;
          outline: none;
          transition: all .25s;
          direction: rtl;
        }
        .field-input:focus {
          border-color: #6c63ff;
          background: #fafafe;
          box-shadow: 0 0 0 4px rgba(108,99,255,0.1);
        }
        .field-input.error {
          border-color: #ef4444;
          background: #fff8f8;
        }
        .field-input::placeholder { color: #b0aed0; }
        .input-icon-right {
          position: absolute;
          right: 15px; top: 50%; transform: translateY(-50%);
          color: #b0aed0;
          display: flex; align-items: center;
          pointer-events: none;
          transition: color .2s;
        }
        .field-input:focus ~ .input-icon-right { color: #6c63ff; }
        .input-icon-left {
          position: absolute;
          left: 15px; top: 50%; transform: translateY(-50%);
          color: #b0aed0;
          display: flex; align-items: center;
          cursor: pointer;
          background: none; border: none; padding: 0;
        }
        .counter {
          position: absolute;
          left: 15px; top: 50%; transform: translateY(-50%);
          font-size: 11px; font-weight: 700;
          font-family: monospace;
          color: #b0aed0;
          pointer-events: none;
        }
        .counter.done { color: #22c55e; }
        .err-msg {
          font-size: 12px; color: #ef4444; font-weight: 700;
          margin-top: -12px; margin-bottom: 14px;
          display: flex; align-items: center; gap: 5px;
        }
        .api-error {
          padding: 13px 16px; border-radius: 12px;
          background: #fff1f1; border: 1.5px solid #fca5a5;
          color: #dc2626; font-size: 14px; font-weight: 700;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 18px;
        }
        .submit-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #6c63ff 0%, #4f46e5 100%);
          color: #fff; border: none; border-radius: 14px;
          font-size: 16px; font-weight: 900;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 8px 24px rgba(108,99,255,0.4);
          transition: all .3s;
          font-family: 'Tajawal', sans-serif;
          margin-bottom: 20px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(108,99,255,0.5);
        }
        .submit-btn:disabled {
          background: linear-gradient(135deg, #b8b4f8, #a5a0f5);
          cursor: not-allowed; box-shadow: none;
        }
        .spinner {
          width: 20px; height: 20px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: spin .7s linear infinite;
          display: inline-block;
        }
        .footer-link {
          text-align: center; font-size: 14px; color: #8b8aad;
        }
        .footer-link a {
          color: #6c63ff; font-weight: 900; text-decoration: none;
        }
        .footer-link a:hover { text-decoration: underline; }
        @media (max-width: 480px) {
          .left-panel { padding: 28px 18px; border-radius: 20px; }
          .welcome-title { font-size: 20px; }
          .welcome-sub { font-size: 13px; }
          .logo-box { width: 58px; height: 58px; border-radius: 16px; }
          .field-input { font-size: 14px; padding: 13px 44px; }
          .submit-btn { font-size: 15px; padding: 13px; }
          .footer-link { font-size: 13px; }
        }
        @media (max-width: 360px) {
          .left-panel { padding: 22px 14px; border-radius: 16px; }
          .welcome-title { font-size: 18px; }
          .logo-box { width: 50px; height: 50px; }
          .field-input { font-size: 13px; padding: 12px 40px; }
          .input-icon-right { right: 11px; }
          .input-icon-left { left: 11px; }
          .submit-btn { font-size: 14px; padding: 12px; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .left-panel { max-width: 440px; }
        }
        @media (min-width: 769px) {
          .login-wrapper { padding: 40px 24px; }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="left-panel">
          <div className="form-inner">
            <div className="logo-wrap">
              <Link href="/">
                <div className="logo-box">
                  <Image src="/logo.webp" alt="logo" width={48} height={48} style={{ objectFit: 'contain' }} />
                </div>
              </Link>
              <h1 className="welcome-title">مرحباً بك مجدداً 👋</h1>
              <p className="welcome-sub">سجّل دخولك وكمّل رحلتك التعليمية</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Phone */}
              <div className="input-wrap">
                <input
                  className={`field-input${errors.phone ? ' error' : ''}`}
                  type="tel"
                  value={form.phone}
                  placeholder="رقم الهاتف"
                  onChange={e => handlePhoneChange(e.target.value)}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  autoComplete="tel"
                  maxLength={11}
                />
                <span className="input-icon-right"><RiPhoneLine size={20} /></span>

              </div>
              {errors.phone && <div className="err-msg"><span>●</span>{errors.phone}</div>}

              {/* Password */}
              <div className="input-wrap">
                <input
                  className={`field-input${errors.password ? ' error' : ''}`}
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  placeholder="كلمة المرور"
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); if (errors.password) setErrors(p => ({ ...p, password: '' })); }}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  autoComplete="current-password"
                />
                <span className="input-icon-right"><RiLockPasswordLine size={20} /></span>
                <button type="button" className="input-icon-left" onClick={() => setShowPass(s => !s)} tabIndex={-1}>
                  {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <div className="err-msg"><span>●</span>{errors.password}</div>}

              {apiError && (
                <div className="api-error">
                  <span style={{ fontSize: 20 }}>⚠️</span>
                  <span>{apiError}</span>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <><span className="spinner" />جاري الدخول...</>
                ) : (
                  <><RiLoginCircleLine size={22} />تسجيل الدخول</>
                )}
              </button>
            </form>

            <p className="footer-link">
              مش عندك حساب؟{' '}
              <Link href="/register">إنشاء حساب جديد ✨</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
