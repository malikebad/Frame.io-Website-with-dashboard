
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Clock, 
  Shield, 
  Zap, 
  Users, 
  Smartphone 
} from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    title: 'Frame-accurate commenting',
    description: 'Leave comments at the exact moment in the video. No more confusing timecodes or vague feedback.'
  },
  {
    icon: <Clock className="h-8 w-8 text-white" />,
    title: 'Faster review cycles',
    description: 'Reduce review time by up to 50% with our streamlined approval process and real-time notifications.'
  },
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: 'Enterprise-grade security',
    description: 'Your content is protected with industry-leading security measures and compliance certifications.'
  },
  {
    icon: <Zap className="h-8 w-8 text-white" />,
    title: 'Lightning-fast uploads',
    description: 'Upload large files quickly with our accelerated file transfer technology, regardless of location.'
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: 'Seamless collaboration',
    description: 'Bring your entire team together in one place, from editors to clients, for smooth collaboration.'
  },
  {
    icon: <Smartphone className="h-8 w-8 text-white" />,
    title: 'Work from anywhere',
    description: 'Review and approve content on any device, whether you are in the office or on the go.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful features for video professionals
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to streamline your video production workflow
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={item}
            >
              <div className="mb-4 p-3 inline-block rounded-full bg-secondary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
