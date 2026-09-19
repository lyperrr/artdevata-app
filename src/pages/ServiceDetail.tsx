/** @format */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import AppLayout from "@/components/AppLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { getServiceBySlug, getServices } from "@/services";
import { ServiceItem } from "@/types";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceItem | null>(null);
  const [otherServices, setOtherServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const whatsappNumber = "628974590050";

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    setLoading(true);
    setNotFound(false);

    window.scrollTo({ top: 0, behavior: "smooth" });

    Promise.all([getServiceBySlug(slug), getServices()])
      .then(([currentService, allServices]) => {
        if (!mounted) return;
        if (!currentService) {
          setNotFound(true);
        } else {
          setService(currentService);
          // Ambil 3 layanan lain untuk rekomendasi
          setOtherServices(
            allServices.filter(
              (s) =>
                s.slug !== currentService.slug &&
                String(s.id) !== String(currentService.id)
            ).slice(0, 3)
          );
        }
      })
      .catch(() => {
        if (mounted) setNotFound(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  // Halaman tidak ditemukan
  if (!loading && notFound) {
    return (
      <AppLayout>
        <SEO
          title="Layanan Tidak Ditemukan | ARTDEVATA"
          description="Halaman layanan yang Anda cari tidak tersedia atau telah dipindahkan."
        />
        <section className="min-h-[70vh] flex items-center justify-center py-24">
          <div className="container max-w-md text-center">
            <div className="size-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="size-10" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Layanan Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground mb-8">
              Maaf, detail layanan yang Anda cari tidak tersedia atau URL sudah berubah.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="accent">
                <Link to="/layanan" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Lihat Semua Layanan
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Kembali ke Beranda</Link>
              </Button>
            </div>
          </div>
        </section>
      </AppLayout>
    );
  }

  const serviceTitle = service?.title || service?.name || "Layanan IT";
  const pageTitle = `${serviceTitle} Profesional di Bali | ARTDEVATA`;
  const pageDescription = service?.description
    ? `${service.description.slice(0, 150)}${
        service.description.length > 150 ? "..." : ""
      }`
    : `Layanan ${serviceTitle} profesional, bergaransi, dan terpercaya di Bali bersama ARTDEVATA.`;
  const canonicalUrl = `https://artdevata.net/layanan/${slug}`;

  const whatsappMessage = `Halo ARTDEVATA, saya tertarik dan ingin konsultasi mengenai layanan ${serviceTitle}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const schema = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceTitle,
        provider: {
          "@type": "Organization",
          name: "ARTDEVATA",
          url: "https://artdevata.net",
        },
        description: service.description,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Bali, Indonesia",
        },
        offers: service.price
          ? {
              "@type": "Offer",
              price: service.price,
              priceCurrency: "IDR",
            }
          : undefined,
      }
    : undefined;

  return (
    <AppLayout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        url={canonicalUrl}
        schema={schema}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pb-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:30px_30px]" />
        
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-8 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-accent transition-colors">
              Beranda
            </Link>
            <ChevronRight className="size-4 shrink-0 text-primary-foreground/40" />
            <Link to="/layanan" className="hover:text-accent transition-colors">
              Layanan
            </Link>
            <ChevronRight className="size-4 shrink-0 text-primary-foreground/40" />
            <span className="text-primary-foreground font-medium truncate">
              {loading ? "Memuat..." : serviceTitle}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="size-3.5" />
              Layanan Unggulan
            </div>

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 sm:h-16 w-3/4 bg-primary-foreground/20" />
                <Skeleton className="h-6 w-full bg-primary-foreground/20" />
                <Skeleton className="h-6 w-5/6 bg-primary-foreground/20" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                  {serviceTitle}
                </h1>
                <p className="text-lg sm:text-xl text-primary-foreground/85 mb-8 leading-relaxed max-w-3xl">
                  {service?.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    variant="accent"
                    className="shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all font-semibold"
                  >
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Icon icon="ic:baseline-whatsapp" className="size-5" />
                      Konsultasi WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Link to="/kontak" className="flex items-center gap-2">
                      Minta Penawaran
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container max-w-6xl">
          {loading ? (
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="space-y-3 pt-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-xl" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-80 rounded-2xl" />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              {/* Left Column: Details & Features */}
              <div className="lg:col-span-2 space-y-10">
                {/* Features & What's included */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                    Cakupan & Keunggulan Layanan
                  </h2>
                  
                  {service?.features && service.features.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3.5 p-4 rounded-xl border border-border/60 bg-card hover:border-accent/50 transition-colors"
                        >
                          <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-sm sm:text-base font-medium text-foreground">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Solusi komprehensif disesuaikan khusus dengan kebutuhan bisnis Anda.
                    </p>
                  )}
                </div>

                {/* Why Choose ARTDEVATA */}
                <div className="border-t border-border/60 pt-10">
                  <h3 className="text-xl font-bold mb-6 text-foreground">
                    Kenapa Memilih ARTDEVATA?
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-card border border-border/60">
                      <ShieldCheck className="size-6 text-accent mb-2" />
                      <h4 className="font-semibold text-foreground mb-1 text-sm">
                        Garansi & Kualitas
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Hasil pengerjaan terjamin dengan standar industri terkini.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card border border-border/60">
                      <Clock className="size-6 text-accent mb-2" />
                      <h4 className="font-semibold text-foreground mb-1 text-sm">
                        Tepat Waktu
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Manajemen proyek terstruktur dengan timeline yang jelas.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card border border-border/60">
                      <Sparkles className="size-6 text-accent mb-2" />
                      <h4 className="font-semibold text-foreground mb-1 text-sm">
                        Dukungan Penuh
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Bantuan teknis dan konsultasi setelah implementasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky CTA Card */}
              <div className="lg:col-span-1">
                <Card className="p-6 sm:p-8 bg-card border-border/60 sticky top-28 shadow-xl">
                  {service?.price && (
                    <div className="mb-6 pb-6 border-b border-border/60">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                        Mulai dari
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-foreground">
                          {typeof service.price === "number"
                            ? `Rp ${service.price.toLocaleString("id-ID")}`
                            : service.price}
                        </span>
                        {service.period && (
                          <span className="text-sm text-muted-foreground">
                            / {service.period}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    Konsultasikan Kebutuhan Anda
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Diskusikan ide dan kebutuhan proyek Anda bersama tim ahli kami. Kami siap memberikan rekomendasi solusi paling optimal.
                  </p>

                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="accent"
                      size="lg"
                      className="w-full font-semibold shadow-md"
                    >
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Icon icon="ic:baseline-whatsapp" className="size-5" />
                        Chat via WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <Link to="/kontak" className="flex items-center justify-center gap-2">
                        Form Penawaran
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                      <Link to="/layanan" className="flex items-center justify-center gap-1.5">
                        <ArrowLeft className="size-3.5" />
                        Kembali ke Semua Layanan
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Other Services Recommendations */}
      {otherServices.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border/60">
          <div className="container max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-2">
                  Eksplorasi Layanan
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Layanan Lainnya dari ARTDEVATA
                </h2>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/layanan" className="flex items-center gap-1.5">
                  Semua Layanan
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <Card
                  key={other.id}
                  className="p-6 bg-card border-border/60 hover:border-accent/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {other.title || other.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                      {other.description}
                    </p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
                  >
                    <Link
                      to={`/layanan/${other.slug}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Lihat Detail
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </AppLayout>
  );
}
