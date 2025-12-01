import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ICON DEFAULT
import {
  Code,
  Server,
  Camera,
  Headphones,
  Zap,
  Shield,
  Rocket,
  Gem,
  Crown,
} from "lucide-react";

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
        // const res = await fetch(`${import.meta.env.VITE_API_URL}/services`);
                const res = await fetch(
                  "https://admin.artdevata.net/api/services"
                );
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
                const Icon = iconMap[service.icon?.toLowerCase()] || Code; // Default icon

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 group">
                      {/* ICON */}
                      <div className="mb-4">
                        <div className="size-16 rounded-xl bg-accent/60 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                          <img
                            src={`${import.meta.env.VITE_STORAGE_URL}/${
                              service.image
                            }`}
                            className="size-10"
                          />
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

      {/* Pricelist Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Paket Harga yang Fleksibel
            </h2>
            <p className="text-lg text-muted-foreground">
              Pilih paket yang sesuai dengan kebutuhan dan budget bisnis Anda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Paket Basic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-8 border-2 border-border hover:border-accent bg-card">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                    <Rocket className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Basic</h3>
                  <p className="text-sm text-muted-foreground">
                    Untuk bisnis skala kecil
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="mb-2">
                    <span className="text-muted-foreground text-sm">Rp </span>
                    <span className="text-5xl font-bold">2</span>
                    <span className="text-xl font-bold text-muted-foreground">
                      jt
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      /bulan
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    atau Rp 25jt/tahun (hemat 2 bulan!)
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Website Company Profile</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Hosting 2GB + Domain .com</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>SSL Certificate</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Email Support</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>5 Halaman Konten</span>
                  </li>
                </ul>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/kontak">Pilih Paket</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Paket Professional - Popular */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full p-8 border-2 border-accent bg-card relative overflow-hidden">
                <div className="absolute right-[-40px] rotate-45 bg-accent text-accent-foreground px-10 py-2 text-sm font-semibold shadow-md">
                  REKOMENDASI
                </div>

                <div className="text-center mb-6 mt-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
                    <Gem className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Professional</h3>
                  <p className="text-sm text-muted-foreground">
                    Untuk bisnis berkembang
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="mb-2">
                    <span className="text-accent text-sm">Rp </span>
                    <span className="text-5xl font-bold text-accent">5</span>
                    <span className="text-xl font-bold text-accent">jt</span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      /bulan
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    atau Rp 50jt/tahun (hemat 2 bulan!)
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Website Dinamis + Dashboard</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Hosting 5GB + Domain Premium</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>SSL Certificate Premium</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Priority Support 24/7</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Unlimited Halaman</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>SEO Optimization</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Monthly Maintenance</span>
                  </li>
                </ul>

                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link to="/kontak">Pilih Paket Ini</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Paket Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full p-8 border-2 hover:border-accent bg-card">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                    <Crown className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">
                    Untuk bisnis skala besar
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="text-4xl font-bold mb-2">Custom</div>
                  <p className="text-xs text-muted-foreground">
                    Sesuai kebutuhan bisnis Anda
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Custom Web Application</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Cloud Hosting Unlimited</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Dedicated Server Option</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>VIP Support 24/7</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>API Integration</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>SLA Guarantee</span>
                  </li>
                </ul>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/kontak">Hubungi Kami</Link>
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              ⚡ Bonus: Semua paket termasuk{" "}
              <span className="font-semibold">konsultasi gratis</span>,{" "}
              <span className="font-semibold">training dasar</span>, dan{" "}
              <span className="font-semibold">free updates</span>
            </p>
            <p className="text-xs text-muted-foreground">
              *Harga dapat berubah sewaktu-waktu. Hubungi kami untuk penawaran
              khusus perusahaan.
            </p>
          </motion.div>
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
