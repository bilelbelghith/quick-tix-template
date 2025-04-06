
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PricingTier from '@/components/PricingTier';
import PricingAddon from '@/components/PricingAddon';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Check, 
  Info, 
  Users, 
  Globe, 
  BarChart4, 
  Zap, 
  Webhook, 
  Crown, 
  LifeBuoy,
  Mail,
  Palette,
  Award
} from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };

  const freeFeatures = [
    { text: "Access to 1 template", included: true },
    { text: "Max 1 published event at a time", included: true },
    { text: "Limited customization (logo, color, cover image)", included: true },
    { text: "Tixify branding on footer", included: true },
    { text: "Stripe checkout support", included: true },
    { text: "Analytics", included: false },
    { text: "Custom domain", included: false },
  ];

  const proFeatures = [
    { text: "Access to all 3 templates", included: true },
    { text: "Up to 10 active events", included: true },
    { text: "Option to remove Tixify branding", included: true },
    { text: "Custom domain (CNAME support)", included: true },
    { text: "Advanced customization (CTA links, custom footer)", included: true },
    { text: "Basic event analytics (visits, conversions)", included: true },
    { text: "2% transaction fee", included: true },
  ];

  const businessFeatures = [
    { text: "Unlimited events", included: true },
    { text: "Multiple team members", included: true },
    { text: "Premium templates (future-ready)", included: true },
    { text: "Advanced analytics dashboard", included: true },
    { text: "Webhooks & Zapier integration", included: true },
    { text: "0% transaction fee", included: true },
    { text: "Priority support", included: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto pt-24 px-4 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-bold mb-4">Simple Pricing, Fewer Fees</h1>
          <p className="text-lg text-gray-600">
            Start free, upgrade as you grow. No hidden costs or surprises.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Trusted by 10,000+ event creators worldwide
          </p>
        </div>

        {/* Lifetime Deal Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-4 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto mb-12">
          <div className="flex items-center mb-4 md:mb-0">
            <Award className="h-12 w-12 mr-4" />
            <div>
              <h3 className="font-bold text-xl">Limited Time Offer</h3>
              <p>Get lifetime access to Pro features for a one-time payment</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-bold text-2xl mr-4">$99</div>
            <Button size="lg" className="whitespace-nowrap bg-white text-blue-700 hover:bg-gray-100">
              Get Lifetime Deal
            </Button>
          </div>
        </div>

        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <Label htmlFor="billing-toggle" className={`${billingPeriod === 'monthly' ? 'font-bold' : 'text-gray-500'}`}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingPeriod === 'yearly'}
              onCheckedChange={toggleBillingPeriod}
            />
            <div className="flex items-center gap-2">
              <Label htmlFor="billing-toggle" className={`${billingPeriod === 'yearly' ? 'font-bold' : 'text-gray-500'}`}>
                Yearly
              </Label>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingTier
            name="Free"
            price="$0"
            description="Perfect for testing the platform."
            features={freeFeatures}
            buttonText="Start Selling"
            buttonVariant="outline"
            delay={0}
          />

          <PricingTier
            name="Pro"
            price={billingPeriod === 'monthly' ? "$15" : "$120"}
            billingPeriod={billingPeriod === 'monthly' ? 'month' : 'year'}
            annualPrice={billingPeriod === 'monthly' ? "$120" : undefined}
            discount={billingPeriod === 'monthly' ? "20%" : undefined}
            description="For solo organizers and small businesses."
            features={proFeatures}
            buttonText="Get Pro"
            popular={true}
            delay={150}
          />

          <PricingTier
            name="Business"
            price={billingPeriod === 'monthly' ? "$49" : "$399"}
            billingPeriod={billingPeriod === 'monthly' ? 'month' : 'year'}
            annualPrice={billingPeriod === 'monthly' ? "$399" : undefined}
            discount={billingPeriod === 'monthly' ? "32%" : undefined}
            description="For agencies and event professionals."
            features={businessFeatures}
            buttonText="Talk to Us"
            buttonVariant="outline"
            delay={300}
          />
        </div>

        {/* Transaction Fee Info */}
        <div className="bg-blue-50 rounded-lg p-4 max-w-5xl mx-auto mt-10 flex items-center">
          <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Transaction fees:</span> Free plan uses Stripe's standard fees. Pro plan adds 2% on top of Stripe fees. Business plan has 0% Tixify fee (only Stripe's standard fees apply).
          </p>
        </div>

        {/* Add-ons Section */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Add-ons & Upgrades</h2>
          <div className="space-y-4">
            <PricingAddon 
              name="Premium Animation Pack" 
              price="$19 one-time" 
              description="Add beautiful Lottie animations to your event pages" 
              buttonText="Add to Plan" 
            />
            <PricingAddon 
              name="Custom SMTP" 
              price="$9/month" 
              description="Send emails from your own domain for a fully branded experience" 
              buttonText="Add to Plan" 
            />
            <PricingAddon 
              name="White-label Mode" 
              price="$29/month" 
              description="Remove all Tixify branding from your dashboard and event pages" 
              buttonText="Add to Plan" 
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Free</th>
                  <th className="p-4 text-center">Pro</th>
                  <th className="p-4 text-center">Business</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <Palette className="h-5 w-5 text-gray-400 mr-2" />
                    Templates
                  </td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">3</td>
                  <td className="p-4 text-center">All + Premium</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    Events
                  </td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    Custom Domain
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-red-500">✕</span>
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <BarChart4 className="h-5 w-5 text-gray-400 mr-2" />
                    Analytics
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-red-500">✕</span>
                  </td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center">Advanced</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    Team Members
                  </td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <Webhook className="h-5 w-5 text-gray-400 mr-2" />
                    Webhooks & Zapier
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-red-500">✕</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-red-500">✕</span>
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <Crown className="h-5 w-5 text-gray-400 mr-2" />
                    Tixify Branding
                  </td>
                  <td className="p-4 text-center">Included</td>
                  <td className="p-4 text-center">Optional</td>
                  <td className="p-4 text-center">Optional</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <Zap className="h-5 w-5 text-gray-400 mr-2" />
                    Transaction Fee
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-56 text-sm">
                            This is in addition to standard Stripe processing fees
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="p-4 text-center">Stripe only</td>
                  <td className="p-4 text-center">2% + Stripe</td>
                  <td className="p-4 text-center">Stripe only</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 flex items-center">
                    <LifeBuoy className="h-5 w-5 text-gray-400 mr-2" />
                    Support
                  </td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-bold text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards via Stripe. For annual plans, we also offer invoice payment options.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-bold text-lg mb-2">Is there a contract or commitment?</h3>
              <p className="text-gray-600">No, all plans are month-to-month with no long-term commitment. Annual plans offer a discount but can be canceled anytime.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-bold text-lg mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team.</p>
            </div>
          </div>
        </div>

        {/* Floating CTA */}
        <div className="fixed bottom-6 left-0 right-0 mx-auto w-max z-10 shadow-lg rounded-full bg-white border border-gray-200 px-6 py-3 hidden md:flex items-center">
          <span className="mr-4 font-medium">Still deciding? Compare plans →</span>
          <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
