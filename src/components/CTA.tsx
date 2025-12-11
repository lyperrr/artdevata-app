import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-accent via-accent/95 to-accent/90 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent-foreground rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent-foreground rounded-full blur-3xl"></div>
      </div>

      <div className="container  relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6"
          >
            Siap untuk menciptakan solusi custom?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-accent-foreground/90 mb-10 max-w-2xl mx-auto"
          >
            Mari diskusikan proyek Anda dan buat solusi custom yang disesuaikan
            dengan kebutuhan spesifik Anda. Tim kami siap membantu Anda sukses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground group w-full sm:w-auto"
            >
              <Link to="/kontak" className="flex items-center">
                <Phone className=" h-5 w-5" />
                Hubungi Kami
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent group text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
            >
              <Link to="/portfolio" className="flex items-center">
                Lihat Portofolio
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
