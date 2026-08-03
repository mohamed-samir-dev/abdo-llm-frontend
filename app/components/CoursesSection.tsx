'use client';

import { FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function CoursesSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 340, height: 340,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.12), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 260, height: 260,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,34,249,0.09), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'right' }}
        >
          <span className="badge badge-primary" style={{ fontSize: 13, marginBottom: 16 }}>
            <FaBookOpen size={13} />
            الكورسات
          </span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginBottom: 16 }}>
            استكشف <span className="gradient-text">كورساتنا</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 480 }}>
            🚀 كورساتنا في الطريق إليك — ترقب الإطلاق قريباً!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
