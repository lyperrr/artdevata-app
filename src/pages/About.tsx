import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Users, Target, Award, Heart } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Kami percaya pada kekuatan kerja sama tim dan kemitraan dengan klien untuk mencapai hasil terbaik.",
    },
    {
      icon: Target,
      title: "Inovasi",
      description: "Terus berinovasi dengan teknologi terkini untuk memberikan solusi yang efektif dan efisien.",
    },
    {
      icon: Award,
      title: "Kualitas",
      description: "Komitmen pada standar kualitas tertinggi dalam setiap proyek yang kami kerjakan.",
    },
    {
      icon: Heart,
      title: "Dedikasi",
      description: "Dedikasi penuh untuk kesuksesan bisnis klien melalui layanan IT yang handal dan terpercaya.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Tentang ArtDevata
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Partner terpercaya dalam transformasi digital bisnis Anda sejak 2014
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Misi Kami
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ArtDevata hadir untuk membantu bisnis Indonesia bertransformasi secara digital
                dengan menyediakan solusi IT yang komprehensif, handal, dan terjangkau. Kami
                berkomitmen untuk menjadi partner strategis yang mendukung pertumbuhan bisnis
                klien melalui teknologi dan inovasi.
              </p>
            </motion.div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Tahun Pengalaman" },
              { value: "500+", label: "Proyek Selesai" },
              { value: "200+", label: "Klien Puas" },
              { value: "50+", label: "Profesional Ahli" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default AboutPage;
