import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4 relative overflow-hidden">
      {/* Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img
          src="/logo.png"
          alt="ArtDevata Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1 }}
          className="size-[700px] object-contain select-none"
        />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-[150px] sm:text-[200px] font-bold text-accent leading-none opacity-70 select-none">
              404
            </h1>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Halaman Tidak Ditemukan
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          >
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            Silakan kembali ke halaman utama.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Halaman Sebelumnya
            </Button>
          </motion.div>

          {/* Popular Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Atau kunjungi halaman populer kami:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/layanan")}
              >
                Layanan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/portfolio")}
              >
                Portfolio
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/blog")}
              >
                Blog
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/kontak")}
              >
                Kontak
              </Button>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl -z-10"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl -z-10"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
