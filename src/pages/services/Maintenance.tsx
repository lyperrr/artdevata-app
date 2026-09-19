import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Maintenance() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Jasa Maintenance Website Bali",
    "provider": {
      "@type": "Organization",
      "name": "ARTDEVATA"
    },
    "description": "Jasa maintenance website profesional di Bali. Pembaruan rutin, keamanan terjamin, dan dukungan teknis cepat untuk bisnis Anda.",
    "areaServed": "Bali, Indonesia"
  };

  return (
    <AppLayout>
      <SEO 
        title="Jasa Maintenance Website & Perbaikan di Bali | ARTDEVATA"
        description="Jasa perbaikan dan maintenance website di Bali. Kami memastikan website Anda selalu update, aman, dan berkinerja maksimal setiap saat."
        keywords="jasa maintenance website bali, perbaikan website bali, kelola website bali, admin website bali, support website bali"
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
              Jasa Maintenance Website Bali
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Fokus jalankan bisnis Anda, biarkan kami yang mengelola dan memastikan website Anda berjalan dengan sempurna setiap saat.
            </p>
            <Button asChild size="lg" variant="accent">
              <Link to="/kontak">Hubungi Tim Support <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Website Sehat, Bisnis Lancar</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Website tanpa perawatan rentan terhadap bug, error, lambat, dan serangan cyber. Kami menawarkan paket perawatan (maintenance) menyeluruh untuk memastikan investasi digital Anda tetap aman dan up-to-date.
              </p>
              <ul className="space-y-4">
                {[
                  "Update Konten Rutin (Artikel, Produk, dll)",
                  "Monitoring Keamanan & Malware Scan",
                  "Pembaruan Sistem & Plugin",
                  "Backup Database Berkala",
                  "Perbaikan Error (Troubleshooting)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 relative z-10">Optimalkan Lebih Lanjut</h3>
              <ul className="space-y-3 relative z-10">
                <li><Link to="/layanan/seo" className="text-primary hover:text-accent font-medium transition-colors">Optimasi SEO Website</Link></li>
                <li><Link to="/layanan/hosting-domain" className="text-primary hover:text-accent font-medium transition-colors">Upgrade Hosting Web</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
