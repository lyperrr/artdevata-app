import { motion } from "framer-motion";
import { Code, Server, Camera, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Website Development",
      description: "Solusi web custom yang dibangun dengan teknologi modern dan desain responsif untuk meningkatkan kehadiran online bisnis Anda.",
    },
    {
      icon: Server,
      title: "Hosting & Domain",
      description: "Layanan hosting andal dengan jaminan uptime 99.9% dan pengelolaan domain yang mudah untuk website Anda.",
    },
    {
      icon: Camera,
      title: "Instalasi CCTV",
      description: "Sistem keamanan CCTV profesional untuk melindungi bisnis Anda dengan teknologi monitoring terkini.",
    },
    {
      icon: Headphones,
      title: "IT Support",
      description: "Dukungan teknis 24/7 dan maintenance berkala untuk memastikan sistem IT Anda berjalan optimal.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
              Layanan Kami
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Solusi IT Unggulan untuk Bisnis Anda
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Solusi IT komprehensif yang dirancang untuk mendorong bisnis Anda maju
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group border-border/50 hover:border-accent/50 bg-card">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground group"
          >
            <Link to="/layanan" className="flex items-center">
              Lihat Semua Layanan
              <ArrowRight className="ml-2 !size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
