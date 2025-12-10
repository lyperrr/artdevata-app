import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string | null;
  category: string | null;
  client?: string;
  date?: string;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = [
    "Semua",
    "Website Development",
    "CCTV Installation",
    "Cloud Solutions",
    "IT Support",
  ];

  // const API_URL = `${import.meta.env.VITE_API_URL}/portfolios`;
  const API_URL = "https://admin.artdevata.net/api/portfolios";

  const fetchProjects = () => {
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
  };

  useEffect(() => {
    fetchProjects();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchProjects();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeCategory === "Semua") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory, projects]);

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
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <p className="text-center text-xl text-muted-foreground py-20">
              Belum ada proyek di kategori ini.
            </p>
          ) : (
            <>
              {(() => {
                const totalPages = Math.ceil(
                  filteredProjects.length / itemsPerPage
                );
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentProjects = filteredProjects.slice(
                  startIndex,
                  endIndex
                );

                return (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
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
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4"></div>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-4 bottom-4 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                                    <ExternalLink className="w-6 h-6 text-accent-foreground" />
                                  </div>
                                </a>
                              )}
                            </div>

                            <div className="p-6">
                              <Badge
                                variant="outline"
                                className="bg-accent text-primary-foreground hover:bg-accent/90"
                              >
                                {project.category || "Umum"}
                              </Badge>
                              <h3 className="mt-2 text-xl font-bold group-hover:text-accent transition-colors">
                                {project.title}
                              </h3>
                              <p className="mt-2 text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>

                              {(project.client || project.date) && (
                                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                                  {project.client && (
                                    <span>{project.client}</span>
                                  )}
                                  {project.date && (
                                    <>
                                      {project.client && " • "}
                                      {new Date(
                                        project.date
                                      ).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                      })}
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() => {
                                  if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                                className={
                                  currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                                }
                              />
                            </PaginationItem>

                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => {
                                    setCurrentPage(page);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                  isActive={currentPage === page}
                                  className={`cursor-pointer ${
                                    currentPage === page
                                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                      : ""
                                  }`}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}

                            <PaginationItem>
                              <PaginationNext
                                onClick={() => {
                                  if (currentPage < totalPages) {
                                    setCurrentPage(currentPage + 1);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                                className={
                                  currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                                }
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                );
              })()}
            </>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Portfolio;
