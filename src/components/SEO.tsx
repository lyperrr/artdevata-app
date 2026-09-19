import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
}

export default function SEO({
  title = "Web Developer Bali | Jasa Pembuatan Website — ARTDEVATA",
  description = "ARTDEVATA menyediakan jasa web developer dan pembuatan website profesional di Bali. Kami membangun website modern untuk UMKM, perusahaan, dan e-commerce.",
  keywords = "web developer bali, jasa pembuatan website bali, jasa website bali, web development bali",
  image = "https://artdevata.net/og-image.jpg",
  url = "https://artdevata.net/",
  type = "website",
  schema,
}: SEOProps) {
  const siteName = "ARTDEVATA";

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: "https://artdevata.net/",
    logo: "https://artdevata.net/og-image.jpg",
    description: "ARTDEVATA menyediakan jasa web developer dan pembuatan website profesional di Bali.",
    sameAs: [
      "https://www.facebook.com/artdevata",
      "https://www.instagram.com/artdevata",
      "https://www.linkedin.com/company/artdevata",
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteName} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@ArtDevata" />
      <meta name="twitter:creator" content="@ArtDevata" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}
