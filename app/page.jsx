import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IndustrialSection from "@/components/IndustrialSection"
import AIEnginesSection from "@/components/AIEnginesSection";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IndustrialSection/>
      <AIEnginesSection/>
      <HowItWorks/>
    </>
  );
}
