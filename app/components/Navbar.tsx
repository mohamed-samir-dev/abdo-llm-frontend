'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = null as null | { name: string; role: string };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/courses', label: 'الكورسات' },
    { href: '/books', label: 'الكتب' },
    { href: '/live', label: 'البث المباشر' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      boxShadow: scrolled ? '0 4px 24px rgba(80,70,200,0.13)' : '0 1px 12px rgba(80,70,200,0.07)',
      transition: 'box-shadow .3s, background .3s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/logo.webp" alt="logo" width={90} height={90} style={{ objectFit: 'contain' }} />
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '8px 16px', borderRadius: 10, fontWeight: 600, fontSize: 15,
              color: 'var(--text-main)', textDecoration: 'none', transition: 'all .2s',
              fontFamily: 'Tajawal, sans-serif',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenu(!userMenu)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'var(--primary-light)', border: 'none', borderRadius: 12,
                  padding: '8px 14px', cursor: 'pointer', fontFamily: 'Tajawal, sans-serif',
                }}
              >
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={15} color="#fff" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>{user.name}</span>
                <ChevronDown size={13} color="var(--primary)" />
              </button>
              {userMenu && (
                <div style={{
                  position: 'absolute', top: '110%', left: 0, minWidth: 190,
                  background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border)', overflow: 'hidden', zIndex: 200,
                }}>
                  <Link href="/dashboard" style={dropItemStyle} onClick={() => setUserMenu(false)}>
                    <LayoutDashboard size={15} /> لوحة التحكم
                  </Link>
                  <Link href="/profile" style={dropItemStyle} onClick={() => setUserMenu(false)}>
                    <User size={15} /> الملف الشخصي
                  </Link>
                  <div style={{ height: 1, background: 'var(--border)' }} />
                  <button style={{ ...dropItemStyle, width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger)' }}>
                    <LogOut size={15} /> تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-actions-desktop" style={{ display: 'flex', gap: 8 }}>
              <Link href="/login" className="btn btn-outline btn-sm">دخول</Link>
              <Link href="/register" className="btn btn-primary btn-sm">إنشاء حساب</Link>
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            style={{
              background: open ? 'var(--primary-light)' : 'none',
              border: 'none', cursor: 'pointer', display: 'none',
              color: open ? 'var(--primary)' : 'var(--text-main)',
              borderRadius: 10, padding: 6, transition: 'all .2s',
            }}
            className="mobile-toggle"
            aria-label="toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        style={{
          background: '#fff',
          borderTop: open ? '1px solid var(--border)' : 'none',
          overflow: 'hidden',
          maxHeight: open ? 400 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height .35s cubic-bezier(.4,0,.2,1), opacity .25s ease',
        }}
      >
        <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: '12px 16px', borderRadius: 10, fontWeight: 600, fontSize: 15,
                color: 'var(--text-main)', textDecoration: 'none',
                transform: open ? 'translateX(0)' : 'translateX(20px)',
                opacity: open ? 1 : 0,
                transition: `transform .3s ease ${i * 0.05}s, opacity .3s ease ${i * 0.05}s`,
                display: 'block',
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{
            display: 'flex', gap: 8, marginTop: 10,
            transform: open ? 'translateX(0)' : 'translateX(20px)',
            opacity: open ? 1 : 0,
            transition: `transform .3s ease ${navLinks.length * 0.05}s, opacity .3s ease ${navLinks.length * 0.05}s`,
          }}>
            <Link href="/login" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>دخول</Link>
            <Link href="/register" className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>إنشاء حساب</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
          .navbar-actions-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

const dropItemStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '12px 18px', fontSize: 14, fontWeight: 600,
  color: 'var(--text-main)', textDecoration: 'none',
  fontFamily: 'Tajawal, sans-serif',
};
