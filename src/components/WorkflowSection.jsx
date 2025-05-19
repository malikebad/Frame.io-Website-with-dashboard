
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const WorkflowSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Streamline your entire workflow
          </h2>
          <p className="text-lg text-gray-400">
            From production to delivery, we've got you covered
          </p>
        </motion.div>

        <Tabs defaultValue="review" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 rounded-lg p-1">
            <TabsTrigger value="review">Review & Approve</TabsTrigger>
            <TabsTrigger value="collaborate">Team Collaboration</TabsTrigger>
            <TabsTrigger value="deliver">Deliver & Share</TabsTrigger>
          </TabsList>
          
          <TabsContent value="review" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Frame-accurate feedback</h3>
                <p className="text-gray-400 mb-6">
                  Leave comments at the exact moment in the video. No more confusing timecodes or vague feedback. Our intuitive interface makes it easy to provide precise feedback.
                </p>
                <ul className="space-y-3">
                  {['Time-stamped comments', 'Drawing tools', 'Version comparison', 'Approval workflows'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img  
                  alt="Video review interface with comments" 
                  className="w-full h-auto"
                 src="https://images.unsplash.com/photo-1682506457554-b34c9682e985" />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaborate" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Seamless team collaboration</h3>
                <p className="text-gray-400 mb-6">
                  Bring your entire team together in one place. Editors, producers, clients, and stakeholders can all collaborate in real-time, no matter where they are.
                </p>
                <ul className="space-y-3">
                  {['Real-time updates', 'Team permissions', 'Comment threads', 'Activity notifications'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img  
                  alt="Team collaboration dashboard" 
                  className="w-full h-auto"
                 src="https://images.unsplash.com/photo-1676276376927-3e0f559491aa" />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="deliver" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Effortless delivery</h3>
                <p className="text-gray-400 mb-6">
                  Share your work with clients and stakeholders with just a few clicks. Generate secure, customizable presentation pages that make your work shine.
                </p>
                <ul className="space-y-3">
                  {['Secure sharing links', 'Custom presentation pages', 'Download options', 'Expiration settings'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img  
                  alt="Video delivery presentation page" 
                  className="w-full h-auto"
                 src="https://images.unsplash.com/photo-1649015931204-15a3c789e6ea" />
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default WorkflowSection;
