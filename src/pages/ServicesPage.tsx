import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Code, Server, Camera, Headphones, Zap, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const services = [
    {
      icon: Code,
      title: "Website Development",
      description:
        "Pengembangan website custom dengan teknologi modern dan desain responsif.",
      features: [
        "Desain UI/UX Modern",
        "Responsive & Mobile-Friendly",
        "SEO Optimized",
        "CMS Integration",
        "E-commerce Solutions",
        "Progressive Web Apps",
      ],
    },
    {
      icon: Server,
      title: "Hosting & Domain",
      description:
        "Layanan hosting handal dengan uptime terjamin dan pengelolaan domain mudah.",
      features: [
        "99.9% Uptime Guarantee",
        "SSD Storage",
        "Free SSL Certificate",
        "Daily Backup",
        "24/7 Monitoring",
        "Domain Management",
      ],
    },
    {
      icon: Camera,
      title: "Instalasi CCTV",
      description:
        "Sistem keamanan CCTV profesional dengan teknologi monitoring terkini.",
      features: [
        "HD/4K Resolution",
        "Remote Monitoring",
        "Night Vision",
        "Motion Detection",
        "Cloud Storage",
        "Professional Installation",
      ],
    },
    {
      icon: Headphones,
      title: "IT Support",
      description: "Dukungan teknis komprehensif untuk sistem IT bisnis Anda.",
      features: [
        "24/7 Technical Support",
        "System Maintenance",
        "Troubleshooting",
        "Network Management",
        "Software Updates",
        "Security Monitoring",
      ],
    },
    {
      icon: Zap,
      title: "Cloud Solutions",
      description:
        "Solusi cloud computing untuk skalabilitas dan efisiensi bisnis.",
      features: [
        "Cloud Migration",
        "Data Backup & Recovery",
        "Scalable Infrastructure",
        "Cost Optimization",
        "Security & Compliance",
        "Hybrid Cloud Setup",
      ],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Perlindungan komprehensif terhadap ancaman cyber modern.",
      features: [
        "Security Audit",
        "Firewall Setup",
        "Malware Protection",
        "Data Encryption",
        "Security Training",
        "Incident Response",
      ],
    },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Layanan Kami
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Solusi IT lengkap untuk mendukung transformasi digital bisnis Anda
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container ">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 group">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent"
                  >
                    <Link to="/kontak">Minta Penawaran</Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-accent-foreground mb-6">
              Tidak menemukan yang Anda cari?
            </h2>
            <p className="text-lg text-accent-foreground/90 mb-8">
              Kami menyediakan solusi custom sesuai kebutuhan spesifik bisnis
              Anda
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link to="/kontak">Hubungi Kami</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </AppLayout>
  );
};

export default ServicesPage;
