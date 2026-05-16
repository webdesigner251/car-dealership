import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IndustrialSection from "@/components/IndustrialSection"
import AIEnginesSection from "@/components/AIEnginesSection";
import HowItWorks from "@/components/HowItWorks";
import BuiltForResults from "@/components/BuiltForResults";
import CTA from "@/components/Cta";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IndustrialSection/>
      <AIEnginesSection/>
      <HowItWorks/>
      <BuiltForResults/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </>
  );
}
