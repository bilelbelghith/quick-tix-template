
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { LayoutTemplate, Palette, Globe, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Create branded event pages in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                  3 simple clicks
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                No complex builders. Just pick a template, customize your brand, and start selling tickets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 rounded-lg" 
                  asChild
                >
                  <Link to="/templates">Create Your Event</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Event page preview" 
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">Music Event</span>
                  <h3 className="text-white text-xl font-bold">Summer Music Festival</h3>
                  <p className="text-white/80 text-sm mt-1">Live performances from top artists</p>
                  <div className="flex items-center mt-3 space-x-2">
                    <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Jul 15-17</div>
                    <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">Central Park</div>
                  </div>
                </div>
                <div className="p-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Get Tickets
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create and launch your branded event page in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <LayoutTemplate className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">1. Choose Template</h3>
              </div>
              <p className="text-gray-600">
                Select from concert, workshop, or sports templates designed for your specific needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ChevronRight className="h-8 w-8 text-gray-300" />
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">2. Customize</h3>
              </div>
              <p className="text-gray-600">
                Add your logo, brand colors, and event details in one simple screen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ChevronRight className="h-8 w-8 text-gray-300" />
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">3. Publish</h3>
              </div>
              <p className="text-gray-600">
                Launch your event page and start selling tickets instantly.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 rounded-lg"
              asChild
            >
              <Link to="/templates">Create Your Event</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-purple-50 rounded-xl p-8 border border-purple-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Ready to start selling?</h2>
                <p className="text-gray-600 mb-6 md:mb-0">
                  Join hundreds of event creators who increased sales with branded pages.
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 rounded-lg whitespace-nowrap"
                asChild
              >
                <Link to="/templates">Create Your Event</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Tixify. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Terms</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
