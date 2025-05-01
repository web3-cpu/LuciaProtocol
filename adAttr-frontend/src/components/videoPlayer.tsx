import { FC, useEffect } from "react";

interface PlayerProps {
  src: string;
  "data-video": string;
}

const Player: FC<PlayerProps> = (props) => {
  const targetId: string = "playerContainer";

  useEffect(() => {
    const container = document.getElementById(targetId);
    if (!container) return; // Early return if container is not found

    // Check if the script is already added to avoid duplicates
    const existingScript = container.querySelector(`script[src="${props.src}"]`);
    if (existingScript) {
      existingScript.setAttribute("data-video", props["data-video"]);
      return; // Exit if script is already present
    }

    const script: HTMLScriptElement = document.createElement("script");
    script.src = props.src;
    script.async = true;
    script.setAttribute("data-video", props["data-video"]);

    container.appendChild(script);

    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, [props]);

  return <div id={targetId}></div>;
};

export const VideoPlayer = () => {
  return (
    <div className="px-2 my-10 lg:px-20 md:my-20">
      <Player src="https://geo.dailymotion.com/player/xxgie.js" data-video="k4PI4dW1CgtKyGBsfbI" />
      {/* xow6u */}
    </div>
  );
};

export default VideoPlayer;
