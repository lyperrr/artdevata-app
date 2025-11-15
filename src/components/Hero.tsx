import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Mouse } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentService, setCurrentService] = useState(0);
  const services = [
    "Website Development",
    "Hosting & Domain",
    "Instalasi CCTV",
    "IT Support",
    "Network Solutions",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "24/7", label: "Dukungan Tersedia" },
    { value: "99.9%", label: "Jaminan Uptime" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Solusi IT Premium
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Wujudkan Bisnis Digital Anda Bersama
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-accent block xl:inline-block"
                >
                  {services[currentService]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Kami menyediakan solusi IT terpadu dari pengembangan website, hosting & domain,
            instalasi CCTV, hingga IT support untuk mendukung transformasi digital bisnis Anda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground group w-full sm:w-auto"
            >
              <Link to="/portfolio" className="flex items-center">
                Mulai Proyek
                <ArrowRight className="ml-2 size-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
            >
              <Link to="/layanan">Lihat Layanan</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-6 hover:bg-primary-foreground/15 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Mouse className="text-background/70 size-8 animate-bounce"/>
      </motion.div>
    </section>
  );
};

export default Hero;
