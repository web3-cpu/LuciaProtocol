import { useRef } from "react";

import { FAQ } from "~/layouts/FAQ";
import { Footer } from "~/components/footer";

import { Header } from "../layouts/header";

export const Component = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    if (section === "features" && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Add more sections if needed
  };
  return (
    <div>
      <Header scrollToSection={scrollToSection} />
      <FAQ />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};
