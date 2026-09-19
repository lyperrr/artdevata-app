import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Website() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Jasa Pembuatan Website Bali",
    "provider": {
      "@type": "Organization",
      "name": "ARTDEVATA"
    },
    "description": "Jasa pembuatan website profesional di Bali untuk UMKM, perusahaan, dan toko online. Website responsif, cepat, dan SEO-friendly.",
    "areaServed": "Bali, Indonesia"
  };

  return (
    <AppLayout>
      <SEO 
        title="Jasa Pembuatan Website Bali | Website Bisnis & UMKM"
        description="Mencari jasa pembuatan website di Bali? ARTDEVATA ahli membuat website company profile, e-commerce, dan landing page yang modern dan SEO-friendly."
        keywords="jasa pembuatan website bali, jasa website bali, bikin web bali, jasa website umkm bali, website company profile bali"
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Jasa Pembuatan Website Bali
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Hadirkan bisnis Anda secara online dengan website profesional, responsif, dan didesain khusus untuk menarik pelanggan.
            </p>
            <Button asChild size="lg" variant="accent">
              <Link to="/kontak">Mulai Proyek Website Anda <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Website Profesional untuk Segala Kebutuhan</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                ARTDEVATA melayani pembuatan berbagai jenis website di Bali. Dari bisnis lokal hingga korporat, kami merancang website yang merepresentasikan brand Anda dengan sempurna.
              </p>
              <ul className="space-y-4">
                {[
                  "Website Company Profile (Perusahaan & Villa)",
                  "Website E-commerce / Toko Online",
                  "Landing Page untuk Kampanye Marketing",
                  "Website Katalog Produk UMKM",
                  "Portal Berita & Blog"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 relative z-10">Jelajahi Layanan Kami</h3>
              <ul className="space-y-3 relative z-10">
                <li><Link to="/layanan/web-development" className="text-primary hover:text-accent font-medium transition-colors">Custom Web Development</Link></li>
                <li><Link to="/layanan/desain-grafis" className="text-primary hover:text-accent font-medium transition-colors">Jasa Desain Grafis</Link></li>
                <li><Link to="/layanan/seo" className="text-primary hover:text-accent font-medium transition-colors">Jasa SEO Bali</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
