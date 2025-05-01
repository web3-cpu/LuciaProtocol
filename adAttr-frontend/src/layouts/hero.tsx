import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { Logos } from "../layouts/logo-section";

interface NavbarProps {
  scrollToSection: (section: string) => void;
}

export const Hero: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center max-w-full">
      {/* Content for header section */}
      <div className="section-bg flex flex-col w-full text-center max-md:max-w-full py-20">
        <div className="self-center lg:max-w-4xl md:max-w-2xl sm:max-w-3xl">
          <span className="text-7xl font-medium">AI-Driven Attribution for </span>
          <span className="text-primary-500 text-7xl font-medium">Web3</span>
        </div>
        <div className="text-lg self-center mt-10 px-4 sm:max-w-4xl lg:px-32 sm:px-20" style={{ color: "#C6C6C6" }}>
          Experience the next generation of attribution with AI optimization and decentralized accuracy. Convert,
          engage, and retain more users with cutting-edge Web3 analytics.
        </div>
        <div className="flex gap-5 justify-between self-center mt-12 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <Button className="secondary-btn" size="lg" onPress={() => scrollToSection("demo")}>
            <img src="/icons/ui-icons/play-circle.svg" />
            Demo
          </Button>
          <Button className="primary-btn" size="lg" onPress={() => navigate("/contact")}>
            Request Demo
          </Button>
        </div>
        <img loading="lazy" srcSet="/Container.svg" className="mt-16 w-full max-md:mt-10 max-md:max-w-full" />
        <Logos />
      </div>
    </div>
  );
};
