import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for personal projects",
    price: "$0",
    period: "forever",
    icon: Zap,
    color: "gray",
    features: [
      "1 monitor",
      "5-minute checks",
      "Email alerts",
      "7-day data retention",
      "Basic status page",
      "Community support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Team",
    description: "For growing teams and businesses",
    price: "$29",
    period: "per month",
    icon: Star,
    color: "green",
    features: [
      "50 monitors",
      "1-minute checks",
      "All alert channels",
      "1-year data retention",
      "Custom status pages",
      "Team collaboration",
      "API access",
      "SLA reporting"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    price: "$99",
    period: "per month",
    icon: Crown,
    color: "purple",
    features: [
      "Unlimited monitors",
      "30-second checks",
      "Priority support",
      "Unlimited data retention",
      "White-label status pages",
      "Advanced integrations",
      "Custom escalations",
      "Dedicated account manager",
      "99.9% SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

interface PricingProps {
  onNavigateToSignUp: () => void;
}

export function Pricing({ onNavigateToSignUp }: PricingProps) {
  return (
    <section id="pricing" className="py-16 md:py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-green-500/5"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
            <Star className="w-3 h-3 mr-1" />
            Simple Pricing
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Choose the perfect plan
            </span>
            <br />
            <span className="text-green-400">for your monitoring needs</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core monitoring features 
            with no hidden fees or setup costs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:bg-card/70 ${
                plan.popular 
                  ? "border-green-500/50 scale-105 shadow-2xl shadow-green-500/20" 
                  : "border-green-500/20 hover:border-green-500/40"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    plan.color === 'green' 
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' 
                      : plan.color === 'purple'
                      ? 'bg-gradient-to-br from-purple-500/20 to-violet-500/20'
                      : 'bg-gradient-to-br from-gray-500/20 to-slate-500/20'
                  }`}>
                    <plan.icon className={`w-6 h-6 ${
                      plan.color === 'green' 
                        ? 'text-green-400' 
                        : plan.color === 'purple'
                        ? 'text-purple-400'
                        : 'text-gray-400'
                    }`} />
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                
                <CardDescription className="text-muted-foreground mb-6">
                  {plan.description}
                </CardDescription>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  onClick={plan.name === "Enterprise" ? undefined : onNavigateToSignUp}
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                      : "border-green-500/30 text-green-400 hover:bg-green-500/10"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-2xl p-8 border border-green-500/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need a custom solution?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We offer custom enterprise solutions with dedicated infrastructure, 
              advanced security features, and personalized support for large organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
              >
                Contact Sales
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}