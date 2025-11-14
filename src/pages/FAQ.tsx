import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Apa itu ArtDevata?",
      answer: "ArtDevata adalah penyedia solusi IT terpadu yang menyediakan layanan pengembangan website, hosting & domain, instalasi CCTV, dan IT support untuk mendukung transformasi digital bisnis Anda.",
    },
    {
      question: "Berapa lama waktu pengerjaan website?",
      answer: "Waktu pengerjaan website bervariasi tergantung kompleksitas proyek. Untuk website company profile standar, biasanya memakan waktu 2-4 minggu. Website e-commerce atau custom aplikasi web bisa memakan waktu 1-3 bulan.",
    },
    {
      question: "Apakah ada garansi untuk layanan yang diberikan?",
      answer: "Ya, kami memberikan garansi untuk semua layanan kami. Untuk pengembangan website, kami memberikan garansi 3 bulan untuk bug fixing. Untuk instalasi CCTV, kami memberikan garansi 1 tahun untuk hardware dan instalasi.",
    },
    {
      question: "Apakah bisa konsultasi gratis?",
      answer: "Tentu! Kami menyediakan konsultasi gratis untuk semua calon klien. Anda bisa menghubungi kami melalui WhatsApp, email, atau mengisi form kontak di website kami.",
    },
    {
      question: "Bagaimana cara pemesanan layanan?",
      answer: "Anda bisa menghubungi kami melalui form kontak, WhatsApp, atau email. Tim kami akan segera merespons dan melakukan diskusi mengenai kebutuhan Anda. Setelah itu, kami akan memberikan proposal dan penawaran harga.",
    },
    {
      question: "Apakah ada paket bundling untuk beberapa layanan?",
      answer: "Ya, kami menyediakan paket bundling yang lebih hemat untuk klien yang mengambil lebih dari satu layanan. Misalnya, paket website + hosting, atau CCTV + IT support.",
    },
    {
      question: "Apakah tersedia layanan maintenance?",
      answer: "Ya, kami menyediakan layanan maintenance bulanan untuk website, hosting, dan CCTV. Layanan ini mencakup monitoring, update, backup rutin, dan support teknis prioritas.",
    },
    {
      question: "Apakah bisa upgrade layanan di kemudian hari?",
      answer: "Tentu saja! Anda bisa upgrade layanan kapan saja sesuai kebutuhan bisnis yang berkembang. Tim kami akan membantu proses upgrade dengan lancar tanpa downtime.",
    },
    {
      question: "Metode pembayaran apa saja yang diterima?",
      answer: "Kami menerima pembayaran melalui transfer bank, e-wallet (OVO, GoPay, DANA), dan untuk proyek besar bisa dicicil sesuai milestone project.",
    },
    {
      question: "Apakah ada dukungan 24/7?",
      answer: "Ya, untuk klien dengan paket maintenance atau IT support, kami menyediakan dukungan 24/7 melalui WhatsApp dan email. Response time maksimal 2 jam untuk issue critical.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Temukan jawaban untuk pertanyaan umum seputar layanan kami
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-accent hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default FAQ;
