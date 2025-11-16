import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      title: "10 Tips Memilih Hosting yang Tepat untuk Website Bisnis",
      excerpt:
        "Panduan lengkap memilih layanan hosting yang sesuai dengan kebutuhan dan budget bisnis Anda.",
      date: "15 Nov 2024",
      author: "Tim ArtDevata",
      category: "Web Hosting",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
      title: "Mengapa Website Responsif Penting untuk Bisnis Modern",
      excerpt:
        "Memahami pentingnya desain responsif dan dampaknya terhadap user experience dan SEO.",
      date: "12 Nov 2024",
      author: "Tim ArtDevata",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
      title: "Panduan Keamanan CCTV untuk Bisnis Retail",
      excerpt:
        "Tips dan trik mengoptimalkan sistem keamanan CCTV untuk toko dan bisnis retail Anda.",
      date: "10 Nov 2024",
      author: "Tim ArtDevata",
      category: "CCTV Security",
      image:
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    },
    {
      title: "Cloud Computing: Solusi Hemat untuk Startup",
      excerpt:
        "Bagaimana cloud computing dapat membantu startup menghemat biaya infrastruktur IT.",
      date: "8 Nov 2024",
      author: "Tim ArtDevata",
      category: "Cloud Solutions",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
      title: "5 Tanda Bisnis Anda Butuh IT Support Profesional",
      excerpt:
        "Kenali tanda-tanda bahwa bisnis Anda memerlukan dukungan IT profesional untuk berkembang.",
      date: "5 Nov 2024",
      author: "Tim ArtDevata",
      category: "IT Support",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      title: "Tren Teknologi 2024 yang Wajib Diketahui Pebisnis",
      excerpt:
        "Eksplorasi tren teknologi terkini yang akan membentuk landscape bisnis di tahun 2024.",
      date: "1 Nov 2024",
      author: "Tim ArtDevata",
      category: "Technology Trends",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Blog & Berita
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Tips, panduan, dan insight terbaru seputar teknologi dan bisnis
              digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-background">
        <div className="container ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative aspect-video lg:aspect-auto">
                  <img
                    src={posts[0].image}
                    alt={posts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-sm text-accent font-semibold mb-3">
                    {posts[0].category}
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4 hover:text-accent transition-colors cursor-pointer">
                    {posts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {posts[0].date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {posts[0].author}
                    </div>
                  </div>
                  <Button className="w-fit bg-accent hover:bg-accent/90 text-accent-foreground group">
                    Baca Selengkapnya
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 bg-background">
        <div className="container ">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-accent font-semibold mb-2">
                      {post.category}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
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
