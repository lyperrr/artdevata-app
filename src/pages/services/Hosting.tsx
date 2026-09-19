import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hosting() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Layanan Hosting & Domain Bali",
    "provider": {
      "@type": "Organization",
      "name": "ARTDEVATA"
    },
    "description": "Layanan hosting dan pendaftaran domain di Bali. Server cepat, aman, dan uptime 99.9% untuk mendukung website bisnis Anda.",
    "areaServed": "Bali, Indonesia"
  };

  return (
    <AppLayout>
      <SEO 
        title="Layanan Web Hosting & Domain Bali | ARTDEVATA"
        description="Hosting cepat dan andal untuk bisnis di Bali. Menyediakan pendaftaran domain murah dan cloud hosting dengan performa tinggi & keamanan terjamin."
        keywords="hosting bali, web hosting bali, beli domain bali, sewa server bali, cloud hosting bali"
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
              Web Hosting & Domain Bali
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Pondasi digital yang kokoh untuk website Anda. Performa server terbaik dengan dukungan lokal yang responsif.
            </p>
            <Button asChild size="lg" variant="accent">
              <Link to="/kontak">Cek Ketersediaan Domain <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Cepat, Aman, dan Dapat Diandalkan</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Server lambat dapat merugikan bisnis Anda. Kami menyediakan layanan hosting yang dioptimalkan untuk kecepatan dan keamanan tinggi, memastikan website Anda selalu siap melayani pelanggan.
              </p>
              <ul className="space-y-4">
                {[
                  "Pendaftaran Ekstensi Domain Terlengkap",
                  "Cloud Hosting NVMe Berkecepatan Tinggi",
                  "Garansi Uptime 99.9%",
                  "SSL Certificate (Keamanan Website)",
                  "Backup Otomatis & Keamanan Ganda"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 relative z-10">Layanan Pelengkap</h3>
              <ul className="space-y-3 relative z-10">
                <li><Link to="/layanan/maintenance-website" className="text-primary hover:text-accent font-medium transition-colors">Jasa Maintenance Website</Link></li>
                <li><Link to="/layanan/website" className="text-primary hover:text-accent font-medium transition-colors">Jasa Pembuatan Website</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
