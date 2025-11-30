import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ICON DEFAULT
import { Code, Server, Camera, Headphones, Zap, Shield } from "lucide-react";

const iconMap = {
  website: Code,
  hosting: Server,
  cctv: Camera,
  support: Headphones,
  cloud: Zap,
  security: Shield,
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("https://admin.artdevata.net/api/services");
        const data = await res.json();

        // Pastikan features bentuk array (kalau masih string → split)
        const fixed = data.map((item) => ({
          ...item,
          features: Array.isArray(item.features)
            ? item.features
            : typeof item.features === "string"
            ? item.features.split(",").map((f) => f.trim())
            : [],
        }));

        setServices(fixed);
      } catch (e) {
        console.error("Gagal memuat layanan:", e);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container">
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
        <div className="container">
          {loading ? (
            <p className="text-center text-muted-foreground">
              Memuat layanan...
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon =
                  iconMap[service.icon?.toLowerCase()] || Code; // Default icon

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 group">
                      
                      {/* GAMBAR */}
                      <div className="mb-6">
                        <div className="w-full h-40 rounded-xl overflow-hidden bg-accent/10 flex items-center justify-center group-hover:scale-[1.03] transition-all duration-300">
                          <img
                            src={`https://admin.artdevata.net/storage/${service.image}`}
                            className="w-full h-full object-cover"
                            alt={service.title}
                          />
                        </div>
                      </div>

                      {/* ICON */}
                      <div className="mb-4">
                        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                          <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground" />
                        </div>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* FEATURES LIST */}
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feat, i) => (
                            <li
                              key={i}
                              className="flex items-start text-sm text-muted-foreground"
                            >
                              <span className="w-2 h-2 rounded-full bg-accent mr-3 mt-1"></span>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* BUTTON */}
                      <Button
                        asChild
                        variant="outline"
                        className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent"
                      >
                        <Link to="/kontak">Minta Penawaran</Link>
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container">
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
              Kami menyediakan solusi custom sesuai kebutuhan spesifik bisnis Anda
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
