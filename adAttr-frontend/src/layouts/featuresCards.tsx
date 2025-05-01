export const FeaturesCards = () => {
  return (
    // Container for homepage that auto centers
    <div className="flex flex-col justify-center max-w-full">
      {/* Container for demo section */}
      <div className="section-bg flex flex-col w-full justify-center py-20">
        <span className="h4 text-center self-center">Explore more of our features</span>
        <div className="body self-center text-center mt-0 max-w-[90%] md:max-w-[50%]">
          Powerful tools to make better informed marketing decisions.
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-10 px-5 md:px-10 pt-20">
          {/* Feature 1 */}
          <div className="flex flex-col gap-y-4 items-center text-center">
            <img src="/icons/ui-icons/users.svg" />
            <span className="h6">Advanced User Tracking & Conversion</span>
            <span className="body max-w-lg">
              Track user journeys across devices with machine learning for seamless conversion insights.
            </span>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col gap-y-4 items-center text-center">
            <img src="/icons/ui-icons/connect.svg" />
            <span className="h6">Multi-channel Integration</span>
            <span className="body max-w-lg">
              Integration with major social media platforms (e.g., Twitter, Discord, Telegram, LinkedIn, and Google) for
              comprehensive data collection.
            </span>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-y-4 items-center text-center">
            <img src="/icons/ui-icons/chart.svg" />
            <span className="h6">Attribution Models</span>
            <span className="body max-w-lg">
              Support for various attribution models (e.g., first-touch, last-touch, linear, time decay,
              position-based).
            </span>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col gap-y-4 items-center text-center">
            <img src="/icons/ui-icons/smile.svg" />
            <span className="h6">Gas Tracking</span>
            <span className="body max-w-lg">
              Track revenue from user conversions by monitoring gas fees on every transaction.
            </span>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col gap-y-4 items-center text-center">
            <img src="/icons/ui-icons/rocket.svg" />
            <span className="h6">AI-integrated Platform</span>
            <span className="body max-w-lg">
              Collects, analyzes, and interprets marketing data to provide actionable insights and analytics for
              strategy refinement.
            </span>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col gap-y-4 items-center text-center">
            <img src="/icons/ui-icons/coin.svg" />
            <span className="h6">Optimize ROI</span>
            <span className="body max-w-lg">
              Targeted and data-driven marketing strategies to generate tailored reports for actionable insights.
            </span>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex flex-col justify-center max-w-full">
    //   {/* Container for demo section */}
    //   <div className="section-bg flex flex-col w-full justify-center py-20">
    //     <span className="h4 text-center self-center">Cutting-edge features for Web2 & Web3 insights</span>
    //     <div className="body self-center text-center mt-0 max-w-[50%]">
    //       Explore how our platform can transform your Web2 & Web3 analytics and drive growth.
    //     </div>
    //     {/* Features section */}
    //     <div className="flex flex-col columns-3 gap-y-20 px-20 py-20">
    //       {/* First row */}
    //       <div className="flex flex-row text-center gap-x-10">
    //         <div className="flex flex-col gap-y-4 items-center">
    //             <img src="/icons/ui-icons/users.svg"/>
    //           <span className="h6">Advanced User Tracking & Conversion</span>
    //           <span className="body max-w-lg">
    //           Track user journeys across devices with machine learning for seamless conversion insights.
    //           </span>
    //         </div>
    //         <div className="flex flex-col gap-y-4 items-center">
    //             <img src="/icons/ui-icons/connect.svg"/>
    //           <span className="h6">Multi-channel integration</span>
    //           <span className="body max-w-lg">
    //           Integration with major social media platforms (e.g., Twitter, Discord, Telegram, LinkedIn and Google) for comprehensive data collection.
    //           </span>
    //         </div>
    //         <div className="flex flex-col gap-y-4 items-center">
    //         <img src="/icons/ui-icons/chart.svg"/>
    //           <span className="h6">Attribution models</span>
    //           <span className="body max-w-lg">
    //             Support for various attribution models (e.g., first-touch, last-touch, linear, time decay,
    //             position-based).
    //           </span>
    //         </div>
    //       </div>
    //       {/* Second row */}
    //       <div className="flex flex-row text-center gap-x-10">
    //         <div className="flex flex-col gap-y-4 items-center">
    //             <img src="/icons/ui-icons/smile.svg"/>
    //           <span className="h6">Gas tracking</span>
    //           <span className="body max-w-lg">
    //           Track revenue from user conversions by monitoring gas fees on every transaction.
    //           </span>
    //         </div>
    //         <div className="flex flex-col gap-y-4 items-center">
    //             <img src="/icons/ui-icons/rocket.svg"/>
    //           <span className="h6">AI-integrated platform</span>
    //           <span className="body max-w-lg">
    //           Collects, analyzes, and interprets marketing data to provide actionable insights and analytics for strategy refinement.
    //           </span>
    //         </div>
    //         <div className="flex flex-col gap-y-4 items-center">
    //         <img src="/icons/ui-icons/coin.svg"/>
    //           <span className="h6">Optimize ROI</span>
    //           <span className="body max-w-lg">
    //           Targeted and data-driven marketing strategies to generate tailored reports for actionable insights..
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
