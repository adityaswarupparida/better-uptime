import { motion } from "motion/react";
import { CheckCircle, AlertTriangle, TrendingUp, Globe, Clock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function MonitoringDashboard() {
  const [activeMetric, setActiveMetric] = useState(0);
  const [uptimePercentage, setUptimePercentage] = useState(99.95);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
      setUptimePercentage((prev) => prev + (Math.random() - 0.5) * 0.01);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: "API Server", status: "online", responseTime: "145ms", uptime: "100%" },
    { name: "Web App", status: "online", responseTime: "89ms", uptime: "99.9%" },
    { name: "Database", status: "online", responseTime: "23ms", uptime: "100%" },
    { name: "CDN", status: "degraded", responseTime: "234ms", uptime: "99.1%" },
    { name: "Payment Gateway", status: "online", responseTime: "156ms", uptime: "99.8%" }
  ];

  const metrics = [
    { label: "Response Time", value: "125ms", change: "-15ms", icon: Clock },
    { label: "Uptime", value: "99.97%", change: "+0.02%", icon: TrendingUp },
    { label: "Incidents", value: "0", change: "0 today", icon: CheckCircle }
  ];

  return (
    <div className="relative">
      {/* Main Dashboard Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-background/90 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 space-y-6 shadow-2xl shadow-green-500/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-400">System Overview</h3>
            <p className="text-sm text-muted-foreground">Real-time monitoring dashboard</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full"
          />
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                activeMetric === index
                  ? "bg-green-500/10 border-green-500/40"
                  : "bg-card/50 border-green-500/20"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  activeMetric === index ? "bg-green-500/20" : "bg-green-500/10"
                }`}>
                  <metric.icon className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="font-semibold text-foreground">{metric.value}</p>
                  <p className="text-xs text-green-400">{metric.change}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services List */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Services Status</h4>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === "online" 
                    ? "bg-green-400 animate-pulse" 
                    : service.status === "degraded"
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`} />
                <span className="font-medium text-foreground">{service.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-muted-foreground">{service.responseTime}</span>
                <span className="text-green-400">{service.uptime}</span>
                {service.status === "online" ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Status */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center justify-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30"
        >
          <Globe className="w-5 h-5 text-green-400 mr-2" />
          <span className="font-medium text-green-400">All systems operational worldwide</span>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-400/20 rounded-full blur-sm"
      />
      
      {/* Data Flow Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
        />
        <motion.div
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
        />
      </div>
    </div>
  );
}