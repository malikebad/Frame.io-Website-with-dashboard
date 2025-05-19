
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Clock, 
  Shield, 
  Zap, 
  Users, 
  Smartphone,
  Video,
  Cloud,
  Lock,
  Layers,
  Briefcase,
  BarChart
} from 'lucide-react';
import CTASection from '@/components/CTASection';

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
  },
  {
    icon: <Video className="h-8 w-8 text-white" />,
    title: 'Advanced video tools',
    description: 'Compare versions, add annotations, and use frame-accurate drawing tools to communicate clearly.'
  },
  {
    icon: <Cloud className="h-8 w-8 text-white" />,
    title: 'Cloud storage',
    description: 'Store and organize all your media assets in one secure, accessible location with flexible storage options.'
  },
  {
    icon: <Lock className="h-8 w-8 text-white" />,
    title: 'Access controls',
    description: 'Set granular permissions to control who can view, comment on, and download your content.'
  },
  {
    icon: <Layers className="h-8 w-8 text-white" />,
    title: 'Version control',
    description: 'Keep track of all versions of your content with automatic versioning and comparison tools.'
  },
  {
    icon: <Briefcase className="h-8 w-8 text-white" />,
    title: 'Project management',
    description: 'Organize your work with customizable project structures, folders, and metadata.'
  },
  {
    icon: <BarChart className="h-8 w-8 text-white" />,
    title: 'Analytics & insights',
    description: 'Gain valuable insights into your workflow with detailed analytics and reporting tools.'
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

const FeaturesPage = () => {
  return (
    <>
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful features for video professionals
            </h1>
            <p className="text-xl text-gray-400">
              Everything you need to streamline your video production workflow from start to finish
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
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

      <section className="py-20 bg-gradient-to-b from-black to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Seamless integrations</h2>
              <p className="text-gray-400 mb-6">
                Connect Frame.io with your favorite tools and services to create a seamless workflow. Our platform integrates with industry-standard software to enhance your productivity.
              </p>
              <ul className="space-y-4">
                {['Adobe Creative Cloud', 'Final Cut Pro', 'DaVinci Resolve', 'Premiere Pro', 'After Effects', 'Slack', 'Dropbox', 'Google Drive'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              className="rounded-lg overflow-hidden border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img  
                alt="Software integrations diagram" 
                className="w-full h-auto"
               src="https://images.unsplash.com/photo-1692728676745-b48faf6dd68d" />
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default FeaturesPage;
