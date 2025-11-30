import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
} from "lucide-react";
import { blogPosts } from "./data/blogData";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Cari blog post berdasarkan slug
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <AppLayout>
        <div className="container mx-auto py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Tidak Ditemukan</h1>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Blog
          </Button>
        </div>
      </AppLayout>
    );
  }

  // Artikel terkait (3 artikel random, exclude artikel saat ini)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <AppLayout>
      <div className="bg-primary p-2 mb-6 rounded-b-3xl">
        {/* Back Button */}
        <div className="container mx-auto pt-32 pb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="text-primary-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Blog
          </Button>
        </div>

        {/* Hero Image */}
        <div className="container mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-md border"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto pb-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <Card className="p-8 lg:p-12">
              {/* Category Badge */}
              <Badge className="mb-4 bg-accent hover:bg-accent/90">
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{post.readTime} baca</span>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed italic">
                {post.excerpt}
              </p>

              {/* Article Body */}
              <div
                className="article-content prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
                  prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-base
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-ul:my-6 prose-ul:space-y-2
                  prose-li:text-muted-foreground prose-li:leading-relaxed
                  [&>p:first-of-type]:text-lg [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:font-normal
                  [&>p:first-of-type]:mb-8"
                dangerouslySetInnerHTML={{ __html: post.content.trim() }}
              />

              <Separator className="my-12" />

              {/* Share Section */}
              {/* <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <Share2 className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="font-semibold text-foreground">
                      Bagikan Artikel:
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div> */}
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            {/* Author Card */}
            <Card className="p-6 mb-8 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Tentang Penulis</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    Content Writer
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Tim profesional ArtDevata yang berdedikasi memberikan insight
                dan tips terbaik seputar teknologi dan bisnis digital.
              </p>
              <Button className="w-full bg-accent hover:bg-accent/90">
                Hubungi Kami
              </Button>
            </Card>

            {/* CTA Card */}
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <h3 className="font-bold text-lg mb-3">Butuh Konsultasi?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dapatkan solusi teknologi terbaik untuk bisnis Anda. Konsultasi
                gratis dengan expert kami.
              </p>
              <Button
                className="w-full bg-accent hover:bg-accent/90"
                onClick={() => navigate("/kontak")}
              >
                Konsultasi Gratis
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Related Posts */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Artikel Terkait
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                    onClick={() => {
                      navigate(`/blog/${relatedPost.slug}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-2 bg-accent hover:bg-accent/90 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {relatedPost.date}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </AppLayout>
  );
};

export default BlogDetail;
