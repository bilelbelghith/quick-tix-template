import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import StepAnimation from "@/components/StepAnimation";
import FeatureCard from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import { 
  LayoutTemplate, Palette, Ticket, Sparkles, Globe, Clock, CreditCard, 
  Users, ArrowRight, Check, ChevronRight, Star 
} from "lucide-react";
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Import Lottie animations
import templateAnimation from '@/assets/animations/template.json';
import customizeAnimation from '@/assets/animations/customize.json';
import publishAnimation from '@/assets/animations/publish.json';

// Testimonial data
const testimonials = [
  { 
    quote: "Saved 20 hours vs Eventbrite!", 
    author: "Music Festival LLC",
    badge: "Verified User" 
  },
  {
    quote: "The branded ticket pages looked exactly like our website!",
    author: "Tech Conference Pro",
    badge: "Verified User"
  },
  {
    quote: "We doubled our sales after switching to Tixify",
    author: "Sports Event Co",
    badge: "Verified User"
  }
];

const Index = () => {
  // For the animated counter
  const [count, setCount] = useState(0);
  const targetCount = 500;
  
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

    // Animate counter when section is visible
    const counterSection = document.getElementById('social-proof');
    if (counterSection) {
      const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Animate counter
          let currentCount = 0;
          const interval = setInterval(() => {
            currentCount += 5;
            if (currentCount >= targetCount) {
              clearInterval(interval);
              setCount(targetCount);
            } else {
              setCount(currentCount);
            }
          }, 20);
        }
      });
      
      counterObserver.observe(counterSection);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Animated Workflow */}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* 3-Step Visual Demo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="social-proof" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              Trusted By Event Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div 
              className="bg-white rounded-xl p-6 shadow-md text-center transform hover:-translate-y-1 transition-all duration-300"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">{count}+</div>
              <p className="text-gray-600">Events Created</p>
            </div>
            
            <div 
              className="bg-white rounded-xl p-6 shadow-md text-center transform hover:-translate-y-1 transition-all duration-300"
              style={{ opacity: 0, animationDelay: '200ms' }}
              data-aos="fade-up"
            >
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Customer Rating</p>
            </div>
            
            <div 
              className="bg-white rounded-xl p-6 shadow-md text-center transform hover:-translate-y-1 transition-all duration-300"
              style={{ opacity: 0, animationDelay: '400ms' }}
              data-aos="fade-up"
            >
              <div className="flex justify-center items-center space-x-2 mb-2">
                <span className="text-lg font-semibold">Partnered with</span>
                <div className="text-blue-500 font-bold">Stripe</div>
              </div>
              <p className="text-gray-600">Secure Payments</p>
            </div>
          </div>
          
          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto" style={{ opacity: 0 }} data-aos="fade-up">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                    <Card className="border-none shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center p-4">
                          <div className="text-purple-600 mb-6">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 6C11 4.89543 10.1046 4 9 4H7C5.89543 4 5 4.89543 5 6V10C5 11.1046 5.89543 12 7 12H9C10.1046 12 11 11.1046 11 10V6Z" fill="currentColor" />
                              <path d="M21 6C21 4.89543 20.1046 4 19 4H17C15.8954 4 15 4.89543 15 6V10C15 11.1046 15.8954 12 17 12H19C20.1046 12 21 11.1046 21 10V6Z" fill="currentColor" />
                              <path d="M11 16C11 14.8954 10.1046 14 9 14H7C5.89543 14 5 14.8954 5 16V18C5 19.1046 5.89543 20 7 20H9C10.1046 20 11 19.1046 11 18V16Z" fill="currentColor" />
                              <path d="M21 16C21 14.8954 20.1046 14 19 14H17C15.8954 14 15 14.8954 15 16V18C15 19.1046 15.8954 20 17 20H19C20.1046 20 21 19.1046 21 18V16Z" fill="currentColor" />
                            </svg>
                          </div>
                          <blockquote className="text-2xl font-medium mb-4">"{testimonial.quote}"</blockquote>
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            {testimonial.badge}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              Simple, Transparent Pricing
            </h2>
            <p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ opacity: 0, animationDelay: '200ms' }}
              data-aos="fade-up"
            >
              No hidden fees. Pay only for what you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Tier */}
            <div 
              className="rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold mb-4">Free</div>
                <p className="text-muted-foreground mb-6">Perfect for individuals and small events</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>1 event per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Up to 100 tickets</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic templates</span>
                  </li>
                </ul>
                
                <Button className="w-full">Try Free</Button>
              </div>
            </div>
            
            {/* Pro Tier */}
            <div 
              className="rounded-xl border-2 border-purple-600 bg-card shadow-lg relative transform hover:-translate-y-1 transition-all duration-300"
              style={{ opacity: 0, animationDelay: '200ms' }}
              data-aos="fade-up"
            >
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium text-center">
                Most Popular
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <p className="text-muted-foreground mb-6">For growing businesses and organizers</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited events</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Up to 1,000 tickets per event</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>All templates & customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Trial</Button>
              </div>
            </div>
            
            {/* Enterprise Tier */}
            <div 
              className="rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md"
              style={{ opacity: 0, animationDelay: '400ms' }}
              data-aos="fade-up"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">Custom</div>
                <p className="text-muted-foreground mb-6">For large-scale events and organizations</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited everything</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom development</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Enterprise SLA</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </div>
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

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to sell tickets your way?</h2>
              <p className="text-xl text-muted-foreground mb-8">No credit card required. 7-day free trial. Cancel anytime.</p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <motion.button
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold whitespace-nowrap hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    scale: [1, 1.02, 1], 
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 10
                  }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
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
