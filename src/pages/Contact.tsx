import { motion as Motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Linkedin, Link } from "lucide-react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor telepon tidak valid"),
  service: z.string().min(1, "Pilih layanan yang diminati"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

  const socialLinks = [
    {
      iconify: "mdi:instagram",
      href: "https://instagram.com/artdevata",
      label: "Instagram",
    },
    {
      iconify: "ic:baseline-tiktok",
      href: "https://tiktok.com/@artdevata",
      label: "TikTok",
    },
  ];

// Create Motion Card component
const MotionCard = Motion(Card);

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co - free form backend
      const response = await fetch(
        "https://formsubmit.co/ajax/artdevata@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            service: values.service,
            message: values.message,
            _subject: `Pesan Baru dari ${values.name} - Art Devata`,
            _template: "table",
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Pesan Terkirim!",
          description: "Terima kasih, kami akan segera menghubungi Anda.",
        });
        form.reset();
      } else {
        throw new Error("Gagal mengirim pesan");
      }
    } catch (error) {
      toast({
        title: "Gagal Mengirim",
        description:
          "Terjadi kesalahan, silakan coba lagi atau hubungi kami langsung.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "artdevata@gmail.com",
      link: "mailto:artdevata@gmail.com",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 812-3456-7890",
      link: "tel:+6281234567890",
    },
    {
      icon: MapPin,
      title: "Alamat",
      content: "Bali, Indonesia",
      link: "#",
    },
    {
      icon: Clock,
      title: "Jam Kerja",
      content: "Senin - Jumat: 09:00 - 17:00",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Mari diskusikan bagaimana kami dapat membantu bisnis Anda
              berkembang
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-card border-border shadow-lg">
                <h2 className="text-2xl font-bold text-card-foreground mb-6">
                  Kirim Pesan
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-card-foreground">
                              Nama Lengkap
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-card-foreground">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                {...field}
                                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Nomor Telepon
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+62 812-3456-7890"
                              {...field}
                              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Layanan yang Diminati
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Pilih Layanan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border">
                              <SelectItem value="website">
                                Website Development
                              </SelectItem>
                              <SelectItem value="hosting">
                                Hosting & Domain
                              </SelectItem>
                              <SelectItem value="cctv">
                                CCTV Installation
                              </SelectItem>
                              <SelectItem value="support">
                                IT Support
                              </SelectItem>
                              <SelectItem value="cloud">
                                Cloud Solutions
                              </SelectItem>
                              <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-card-foreground">
                            Pesan
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ceritakan tentang project Anda..."
                              className="min-h-[150px] bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Mengirim...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </Motion.div>

            {/* Info Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Mengapa Memilih ArtDevata?
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Tim Profesional
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Didukung oleh tim ahli berpengalaman di bidang IT
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Harga Kompetitif
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan layanan berkualitas dengan harga yang
                        terjangkau
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Support 24/7
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Layanan dukungan teknis tersedia kapan saja
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Garansi Kepuasan
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Kami menjamin kepuasan Anda dengan hasil kerja terbaik
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-muted">
                <h3 className="font-bold text-foreground mb-4">
                  Ikuti Kami di Media Sosial
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Button  key={social.label} asChild className="size-10">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <Icon
                          icon={social.iconify}
                          className="w-6 h-6 text-primary-foreground group-hover:text-accent-foreground"
                        />
                      </a>
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-accent text-white">
                <h3 className="font-bold mb-2">Butuh Konsultasi Segera?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Hubungi kami langsung via WhatsApp untuk respons cepat
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-white text-accent hover:bg-white/90"
                >
                  Chat WhatsApp
                </Button>
              </Card>
            </div>
          </div>
          {/* Contact Info */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Informasi Kontak
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Kami siap membantu mewujudkan visi digital Anda. Hubungi kami
                melalui berbagai channel yang tersedia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <MotionCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </MotionCard>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Contact;
