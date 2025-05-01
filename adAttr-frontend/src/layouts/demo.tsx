import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { VideoPlayer } from "../components/videoPlayer";

export const Demo = () => {
  const navigate = useNavigate();

  return (
    // Container for homepage that auto centers
    <div className="flex flex-col justify-center max-w-full" id="demo">
      {/* Container for demo section */}
      <div className="dark-bg flex flex-col w-full justify-center px-6 pt-10 md:px-20 md:pt-20">
        <div className="badge self-center mb-3">Demo</div>
        <span className="text-4xl font-semibold md:text-4xl lg:text-4xl text-center self-center">
          Cutting-edge features for Web2 & Web3 insights
        </span>
        <div className="text-base md:text-lg md:max-w-3xl lg:text-xl lg:max-w-5xl text-center mt-4 max-w-full self-center">
          Explore how our platform can transform your Web2 & Web3 analytics and drive growth.
        </div>
        {/* Demo video container */}
        <VideoPlayer />
        {/* Container for still have questions */}
        <div className="section-bg flex flex-col items-center gap-y-4 rounded-xl w-full p-6 md:p-10">
          {/* Container for images */}
          <div className="flex flex-row relative items-center justify-center">
            <img
              width={48}
              src="./images/inigo.png"
              alt="Photo of our Director of Marketing, Inigo Vaca"
              className="absolute rounded-full -left-8 sm:-left-9 border-3 border-[#FFFFFF]"
            />
            <img
              width={56}
              src="./images/ling.png"
              alt="Photo of our CEO, Ling Qing Meng"
              className="z-10 rounded-full border-3 border-[#FFFFFF]"
            />
            <img
              width={48}
              src="./images/andrew.png"
              alt="Photo of our COO, Andrew Jacobs"
              className="absolute rounded-full -right-8 sm:-right-9 border-3 border-[#FFFFFF]"
            />
          </div>
          <span className="text-2xl font-semibold md:text-xl lg:text-2xl">Still have questions?</span>
          <span className="text-base text-center md:text-lg lg:text-lg">
            Can’t find the answer you’re looking for? Please chat to our friendly team.
          </span>
          <Button className="primary-btn" size="lg" onClick={() => navigate("/contact")}>
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  );
};
