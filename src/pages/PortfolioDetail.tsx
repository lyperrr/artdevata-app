import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, ExternalLink, X } from "lucide-react";
import { useState } from "react";

const PortfolioDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Data dummy portfolio
  const projects: Record<string, any> = {
    "ecommerce-platform": {
      title: "E-Commerce Platform",
      category: "Website Development",
      client: "UMKM Indonesia",
      date: "Januari 2024",
      duration: "3 Bulan",
      description:
        "Platform e-commerce modern dengan fitur lengkap untuk UMKM Indonesia. Sistem mencakup manajemen produk, keranjang belanja, payment gateway, dan dashboard admin yang komprehensif.",
      challenge:
        "Membangun platform yang mudah digunakan oleh UMKM dengan berbagai tingkat literasi digital, sambil tetap menyediakan fitur-fitur canggih untuk mengelola bisnis online.",
      solution:
        "Kami mengembangkan interface yang intuitif dengan onboarding yang mudah, dokumentasi lengkap, dan dukungan teknis. Platform ini dilengkapi dengan template siap pakai dan customizable.",
      results: [
        "Peningkatan penjualan online hingga 250%",
        "Waktu setup toko hanya 30 menit",
        "98% tingkat kepuasan pengguna",
        "Integrasi dengan 5+ payment gateway lokal",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      images: [
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=80",
        "https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=1200&q=80",
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      ],
      link: "https://example.com",
    },
    "corporate-website": {
      title: "Corporate Website",
      category: "Website Development",
      client: "PT Teknologi Maju",
      date: "Desember 2023",
      duration: "2 Bulan",
      description:
        "Website perusahaan profesional dengan desain elegan dan responsif yang mencerminkan identitas brand klien.",
      challenge:
        "Membuat website yang merepresentasikan profesionalisme perusahaan dengan loading time yang cepat dan SEO optimal.",
      solution:
        "Menggunakan teknologi modern dengan optimasi gambar, lazy loading, dan implementasi best practices SEO.",
      results: [
        "Peningkatan traffic organik 180%",
        "Page load time di bawah 2 detik",
        "100% responsive di semua device",
        "Ranking halaman pertama Google untuk 10+ keyword",
      ],
      technologies: ["React", "Next.js", "TailwindCSS", "Vercel"],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
      ],
      link: "https://example.com",
    },
    "smart-cctv": {
      title: "Smart CCTV System",
      category: "CCTV Installation",
      client: "Kompleks Perumahan Elite",
      date: "November 2023",
      duration: "1 Bulan",
      description:
        "Sistem CCTV pintar dengan AI detection untuk keamanan maksimal di area perumahan seluas 5 hektar.",
      challenge:
        "Mengcover area luas dengan blind spot minimal dan integrasi sistem monitoring real-time.",
      solution:
        "Instalasi 50+ kamera strategis dengan AI motion detection dan sistem cloud storage untuk akses 24/7.",
      results: [
        "100% coverage area tanpa blind spot",
        "Penurunan insiden keamanan 90%",
        "Response time security team 3x lebih cepat",
        "Face recognition untuk akses gate",
      ],
      technologies: [
        "Hikvision",
        "AI Detection",
        "Cloud Storage",
        "Mobile App",
      ],
      images: [
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80",
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
        "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=1200&q=80",
      ],
      link: null,
    },
  };

  const project = id ? projects[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project tidak ditemukan</h1>
          <Link to="/portfolio">
            <Button>Kembali ke Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Portfolio</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-primary-foreground/90">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{project.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => setSelectedImage(0)}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Tentang Project
                </h2>
                <p className="text-muted-foreground border-l-4 border-l-accent pl-3 py-2 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Tantangan
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Solusi
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Hasil
                </h3>
                <ul className="space-y-2">
                  {project.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  Detail Project
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Klien</p>
                    <p className="font-semibold text-foreground">
                      {project.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Tanggal
                    </p>
                    <p className="font-semibold text-foreground">
                      {project.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Durasi</p>
                    <p className="font-semibold text-foreground">
                      {project.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Kategori
                    </p>
                    <p className="font-semibold text-foreground">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  Teknologi
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full" size="lg">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Lihat Website
                  </Button>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-foreground"
          >
            Galeri Project
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${project.title} - ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[70vh] p-0 bg-background/95 border-none overflow-hidden">
          {selectedImage !== null && (
            <div className="relative">
              <img
                src={project.images[selectedImage]}
                alt={`${project.title} - ${selectedImage + 1}`}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/20 backdrop-blur-lg border-2 border-primary-foreground/20 p-2 rounded-full">
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(
                      selectedImage > 0
                        ? selectedImage - 1
                        : project.images.length - 1
                    );
                  }}
                  className="p-2 size-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 backdrop-blur-xl"
                >
                  <ArrowLeft className="w-5 h-5 text-primary-foreground" />
                </Button>
                <span className="px-4 py-2 text-primary-foreground">
                  {selectedImage + 1} / {project.images.length}
                </span>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(
                      selectedImage < project.images.length - 1
                        ? selectedImage + 1
                        : 0
                    );
                  }}
                  className="p-2 size-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 backdrop-blur-xl"
                >
                  <ArrowRight className="w-5 h-5 text-primary-foreground" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default PortfolioDetail;
