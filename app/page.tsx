'use client';
import HeroSection from './components/HeroSection';
import CoursesSection from './components/CoursesSection';
import WhyBetterSection from './components/WhyBetterSection';
import GradeSection from './components/GradeSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <WhyBetterSection />
      <CoursesSection />
      <GradeSection />
    </div>
  );
}
