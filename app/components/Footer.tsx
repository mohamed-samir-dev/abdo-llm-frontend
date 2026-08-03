'use client';
import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, X, Play, Camera, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#16133a', color: '#b8b5d8', marginTop: 80 }}>
      <div className="container" style={{ padding: '64px 28px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 44, marginBottom: 52 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BookOpen size={20} color="#fff" />
              </div>
              <span style={{ fontWeight: 900, fontSize: 20, color: '#fff', fontFamily: 'Tajawal, sans-serif' }}>تعلّم بلا حدود</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#9896c0', marginBottom: 22, fontWeight: 400 }}>
              منصة تعليمية احترافية تقدم أفضل الكورسات والكتب والجلسات المباشرة لمساعدتك على التطور المهني.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[Share2, X, Play, Camera].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9896c0', transition: 'all .2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#9896c0'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 18, fontSize: 16, fontFamily: 'Tajawal, sans-serif' }}>روابط سريعة</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {[
                { href: '/courses', label: 'الكورسات' },
                { href: '/books', label: 'الكتب' },
                { href: '/live', label: 'البث المباشر' },
                { href: '/about', label: 'من نحن' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{
                  color: '#9896c0', textDecoration: 'none', fontSize: 14, fontWeight: 500,
                  transition: 'color .2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9896c0')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 18, fontSize: 16, fontFamily: 'Tajawal, sans-serif' }}>الدعم</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {[
                { href: '/faq', label: 'الأسئلة الشائعة' },
                { href: '/privacy', label: 'سياسة الخصوصية' },
                { href: '/terms', label: 'الشروط والأحكام' },
                { href: '/contact', label: 'تواصل معنا' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{
                  color: '#9896c0', textDecoration: 'none', fontSize: 14, fontWeight: 500,
                  transition: 'color .2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9896c0')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 18, fontSize: 16, fontFamily: 'Tajawal, sans-serif' }}>تواصل معنا</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { Icon: Mail, text: 'info@ta3lim.com' },
                { Icon: Phone, text: '+20 100 000 0000' },
                { Icon: MapPin, text: 'القاهرة، مصر' },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#9896c0' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'rgba(108,99,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={14} color="var(--primary)" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24,
          textAlign: 'center',
          fontSize: 13,
          color: '#5e5c80',
          fontWeight: 400,
        }}>
          © {new Date().getFullYear()} تعلّم بلا حدود. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
