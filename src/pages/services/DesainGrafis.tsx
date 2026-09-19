import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function DesainGrafis() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Jasa Desain Grafis Bali",
    "provider": {
      "@type": "Organization",
      "name": "ARTDEVATA"
    },
    "description": "Jasa desain grafis profesional di Bali. Melayani desain logo, branding, materi promosi sosial media, dan aset visual untuk meningkatkan identitas bisnis Anda.",
    "areaServed": "Bali, Indonesia"
  };

  return (
    <AppLayout>
      <SEO 
        title="Jasa Desain Grafis Bali | Logo & Branding Profesional"
        description="Tingkatkan identitas visual bisnis Anda dengan jasa desain grafis di Bali. Kami melayani desain logo, branding, profil perusahaan, dan materi sosial media."
        keywords="jasa desain grafis bali, desain logo bali, branding bali, graphic designer bali, jasa desain feed bali"
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
              Jasa Desain Grafis Bali
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Ciptakan identitas visual yang kuat dan profesional untuk merepresentasikan kualitas bisnis Anda.
            </p>
            <Button asChild size="lg" variant="accent">
              <Link to="/kontak">Konsultasi Desain <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Desain Visual Berkualitas untuk Bisnis</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Kesan pertama sangat menentukan. Tim desain grafis kami di Bali siap membantu Anda menciptakan aset visual yang menarik perhatian audiens, mulai dari logo hingga materi promosi digital.
              </p>
              <ul className="space-y-4">
                {[
                  "Desain Logo & Identitas Brand (Brand Identity)",
                  "Desain Konten Sosial Media (Instagram/Facebook Feed)",
                  "Company Profile & Brosur",
                  "Desain Banner, X-Banner & Kartu Nama",
                  "Desain Kemasan (Packaging)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 relative z-10">Layanan Kami Lainnya</h3>
              <ul className="space-y-3 relative z-10">
                <li><Link to="/layanan/web-development" className="text-primary hover:text-accent font-medium transition-colors">Web Development</Link></li>
                <li><Link to="/layanan/website" className="text-primary hover:text-accent font-medium transition-colors">Pembuatan Website</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
