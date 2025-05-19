import React, { useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import WorkflowSection from '@/components/WorkflowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

const HomePage = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <HeroSection />
      <div ref={addToRefs} className="element-scroll-effect"><FeaturesSection /></div>
      <div ref={addToRefs} className="element-scroll-effect"><WorkflowSection /></div>
      <div ref={addToRefs} className="element-scroll-effect"><TestimonialsSection /></div>
      <div ref={addToRefs} className="element-scroll-effect"><CTASection /></div>
    </>
  );
};

export default HomePage;