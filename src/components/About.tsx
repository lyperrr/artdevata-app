import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const features = [
    "Tim berpengalaman dengan profesional tersertifikasi",
    "Dukungan pelanggan 24/7",
    "Track record yang terbukti",
    "Solusi teknologi terdepan",
    "Harga kompetitif",
    "Solusi yang disesuaikan dengan kebutuhan",
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 sm:mb-6">
              <Badge className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-semibold">
                Tentang Kami
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Solusi IT Terkini untuk Bisnis Anda
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              ArtDevata adalah penyedia layanan IT terkemuka yang berdedikasi
              untuk mentransformasi bisnis melalui solusi teknologi yang
              inovatif. Kami menggabungkan keahlian teknis dengan inovasi
              kreatif untuk memberikan hasil yang melebihi ekspektasi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-2 sm:space-x-3"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground group"
            >
              <span className="flex items-center">
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative "
          >
            <div className="relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Professional IT team collaboration"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-4 sm:-bottom-6 left-4 sm:-left-6 right-4 sm:right-auto bg-card border border-border rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-xl sm:max-w-xs"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-accent">
                      2+
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Tahun
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">
                    Pengalaman
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
