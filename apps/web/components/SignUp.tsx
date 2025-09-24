"use client"
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Eye, EyeOff, ArrowLeft, Shield, Github, Mail, Zap, Users, Building, CheckCircle, Check, X } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";

interface SignUpProps {
  onBackToHome: () => void;
  onNavigateToSignIn: () => void;
  onNavigateToDashboard: () => void;
}

export function SignUp({ onBackToHome, onNavigateToSignIn, onNavigateToDashboard }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    teamSize: "",
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Password validation functions
  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    };
  };

  const passwordRequirements = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  // Password matching validation
  const getPasswordMatchStatus = () => {
    if (!formData.confirmPassword) return null;
    
    const minLength = Math.min(formData.password.length, formData.confirmPassword.length);
    let matchingChars = 0;
    
    for (let i = 0; i < minLength; i++) {
      if (formData.password[i] === formData.confirmPassword[i]) {
        matchingChars++;
      } else {
        break;
      }
    }
    
    const isFullMatch = formData.password === formData.confirmPassword && formData.password.length > 0;
    const isPartialMatch = matchingChars > 0 && matchingChars === formData.confirmPassword.length && formData.confirmPassword.length < formData.password.length;
    const hasConflict = matchingChars < formData.confirmPassword.length && formData.confirmPassword.length > 0;
    
    return {
      matchingChars,
      totalChars: formData.confirmPassword.length,
      isFullMatch,
      isPartialMatch,
      hasConflict,
      progress: formData.confirmPassword.length > 0 ? (matchingChars / formData.confirmPassword.length) * 100 : 0
    };
  };

  const passwordMatchStatus = getPasswordMatchStatus();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      onNavigateToDashboard();
    }, 2000);
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && isPasswordValid;

  return (
    <div className="min-h-screen bg-background text-foreground dark relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={step === 1 ? onBackToHome : prevStep}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 1 ? "Back to Home" : "Previous"}
          </Button>
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full transition-colors ${step >= 1 ? "bg-green-400" : "bg-muted"}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${step >= 2 ? "bg-green-400" : "bg-muted"}`} />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-card/50 backdrop-blur-lg border-green-500/20 shadow-xl shadow-green-500/5">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-green-500/20 border border-green-500/40">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {step === 1 ? "Create Account" : "Complete Setup"}
              </h1>
              <p className="text-muted-foreground">
                {step === 1 ? "Join Better Uptime and monitor with confidence" : "Tell us about your team"}
              </p>
            </motion.div>

            {/* Social Login Buttons */}
            {/* {step === 1 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 mb-6"
                >
                  <Button
                    variant="outline"
                    className="w-full border-green-500/30 hover:border-green-500/50 hover:bg-green-500/10"
                    // onClick={() => {}}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-500/30 hover:border-green-500/50 hover:bg-green-500/10"
                    // onClick={() => {}}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Continue with GitHub
                  </Button>
                </motion.div>

                <div className="relative mb-6">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-2 text-sm text-muted-foreground">or</span>
                  </div>
                </div>
              </>
            )} */}

            {/* Sign Up Form */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}
              className="space-y-4"
            >
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="border-green-500/30 focus:border-green-500/60 focus:ring-green-500/20 bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="border-green-500/30 focus:border-green-500/60 focus:ring-green-500/20 bg-background/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-green-500/30 focus:border-green-500/60 focus:ring-green-500/20 bg-background/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="border-green-500/30 focus:border-green-500/60 focus:ring-green-500/20 bg-background/50 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    
                    {/* Password Requirements */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2 p-3 rounded-lg bg-card/30 border border-green-500/20"
                      >
                        <p className="text-sm font-medium text-foreground mb-2">Password Requirements:</p>
                        <div className="space-y-1">
                          {[
                            { key: 'length', text: 'At least 8 characters', valid: passwordRequirements.length },
                            { key: 'uppercase', text: 'One uppercase letter', valid: passwordRequirements.uppercase },
                            { key: 'lowercase', text: 'One lowercase letter', valid: passwordRequirements.lowercase },
                            { key: 'number', text: 'One number', valid: passwordRequirements.number }
                          ].map((requirement) => (
                            <motion.div
                              key={requirement.key}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center space-x-2"
                            >
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                requirement.valid ? 'bg-green-500' : 'bg-muted'
                              }`}>
                                {requirement.valid ? (
                                  <Check className="w-2 h-2 text-black" />
                                ) : (
                                  <X className="w-2 h-2 text-muted-foreground" />
                                )}
                              </div>
                              <span className={`text-xs ${
                                requirement.valid ? 'text-green-400' : 'text-muted-foreground'
                              }`}>
                                {requirement.text}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`border-green-500/30 focus:border-green-500/60 focus:ring-green-500/20 bg-background/50 pr-10 ${
                          passwordMatchStatus?.hasConflict ? 'border-red-400/50 focus:border-red-400/70' : 
                          passwordMatchStatus?.isFullMatch ? 'border-green-400/50 focus:border-green-400/70' : ''
                        }`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    
                    {/* Real-time Password Matching Feedback */}
                    {passwordMatchStatus && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        {/* Progress Bar */}
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full transition-all duration-200 ${
                                passwordMatchStatus.hasConflict ? 'bg-red-400' :
                                passwordMatchStatus.isPartialMatch ? 'bg-yellow-400' :
                                passwordMatchStatus.isFullMatch ? 'bg-green-400' : 'bg-muted'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${passwordMatchStatus.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground min-w-[3rem]">
                            {passwordMatchStatus.matchingChars}/{passwordMatchStatus.totalChars}
                          </span>
                        </div>

                        {/* Status Messages */}
                        {passwordMatchStatus.isFullMatch && isPasswordValid && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-green-400 flex items-center space-x-2"
                          >
                            <Check className="w-3 h-3" />
                            <span>Password confirmation successful</span>
                          </motion.div>
                        )}

                        {passwordMatchStatus.isFullMatch && !isPasswordValid && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-yellow-400 flex items-center space-x-2"
                          >
                            <Check className="w-3 h-3" />
                            <span>Passwords match, but requirements not met</span>
                          </motion.div>
                        )}

                        {passwordMatchStatus.isPartialMatch && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-yellow-400 flex items-center space-x-2"
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full"
                            />
                            <span>Continue typing to complete confirmation</span>
                          </motion.div>
                        )}

                        {passwordMatchStatus.hasConflict && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-400 flex items-center space-x-2"
                          >
                            <X className="w-3 h-3" />
                            <span>Password mismatch detected at character {passwordMatchStatus.matchingChars + 1}</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-black relative overflow-hidden group"
                    disabled={!isStep1Valid}
                  >
                    Continue
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="border-green-500/30 focus:border-green-500/60 focus:ring-green-500/20 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
                      <SelectTrigger className="border-green-500/30 focus:border-green-500/60 focus:ring-green-500/20 bg-background/50">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2-10">2-10 people</SelectItem>
                        <SelectItem value="11-50">11-50 people</SelectItem>
                        <SelectItem value="51-200">51-200 people</SelectItem>
                        <SelectItem value="200+">200+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                        I agree to the{" "}
                        <Button variant="link" className="p-0 text-green-400 hover:text-green-300 h-auto">
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button variant="link" className="p-0 text-green-400 hover:text-green-300 h-auto">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="newsletter"
                        checked={formData.subscribeNewsletter}
                        onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="newsletter" className="text-sm text-muted-foreground leading-relaxed">
                        Send me product updates and monitoring best practices
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-black relative overflow-hidden group"
                    disabled={!formData.agreeToTerms || isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Create Account
                      </>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </Button>
                </>
              )}
            </motion.form>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-green-400 hover:text-green-300"
                  onClick={onNavigateToSignIn}
                >
                  Sign in
                </Button>
              </p>
            </motion.div>
          </Card>

          {/* Features */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
            >
              {[
                { icon: CheckCircle, title: "Free Trial", desc: "14-day free trial" },
                { icon: Users, title: "Team Ready", desc: "Collaborate seamlessly" },
                { icon: Building, title: "Enterprise", desc: "Scales with you" }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="p-4 rounded-lg bg-card/30 border border-green-500/20"
                  >
                    <Icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <h3 className="font-medium text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}