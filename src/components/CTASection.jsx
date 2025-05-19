import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const CTASection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartTrial = () => {
    navigate('/signup');
  };

  const handleScheduleDemo = () => {
    toast({
      title: "Schedule Demo",
      description: "This would typically lead to a demo scheduling page or a contact form.",
    });
    // For now, let's navigate to enterprise page contact form as an example
    navigate('/enterprise#enterpriseContactForm');
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to transform your video workflow?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of creative professionals who are delivering better content, faster.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button className="btn-primary text-base px-8 py-6" onClick={handleStartTrial}>Start Free Trial</Button>
            <Button variant="outline" className="btn-outline text-base px-8 py-6" onClick={handleScheduleDemo}>Schedule Demo</Button>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            No credit card required. Free 14-day trial.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;