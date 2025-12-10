import AppLayout from "@/components/AppLayout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";

const Home = () => {
  return (
    <AppLayout>
      <Hero />
      <Services />
      <About />
      {/* <Testimonials /> */}
      <FAQ />
      <CTA />
    </AppLayout>
  );
};

export default Home;
