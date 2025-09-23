import { Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "API", href: "#api" },
        { name: "Status Page", href: "#status" },
        { name: "Integrations", href: "#integrations" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Press", href: "#press" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "Help Center", href: "#help" },
        { name: "Guides", href: "#guides" },
        { name: "System Status", href: "#system-status" },
        { name: "Release Notes", href: "#releases" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "GDPR", href: "#gdpr" },
        { name: "Security", href: "#security" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#twitter", name: "Twitter" },
    { icon: Github, href: "#github", name: "GitHub" },
    { icon: Linkedin, href: "#linkedin", name: "LinkedIn" },
    { icon: Mail, href: "#email", name: "Email" }
  ];

  return (
    <footer className="relative bg-background border-t border-green-500/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold text-foreground">Better Uptime</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              The most advanced uptime monitoring platform. Monitor your websites, 
              APIs, and services with confidence. Get instant alerts and beautiful status pages.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-green-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-green-500/20 pt-8 mb-8">
          <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-2xl p-6 border border-green-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-foreground mb-2">
                  Stay updated with Better Uptime
                </h3>
                <p className="text-muted-foreground">
                  Get the latest features, updates, and monitoring insights delivered to your inbox.
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 bg-background/50 border border-green-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-foreground placeholder-muted-foreground"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-500/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 Better Uptime. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4 text-green-400" />
                <span>Global Infrastructure</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">All Systems Operational</span>
              </div>
              <a 
                href="#status" 
                className="text-muted-foreground hover:text-green-400 transition-colors"
              >
                System Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}