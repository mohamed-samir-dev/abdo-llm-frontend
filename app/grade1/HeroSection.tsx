'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPlay } from 'react-icons/fa';
import { features } from './data';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96, x: -24 },
  show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  return (
    <section className="hero1-section" style={{
      background: 'var(--bg)',
      minHeight: 'calc(100svh - 68px)',
      display: 'flex',
      alignItems: 'center',
      direction: 'rtl',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* Background image — visible only on ≤900px via CSS */}
      <div className="hero1-bg-img">
        <Image
          src="/a1.webp"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>
      {/* Overlay on top of bg image */}
      <div className="hero1-bg-overlay" />

      <div className="container hero1-container" style={{ padding: '60px 28px', position: 'relative', zIndex: 1 }}>
        <div className="hero1-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}>

          {/* ── Right: Text ── */}
          <motion.div className="hero1-text-col" variants={container} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div variants={fadeUp} className="hero1-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg,rgba(108,99,255,.12),rgba(79,70,229,.08))',
              border: '1.5px solid rgba(108,99,255,.3)',
              borderRadius: 999, padding: '6px 18px',
              fontSize: 13, fontWeight: 700, color: 'var(--primary-dark)',
              marginBottom: 22,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--primary)',
                boxShadow: '0 0 0 3px rgba(108,99,255,.25)',
                flexShrink: 0,
                animation: 'pulse-dot 1.8s ease-in-out infinite',
              }} />
              أولى ثانوي — 2026 / 2027
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} style={{
              fontSize: 'clamp(30px,4.5vw,56px)',
              fontWeight: 900, lineHeight: 1.4, marginBottom: 10,
            }}>
              <span className="hero1-title-line1" style={{ display: 'block', color: 'var(--text-main)' }}>أولى ثانوي</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Programming &amp; AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="hero1-subtitle" style={{
              fontSize: 'clamp(14px,1.6vw,17px)',
              color: 'var(--primary-dark)', fontWeight: 700, marginBottom: 8,
            }}>
              ابدأ صح من أولى ثانوي… وافهم التكنولوجيا مش بس تستخدمها
            </motion.p>

            {/* Description */}
            <motion.p variants={fadeUp} className="hero1-desc" style={{
              fontSize: 'clamp(13px,1.4vw,15px)',
              color: 'var(--text-muted)', fontWeight: 500,
              lineHeight: 1.95, marginBottom: 34,
            }}>
              مش مجرد مادة — دي بداية فهمك للتكنولوجيا، البرمجة، والذكاء الاصطناعي بطريقة سهلة وعملية.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="hero1-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ display: 'contents' }}>
                <Link href="/grade1/start" className="btn btn-primary btn-lg" style={{ gap: 8 }}>
                  <FaPlay size={14} />
                  ابدأ كورس
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ display: 'contents' }}>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg hero1-wa-btn" style={{ gap: 8 }}>
                  <FaWhatsapp size={18} />
                  تواصل واتساب
                </a>
              </motion.div>
            </motion.div>

            {/* Feature tags */}
            <motion.div variants={fadeUp} className="hero1-tags" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {features.map(({ icon, label }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10, padding: '7px 13px',
                  fontSize: 12, fontWeight: 700, color: 'var(--text-main)',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {icon}
                  {label}
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* ── Left: Image (desktop only) ── */}
          <motion.div
            className="hero1-img-col"
            variants={fadeIn}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div className="hero1-img-wrap" style={{
              position: 'relative',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              width: '100%',
              maxWidth: 500,
              aspectRatio: '4/3',
            }}>
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(135deg, rgba(108,99,255,.15) 0%, transparent 60%)',
              }} />
              <Image
                src="/a1.webp"
                alt="أولى ثانوي - Programming & AI"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%,100% { box-shadow: 0 0 0 3px rgba(108,99,255,.25); }
          50%      { box-shadow: 0 0 0 6px rgba(108,99,255,.1); }
        }

        /* BG image + overlay — hidden on desktop */
        .hero1-bg-img,
        .hero1-bg-overlay {
          display: none;
          position: absolute;
          inset: 0;
        }

        /* Tablet gap tweak */
        @media (max-width: 1024px) {
          .hero1-grid {
            gap: 32px !important;
          }
        }

        /* ≤900px: switch to background mode */
        @media (max-width: 900px) {
          .hero1-bg-img   { display: block; }
          .hero1-bg-overlay { display: none !important; }

          .hero1-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .hero1-img-col { display: none !important; }

          .hero1-section {
            min-height: calc(100svh - 68px);
            align-items: center;
          }
          .hero1-container {
            padding: 48px 24px !important;
          }
          .hero1-text-col {
            max-width: 600px;
          }

          /* ── Text colors on dark/blue bg ── */
          .hero1-badge {
            background: rgba(255,255,255,0.18) !important;
            border-color: rgba(255,255,255,0.45) !important;
            color: #fff !important;
          }
          .hero1-badge span {
            background: #fff !important;
            box-shadow: 0 0 0 3px rgba(255,255,255,0.3) !important;
          }
          .hero1-title-line1 {
            color: #fff !important;
          }
          .hero1-text-col h1 span:last-child {
            background: linear-gradient(135deg,#fff,rgba(255,255,255,0.75)) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }
          .hero1-subtitle {
            color: rgba(255,255,255,0.95) !important;
            text-shadow: 0 1px 6px rgba(0,0,0,0.25);
          }
          .hero1-desc {
            color: rgba(255,255,255,0.82) !important;
            text-shadow: 0 1px 4px rgba(0,0,0,0.2);
          }
          .hero1-tags > div {
            background: rgba(255,255,255,0.18) !important;
            border-color: rgba(255,255,255,0.3) !important;
            color: #fff !important;
            box-shadow: none !important;
          }
          .hero1-wa-btn {
            background: #25d366 !important;
            color: #fff !important;
            border-color: #25d366 !important;
          }
          .hero1-wa-btn:hover {
            background: #1ebe5d !important;
            border-color: #1ebe5d !important;
          }
        }

        /* ≤600px */
        @media (max-width: 600px) {
          .hero1-btns {
            flex-direction: column !important;
          }
          .hero1-btns a {
            width: 100% !important;
            justify-content: center !important;
          }
          .hero1-container {
            padding: 36px 18px !important;
          }
        }

        /* ≤480px */
        @media (max-width: 480px) {
          .hero1-badge {
            font-size: 11px !important;
            padding: 5px 12px !important;
            margin-bottom: 16px !important;
          }
          .hero1-tags > div {
            font-size: 11px !important;
            padding: 6px 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
