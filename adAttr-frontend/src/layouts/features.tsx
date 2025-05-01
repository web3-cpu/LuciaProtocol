import { Button, Chip } from "@nextui-org/react";
import { useRef } from "react";

export const Features = () => {
  const featuresRef = useRef(null);

  return (
    <div className="flex flex-col justify-center max-w-full" ref={featuresRef} id="features">
      {/* Container for features section */}
      <div className="dark-bg flex flex-col w-full justify-center max-w-full">
        <div className="badge self-center mb-3">Features</div>
        <span className="px-5 text-4xl font-semibold text-center self-center">
          Analytics that feels like it's from the future
        </span>
        <div className="text-lg self-center text-center mt-4 px-4 md:max-w-2xl">
          Our platform leverages next-level technology to deliver data-driven predictions and trends that keep you ahead
          of the curve.
        </div>

        {/* Container for 'Seamless Integration' feature */}
        <div className="px-5 md:px-20 mt-20 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <div className="flex flex-col max-w-xl">
                <span className="h5 text-left mb-4">Seamless Integration</span>
                <span className="body text-left">
                  Integration with major social media platforms (e.g. Twitter, Discord, Telegram, LinkedIn, and Google)
                  for comprehensive data collection.
                </span>
                <Button
                  color="primary"
                  variant="ghost"
                  href="https://docs.clickinsights.xyz/"
                  size="lg"
                  radius="sm"
                  className="w-36 mt-5"
                  onClick={() => window.open("https://docs.clickinsights.xyz/", "_blank")}
                >
                  Read Docs
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img className="w-full aspect-square" src="/Supported Platforms.svg" />
            </div>
          </div>
        </div>

        {/* Container for 'Real-time metrics' feature */}
        <div className="px-5 md:px-20 my-10">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10">
            <div className="md:w-1/2">
              <div className="flex flex-col max-w-xl">
                <span className="h5 text-left mb-4">Real-time Metrics</span>
                <span className="body text-left">
                  Comprehensive suite of insights derived from SDK, designed to enhance your understanding of user
                  engagement and conversion metrics.
                </span>
                {/* Container for bullet points */}
                <div className="flex flex-col gap-y-4 mt-7 pl-5 h-fit">
                  <div className="flex gap-x-4">
                    <img src="/icons/ui-icons/Check icon.svg" />
                    <span className="body">Track ad performance in real-time with precision</span>
                  </div>
                  <div className="flex gap-x-4">
                    <img src="/icons/ui-icons/Check icon.svg" />
                    <span className="body">Generate tailored reports for actionable insights</span>
                  </div>
                  <div className="flex gap-x-4">
                    <img src="/icons/ui-icons/Check icon.svg" />
                    <span className="body">
                      Provide insights and analytics on campaign performance for improved future campaign ads
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Image container */}
            <div className="md:w-1/2">
              <img className="w-full aspect-square" src="/Metrics.svg" />
            </div>
          </div>
        </div>

        {/* Container for 'AI-Driven Insights' feature */}
        <div className="px-5 md:px-20 my-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Copy container */}
            <div className="md:w-1/2">
              <div className="flex flex-col max-w-xl">
                <Chip color="primary" variant="flat" className="mb-3">
                  <Chip color="warning" variant="shadow" className="mr-3">
                    Coming soon 🎉
                  </Chip>
                  Sign up to receive updates
                </Chip>
                <span className="h5 text-left mb-4">AI-Driven Insights</span>
                <span className="body text-left">
                  Leverage AI for deeper understanding and optimization of ad campaigns.
                </span>
                {/* Container for bullet points */}
                <div className="flex flex-col gap-y-4 mt-7 pl-5">
                  <div className="flex gap-x-4">
                    <img src="/icons/ui-icons/Check icon.svg" />
                    <span className="body">Identify the most effective strategies</span>
                  </div>
                  <div className="flex gap-x-4">
                    <img src="/icons/ui-icons/Check icon.svg" />
                    <span className="body">Comprehensive user engagement analysis</span>
                  </div>
                  <div className="flex gap-x-4">
                    <img src="/icons/ui-icons/Check icon.svg" />
                    <span className="body">Collects and analyzes marketing and advertisement data</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Image container */}
            <div className="md:w-1/2">
              <img className="w-full aspect-square" src="/Content.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
