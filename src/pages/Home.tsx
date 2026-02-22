/** @format */

import AppLayout from "@/components/AppLayout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import Gallery from "@/components/Gallery";

const Home = () => {
  return (
    <AppLayout>
      <SEO />
      <Hero />
      <Services />
      <Clients />
      <About />
      {/* <Testimonials /> */}
      <Gallery />
      <FAQ />
      <CTA />
    </AppLayout>
  );
};

export default Home;
