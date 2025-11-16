import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  FolderOpen,
  Newspaper,
  Mail,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/tentang", label: "Tentang", icon: Info },
    { href: "/layanan", label: "Layanan", icon: Briefcase },
    { href: "/portfolio", label: "Portfolio", icon: FolderOpen },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/faq", label: "Faq", icon: HelpCircle },
    { href: "/kontak", label: "Kontak", icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container ">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={Logo} alt="" className="size-12" />
            <span
              className={`text-2xl font-bold ${
                isScrolled ? "text-primary" : "text-background"
              } hidden sm:block`}
            >
              ArtDevata
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-2 py-1 text-base font-medium transition-colors relative group ${
                  location.pathname === link.href
                    ? isScrolled
                      ? "text-accent"
                      : "text-white"
                    : isScrolled
                    ? "text-primary/30 hover:text-accent"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ease-out ${
                    location.pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* CTA Button */}
            <Button
              asChild
              variant="accent"
              className="hidden sm:inline-flex group"
            >
              <Link to="/kontak">
                Minta Penawaran
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform !size-5" />
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden bg-transparent hover:bg-transparent *:!size-6 ${
                isMobileMenuOpen ? "relative z-[51]" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  className={`${isScrolled ? "text-primary" : "text-white"}`}
                />
              ) : (
                <Menu
                  className={`${isScrolled ? "text-primary" : "text-white"}`}
                />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu with Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu */}
            <div className="absolute top-full left-0 right-0 bg-background shadow-lg z-50 lg:hidden animate-fade-in">
              <div className="container  py-6">
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                          location.pathname === link.href
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                  <Button asChild variant="accent" className="mt-4">
                    <Link
                      to="/kontak"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Minta Penawaran
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
