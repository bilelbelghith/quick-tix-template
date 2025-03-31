
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
      <section className="pt-28 pb-20 animated-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              Your branded ticketing site in 5 minutes – no code needed
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/80 mb-10"
              style={{ 
                opacity: 0,
                animationDelay: '200ms' 
              }}
              data-aos="fade-up"
            >
              Create custom event pages, sell tickets, and grow your audience – all in one platform.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ 
                opacity: 0,
                animationDelay: '400ms' 
              }}
              data-aos="fade-up"
            >
              <Link to="/onboarding">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-[50px]" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.46,118.92,149.43,68,225.36,58.94Z" 
              fill="#ffffff"
            ></path>
          </svg>
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
