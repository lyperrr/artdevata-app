import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "ArtDevata - Solusi IT Terpercaya",
  description = "ArtDevata adalah penyedia solusi IT terpadu di Indonesia. Layanan Website Development, Hosting & Domain, Instalasi CCTV, dan IT Support profesional untuk transformasi digital bisnis Anda.",
  keywords = "jasa website, web development Indonesia, hosting murah, domain, instalasi CCTV, IT support, maintenance website, jasa IT, solusi IT, transformasi digital",
  image = "https://www.artdevata.net/og-image.jpg",
  url = "https://www.artdevata.net/",
  type = "website",
}: SEOProps) {
  const siteName = "ArtDevata";

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
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: url,
          logo: image,
          description: description,
          sameAs: [
            "https://www.facebook.com/artdevata",
            "https://www.instagram.com/artdevata",
            "https://www.linkedin.com/company/artdevata",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+62-XXX-XXXX-XXXX",
            contactType: "customer service",
            availableLanguage: "Indonesian",
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "ID",
            addressRegion: "Jawa Barat",
            addressLocality: "Bandung",
          },
        })}
      </script>
    </Helmet>
  );
}
