import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Play, Shield, Zap, Globe, Sparkles } from "lucide-react";
import { MonitoringDashboard } from "./MonitoringDashboard";
import { AnimatedBackground } from "./AnimatedBackground";
import { motion } from "motion/react";

interface HeroProps {
  onNavigateToDashboard: () => void;
  onNavigateToSignUp: () => void;
}

export function Hero({ onNavigateToDashboard, onNavigateToSignUp }: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20 transition-all duration-300">
                  <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                  Next-Gen Monitoring
                </Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
                  Monitor Everything.
                </span>
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-green-400 inline-block"
                >
                  Never Miss Downtime.
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                Advanced uptime monitoring with AI-powered insights, instant alerts, 
                and beautiful status pages. Keep your digital infrastructure running 
                flawlessly with Better Uptime.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={onNavigateToSignUp}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 group shadow-lg shadow-green-500/25 transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onNavigateToDashboard}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 group backdrop-blur-sm transition-all duration-300"
                >
                  <Play className="w-4 h-4 mr-2" />
                  View Dashboard
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-green-500/20"
            >
              {[
                { value: "99.9%", label: "Uptime SLA" },
                { value: "<30s", label: "Detection Time" },
                { value: "24/7", label: "Monitoring" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center lg:text-left group cursor-pointer"
                >
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <MonitoringDashboard />
              
              {/* Floating Status Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-6 -left-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-green-500/20 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-sm text-green-400 whitespace-nowrap">All Systems Operational</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-green-500/20 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-foreground whitespace-nowrap">99.9% Uptime</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                className="absolute top-1/3 -right-8 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-green-500/20 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-foreground whitespace-nowrap">Global Coverage</span>
                </div>
              </motion.div>
            </div>
            
            {/* Enhanced Glow Effects */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-2xl -z-10"
            />
            <motion.div
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute inset-0 bg-gradient-to-l from-emerald-400/15 to-green-400/15 rounded-2xl blur-3xl -z-20 scale-125"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}