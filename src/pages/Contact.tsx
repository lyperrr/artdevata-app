import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  User,
  MessageSquare,
  Briefcase,
} from "lucide-react";
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

const whatsappNumber = "628974590050";
const whatsappMessage = "Halo, saya tertarik dengan layanan ArtDevata";

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
  {
    iconify: "mdi:whatsapp",
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`,
    label: "WhatsApp",
  },
  {
    iconify: "ic:round-discord",
    href: `https://discord.gg/ZZdAHMen`,
    label: "Discord",
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

  // Template pesan berdasarkan layanan
  const messageTemplates: Record<string, string> = {
    website:
      "Halo, saya tertarik dengan layanan Website Development. Saya ingin membuat website untuk [jenis bisnis]. Beberapa fitur yang saya butuhkan adalah [sebutkan fitur]. Budget yang saya alokasikan sekitar [budget]. Mohon informasi lebih lanjut mengenai timeline dan proses pengerjaannya.",
    hosting:
      "Halo, saya membutuhkan layanan Hosting & Domain untuk website saya. Estimasi traffic per bulan sekitar [jumlah visitor]. Saya memerlukan [kapasitas storage] storage dan [bandwidth] bandwidth. Mohon rekomendasi paket yang sesuai.",
    cctv: "Halo, saya ingin memasang CCTV untuk [lokasi/jenis tempat]. Area yang perlu dipantau sekitar [luas area] dengan [jumlah] titik kamera. Saya membutuhkan fitur [rekaman/live monitoring/remote access]. Mohon informasi untuk survey lokasi.",
    support:
      "Halo, saya membutuhkan IT Support untuk [jenis kebutuhan]. Permasalahan yang sering dihadapi adalah [sebutkan masalah]. Saya memerlukan dukungan [one-time/regular/on-call]. Mohon informasi mengenai paket layanan yang tersedia.",
    cloud:
      "Halo, saya tertarik dengan Cloud Solutions untuk [keperluan bisnis]. Saat ini saya menggunakan [infrastruktur saat ini] dan ingin migrasi ke cloud. Data yang perlu disimpan sekitar [ukuran data]. Mohon konsultasi lebih lanjut.",
    other:
      "Halo, saya ingin berkonsultasi mengenai [sebutkan kebutuhan]. Beberapa detail yang perlu didiskusikan adalah [sebutkan detail]. Mohon informasi lebih lanjut mengenai solusi yang bisa ditawarkan.",
  };

  // Update message template saat service berubah
  const handleServiceChange = (value: string) => {
    if (messageTemplates[value] && !form.getValues("message")) {
      form.setValue("message", messageTemplates[value]);
    }
  };

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
    <AppLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container ">
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
        <div className="container ">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-card border-border shadow-lg">
                <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
                  <Send className="w-6 h-6 text-primary" />
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
                            <FormLabel className="text-card-foreground flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              Nama Lengkap
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Dyren Pratama Yudha"
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
                            <FormLabel className="text-card-foreground flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="contoh@gmail.com"
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
                          <FormLabel className="text-card-foreground flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
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
                          <FormLabel className="text-card-foreground flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            Layanan yang Diminati
                          </FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleServiceChange(value);
                            }}
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
                          <FormLabel className="text-card-foreground flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-primary" />
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
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Mengirim...</>
                      ) : (
                        <>
                          <Send className="!size-5" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </Motion.div>

            {/* Info Side */}
            <MotionCard className="space-y-8 p-8 bg-card border-border shadow-lg">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon
                    icon="mdi:star-circle"
                    className="!w-6 !h-6 text-primary"
                  />
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
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon
                    icon="mdi:share-variant"
                    className="!w-5 !h-5 text-primary"
                  />
                  Ikuti Kami di Media Sosial
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Button
                      variant="accent"
                      key={social.label}
                      asChild
                      className="rounded-full size-12"
                    >
                      <Link
                        to={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <Icon
                          icon={social.iconify}
                          className="!size-6 text-primary-foreground group-hover:text-accent-foreground"
                        />
                      </Link>
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-accent">
                <div className="text-primary-foreground mb-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Icon icon="mdi:chat-processing" className="!w-5 !h-5" />
                    Butuh Konsultasi Segera?
                  </h3>
                  <p className="text-sm mb-4 opacity-90">
                    Hubungi kami langsung via WhatsApp untuk respons cepat
                  </p>
                </div>
                <Button variant="outline" size="lg" className="w-full">
                  <Icon icon="mdi:whatsapp" className="!size-6" />
                  Chat WhatsApp
                </Button>
              </Card>
            </MotionCard>
          </div>
          {/* Contact Info */}
          <MotionCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 mt-12"
          >
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon
                  icon="mdi:information"
                  className="!w-6 !h-6 text-primary"
                />
                Informasi Kontak
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Kami siap membantu mewujudkan visi digital Anda. Hubungi kami
                melalui berbagai channel yang tersedia.
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
            </CardContent>
          </MotionCard>
        </div>
      </section>
    </AppLayout>
  );
};

export default Contact;
