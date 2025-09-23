import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { 
  Monitor, 
  AlertTriangle, 
  BarChart3, 
  Globe2, 
  Smartphone, 
  Shield, 
  Zap, 
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Server
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Website Monitoring",
    description: "Monitor your websites, APIs, and services from 20+ global locations with advanced health checks.",
    badge: "Core",
    color: "green"
  },
  {
    icon: AlertTriangle,
    title: "Smart Alerting",
    description: "Get instant notifications via Slack, Discord, email, SMS, and webhooks when issues are detected.",
    badge: "AI-Powered",
    color: "blue"
  },
  {
    icon: BarChart3,
    title: "Status Pages",
    description: "Beautiful, customizable status pages that keep your users informed during incidents.",
    badge: "Public",
    color: "purple"
  },
  {
    icon: Globe2,
    title: "Global Infrastructure",
    description: "Monitor from 20+ worldwide locations to ensure accurate global performance insights.",
    badge: "Worldwide",
    color: "green"
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Stay connected with native iOS and Android apps for monitoring on the go.",
    badge: "Native",
    color: "blue"
  },
  {
    icon: Shield,
    title: "SSL Monitoring",
    description: "Automatic SSL certificate monitoring with expiration alerts and security insights.",
    badge: "Security",
    color: "orange"
  },
  {
    icon: Zap,
    title: "Performance Insights",
    description: "Deep performance analytics with response times, load times, and optimization suggestions.",
    badge: "Analytics",
    color: "purple"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Invite team members, set up escalation policies, and manage incidents together.",
    badge: "Team",
    color: "blue"
  },
  {
    icon: Clock,
    title: "Incident Management",
    description: "Streamlined incident response with post-mortem reports and resolution tracking.",
    badge: "Enterprise",
    color: "red"
  },
  {
    icon: CheckCircle,
    title: "SLA Reporting",
    description: "Comprehensive SLA reports and uptime guarantees for compliance and transparency.",
    badge: "Compliance",
    color: "green"
  },
  {
    icon: TrendingUp,
    title: "Performance Trends",
    description: "Historical data and trend analysis to optimize your infrastructure over time.",
    badge: "Intelligence",
    color: "purple"
  },
  {
    icon: Server,
    title: "API Monitoring",
    description: "Advanced API monitoring with request validation, response checking, and performance tracking.",
    badge: "Developer",
    color: "blue"
  }
];

const badgeColors = {
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20"
};

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-20"
        >
          <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-3 h-3 mr-1" />
            </motion.div>
            Powerful Features
          </Badge>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent block"
            >
              Everything you need to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-green-400 block"
            >
              monitor your infrastructure
            </motion.span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            From basic uptime monitoring to advanced performance analytics, 
            Better Uptime provides all the tools you need to ensure your services stay online.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:bg-card/70 group h-full relative overflow-hidden">
                {/* Animated background glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 -z-10"
                />
                
                <CardHeader className="space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300 shadow-lg"
                    >
                      <feature.icon className="w-7 h-7 text-green-400 group-hover:text-green-300 transition-colors" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      <Badge 
                        variant="secondary" 
                        className={`${badgeColors[feature.color as keyof typeof badgeColors]} transition-all duration-300 group-hover:scale-105`}
                      >
                        {feature.badge}
                      </Badge>
                    </motion.div>
                  </div>
                  <CardTitle className="text-foreground group-hover:text-green-100 transition-colors text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover effect line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 origin-left"
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-3xl p-10 border border-green-500/20 overflow-hidden">
            {/* Animated background patterns */}
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "linear"
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
                `,
                backgroundSize: "100% 100%"
              }}
            />
            
            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                Ready to monitor your infrastructure?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Join thousands of companies using Better Uptime to ensure their services stay online.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-500/25"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  View Pricing
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}