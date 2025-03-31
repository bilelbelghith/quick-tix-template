
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import StepAnimation from "@/components/StepAnimation";
import FeatureCard from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import { LayoutTemplate, Palette, Ticket, Sparkles, Globe, Clock, CreditCard, Users } from "lucide-react";

// Import Lottie animations
import templateAnimation from '@/assets/animations/template.json';
import customizeAnimation from '@/assets/animations/customize.json';
import publishAnimation from '@/assets/animations/publish.json';

const Index = () => {
  // To handle the fade-in animations on scroll
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Setup intersection observer for animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Animated Gradient Background */}
      <section className="relative min-h-screen flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 animate-gradient-slow"></div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Your branded ticketing site in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                5 minutes
              </span>{' '}
              – no code needed
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose a template, customize your brand, and start selling tickets instantly.
              No technical skills required.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Player
              autoplay
              loop
              src="https://assets10.lottiefiles.com/packages/lf20_xvrofzfk.json"
              style={{ height: '400px', width: '100%' }}
            />
          </motion.div>
        </div>
      </div>
    </section>

      {/* 3-Step Visual Demo */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              How It Works
            </h2>
            <p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ 
                opacity: 0,
                animationDelay: '200ms' 
              }}
              data-aos="fade-up"
            >
              Create and launch your event page in minutes with our simple three-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepAnimation 
              animation={templateAnimation}
              title="Pick a Template" 
              description="Choose from our professionally designed templates for any event type"
              delay={0}
            />
            <StepAnimation 
              animation={customizeAnimation}
              title="Customize" 
              description="Add your branding, event details, and ticket types"
              delay={200}
            />
            <StepAnimation 
              animation={publishAnimation}
              title="Publish & Sell" 
              description="Go live and start selling tickets instantly"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              Everything You Need
            </h2>
            <p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ 
                opacity: 0,
                animationDelay: '200ms' 
              }}
              data-aos="fade-up"
            >
              Powerful features to help you sell more tickets and create amazing event experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div style={{ opacity: 0 }} data-aos="fade-up">
              <FeatureCard 
                icon={<LayoutTemplate />}
                title="Beautiful Templates" 
                description="Pre-designed templates optimized for different event types"
              />
            </div>
            
            <div style={{ opacity: 0, animationDelay: '100ms' }} data-aos="fade-up">
              <FeatureCard 
                icon={<Palette />}
                title="Brand Customization" 
                description="Match your event page to your brand with custom colors and logos"
              />
            </div>
            
            <div style={{ opacity: 0, animationDelay: '200ms' }} data-aos="fade-up">
              <FeatureCard 
                icon={<Ticket />}
                title="Flexible Ticketing" 
                description="Create multiple ticket tiers with different prices and availability"
              />
            </div>
            
            <div style={{ opacity: 0, animationDelay: '300ms' }} data-aos="fade-up">
              <FeatureCard 
                icon={<CreditCard />}
                title="Secure Payments" 
                description="Accept payments with Stripe's secure checkout integration"
              />
            </div>
            
            <div style={{ opacity: 0, animationDelay: '400ms' }} data-aos="fade-up">
              <FeatureCard 
                icon={<Globe />}
                title="Custom Domain" 
                description="Use your own domain for a completely branded experience"
              />
            </div>
            
            <div style={{ opacity: 0, animationDelay: '500ms' }} data-aos="fade-up">
              <FeatureCard 
                icon={<Clock />}
                title="Quick Setup" 
                description="Go from idea to live event page in just minutes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              Ready to create your event?
            </h2>
            <p 
              className="text-xl text-white/80 mb-10"
              style={{ 
                opacity: 0,
                animationDelay: '200ms' 
              }}
              data-aos="fade-up"
            >
              Join thousands of event organizers who trust Tixify for their ticketing needs
            </p>
            <div 
              style={{ 
                opacity: 0,
                animationDelay: '400ms' 
              }}
              data-aos="fade-up"
            >
              <Link to="/onboarding">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tixify</h3>
              <p className="text-gray-400">Your branded ticketing platform in minutes.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Tixify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
