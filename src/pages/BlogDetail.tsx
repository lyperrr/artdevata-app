// src/pages/BlogDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, ArrowLeft, Loader2, User, Clock, Share2, Heart, Bookmark } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(5);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    // Fetch current blog post
    const fetchPost = fetch(`https://admin.artdevata.net/api/blogs/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        const blog = json.data || json;
        setPost(blog);
        
        // Calculate reading time (assuming 200 words per minute)
        if (blog.content) {
          const wordCount = blog.content.split(' ').length;
          setReadingTime(Math.ceil(wordCount / 200));
        }
      });

    // Fetch recent posts for sidebar
    const fetchRecent = fetch("https://admin.artdevata.net/api/blogs")
      .then(res => res.json())
      .then(json => {
        const data = json.data || json;
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        // Get latest 5 posts excluding current post
        const filtered = sorted.filter((p: any) => p.id != id).slice(0, 5);
        setRecentPosts(filtered);
      });

    Promise.all([fetchPost, fetchRecent])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Memuat artikel...</p>
          </div>
        </div>
      </AppLayout>
    );
    
  if (!post)
    return (
      <AppLayout>
        <div className="container py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-6">Artikel Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-8">Artikel yang Anda cari tidak dapat ditemukan</p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Kembali ke Blog
            </Button>
          </motion.div>
        </div>
      </AppLayout>
    );

  return (
    <AppLayout>
      {/* Header Section */}
      <section className="pt-20 pb-8 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
              >
                🏠
              </Button>
              <span>›</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/blog")}
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
              >
                Blog
              </Button>
              <span>›</span>
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </motion.nav>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 text-sm px-3 py-1">
                🔒 {post.category || "Cybersecurity"}
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight text-gray-900"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info & Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8"
            >
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-foreground">{post.author || 'admin'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} menit baca</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Bagikan:</span>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                  📘
                </Button>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                  🐦
                </Button>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                  💼
                </Button>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                  🔗
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <div className="lg:col-span-3">
                {/* Featured Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative mb-8 rounded-2xl overflow-hidden"
                >
                  <img
                    src={post.image?.startsWith('http') ? post.image : `https://admin.artdevata.net/storage/${post.image}`}
                    alt={post.title}
                    className="w-full h-[300px] lg:h-[400px] object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Blog+Image';
                    }}
                  />
                </motion.div>

                {/* Article Body */}
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="prose prose-lg max-w-none"
                >
                  <div
                    className="text-gray-700 leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>p]:leading-7 [&>ul]:mb-4 [&>ol]:mb-4 [&>li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:bg-blue-50 [&>blockquote]:py-3 [&>blockquote]:my-4 [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded [&>pre]:overflow-x-auto [&>strong]:font-semibold [&>strong]:text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: post.content
                        .replace(/\\r\\n/g, "<br>")
                        .replace(/\\n/g, "<br>"),
                    }}
                  />
                </motion.article>

                {/* Article Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 pt-8 border-t"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                          {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{post.author || 'ArtDevata'}</p>
                        <p className="text-sm text-muted-foreground">
                          Dipublikasikan pada {new Date(post.created_at).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Bagikan
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Heart className="w-4 h-4" />
                        Suka
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar - Recent Articles */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="sticky top-24"
                >
                  <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-lg font-bold mb-6 text-gray-900">Artikel Terbaru</h3>
                    
                    <div className="space-y-6">
                      {recentPosts.map((recentPost, index) => (
                        <motion.article
                          key={recentPost.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => navigate(`/blog/${recentPost.id}`)}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                            <img
                              src={recentPost.image?.startsWith('http') ? recentPost.image : `https://admin.artdevata.net/storage/${recentPost.image}`}
                              alt={recentPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Blog+Thumbnail';
                              }}
                            />
                          </div>
                          
                          <h4 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                            {recentPost.title}
                          </h4>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(recentPost.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                        </motion.article>
                      ))}
                    </div>

                    <Button
                      onClick={() => navigate("/blog")}
                      variant="outline"
                      className="w-full mt-6"
                    >
                      Lihat Semua Artikel
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default BlogDetail;
