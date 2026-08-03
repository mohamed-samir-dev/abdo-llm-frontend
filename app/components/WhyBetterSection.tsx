'use client';
import { motion } from 'framer-motion';
import {
  Rocket, Lightbulb, Wrench, ClipboardList,
  FolderKanban, BarChart3, Target, Globe, CodeXml,
} from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 15, scale: 1.2, transition: { type: 'spring' as const, stiffness: 300 } },
};

const betterCards = [
  { Icon: Rocket,       color: '#6c63ff', image: '/b1.webp', title: 'ابدأ من الصفر',        sub: 'هنبدأ معاك خطوة بخطوة مهما كان مستواك، لحد ما تبقى فاهم كل جزء.' },
  { Icon: Lightbulb,    color: '#f59e0b', image: '/b2.webp', title: 'الفهم قبل الحفظ',       sub: 'هنبسط أصعب الأفكار بطريقة سهلة تخليك تفهم وتحفظ من غير تعقيد.' },
  { Icon: Wrench,       color: '#10b981', image: '/b3.webp', title: 'حل وتدريب مستمر',       sub: 'بعد كل شرح هتلاقي أسئلة وتطبيقات تثبت المعلومة وتزود ثقتك.' },
  { Icon: ClipboardList,color: '#ef4444', image: '/b4.webp', title: 'امتحانات على كل درس',   sub: 'اختبر نفسك بعد كل درس واعرف مستواك والأجزاء اللي محتاجة مراجعة.' },
  { Icon: FolderKanban, color: '#3b82f6', image: '/b5.webp', title: 'مراجعات شاملة',         sub: 'مراجعات منظمة تجمع المنهج بالكامل وتثبت أهم النقاط قبل الامتحان.' },
  { Icon: BarChart3,    color: '#8b5cf6', image: '/b6.webp', title: 'متابعة مستواك',         sub: 'اعرف تقدمك أول بأول وشوف نقاط القوة والأجزاء اللي محتاجة تحسين.' },
  { Icon: Target,       color: '#ec4899', image: '/b7.webp', title: 'استعداد للامتحانات',    sub: 'تدريب على شكل الامتحان وأسئلة متنوعة تساعدك تحقق أعلى الدرجات.' },
  { Icon: Globe,        color: '#f97316', image: '/b8.webp', title: 'دعم في أي وقت',         sub: 'ارجع للدروس في أي وقت وذاكر بالسرعة اللي تناسبك ومن أي مكان.' },
];

export default function WhyBetterSection() {
  return (
    <section style={{
      backgroundImage: 'url(/background-why.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 80px)',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'right', marginBottom: 64 }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#000',
            borderRadius: 30,
            padding: '7px 20px',
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 20,
            letterSpacing: 0.5,
            boxShadow: '0 0 20px rgba(124,58,237,0.5)',
          }}>
            <Target size={14} />
            ليه إحنا أفضل؟
          </motion.span>
          <h2 style={{
            fontSize: 'clamp(20px, 4vw, 44px)',
            fontWeight: 900,
            color: '#000',
            marginBottom: 16,
            lineHeight: 1.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 8,
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
          }}>
            <CodeXml size={28} color="#a78bfa" strokeWidth={1.8} />
            إيه اللي بيميزنا عن{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              الباقيين؟
            </span>
            <CodeXml size={28} color="#a78bfa" strokeWidth={1.8} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ color: '#000', fontSize: 'clamp(13px, 2vw, 16px)', maxWidth: 700, margin: 0, lineHeight: 1.8 }}>
            مش بس كورسات، ده نظام متكامل صُمم عشان يوصلك للنتيجة اللي بتحلم بيها
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {betterCards.map(({ Icon, color, image, title, sub }, i) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              initial="rest"
              animate="rest"
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                height: 'clamp(180px, 25vw, 240px)',
                cursor: 'default',
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                transition: 'transform .3s ease, box-shadow .3s ease',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 60%, ${color}cc 100%)`,
              }} />
              <div style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px 18px',
                textAlign: 'right',
              }}>
                <motion.div
                  variants={iconVariants}
                  initial="rest"
                  whileHover="hover"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 'auto',
                  }}>
                  <Icon size={22} color="#fff" strokeWidth={1.8} />
                </motion.div>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(13px, 1.5vw, 16px)',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: 6,
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(11px, 1.2vw, 13px)',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.7,
                    margin: 0,
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}>
                    {sub}
                  </p>
                </div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0, right: 0, left: 0,
                height: 4,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
