'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaGraduationCap, FaCode, FaBrain } from 'react-icons/fa';

const grades = [
  {
    title: 'أولى ثانوي',
    subtitle: 'Programming & AI من الصفر',
    desc: 'هنساعدك تفهم Programming & AI من الأساس، وتتعامل مع مفاهيم التكنولوجيا والبرمجة بطريقة سهلة وعملية، عشان تدخل تانية ثانوي وأنت سابق بخطوة.',
    img: '/th1.webp',
    href: '/grade1',
    icon: <FaCode size={16} />,
    tag: 'المستوى الأول',
  },
  {
    title: 'ثانية ثانوي',
    subtitle: 'تعمّق وتميّز في عالم التقنية',
    desc: 'هنبني على اللي اتعلمته في أولى ثانوي ونوسّع مداركك في الـ AI والبرمجة المتقدمة، مع مشاريع عملية حقيقية تخليك جاهز لأي تحدي قادم.',
    img: '/th2.webp',
    href: '/courses?grade=2',
    icon: <FaBrain size={16} />,
    tag: 'المستوى الثاني',
  },
];

export default function GradeSection() {
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--bg) 0%, #eeeeff55 100%)', padding: '90px 0' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span className="badge badge-primary" style={{ fontSize: 13, marginBottom: 16 }}>
            <FaGraduationCap size={13} />
            الصفوف الدراسية
          </span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginBottom: 12 }}>
            اختر <span className="gradient-text">صفك الدراسي</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>
            ابدأ رحلة التفوق مع محتوى تعليمي مصمم خصيصًا ليك.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {grades.map((grade, i) => (
            <motion.div
              key={grade.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                height: 480,
                cursor: 'pointer',
                boxShadow: '0 8px 40px rgba(80,70,200,.18)',
              }}
            >
              {/* Background Image */}
              <Image
                src={grade.img}
                alt={grade.title}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="grade-card-img"
              />

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,8,40,0.92) 0%, rgba(10,8,40,0.55) 50%, rgba(10,8,40,0.15) 100%)',
              }} />

              {/* Top Tag */}
              <div style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(108,99,255,0.85)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {grade.icon}
                {grade.tag}
              </div>

              {/* Content */}
              <div style={{
                position: 'absolute', bottom: 0, right: 0, left: 0,
                padding: '32px 28px',
                textAlign: 'right',
              }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 6, fontWeight: 500 }}>
                  {grade.subtitle}
                </p>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12, letterSpacing: '-0.3px' }}>
                  {grade.title}
                </h3>
                <p style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.85, marginBottom: 24,
                }}>
                  {grade.desc}
                </p>
                <Link
                  href={grade.href}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#fff',
                    color: 'var(--primary)',
                    padding: '11px 24px',
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'all 0.22s',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}
                >
                  ابدأ الآن
                  <FaArrowLeft size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .grade-card-img { transition: transform 0.5s ease !important; }
        .grade-card-img:hover { transform: scale(1.05) !important; }
      `}</style>
    </section>
  );
}
