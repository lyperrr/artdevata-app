import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // WhatsApp pribadi yang kamu minta
  const whatsappNumber = "628974590050";
  const whatsappMessage = "Halo, saya tertarik dengan layanan ArtDevata";

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40 *:grow">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Button
              onClick={scrollToTop}
              className="size-14 border border-primary-foreground rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 mb-4"
              aria-label="Scroll to top"
            >
              <ArrowUp className="!size-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-2 animate-bounce"
      >
        {/* Chat Bubble */}
        <div className="px-4 py-2 bg-muted rounded-xl rounded-br-none text-sm font-medium shadow-sm">
          Hubungi via Whatsapp
        </div>

        {/* WhatsApp Button */}
        <Link
          to={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact via WhatsApp"
          className="size-14 flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-primary-foreground border border-primary-foreground shadow-lg hover:shadow-xl"
        >
          <Icon icon="ic:baseline-whatsapp" className="size-8" />
        </Link>
      </motion.div>
    </div>
  );
};

export default FloatingActions;
