export const Metrics = () => {
  return (
    <div className="flex flex-col justify-center max-w-full" id="metrics">
      {/* Container for metrics section */}
      <div className="dark-bg flex flex-col w-full justify-center max-w-full py-20 px-5">
        <img className="self-center w-16 pb-5" src="/icons/ui-icons/bolt-icon.svg" />
        <span className="text-4xl font-semibold text-center self-center">Fueling Innovation for Web2 & Web3</span>
        <div className="text-lg self-center text-center px-5 mt-4 sm:max-w-4xl">
          Unlock growth with AI-powered insights and seamless integration across both traditional and blockchain
          ecosystems.
        </div>

        {/* Container for metric data */}
        {/* <div className="flex flex-row columns-3 w-full justify-center px-20 my-20 gap-x-10 md:flex-cols-3">
          <div className="flex flex-col max-w-80 gap-y-4">
            <span className="h2 text-center">Hybrid Ecosystems</span>
            <span className="body2 text-center self-center">Bridging Web2 and Web3 for unified insights.</span>
          </div>
          <div className="flex flex-col max-w-80 gap-y-4">
            <span className="h2 text-center">AI-Driven Growth</span>
            <span className="body2 text-center self-center">Empowering retail and blockchain with intelligent data.</span>
          </div>
          <div className="flex flex-col max-w-80 gap-y-4">
            <span className="h2 text-center">Innovator Support</span>
            <span className="body2 text-center self-center">From startups to leading exchanges, we scale with you.</span>
          </div>
        </div> */}
        <div className="flex flex-col justify-center w-full px-5 my-20 gap-y-20 md:flex-row md:gap-x-10 md:px-20">
          <div className="flex flex-col max-w-sm gap-y-4 self-center md:flex-1">
            <span className="text-4xl font-semibold text-primary-500 text-center">Hybrid Ecosystems</span>
            <span className="text-lg text-center self-center">
              Bridging Web2 and Web3 for unified insights across all ecosystems.
            </span>
          </div>
          <div className="flex flex-col max-w-sm gap-y-4 self-center md:flex-1">
            <span className="text-4xl font-semibold text-primary-500 text-center">AI-Driven Growth</span>
            <span className="text-lg text-center self-center">
              Empowering retail and blockchain with intelligent data.
            </span>
          </div>
          <div className="flex flex-col max-w-sm gap-y-4 self-center md:flex-1">
            <span className="text-4xl font-semibold text-primary-500 text-center">Innovator Support</span>
            <span className="text-lg text-center self-center">
              From startups to leading exchanges, we scale with you.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
