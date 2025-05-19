import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const resources = [
  {
    title: 'Getting Started with Frame.io',
    category: 'Guide',
    description: 'Learn the basics of Frame.io and how to set up your first project.',
    image: 'getting-started',
    link: '#'
  },
  {
    title: 'Advanced Review & Approval Workflows',
    category: 'Tutorial',
    description: 'Discover how to create efficient review and approval workflows for your team.',
    image: 'review-workflow',
    link: '#'
  },
  {
    title: 'Security Best Practices',
    category: 'Whitepaper',
    description: 'Learn how to keep your content secure with Frame.io security features.',
    image: 'security',
    link: '#'
  },
  {
    title: 'Collaborating with Remote Teams',
    category: 'Guide',
    description: 'Tips and strategies for effective collaboration with distributed teams.',
    image: 'remote-teams',
    link: '#'
  },
  {
    title: 'Frame.io for Agencies',
    category: 'Case Study',
    description: 'How leading agencies use Frame.io to streamline client approvals.',
    image: 'agencies',
    link: '#'
  },
  {
    title: 'Integrating with Adobe Premiere Pro',
    category: 'Tutorial',
    description: 'Step-by-step guide to using the Frame.io extension for Premiere Pro.',
    image: 'premiere-integration',
    link: '#'
  }
];

const ResourcesPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResourceClick = (resourceTitle, resourceLink) => {
    if (resourceLink === '#') {
      toast({ title: "Coming Soon!", description: `Content for "${resourceTitle}" is being prepared.` });
    } else {
      window.open(resourceLink, '_blank');
    }
  };

  const handleWebinarRegister = (webinarTitle) => {
     toast({ title: "Registration Placeholder", description: `Thank you for your interest in "${webinarTitle}". Registration functionality is coming soon.` });
  };
  
  const handleContactSupport = () => {
    navigate('/dashboard/chat'); // Or a dedicated contact page
  };

  const handleBrowseHelp = () => {
     toast({ title: "Help Center", description: "This would navigate to a full help center/documentation site." });
  };


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
              Resources & Learning
            </h1>
            <p className="text-xl text-gray-400">
              Guides, tutorials, and best practices to help you get the most out of Frame.io
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:shadow-black/20 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img  
                    alt={`${resource.title} thumbnail`} 
                    className="w-full h-full object-cover"
                   src="https://images.unsplash.com/photo-1699031584756-f16c3772fc83" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary text-white rounded-full mb-3 self-start">
                    {resource.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">{resource.description}</p>
                  <Button variant="ghost" className="text-white hover:bg-white/10 self-start" onClick={() => handleResourceClick(resource.title, resource.link)}>
                    Read More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Upcoming Webinars
              </h2>
              <p className="text-lg text-gray-400">
                Join our live sessions to learn from industry experts
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Streamlining Post-Production Workflows',
                  date: 'June 15, 2025',
                  time: '11:00 AM PST',
                  speaker: 'Alex Rodriguez, Post-Production Supervisor'
                },
                {
                  title: 'Effective Client Communication Strategies',
                  date: 'June 22, 2025',
                  time: '1:00 PM PST',
                  speaker: 'Sarah Johnson, Creative Director'
                },
                {
                  title: 'Security Best Practices for Video Teams',
                  date: 'July 8, 2025',
                  time: '10:00 AM PST',
                  speaker: 'Michael Chen, Security Specialist'
                }
              ].map((webinar, i) => (
                <motion.div 
                  key={i} 
                  className="bg-card rounded-lg p-6 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{webinar.title}</h3>
                    <p className="text-gray-400 mb-1">{webinar.date} • {webinar.time}</p>
                    <p className="text-gray-400">Presenter: {webinar.speaker}</p>
                  </div>
                  <Button className="btn-primary mt-4 md:mt-0" onClick={() => handleWebinarRegister(webinar.title)}>Register Now</Button>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Need personalized help?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="btn-primary" onClick={handleContactSupport}>Contact Support</Button>
                <Button variant="outline" className="btn-outline" onClick={handleBrowseHelp}>Browse Help Center</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourcesPage;