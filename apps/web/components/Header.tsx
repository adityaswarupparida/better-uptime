import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface HeaderProps {
  onNavigateToDashboard: () => void;
  onNavigateToSignIn: () => void;
  onNavigateToSignUp: () => void;
  onScrollToFeatures: () => void;
  onScrollToPricing: () => void;
}

export function Header({ onNavigateToDashboard, onNavigateToSignIn, onNavigateToSignUp, onScrollToFeatures, onScrollToPricing }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-50 bg-background/80 backdrop-blur-sm border-b border-green-500/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            // whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/25"
            >
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 bg-white rounded-sm"
              />
            </motion.div>
            <span className="text-xl font-semibold text-foreground">Better Uptime</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Features", onClick: onScrollToFeatures },
              { label: "Pricing", onClick: onScrollToPricing },
              { label: "Dashboard", onClick: onNavigateToDashboard },
              { label: "Docs", href: "#docs" },
              { label: "Status", href: "#status" }
            ].map((item, index) => (
              <motion.button
                key={item.label}
                onClick={item.onClick || (() => {})}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                // whileHover={{ scale: 1.1, color: "#22c55e" }}
                className="text-muted-foreground hover:text-green-400 transition-all duration-300 relative cursor-pointer"
              >
                {item.label}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400 origin-left"
                />
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center space-x-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                onClick={onNavigateToSignIn}
                className="text-muted-foreground hover:text-green-400 transition-all duration-300 cursor-pointer"
              >
                Sign In
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onNavigateToSignUp}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg shadow-green-500/25 transition-all duration-300 cursor-pointer"
              >
                Start Free Trial
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-green-400 transition-colors"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="mt-4 py-4 border-t border-green-500/20">
            <nav className="flex flex-col space-y-4">
              {[
                { label: "Features", onClick: onScrollToFeatures },
                { label: "Pricing", onClick: onScrollToPricing },
                { label: "Dashboard", onClick: onNavigateToDashboard },
                { label: "Docs", href: "#docs" },
                { label: "Status", href: "#status" }
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick || (() => {})}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-muted-foreground hover:text-green-400 transition-colors py-2 text-left"
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    variant="ghost" 
                    onClick={onNavigateToSignIn}
                    className="justify-start text-muted-foreground hover:text-green-400 w-full cursor-pointer"
                  >
                    Sign In
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    onClick={onNavigateToSignUp}
                    className="justify-start bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 w-full shadow-lg shadow-green-500/25 cursor-pointer"
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </div>
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}