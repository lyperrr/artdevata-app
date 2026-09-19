import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function WebDevelopment() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Jasa Web Development Bali",
    "provider": {
      "@type": "Organization",
      "name": "ARTDEVATA"
    },
    "description": "Layanan jasa web development profesional di Bali. Kami merancang website kustom yang cepat, modern, dan dioptimasi untuk konversi.",
    "areaServed": "Bali, Indonesia"
  };

  return (
    <AppLayout>
      <SEO 
        title="Jasa Web Development Bali | Pembuatan Website Profesional"
        description="Jasa web development di Bali oleh ARTDEVATA. Kami membangun website bisnis, sistem custom, dan e-commerce dengan teknologi terkini dan SEO friendly."
        keywords="web development bali, jasa web developer bali, jasa web development bali, pembuatan website bali"
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
              Jasa Web Development Bali
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Solusi pengembangan website custom profesional untuk membantu bisnis Anda berkembang di era digital.
            </p>
            <Button asChild size="lg" variant="accent">
              <Link to="/kontak">Konsultasi Gratis <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Mengapa Memilih Layanan Web Development Kami?</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Di ARTDEVATA, kami tidak sekadar membuat website. Kami membangun solusi digital yang dirancang khusus untuk memenuhi tujuan bisnis Anda, baik itu untuk company profile, e-commerce, maupun sistem informasi manajemen yang kompleks.
              </p>
              <ul className="space-y-4">
                {[
                  "Desain Modern & Responsif (Mobile-Friendly)",
                  "Optimasi Kecepatan & Performa (Core Web Vitals)",
                  "Struktur SEO-Friendly dari Awal",
                  "Teknologi Terbaru (React, Node.js, dll)",
                  "Sistem Keamanan Terjamin"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent to-transparent"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Layanan Web Terkait</h3>
              <ul className="space-y-3 relative z-10">
                <li><Link to="/layanan/website" className="text-primary hover:text-accent font-medium transition-colors">Pembuatan Website Company Profile</Link></li>
                <li><Link to="/layanan/desain-grafis" className="text-primary hover:text-accent font-medium transition-colors">Jasa Desain Grafis & Branding</Link></li>
                <li><Link to="/layanan/seo" className="text-primary hover:text-accent font-medium transition-colors">Optimasi SEO & Performa</Link></li>
                <li><Link to="/layanan/hosting-domain" className="text-primary hover:text-accent font-medium transition-colors">Layanan Hosting & Domain</Link></li>
                <li><Link to="/layanan/maintenance-website" className="text-primary hover:text-accent font-medium transition-colors">Maintenance Website Bulanan</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
