import AppLayout from "@/components/AppLayout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

const Home = () => {
  return (
    <AppLayout>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <CTA />
    </AppLayout>
  );
};

export default Home;
