// src/pages/PortfolioDetail.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
  ExternalLink,
  Loader2,
  X,
  Home,
  ChevronRight,
} from "lucide-react";

interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string | null;
  category: string | null;
  client: string | null;
  date: string | null;
  duration: string | null;
  challenge: string | null;
  solution: string | null;
  results: string[];
  technologies: string[];
  images: string[];
}

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const navigate = (path: string) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        // const res = await fetch(
        //   `${import.meta.env.VITE_API_URL}/portfolios/${id}`
        // );
        const res = await fetch(
          `https://admin.artdevata.net/api/portfolios/${id}`
        );
        const json = await res.json();

        // Laravel biasanya balikin { data: {...} }
        const data = json.data || json;

        // Pastikan images selalu array (jika kosong atau null)
        const images =
          data.images && data.images.length > 0 ? data.images : [data.image]; // fallback ke image utama

        setProject({
          ...data,
          images,
          category: data.category || "Umum",
          results: data.results || [],
          technologies: data.technologies || [],
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <AppLayout showNavbar={false}>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  // Error / tidak ditemukan
  if (error || !project) {
    return (
      <AppLayout showNavbar={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Project tidak ditemukan</h1>
            <Link to="/portfolio">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 " />
                Kembali ke Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showNavbar={false}>
      {/* Hero */}
      <section className="py-10 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="h-8 px-3 gap-2 text-primary-foreground hover:text-primary-foreground"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
              <ChevronRight className="w-4 h-4 text-primary-primary-foreground/40" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/portfolio")}
                className="h-8 px-3 text-primary-foreground hover:text-primary-foreground"
              >
                Portfolio
              </Button>
              <ChevronRight className="w-4 h-4 text-primary-foreground/40" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-lg opacity-90">
              {project.category && (
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  <span>{project.category}</span>
                </div>
              )}
              {project.client && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{project.client}</span>
                </div>
              )}
              {project.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(project.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{project.duration}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gambar Utama */}
      <section className="py-12 bg-background">
        <div className="container">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            src={project.image}
            alt={project.title}
            className="w-full h-96 md:h-[600px] object-cover rounded-xl shadow-2xl cursor-pointer"
            onClick={() => setSelectedImage(0)}
          />
        </div>
      </section>

      {/* Informasi Project */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Kiri - Deskripsi */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">Tentang Project</h2>
                <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-l-accent pl-6">
                  {project.description}
                </p>
              </motion.div>

              {project.challenge && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-3">Tantangan</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </motion.div>
              )}

              {project.solution && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-3">Solusi Kami</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </motion.div>
              )}

              {project.results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-4">
                    Hasil yang Dicapai
                  </h3>
                  <ul className="space-y-3">
                    {project.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Kanan - Detail & Tech */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">Detail Project</h3>
                <dl className="space-y-3 text-sm">
                  {project.client && (
                    <>
                      <dt className="text-muted-foreground">Klien</dt>
                      <dd className="font-semibold">{project.client}</dd>
                    </>
                  )}
                  {project.date && (
                    <>
                      <dt className="text-muted-foreground">Tanggal</dt>
                      <dd className="font-semibold">
                        {new Date(project.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                        })}
                      </dd>
                    </>
                  )}
                  {project.duration && (
                    <>
                      <dt className="text-muted-foreground">Durasi</dt>
                      <dd className="font-semibold">{project.duration}</dd>
                    </>
                  )}
                  {project.category && (
                    <>
                      <dt className="text-muted-foreground">Kategori</dt>
                      <dd className="font-semibold">{project.category}</dd>
                    </>
                  )}
                </dl>
              </motion.div>

              {project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-xl border shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-4">
                    Teknologi Digunakan
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {project.link && (
                <Button className="w-full" size="lg" asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 " />
                    Lihat Website Live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Galeri */}
      {project.images.length > 1 && (
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Galeri Project</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none">
          {selectedImage !== null && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              <img
                src={project.images[selectedImage]}
                alt="Gallery"
                className="max-w-full max-h-[90vh] object-contain mx-auto"
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur px-4 py-2 rounded-full">
                <Button
                  size="icon"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === 0
                        ? project.images.length - 1
                        : selectedImage - 1
                    )
                  }
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <span className="text-sm font-medium">
                  {selectedImage + 1} / {project.images.length}
                </span>
                <Button
                  size="icon"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === project.images.length - 1
                        ? 0
                        : selectedImage + 1
                    )
                  }
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default PortfolioDetail;
