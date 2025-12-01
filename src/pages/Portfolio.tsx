import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { ExternalLink, Loader2 } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string | null;
  client?: string;
  date?: string;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

  const categories = [
    "Semua",
    "Website Development",
    "CCTV Installation",
    "Cloud Solutions",
    "IT Support",
  ];

  // const API_URL = `${import.meta.env.VITE_API_URL}/portfolios`;
    const API_URL = "https://admin.artdevata.net/api/portfolios";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((response) => {
        const data = response.data || response;

        const formatted = data.map((item: any) => ({
          ...item,
          category: item.category || "Umum",
        }));

        setProjects(formatted);
        setFilteredProjects(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activeCategory === "Semua") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory, projects]);

  // Loading state
  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-primary-foreground"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Portfolio Kami
            </h1>
            <p className="text-xl opacity-90">
              Lihat berbagai proyek sukses yang telah kami kerjakan untuk klien
              kami
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-background border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-muted hover:bg-accent/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-xl text-muted-foreground py-20">
              Belum ada proyek di kategori ini.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/portfolio/${project.id}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/800x600/1f2937/9ca3af?text=No+Image";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                            <ExternalLink className="w-6 h-6 text-accent-foreground" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <span className="text-sm font-semibold text-accent">
                          {project.category || "Umum"}
                        </span>
                        <h3 className="mt-2 text-xl font-bold group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>

                        {(project.client || project.date) && (
                          <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                            {project.client && <span>{project.client}</span>}
                            {project.date && (
                              <>
                                {project.client && " • "}
                                {new Date(project.date).toLocaleDateString(
                                  "id-ID",
                                  {
                                    year: "numeric",
                                    month: "long",
                                  }
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Portfolio;
