// src/pages/Blog.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Calendar, User, ArrowRight, Loader2, ImageOff } from "lucide-react";
import SEO from "@/components/SEO";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  created_at: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // const API_URL = `${import.meta.env.VITE_API_URL}/blogs`;

  const fetchPosts = () => {
    fetch("https://admin.artdevata.net/api/blogs")
      .then((res) => res.json())
      .then((json) => {
        const data = json.data || json;
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchPosts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const featured = posts[0];
  const others = posts.slice(1);

  // Pagination logic
  const totalPages = Math.ceil(others.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = others.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppLayout>
      <SEO
        title="Blog ArtDevata - Tips & Insight Teknologi IT"
        description="Baca artikel terbaru tentang teknologi IT, tips development, dan insight bisnis dari ArtDevata. Panduan lengkap untuk transformasi digital bisnis Anda."
        url="https://www.artdevata.net/blog"
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            Blog & Berita
          </motion.h1>
          <p className="mt-4 text-xl opacity-90">
            Tips, panduan, dan insight terbaru seputar teknologi dan bisnis
            digital
          </p>
        </div>
      </section>
      {/* Featured Post Utama */}
      {loading ? (
        <section className="py-12 bg-background">
          <div className="container max-w-5xl">
            <Card className="overflow-hidden border-border/50">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2 h-[280px] lg:h-[320px] bg-muted" />
                <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="flex gap-4 mb-6">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-10 w-full lg:w-48 ml-auto" />
                </div>
              </div>
            </Card>
          </div>
        </section>
      ) : featured ? (
        <section className="py-12 bg-background">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-border/50">
                <div className="grid lg:grid-cols-5 gap-0">
                  <div className="relative lg:col-span-2 h-[280px] lg:h-[320px] overflow-hidden bg-muted">
                    <Badge
                      variant="outline"
                      className="absolute left-3 top-3 z-20 w-fit mb-3 bg-accent text-primary-foreground hover:bg-accent/90 cursor-pointer"
                    >
                      Baru
                    </Badge>
                    {featured.image ? (
                      <img
                        src={
                          featured.image?.startsWith("http")
                            ? featured.image
                            : `https://admin.artdevata.net/storage/${featured.image}`
                        }
                        alt={featured.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex flex-col items-center justify-center">
                                <svg class="w-12 h-12 text-muted-foreground mb-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>
                                <p class="text-muted-foreground text-xs">Gambar tidak tersedia</p>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <ImageOff className="w-12 h-12 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground text-xs">
                          Gambar tidak tersedia
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                    <Badge
                      variant="outline"
                      className="w-fit mb-3 bg-accent text-primary-foreground hover:bg-accent/90 cursor-pointer"
                    >
                      {featured.category}
                    </Badge>
                    <h2
                      className="text-2xl lg:text-3xl font-bold mb-3 cursor-pointer hover:text-accent transition line-clamp-2"
                      onClick={() => navigate(`/blog/${featured.id}`)}
                    >
                      {featured.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featured.created_at).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {featured.author}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => navigate(`/blog/${featured.id}`)}
                        className="w-full lg:w-fit"
                        size="sm"
                      >
                        Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Daftar Blog Lainnya */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-10"
          >
            Artikel Lainnya
          </motion.h2>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-[220px] bg-muted" />
                  <div className="p-6">
                    <Skeleton className="h-5 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-4 w-32 mt-4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-border/50 hover:border-accent/50">
                    <div className="relative aspect-video overflow-hidden bg-muted group">
                      <Badge
                        variant="outline"
                        className="bg-accent text-primary-foreground hover:bg-accent/90 absolute top-3 left-3 z-10"
                      >
                        {post.category}
                      </Badge>
                      {post.image ? (
                        <img
                          src={
                            post.image?.startsWith("http")
                              ? post.image
                              : `https://admin.artdevata.net/storage/${post.image}`
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                              <div class="w-full h-full flex flex-col items-center justify-center">
                                <svg class="w-10 h-10 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>
                              </div>
                            `;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <ImageOff className="w-10 h-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-3">
                      <div className="text-xs text-muted-foreground flex items-center gap-2 my-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>

                      <h3
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="text-lg font-bold group-hover:text-accent transition line-clamp-2 cursor-pointer"
                      >
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex justify-end items-center">
                        <Button
                          size="sm"
                          variant="link"
                          onClick={() => navigate(`/blog/${post.id}`)}
                          className="w-full lg:w-fit hover:no-underline text-accent"
                        >
                          <span className="hidden sm:block">Baca</span>{" "}
                          Selengkapnya
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
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
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
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
        </div>
      </section>
    </AppLayout>
  );
};

export default Blog;
