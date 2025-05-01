import { useRef } from "react";

import { Header } from "../layouts/header";
import { Hero } from "../layouts/hero";
import { Features } from "../layouts/features";
import { Metrics } from "../layouts/metrics";
import { FeaturesCards } from "../layouts/featuresCards";
import { Demo } from "../layouts/demo";
import { Newsletter } from "../components/newsletter-card";
import { Footer } from "../components/footer";

export const Component = () => {
  const metricsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    if (section === "metrics" && metricsRef.current) {
      metricsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "features" && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "demo" && demoRef.current) {
      demoRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Add more sections if needed
  };
  return (
    // Container for homepage that auto centers
    <div className="flex flex-col justify-center max-w-full">
      <Header scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <div ref={metricsRef}>
        <Metrics />
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
      <FeaturesCards />
      <div ref={demoRef}>
        <Demo />
      </div>
      <Newsletter />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default Component;
