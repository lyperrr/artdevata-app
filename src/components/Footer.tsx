import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Logo from "/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/tentang", label: "Tentang" },
    { href: "/layanan", label: "Layanan" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ];

  const services = [
    { href: "/layanan#web", label: "Pengembangan Website" },
    { href: "/layanan#hosting", label: "Hosting & Domain" },
    { href: "/layanan#cctv", label: "Instalasi CCTV" },
    { href: "/layanan#support", label: "IT Support" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img src={Logo} alt="" className="size-12" />
              <span
                className="text-2xl font-bold text-background hidden sm:block"
              >
                ArtDevata
              </span>
            </Link>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Penyedia solusi IT terpercaya untuk transformasi digital bisnis
              Anda.
            </p>
            <div className="flex items-center space-x-2 text-primary-foreground/80">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:artdevata@gmail.com"
                className="hover:text-accent transition-colors"
              >
                artdevata@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-primary-foreground group-hover:text-accent-foreground" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Legal</h4>
              <Link
                to="/privacy"
                className="text-primary-foreground/80 hover:text-accent transition-colors block mb-1"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm text-center md:text-left">
              © {currentYear} ArtDevata. All rights reserved.
            </p>
            <p className="text-primary-foreground/70 text-sm text-center md:text-right">
              Designed & Built with ❤️ by ArtDevata
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
