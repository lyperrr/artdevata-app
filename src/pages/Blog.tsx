// src/pages/Blog.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Loader2, ImageOff } from "lucide-react";

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

  // const API_URL = `${import.meta.env.VITE_API_URL}/blogs`;

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  const featured = posts[0];
  const others = posts.slice(1);

  return (
    <AppLayout>
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
      {featured && (
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
                    {featured.image ? (
                      <img
                        src={
                          featured.image?.startsWith("http")
                            ? featured.image
                            : `https://admin.artdevata.net/storage/${featured.image}`
                        }
                        alt={featured.title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
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
                    <Badge className="w-fit mb-3 text-xs bg-accent/10 text-accent hover:bg-accent/20 border-0">
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
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featured.created_at).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </span>
                      <span className="flex items-center gap-2">
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
                        Baca Selengkapnya{" "}
                        <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}{" "}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="cursor-pointer group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-border/50 hover:border-accent/50">
                  <div className="relative h-[220px] overflow-hidden bg-muted group">
                    {post.image ? (
                      <img
                        src={
                          post.image?.startsWith("http")
                            ? post.image
                            : `https://admin.artdevata.net/storage/${post.image}`
                        }
                        alt={post.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                  <div className="p-6">
                    <Badge className="mb-3 text-xs bg-accent/10 text-accent hover:bg-accent/20 border-0">
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="link"
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="w-full lg:w-fit hover:no-underline text-accent"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Blog;
