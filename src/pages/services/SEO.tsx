import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function SEOService() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Jasa SEO Bali",
    "provider": {
      "@type": "Organization",
      "name": "ARTDEVATA"
    },
    "description": "Jasa SEO profesional di Bali. Kami membantu bisnis lokal Bali tampil di halaman pertama Google dan mendatangkan trafik organik secara berkelanjutan.",
    "areaServed": "Bali, Indonesia"
  };

  return (
    <AppLayout>
      <SEO 
        title="Jasa SEO Bali | Optimasi Website & Tingkatkan Trafik"
        description="Tingkatkan visibilitas bisnis Anda di pencarian Google. ARTDEVATA menyediakan Jasa SEO di Bali untuk membantu Anda mendominasi pencarian organik."
        keywords="jasa seo bali, pakar seo bali, konsultan seo bali, seo website bali, local seo bali"
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
              Jasa SEO Bali
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Dominasi hasil pencarian Google dan datangkan lebih banyak pelanggan potensial ke bisnis Anda melalui optimasi SEO organik.
            </p>
            <Button asChild size="lg" variant="accent">
              <Link to="/kontak">Mulai Optimasi SEO <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tingkatkan Peringkat Website Anda</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Memiliki website saja tidak cukup jika calon pelanggan tidak bisa menemukan Anda. Layanan SEO kami di Bali dirancang untuk meningkatkan visibilitas Anda, menargetkan keyword relevan (Local SEO), dan mengoptimalkan performa teknis website.
              </p>
              <ul className="space-y-4">
                {[
                  "Technical SEO & Audit Performa",
                  "On-Page SEO (Keyword Optimization)",
                  "Off-Page SEO & Link Building Berkualitas",
                  "Local SEO (Google Business Profile & Area Bali)",
                  "SEO Content Strategy & Copywriting"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 relative z-10">Dukungan Web Lengkap</h3>
              <ul className="space-y-3 relative z-10">
                <li><Link to="/layanan/web-development" className="text-primary hover:text-accent font-medium transition-colors">Web Development SEO-Ready</Link></li>
                <li><Link to="/layanan/maintenance-website" className="text-primary hover:text-accent font-medium transition-colors">Maintenance Website</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
