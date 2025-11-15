import { useState, useEffect } from "react";
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

  const whatsappNumber = "6281234567890"; // Replace with actual number
  const whatsappMessage = "Halo, saya tertarik dengan layanan ArtDevata";

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* WhatsApp Button */}
      <Button
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        asChild
      >
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact via WhatsApp"
        >
          <Icon icon="ic:baseline-whatsapp" className="h-10 w-10" />
        </a>
      </Button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="h-14 w-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-10 w-10" />
        </Button>
      )}
    </div>
  );
};

export default FloatingActions;
