'use client';

import Link from 'next/link';
import './HeroSection.css';
import { FaRocket, FaBook, FaBrain, FaChartLine } from 'react-icons/fa';
import { MdPlayLesson, MdOutlineTrackChanges } from 'react-icons/md';
import { motion } from 'framer-motion';

const miniCards = [
  { icon: <FaBook size={22} color="var(--primary)" />, label: 'محتوى حديث' },
  { icon: <MdPlayLesson size={22} color="#f59e0b" />, label: 'شرح مبسط' },
  { icon: <FaBrain size={22} color="#10b981" />, label: 'تطبيق عملي' },
  { icon: <MdOutlineTrackChanges size={22} color="#ef4444" />, label: 'متابعة مستمرة' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function HeroSection() {
  return (
    <section className="hero-section" style={{
      position: 'relative',
      minHeight: 'calc(100svh - 68px)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div className="hero-bg" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/ss.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }} />
      {/* Overlay for small screens readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(255,255,255,0.15)',
      }} className="hero-overlay" />

      <div className="container hero-container">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="hero-content"
        >
          <motion.div variants={fadeUp} className="hero-badge">
            <span className="hero-badge-dot" />
            المقاعد محدودة — احجز مكانك الآن
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-title">
            <span style={{ display: 'block', color: '#000' }}>ابدأ رحلتك في البرمجة</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6C22F9, #3b0099)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>بطريقتك الخاصة</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-desc">
            تعلم البرمجة والذكاء الاصطناعي خطوة بخطوة بلغة بسيطة ومنهج عملي.<br />
            انطلق نحو مهارات عالية ومشاريع تصنع فرقاً.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-btns">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ display: 'contents' }}>
              <Link href="/courses" className="btn btn-primary btn-lg" style={{ gap: 10 }}>
                <FaRocket size={18} />
                ابدأ التعلم الآن
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ display: 'contents' }}>
              <Link href="/courses" className="btn btn-outline btn-lg" style={{ gap: 10 }}>
                <FaChartLine size={18} />
                تصفح الكورسات
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={container} className="hero-cards">
            {miniCards.map(({ icon, label }) => (
              <motion.div
                key={label}
                variants={cardVariant}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(108,34,249,0.18)' }}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(108,34,249,0.2)',
                  borderRadius: 14,
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#000',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'default',
                  flexShrink: 0,
                }}
              >
                {icon}
                {label}
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
