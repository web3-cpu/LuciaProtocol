export const Logos = () => {
  return (
    <div className="flex flex-col justify-center max-w-full">
      {/* Container for logo section */}
      <div className="flex flex-col w-full text-center justify-center px-10 mt-20 sm:px-32">
        <span className="text-base" style={{ color: "#C6C6C6" }}>
          Trusted by top Web3 protocols across the globe
        </span>
        {/* Container for logos */}
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 gap-10 mt-10 self-center">
          <img className="max-w-[100%] sm:max-w-[165px]" src="/logos/movement_labs.svg" />
          <img className="max-w-[100%] sm:max-w-[165px]" src="/logos/cube3.svg" />
          <img className="max-w-[100%] sm:max-w-[165px]" src="/logos/fractal-id.svg" />
        </div>
        {/* <div className="grid lg:grid-flow-col justify-between gap-x-20 mt-10 self-center sm:grid-flow-row sm:gap-y-10">
          <img className="lg:max-w-[100%] md:max-w-32 sm:max-w-[165]" src="/logos/movement_labs.svg" />
          <img className="lg:max-w-[100%] md:max-w-32 sm:max-w-[165]" src="/logos/cube3.svg" />
          <img className="lg:max-w-[100%] md:max-w-32 sm:max-w-[165]" src="/logos/fractal-id.svg" />
        </div> */}
      </div>
    </div>
  );
};
