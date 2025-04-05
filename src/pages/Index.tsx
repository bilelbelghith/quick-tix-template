import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutTemplate,
  Palette,
  Ticket,
  Clock,
  CreditCard,
  Users,
  ArrowRight,
  Check,
  ChevronRight,
  Star,
  Calendar,
  Globe,
  Shield,
  Zap,
  Mouse,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import LiveBrandingSection from "@/components/LiveBrandingSection";

const testimonials = [
  {
    quote: "Saved 20 hours vs Eventbrite!",
    author: "Music Festival LLC",
    badge: "Verified User",
  },
  {
    quote: "The branded ticket pages looked exactly like our website!",
    author: "Tech Conference Pro",
    badge: "Verified User",
  },
  {
    quote: "We doubled our sales after switching to Tixify",
    author: "Sports Event Co",
    badge: "Verified User",
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
  {
    icon: <CreditCard className="h-10 w-10 text-blue-500" />,
    title: "Secure Payments",
    description: "Accept payments with Stripe's secure checkout integration.",
  },
  {
    icon: <Globe className="h-10 w-10 text-blue-500" />,
    title: "Custom Domain",
    description: "Use your own domain for a completely branded experience.",
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-500" />,
    title: "Quick Setup",
    description: "Go from idea to live event page in just minutes.",
  },
];

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

const Index = () => {
  const [count, setCount] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const targetCount = 500;
  const featureInterval = useRef<NodeJS.Timeout | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/templates');
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

    const counterSection = document.getElementById("social-proof");
    if (counterSection) {
      const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
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

      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-sky-50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-sky-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Your branded events platform in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                  minutes
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Beautiful event pages, flexible ticketing options, and seamless checkout experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 rounded-full group" 
                  asChild
                >
                  <Link to="/interactive-demo" className="flex items-center">
                    Try it now 
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
                  asChild
                >
                  <Link to="/templates">View Templates</Link>
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
                
                <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 z-20">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">10k+ users</div>
                    <div className="text-xs text-gray-500">Trust Tixify</div>
                  </div>
                </div>

                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg z-20"
                >
                  <div className="relative">
                    <Mouse className="h-6 w-6" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span className="absolute -right-1 top-full mt-1 text-xs font-medium bg-white text-blue-600 py-1 px-3 rounded-full whitespace-nowrap shadow-sm">
                    Click to try!
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
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

      <LiveBrandingSection onGetStarted={handleGetStarted} />

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ opacity: 0 }} data-aos="fade-up">
              Everything You Need
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ opacity: 0, animationDelay: "200ms" }}
              data-aos="fade-up"
            >
              Powerful features to help you sell more tickets and create amazing event experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <section id="social-proof" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ opacity: 0 }} data-aos="fade-up">
              Trusted By Event Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{count}+</div>
                <p className="text-gray-700 font-medium">Events Created</p>
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
              style={{ opacity: 0, animationDelay: "200ms" }}
              data-aos="fade-up"
            >
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">4.9/5</div>
                <p className="text-gray-700 font-medium">Customer Rating</p>
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
              style={{ opacity: 0, animationDelay: "400ms" }}
              data-aos="fade-up"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">Secure Payments</div>
                <p className="text-gray-700 font-medium">Partnered with Stripe</p>
              </div>
            </div>
          </div>

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
                    <Card className="border-none shadow-md bg-gradient-to-br from-white to-blue-50">
                      <CardContent className="p-8">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 6C11 4.89543 10.1046 4 9 4H7C5.89543 4 5 4.89543 5 6V10C5 11.1046 5.89543 12 7 12H9C10.1046 12 11 11.1046 11 10V6Z"
                                fill="currentColor"
                              />
                              <path
                                d="M21 6C21 4.89543 20.1046 4 19 4H17C15.8954 4 15 4.89543 15 6V10C15 11.1046 15.8954 12 17 12H19C20.1046 12 21 11.1046 21 10V6Z"
                                fill="currentColor"
                              />
                              <path
                                d="M11 16C11 14.8954 10.1046 14 9 14H7C5.89543 14 5 14.8954 5 16V18C5 19.1046 5.89543 20 7 20H9C10.1046 20 11 19.1046 11 18V16Z"
                                fill="currentColor"
                              />
                              <path
                                d="M21 16C21 14.8954 20.1046 14 19 14H17C15.8954 14 15 14.8954 15 16V18C15 19.1046 15.8954 20 17 20H19C20.1046 20 21 19.1046 21 18V16Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <blockquote className="text-2xl font-medium mb-4 text-gray-800">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="font-semibold text-gray-700">{testimonial.author}</div>
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
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ opacity: 0 }} data-aos="fade-up">
              Simple, Transparent Pricing
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ opacity: 0, animationDelay: "200ms" }}
              data-aos="fade-up"
            >
              No hidden fees. Pay only for what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              className="rounded-xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              style={{ opacity: 0 }}
              data-aos="fade-up"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold mb-4">Free</div>
                <p className="text-gray-600 mb-6">Perfect for individuals and small events</p>

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

                <Button className="w-full bg-gray-800 hover:bg-gray-900">Try Free</Button>
              </div>
            </div>

            <div
              className="rounded-xl border-2 border-blue-500 bg-white shadow-lg relative transform hover:-translate-y-1 transition-all duration-300"
              style={{ opacity: 0, animationDelay: "200ms" }}
              data-aos="fade-up"
            >
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium text-center">
                Most Popular
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">
                  $29<span className="text-lg font-normal text-gray-500">/mo</span>
                </div>
                <p className="text-gray-600 mb-6">For growing businesses and organizers</p>

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

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Trial</Button>
              </div>
            </div>

            <div
              className="rounded-xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              style={{ opacity: 0, animationDelay: "400ms" }}
              data-aos="fade-up"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">Custom</div>
                <p className="text-gray-600 mb-6">For large-scale events and organizations</p>

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

                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1" style={{ opacity: 0 }} data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Security and Reliability You Can Trust</h2>
              <p className="text-lg text-gray-600 mb-8">
                Your events and customer data are always secure with our enterprise-grade security systems.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Secure Payments</h3>
                    <p className="text-gray-600">PCI compliant payment processing through Stripe.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">99.9% Uptime</h3>
                    <p className="text-gray-600">Your event pages are always available for your customers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Real-time Analytics</h3>
                    <p className="text-gray-600">Monitor your ticket sales and attendee data in real-time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2" style={{ opacity: 0 }} data-aos="fade-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl transform -rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Security and Trust"
                  className="rounded-2xl shadow-xl z-10 relative transform rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-blue-600 to-sky-500 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to create amazing events?</h2>
              <p className="text-xl mb-8 text-blue-100">Experience our platform before signing up</p>

              <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Link to="/interactive-demo" className="w-full md:w-auto">
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 rounded-full"
                  >
                    Try Interactive Demo
                  </Button>
                </Link>
                <Link to="/auth/signup" className="w-full md:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full md:w-auto text-lg px-8 rounded-full border-white/30 text-white hover:bg-blue-700/30"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tixify</h3>
              <p className="text-gray-400">Your branded ticketing platform in minutes.</p>
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
                    Templates
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
                    Careers
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
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
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
