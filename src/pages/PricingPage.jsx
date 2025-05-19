import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const pricingPlans = [
  {
    name: 'Starter',
    price: '$15',
    description: 'Perfect for individuals and small projects',
    features: [
      '5 active projects',
      '50GB storage',
      'Basic review tools',
      '3 team members',
      'Email support',
      'Mobile app access'
    ]
  },
  {
    name: 'Professional',
    price: '$29',
    description: 'Ideal for creative professionals and small teams',
    features: [
      'Unlimited projects',
      '250GB storage',
      'Advanced review tools',
      '10 team members',
      'Priority support',
      'Version comparison',
      'Custom branding',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Business',
    price: '$49',
    description: 'For growing teams with advanced needs',
    features: [
      'Unlimited projects',
      '1TB storage',
      'Enterprise-grade security',
      '25 team members',
      '24/7 support',
      'Advanced permissions',
      'Custom workflows',
      'Analytics dashboard',
      'SSO integration'
    ]
  }
];

const PricingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChoosePlan = (planName) => {
    toast({ title: `Plan Selected: ${planName}`, description: "Redirecting to sign up..." });
    navigate('/signup');
  };

  const handleContactSales = () => {
    toast({ title: "Contacting Sales", description: "Redirecting to enterprise contact..." });
    navigate('/enterprise#enterpriseContactForm'); // Assuming an ID for the contact form section
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
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-400">
              Choose the plan that's right for you and your team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg overflow-hidden border ${
                  plan.popular ? 'border-white/30 bg-secondary/50' : 'border-white/10 bg-card'
                } relative flex flex-col`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">/month</span>
                  </div>
                  <p className="text-gray-400 mb-6 min-h-[40px]">{plan.description}</p>
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleChoosePlan(plan.name)}
                  >
                    {plan.popular ? 'Get Started' : 'Choose Plan'}
                  </Button>
                </div>
                <div className="border-t border-white/10 p-8 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <Check className="h-5 w-5 mr-3 text-white shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <div className="space-y-6">
              {[
                {
                  q: 'Can I change my plan later?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated and reflected in your next billing cycle.'
                },
                {
                  q: 'Is there a free trial available?',
                  a: 'Yes, we offer a 14-day free trial on all plans. No credit card required to start your trial.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and for annual plans, we can also accommodate bank transfers and purchase orders.'
                },
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period.'
                },
                {
                  q: 'Do you offer discounts for annual billing?',
                  a: 'Yes, we offer a 20% discount when you choose annual billing instead of monthly.'
                },
                {
                  q: 'Is my data secure?',
                  a: 'Absolutely. We use industry-leading security measures to protect your data, including encryption at rest and in transit, regular security audits, and compliance with major security standards.'
                }
              ].map((faq, i) => (
                <motion.div 
                  key={i} 
                  className="bg-card rounded-lg p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 mb-6">
                Need something more customized? Contact our sales team for enterprise solutions.
              </p>
              <Button className="btn-primary" onClick={handleContactSales}>Contact Sales</Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;