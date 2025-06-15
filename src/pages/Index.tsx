import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutTemplate,
  Palette,
  Ticket,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import PricingHighlight from "@/components/PricingHighlight";
import LiveBrandingSection from "@/components/LiveBrandingSection";

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    description: "Select from concert, workshop or sports event templates designed for your specific needs.",
  },
  {
    number: "02",
    title: "Customize Your Brand",
    description: "Add your logo, colors, and event details to create a professional-looking event page.",
  },
  {
    number: "03",
    title: "Sell Tickets",
    description: "Set up ticket tiers, prices, and start selling immediately through our secure platform.",
  },
];

const features = [
  {
    icon: <LayoutTemplate className="h-10 w-10 text-blue-500" />,
    title: "Beautiful Templates",
    description: "Pre-designed templates for different event types including concerts, workshops, and sports events.",
  },
  {
    icon: <Palette className="h-10 w-10 text-blue-500" />,
    title: "Brand Customization",
    description: "Match your event page to your brand with custom colors and logos.",
  },
  {
    icon: <Ticket className="h-10 w-10 text-blue-500" />,
    title: "Flexible Ticketing",
    description: "Create multiple ticket tiers with different prices and availability.",
  },
];

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureInterval = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-aos]").forEach((element) => {
      observerRef.current?.observe(element);
    });

    featureInterval.current = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (featureInterval.current) {
        clearInterval(featureInterval.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-sky-50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-sky-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Create branded event pages in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                  3 simple clicks
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Choose a template, customize your brand, and start selling tickets instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 rounded-full group" 
                  asChild
                >
                  <Link to="/auth" className="flex items-center">
                    Get Started 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 rounded-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    document.querySelector('#features-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-500/20 rounded-2xl transform -rotate-2 z-0"></div>
                
                <div className="relative rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-white z-10">
                  <div className="bg-gray-50 border-b border-gray-200 p-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="px-3 py-1 bg-gray-200 rounded-md text-xs font-medium text-gray-600">tixify.co/your-event</div>
                    <div className="w-6"></div>
                  </div>
                  
                  <div className="relative h-72 overflow-hidden">
                    <motion.div 
                      className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === 0 ? 'opacity-100' : 'opacity-0'}`}
                      initial={false}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                        alt="Concert event template"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">Concert Template</span>
                        <h3 className="text-white text-xl font-bold">Summer Music Festival</h3>
                        <p className="text-white/80 text-sm mt-1">Featuring live performances from top artists</p>
                        <div className="flex items-center mt-3 space-x-2">
                          <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Jul 15-17</div>
                          <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Central Park</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === 1 ? 'opacity-100' : 'opacity-0'}`}
                      initial={false}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                        alt="Workshop event template"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">Workshop Template</span>
                        <h3 className="text-white text-xl font-bold">Design Thinking Workshop</h3>
                        <p className="text-white/80 text-sm mt-1">Learn innovative problem-solving techniques</p>
                        <div className="flex items-center mt-3 space-x-2">
                          <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Sep 5</div>
                          <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Innovation Hub</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === 2 ? 'opacity-100' : 'opacity-0'}`}
                      initial={false}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                        alt="Sports event template"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">Sports Template</span>
                        <h3 className="text-white text-xl font-bold">Championship Finals</h3>
                        <p className="text-white/80 text-sm mt-1">The ultimate showdown for the championship title</p>
                        <div className="flex items-center mt-3 space-x-2">
                          <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Oct 12</div>
                          <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Stadium Arena</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <button 
                          key={i}
                          className={`w-2 h-2 rounded-full ${activeFeature === i ? 'bg-white' : 'bg-white/40'}`}
                          onClick={() => setActiveFeature(i)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
                      <div>
                        <div className="text-sm font-medium">VIP Access</div>
                        <div className="text-xs text-gray-500">Limited spots available</div>
                      </div>
                      <div className="text-blue-600 font-bold">$199</div>
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-blue-600 text-white text-center py-3 rounded-lg font-medium cursor-pointer flex items-center justify-center"
                    >
                      Get Tickets
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ opacity: 0 }} data-aos="fade-up">
              How Tixify Works
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ opacity: 0, animationDelay: "200ms" }}
              data-aos="fade-up"
            >
              Create professional event pages and start selling tickets in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
                style={{ opacity: 0, animationDelay: `${index * 200}ms` }}
                data-aos="fade-up"
              >
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8 h-full border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-8 w-8 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Branding Section */}
      <LiveBrandingSection onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <section id="features-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ opacity: 0 }} data-aos="fade-up">
              Key Features
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ opacity: 0, animationDelay: "200ms" }}
              data-aos="fade-up"
            >
              Everything you need to create successful events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
                data-aos="fade-up"
              >
                <div className="flex flex-col items-center text-center p-4">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Highlights Section */}
      <PricingHighlight />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-sky-500 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to create amazing events?</h2>
              <p className="text-xl mb-8 text-blue-100">Start with our free plan today</p>

              <Link to="/auth">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 rounded-full"
                >
                  Get Started for Free
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tixify</h3>
              <p className="text-gray-400">Your branded event pages in 3 clicks.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms
                  </a>
                </li>
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
