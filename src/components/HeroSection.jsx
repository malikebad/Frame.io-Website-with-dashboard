import React from 'react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <motion.section 
      className="relative h-[100vh] flex items-center justify-center overflow-hidden"
      style={{ scale, opacity, y }}
    >
      <div className="absolute inset-0 z-0">
        <img  
          alt="Video production team collaborating on a project" 
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1598301817258-44f7b204bff6" />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 wireframe-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Video collaboration, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">reimagined</span>.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            The world's most trusted video review and collaboration platform. Get feedback, share ideas, and deliver amazing content faster than ever.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button className="btn-primary text-lg px-10 py-7 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" onClick={() => navigate('/signup')}>
              Try for Free
            </Button>
            <Button variant="outline" className="btn-outline text-lg px-10 py-7 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Watch Demo
            </Button>
          </motion.div>
          
          <motion.p 
            className="mt-8 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            No credit card required. Free 14-day trial.
          </motion.p>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-8 w-8"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </motion.section>
  );
};

export default HeroSection;