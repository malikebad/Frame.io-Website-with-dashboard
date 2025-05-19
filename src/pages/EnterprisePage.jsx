import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Users, Lock, BarChart, Zap, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const enterpriseFeatures = [
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: 'Enterprise-grade security',
    description: 'Advanced security features including SSO, 2FA, and compliance with industry standards like SOC 2, GDPR, and HIPAA.'
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: 'Unlimited team members',
    description: 'Scale your team without limits. Add as many users as you need with granular permission controls.'
  },
  {
    icon: <Lock className="h-8 w-8 text-white" />,
    title: 'Advanced access controls',
    description: 'Set detailed permissions at the organization, project, and asset level to ensure the right people have the right access.'
  },
  {
    icon: <BarChart className="h-8 w-8 text-white" />,
    title: 'Advanced analytics',
    description: 'Gain insights into your workflow with detailed reporting and analytics dashboards.'
  },
  {
    icon: <Zap className="h-8 w-8 text-white" />,
    title: 'Dedicated infrastructure',
    description: 'Optional dedicated infrastructure for high-volume teams with specific performance requirements.'
  },
  {
    icon: <Briefcase className="h-8 w-8 text-white" />,
    title: 'Custom integrations',
    description: 'Custom API integrations with your existing tools and workflows, tailored to your specific needs.'
  }
];

const EnterprisePage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyEmail: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.companyEmail || !formData.company) {
        toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
        return;
    }
    // Simulate form submission
    localStorage.setItem('enterprise-contact-request', JSON.stringify(formData));
    toast({ title: "Request Submitted", description: "Thank you! Our enterprise team will contact you shortly." });
    setFormData({ firstName: '', lastName: '', companyEmail: '', company: '', message: '' });
  };


  return (
    <>
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Enterprise solutions for global teams
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Secure, scalable, and customizable video collaboration for organizations with advanced needs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="btn-primary" onClick={() => document.getElementById('enterpriseContactForm')?.scrollIntoView({ behavior: 'smooth' })}>Contact Sales</Button>
                <Button variant="outline" className="btn-outline" onClick={() => toast({ title: "Demo Request", description:"This would typically open a demo scheduling tool."})}>Schedule Demo</Button>
              </div>
            </motion.div>
            
            <motion.div
              className="rounded-lg overflow-hidden border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img  
                alt="Enterprise team collaboration" 
                className="w-full h-auto"
               src="https://images.unsplash.com/photo-1608403810239-ac22e2c3bac7" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Enterprise-grade features
            </h2>
            <p className="text-lg text-gray-400">
              Designed for organizations with complex workflows and security requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4 p-3 inline-block rounded-full bg-secondary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="enterpriseContactForm" className="py-20 bg-background">
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
                Trusted by leading organizations
              </h2>
              <p className="text-lg text-gray-400">
                Join the world's most innovative companies using Frame.io
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 opacity-70">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="h-16 bg-white/10 rounded flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="text-white/50 font-bold">LOGO</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 p-8 bg-card rounded-lg border border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Get in touch with our enterprise team
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-background border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                      Last Name
                    </Label>
                    <Input 
                      type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyEmail" className="block text-sm font-medium text-gray-400 mb-1">
                    Company Email <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    type="email" name="companyEmail" id="companyEmail" value={formData.companyEmail} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-background border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    type="text" name="company" id="company" value={formData.company} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-background border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Message
                  </Label>
                  <Textarea 
                    name="message" id="message" rows="4" value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  ></Textarea>
                </div>
                <div className="text-center">
                  <Button type="submit" className="btn-primary px-8 py-3 text-base">Submit Request</Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterprisePage;