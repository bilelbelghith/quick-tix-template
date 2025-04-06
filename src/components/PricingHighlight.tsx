
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingHighlight: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Start for free, upgrade as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div 
            className="rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-200"
            data-aos="fade-up"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-2xl font-bold mb-4">$0</div>
              <p className="text-gray-600 mb-4">Start creating your first event</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>1 event at a time</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic customization</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div 
            className="rounded-xl border-2 border-purple-600 bg-white shadow-lg transform hover:-translate-y-1 transition-all duration-200 relative"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="absolute -top-3 left-0 right-0 mx-auto w-32 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium text-center">
              Most Popular
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-2xl font-bold mb-4">$15<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-600 mb-4">For growing organizers</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Up to 10 events</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Custom domain</span>
                </div>
              </div>
            </div>
          </div>

          {/* Business Plan */}
          <div 
            className="rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-200"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Business</h3>
              <div className="text-2xl font-bold mb-4">$49<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-600 mb-4">For event professionals</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited events</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Team access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button asChild className="rounded-full px-8 font-medium" variant="outline">
            <Link to="/pricing">See full pricing →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingHighlight;
