import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
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
      const response = await fetch("https://formsubmit.co/ajax/artdevata@gmail.com", {
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
      });

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
        description: "Terjadi kesalahan, silakan coba lagi atau hubungi kami langsung.",
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
      content: "Jakarta, Indonesia",
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Mari diskusikan bagaimana kami dapat membantu bisnis Anda berkembang
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
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
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-card-foreground">Nama Lengkap</FormLabel>
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
                            <FormLabel className="text-card-foreground">Email</FormLabel>
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
                          <FormLabel className="text-card-foreground">Nomor Telepon</FormLabel>
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
                          <FormLabel className="text-card-foreground">Layanan yang Diminati</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Pilih Layanan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover border-border">
                              <SelectItem value="website">Website Development</SelectItem>
                              <SelectItem value="hosting">Hosting & Domain</SelectItem>
                              <SelectItem value="cctv">CCTV Installation</SelectItem>
                              <SelectItem value="support">IT Support</SelectItem>
                              <SelectItem value="cloud">Cloud Solutions</SelectItem>
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
                          <FormLabel className="text-card-foreground">Pesan</FormLabel>
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
            </motion.div>

            {/* Contact Info */}
            <motion.div
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
                  Kami siap membantu mewujudkan visi digital Anda. Hubungi kami melalui
                  berbagai channel yang tersedia.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-card border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground mb-1">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground">{info.content}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                ))}
              </div>

              <Card className="p-6 h-[300px] flex items-center justify-center bg-card border-border">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="text-muted-foreground">Map Integration</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Jakarta, Indonesia</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
