
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "Frame.io has completely transformed how our team collaborates on video projects. We've cut our review time in half.",
    author: "Sarah Johnson",
    role: "Creative Director, Pixel Studios",
    avatar: "SJ"
  },
  {
    quote: "The ability to leave frame-accurate comments has been a game-changer for our post-production workflow.",
    author: "Michael Chen",
    role: "Post-Production Supervisor, Dreamscape Films",
    avatar: "MC"
  },
  {
    quote: "We manage hundreds of video assets across multiple teams, and Frame.io makes it incredibly simple to keep everything organized.",
    author: "Emma Rodriguez",
    role: "Content Manager, Global Media",
    avatar: "ER"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by creative professionals
          </h2>
          <p className="text-lg text-gray-400">
            See why thousands of video teams choose our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-secondary/50 backdrop-blur-sm rounded-lg p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-primary text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg text-white mb-6">Trusted by over 1,500,000 creative professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Company logos would go here */}
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
