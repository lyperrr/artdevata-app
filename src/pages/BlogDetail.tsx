// src/pages/BlogDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  ArrowLeft,
  Loader2,
  User,
  Clock,
  Share2,
  Heart,
  Bookmark,
  Home,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  TrendingUp,
  Mail,
  Check,
  ImageOff,
} from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(5);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCopied, setShowCopied] = useState(false);

  // Load like data from localStorage
  useEffect(() => {
    if (!id) return;

    const likeKey = `blog_like_${id}`;
    const countKey = `blog_count_${id}`;

    const isLiked = localStorage.getItem(likeKey) === "true";
    const count = parseInt(localStorage.getItem(countKey) || "0");

    setLiked(isLiked);
    setLikeCount(count);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    // Fetch current blog post
    const fetchPost = fetch(`https://admin.artdevata.net/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        const blog = json.data || json;
        setPost(blog);

        // Calculate reading time (assuming 200 words per minute)
        if (blog.content) {
          const wordCount = blog.content.split(" ").length;
          setReadingTime(Math.ceil(wordCount / 200));
        }
      });

    // Fetch recent posts for sidebar
    const fetchRecent = fetch("https://admin.artdevata.net/api/blogs")
      .then((res) => res.json())
      .then((json) => {
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
        console.error("Error fetching blog data:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle share functions
  const handleShare = (platform: string) => {
    const currentUrl = window.location.href;
    const shareText = post ? `${post.title} - ArtDevata` : "";
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(shareText);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      email: `mailto:?subject=${encodedText}&body=${encodedText}%20${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
        }
      } catch (error) {
        console.error("Fallback: Failed to copy", error);
        alert("Gagal menyalin link. Silakan copy manual dari address bar.");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleLike = () => {
    if (!id) return;

    const likeKey = `blog_like_${id}`;
    const countKey = `blog_count_${id}`;

    if (liked) {
      // Unlike
      const newCount = Math.max(0, likeCount - 1);
      setLiked(false);
      setLikeCount(newCount);
      localStorage.setItem(likeKey, "false");
      localStorage.setItem(countKey, newCount.toString());
    } else {
      // Like
      const newCount = likeCount + 1;
      setLiked(true);
      setLikeCount(newCount);
      localStorage.setItem(likeKey, "true");
      localStorage.setItem(countKey, newCount.toString());
    }
  };

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
            <p className="text-muted-foreground mb-8">
              Artikel yang Anda cari tidak dapat ditemukan
            </p>
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
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="h-8 px-3 gap-2 text-muted-foreground hover:text-primary-foreground"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
                <ChevronRight className="w-4 h-4 text-muted-primary-foreground/40" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/blog")}
                  className="h-8 px-3 text-muted-foreground hover:text-primary-foreground"
                >
                  Blog
                </Button>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                <span className="text-foreground font-medium line-clamp-1">
                  {post.title}
                </span>
              </div>
            </motion.div>

            {/* Article Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 lg:p-12">
                  {/* Category Badge */}
                  <Badge variant="outline" className="mb-3">
                    {post.category || "Cybersecurity"}
                  </Badge>

                  {/* Title */}
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {post.author
                            ? post.author.charAt(0).toUpperCase()
                            : "A"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">
                        {post.author || "Admin"}
                      </span>
                    </div>

                    <Separator orientation="vertical" className="h-4" />

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <Separator orientation="vertical" className="h-4" />

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{readingTime} menit baca</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Share Buttons */}
                  <div className=" gap-3">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Bagikan artikel:
                    </p>
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleShare("whatsapp")}
                          title="Bagikan ke WhatsApp"
                        >
                          <Icon
                            icon="mdi:whatsapp"
                            className="w-5 h-5 text-green-500"
                          />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleShare("telegram")}
                          title="Bagikan ke Telegram"
                        >
                          <Icon
                            icon="mdi:telegram"
                            className="w-5 h-5 text-blue-500"
                          />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleShare("facebook")}
                          title="Bagikan ke Facebook"
                        >
                          <Facebook className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={handleCopyLink}
                          title={showCopied ? "Link Disalin!" : "Salin Link"}
                        >
                          {showCopied ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Link2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <Button
                        variant={liked ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                        onClick={handleLike}
                      >
                        <Heart
                          className={`!size-5 ${
                            liked ? "fill-destructive" : ""
                          }`}
                        />
                        {likeCount > 0 && (
                          <span className="text-xs">{likeCount}</span>
                        )}
                        {liked ? "Disukai" : "Suka"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Article Content */}
              <div className="lg:col-span-2">
                {/* Featured Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <Card className="overflow-hidden border-0 shadow-lg bg-muted group">
                    {post.image ? (
                      <img
                        src={
                          post.image?.startsWith("http")
                            ? post.image
                            : `https://admin.artdevata.net/storage/${post.image}`
                        }
                        alt={post.title}
                        className="w-full h-[280px] lg:h-[380px] object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-[280px] lg:h-[380px] flex flex-col items-center justify-center bg-muted">
                                <svg class="w-16 h-16 text-muted-foreground mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>
                                <p class="text-muted-foreground text-sm">Gambar tidak tersedia</p>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-[280px] lg:h-[380px] flex flex-col items-center justify-center bg-muted">
                        <ImageOff className="w-16 h-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-sm">
                          Gambar tidak tersedia
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>

                {/* Article Body */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8 lg:p-12">
                      {/* Title and Badge */}
                      <div className="mb-8">
                        <Badge variant="outline" className="mb-4">
                          {post.category || "Cybersecurity"}
                        </Badge>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                          {post.title}
                        </h2>
                      </div>

                      <article className="prose prose-lg max-w-none">
                        <div
                          className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mt-5 [&>h3]:mb-2 [&>p]:mb-4 [&>p]:leading-7 [&>ul]:mb-4 [&>ul]:pl-6 [&>ol]:mb-4 [&>ol]:pl-6 [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4 [&>code]:bg-muted [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4 [&>strong]:font-semibold [&>a]:text-primary [&>a]:underline-offset-4 [&>a:hover]:underline [&>img]:rounded-lg [&>img]:my-6"
                          dangerouslySetInnerHTML={{
                            __html: post.content
                              .replace(/\\r\\n/g, "<br>")
                              .replace(/\\n/g, "<br>"),
                          }}
                        />
                      </article>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Article Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {post.author
                                ? post.author.charAt(0).toUpperCase()
                                : "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">
                              {post.author || "ArtDevata"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(post.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar - Recent Articles */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="sticky top-24 space-y-6"
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold">Artikel Terbaru</h3>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentPosts.map((recentPost, index) => (
                        <motion.div
                          key={recentPost.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className="group cursor-pointer overflow-hidden border hover:border-primary/50 transition-all hover:shadow-md"
                            onClick={() => navigate(`/blog/${recentPost.id}`)}
                          >
                            <div className="relative aspect-video overflow-hidden bg-muted">
                              {recentPost.image ? (
                                <img
                                  src={
                                    recentPost.image?.startsWith("http")
                                      ? recentPost.image
                                      : `https://admin.artdevata.net/storage/${recentPost.image}`
                                  }
                                  alt={recentPost.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `
                                        <div class="w-full h-full flex flex-col items-center justify-center">
                                          <svg class="w-8 h-8 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>
                                        </div>
                                      `;
                                    }
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                  <ImageOff className="w-8 h-8 text-muted-foreground " />
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                {recentPost.title}
                              </h4>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {new Date(
                                    recentPost.created_at
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}

                      <Button
                        onClick={() => navigate("/blog")}
                        variant="outline"
                        className="w-full gap-2"
                      >
                        <Bookmark className="w-4 h-4" />
                        Lihat Semua Artikel
                      </Button>
                    </CardContent>
                  </Card>
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
