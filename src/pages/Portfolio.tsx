import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Website Development",
      description: "Platform e-commerce modern dengan fitur lengkap untuk UMKM Indonesia",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    },
    {
      title: "Corporate Website",
      category: "Website Development",
      description: "Website perusahaan profesional dengan desain elegan dan responsif",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
      title: "Smart CCTV System",
      category: "CCTV Installation",
      description: "Sistem CCTV pintar dengan AI detection untuk keamanan maksimal",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    },
    {
      title: "Cloud Infrastructure",
      category: "Cloud Solutions",
      description: "Migrasi dan setup cloud infrastructure untuk startup teknologi",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
      title: "Enterprise Dashboard",
      category: "Website Development",
      description: "Dashboard analytics real-time untuk monitoring bisnis enterprise",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      title: "Network Security Setup",
      category: "IT Support",
      description: "Implementasi sistem keamanan jaringan untuk institusi pendidikan",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
  ];

  const categories = ["Semua", "Website Development", "CCTV Installation", "Cloud Solutions", "IT Support"];

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
              Portfolio Kami
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Lihat berbagai proyek sukses yang telah kami kerjakan untuk klien kami
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-accent-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-accent font-semibold mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
