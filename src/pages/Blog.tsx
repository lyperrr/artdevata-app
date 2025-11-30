// src/pages/Blog.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";

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

  useEffect(() => {
    fetch("https://admin.artdevata.net/api/blogs")
      .then(res => res.json())
      .then(json => {
        const data = json.data || json;
        const sorted = data.sort((a: any, b: any) =>
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
            Tips, panduan, dan insight terbaru seputar teknologi dan bisnis digital
          </p>
        </div>
      </section>

      {/* Featured Post Utama */}
      {featured && (
        <section className="py-20 bg-background">
          <div className="container">
            <Card className="overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-2">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                <div className="p-10 flex flex-col justify-center">
                  <span className="text-sm font-bold text-accent mb-3">{featured.category}</span>
                  <h2
                    className="text-3xl font-bold mb-4 cursor-pointer hover:text-accent transition"
                    onClick={() => navigate(`/blog/${featured.id}`)}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
                  <div className="flex gap-6 text-sm text-muted-foreground mb-8">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featured.created_at).toLocaleDateString("id-ID")}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featured.author}
                    </span>
                  </div>
                  <Button onClick={() => navigate(`/blog/${featured.id}`)}>
                    Baca Selengkapnya <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Daftar Blog Lainnya */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10">Artikel Lainnya</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-sm font-bold text-accent">{post.category}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 hover:text-accent transition">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString("id-ID")}
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