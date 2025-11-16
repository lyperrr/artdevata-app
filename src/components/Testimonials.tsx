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
    <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-secondary/30">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4"
          >
            Apa Kata Klien Kami
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
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
          className="w-full max-w-7xl mx-auto relative px-2 sm:px-4 lg:px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 sm:pl-3 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="border-border/50 hover:border-accent/50 transition-all duration-300 h-full hover:shadow-lg bg-background">
                    <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                      {/* Rating Stars */}
                      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              index < testimonial.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-foreground/80 mb-4 sm:mb-5 md:mb-6 flex-grow leading-relaxed text-sm sm:text-base">
                        "{testimonial.content}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-border/50 mt-auto">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent font-semibold text-xs sm:text-sm">
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {testimonial.role} - {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons - Desktop */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-5 lg:-left-12 xl:-left-14 top-1/2 -translate-y-1/2 !size-10 lg:size-11 xl:!size-12" />
              <CarouselNext className="absolute -right-5 lg:-right-12 xl:-right-14 top-1/2 -translate-y-1/2 !size-10 lg:size-11 xl:!size-12" />
            </div>

            {/* Navigation Buttons - Mobile/Tablet */}
            <div className="flex md:hidden justify-center gap-2 mt-4 sm:mt-6">
              <CarouselPrevious className="static translate-y-0 !size-9 sm:!size-10" />
              <CarouselNext className="static translate-y-0 !size-9 sm:!size-10" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
