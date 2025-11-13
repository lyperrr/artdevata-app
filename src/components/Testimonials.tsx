import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "CEO",
      company: "Tech Startup Indonesia",
      content:
        "ArtDevata sangat profesional dalam menghandle proyek website kami. Hasilnya melebihi ekspektasi dan delivery tepat waktu!",
      rating: 5,
      avatar: "BS",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      role: "Marketing Director",
      company: "Retail Solutions",
      content:
        "Pelayanan IT support mereka sangat responsif. Masalah kami selalu diselesaikan dengan cepat dan efisien. Sangat recommended!",
      rating: 5,
      avatar: "SN",
    },
    {
      id: 3,
      name: "Ahmad Ridwan",
      role: "Owner",
      company: "Café & Restaurant",
      content:
        "Instalasi CCTV dan sistem point of sale yang dipasang ArtDevata bekerja dengan sempurna. Tim yang kompeten dan harga yang kompetitif.",
      rating: 5,
      avatar: "AR",
    },
    {
      id: 4,
      name: "Linda Wijaya",
      role: "HR Manager",
      company: "Manufacturing Co.",
      content:
        "Sistem hosting kami berjalan stabil dan cepat. Support team ArtDevata selalu siap membantu 24/7. Terima kasih!",
      rating: 5,
      avatar: "LW",
    },
    {
      id: 5,
      name: "Rudi Hartono",
      role: "IT Manager",
      company: "Financial Services",
      content:
        "Sangat puas dengan pengembangan aplikasi web custom kami. Tim ArtDevata memahami kebutuhan bisnis dengan baik dan memberikan solusi terbaik.",
      rating: 5,
      avatar: "RH",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Apa Kata Klien Kami
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Kepuasan klien adalah prioritas utama kami. Lihat apa yang mereka
            katakan tentang layanan kami.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="border-border/50 hover:border-accent/50 transition-colors duration-300 h-full">
                      <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-5 h-5 ${
                                index < testimonial.rating
                                  ? "fill-gold text-gold"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Content */}
                        <p className="text-foreground/80 mb-6 flex-grow leading-relaxed">
                          "{testimonial.content}"
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-accent font-semibold text-lg">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role} - {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12" />
            <CarouselNext className="hidden sm:flex -right-12" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
