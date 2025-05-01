import { Metadata } from "next";
import Image from "next/image";

import RightArrowIcon from "@/assets/right-arrow.svg";
import RoadMap from "@/components/lucia-protocol/roadmap";
import PastEvents from "@/components/lucia-protocol/past-events";
import Partners from "@/components/lucia-protocol/partners";
import HomeFooter from "@/components/lucia-protocol/home-footer";

export const metadata: Metadata = {
  title: "Lucia Protocol",
};

export default function Home() {
  return (
    <main>
      <div className="bg-[url('/images/home-background1.png'),_linear-gradient(to_top,_#fff8_0%,_#fff_50%),_url('/images/home-background2.png')] bg-[position:top,_bottom,_bottom] bg-no-repeat pt-16 lg:pt-32 pb-40">
        <div className="mx-auto max-w-7xl px-2 lg:px-6 lg:px-8 lg:py-8 pb-20">
          <div className="relative lg:pb-[400px]">
            <div className="lg:grid lg:grid-cols-2">
              <div className="text-center lg:text-left pt-20">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium	leading-tight">Web3 Credit Access</h2>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold	bg-gradient-to-r from-[#977F93] via-[#E99B4D] to-[#B49AC6] bg-clip-text text-transparent leading-tight">
                  Powered by AI
                </h2>

                <p className="mt-4 text-xl md:text-2xl lg:text-3xl font-medium leading-tight">Empowering Dreams.</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-tight">Redefining Credit.</p>

                <button className="relative w-80 mt-8 bg-gradient-to-r from-[#CD7675] via-[#E99B4D] via-80% to-[#C8D49E] h-16 rounded-r-full rounded-l-full text-white placeholder:text-white outline-none pl-10 pr-10 py-3 text-left">
                  <span className="text-2xl font-medium">Get Early Access</span>
                  <div className="absolute top-0 right-0 w-16 h-16 flex items-center justify-center rounded-full bg-white">
                    <RightArrowIcon className="fill-[#E99B4D]" />
                  </div>
                </button>
              </div>
              <div className="hidden lg:block">
                <Image className="w-full" src="/images/home-image1.png" alt="Lucia Protocol" width={700} height={700} />
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-3 items-end lg:absolute lg:-left-[80px] bottom-0">
              <div className="hidden lg:block col-span-2">
                <Image className="w-full" src="/images/home-image2.png" alt="Lucia Protocol" width={960} height={600} />
              </div>
              <div className="text-center mt-8 mb-8 lg:text-left lg:col-span-1 lg:mb-32">
                <h2 className="text-3xl lg:text-5xl font-medium">
                  All-In-One Multichain <strong>DEX</strong>
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl font-normal mt-2 lg:mt-4">
                  Your Gateway to Trading Earning & Ownership
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-12 bg-white rounded-2xl lg:rounded-[40px] flex gap-4 lg:gap-8 shadow-[0_24px_50px_0px_#0000001A]">
            <div className="w-12 min-w-12 h-12 min-h-12 lg:w-16 lg:min-w-16 lg:h-16 lg:min-h-16 flex items-center justify-center bg-[#E99B4D] rounded-full">
              <RightArrowIcon className="fill-white" />
            </div>
            <div>
              <p className="text-xl lg:text-[45px] font-medium leading-tight">
                Pioneering <span className="text-[#E99B4D]">Innovations</span> in Decentralized Finance
              </p>
              <p className="text-lg md:text-xl lg:text-2xl mt-6">
                Lucia Protocol is a revolutionary lending and borrowing platform that empowers individuals and startup
                enterprises to obtain credit quickly and easily.
              </p>
            </div>
          </div>

          <div className="mt-20 lg:mt-32">
            <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-medium">
              Bridging Credit with{" "}
              <span className="font-bold bg-gradient-to-r from-[#977F93] via-[#E99B4D] via-30% to-[#B49AC6] to-85% bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-center text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4 font-normal">
              Transforming the Collateral Landscape with User-Centric Insights
            </p>
            <div className="grid lg:grid-cols-3 gap-6 mt-12 lg:mt-20">
              <div className="lg:col-span-2 bg-gradient-to-tr from-[#33CDF70A] from-20% via-[#F8F6F333] via-40% to-[#E99B4D33] to-85% h-[254px] rounded-[40px]">
                <div className="h-full lg:grid lg:grid-cols-2 p-8 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center">
                    <h3 className="text-center text-3xl font-medium">
                      Bridging Data,
                      <br /> Building Trust
                    </h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-center text-lg mt-4 lg:mt-0 lg:p-6">
                      Integrating on-chain and off-chain data for comprehensive credit assessment
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden relative lg:block lg:col-span-1 bg-gradient-to-bl from-[#33CDF70A] from-30% via-[#F8F6F333] via-60% to-[#E99B4D33] to-126% h-[254px] rounded-[40px] p-8 flex items-center justify-center">
                <Image
                  className="absolute -top-16"
                  src="/images/home-image3.png"
                  alt="Lucia Protocol"
                  width={300}
                  height={300}
                />
              </div>
              <div className="hidden lg:block lg:col-span-1 bg-gradient-to-tl from-[#33CDF70A] from-20% via-[#F8F6F333] via-40% to-[#E99B4D33] to-96% h-[254px] rounded-[40px] p-8 flex items-center justify-center">
                <Image className="w-full" src="/images/home-image4.png" alt="Lucia Protocol" width={300} height={300} />
              </div>
              <div className="lg:col-span-1 bg-gradient-to-tl from-[#33CDF70A] from-30% via-[#F8F6F333] via-45% to-[#E99B4D33] to-80% h-[254px] rounded-[40px] flex flex-col items-center justify-center p-6">
                <h3 className="text-center text-3xl font-medium">
                  Next-Gen KYC
                  <br /> with Biometrics
                </h3>
                <p className="text-center text-lg mt-4">
                  Using facial recognition and liveness detection for enhanced, compliant identify verification
                </p>
              </div>
              <div className="lg:col-span-1 bg-gradient-to-bl from-[#33CDF70A] from-25% via-[#F8F6F333] via-45% to-[#E99B4D33] to-85% h-[254px] rounded-[40px] flex flex-col items-center justify-center p-6">
                <h3 className="text-center text-3xl font-medium">
                  AI-Driven
                  <br /> User Insights
                </h3>
                <p className="text-center text-lg mt-4">
                  Examining data from various social platforms to create a comprehensive profile of user activity
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 lg:mt-32">
            <p className="text-center text-lg text-[#e99b4d] md:text-xl lg:text-2xl mt-2 lg:mt-4 font-normal">
              Credit Assessment Redefined
            </p>
            <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-medium">
              Accuracy Meets{" "}
              <span className="font-bold bg-gradient-to-r from-[#977F93] via-[#E99B4D] via-40% to-[#B49AC6] to-90% bg-clip-text text-transparent">
                Integrity
              </span>
            </h2>
            <Image
              className="w-full mt-12 lg:mt-20"
              src="/images/home-image5.png"
              alt="Lucia Protocol"
              width={1200}
              height={700}
            />
          </div>

          <div className="mt-20 lg:mt-32">
            <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-medium">
              <span className="font-bold bg-gradient-to-r from-[#977F93] via-[#E99B4D] via-40% to-[#B49AC6] to-90% bg-clip-text text-transparent">
                Platform Features
              </span>
            </h2>
            <p className="text-center text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4 font-normal">
              An Insured Credit Landscape with Enhanced Privacy & Security
            </p>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 mt-20">
              <div className="relative shadow-[0_20px_30px_0_#00000012] text-center p-12 pt-[200px] rounded-[40px] bg-[#fffcfa] max-w-sm">
                <Image
                  className="absolute -top-[24px] left-1/2 -translate-x-1/2"
                  src="/images/feature1.png"
                  alt="Lucia Protocol"
                  width={196}
                  height={195}
                />
                <h3 className="font-medium text-2xl lg:text-3xl">Adaptive Collaterization Ratio</h3>
                <p className="font-regular text-md lg:text-xl mt-4">
                  A fully automated system, designed to dynamically adjust and adapt collaterization ratios based on
                  each user&apos;s individual case
                </p>
              </div>
              <div className="relative shadow-[0_20px_30px_0_#00000012] text-center p-12 pt-[200px] rounded-[40px] bg-[#fffcfa] max-w-sm">
                <Image
                  className="absolute -top-[12px] left-1/2 -translate-x-1/2"
                  src="/images/feature2.png"
                  alt="Lucia Protocol"
                  width={242}
                  height={179}
                />
                <h3 className="font-medium text-2xl lg:text-3xl">Attribution CreditScoring</h3>
                <p className="font-regular text-md lg:text-xl mt-4">
                  Accurately evaluating credit using a multi-dimensional approach, combining both on-chain and onchain
                  data to evaluate borrowers&apos; creditworthiness accurately
                </p>
              </div>
              <div className="relative shadow-[0_20px_30px_0_#00000012] text-center p-12 pt-[200px] rounded-[40px] bg-[#fffcfa] max-w-sm">
                <Image
                  className="absolute -top-[36px] left-1/2 -translate-x-1/2"
                  src="/images/feature3.png"
                  alt="Lucia Protocol"
                  width={202}
                  height={207}
                />
                <h3 className="font-medium text-2xl lg:text-3xl">Token Governance</h3>
                <p className="font-regular text-md lg:text-xl mt-4">
                  Staking pool grants LCI token holders voting rights to shape governance, endorse startups, and award
                  them reputation points for easier financial access
                </p>
              </div>
              <div className="relative shadow-[0_20px_30px_0_#00000012] text-center p-12 pt-[200px] rounded-[40px] bg-[#fffcfa] max-w-sm">
                <Image
                  className="absolute -top-[8px] left-1/2 -translate-x-1/2"
                  src="/images/feature4.png"
                  alt="Lucia Protocol"
                  width={262}
                  height={190}
                />
                <h3 className="font-medium text-2xl lg:text-3xl">Enhanced Privacy with ZK Proofs</h3>
                <p className="font-regular text-md lg:text-xl mt-4">
                  Zero-Knowledge Proofs are utilized to accurately assess borrowers&apos; creditworthiness while keeping
                  their financial details confidential
                </p>
              </div>
              <div className="relative shadow-[0_20px_30px_0_#00000012] text-center p-12 pt-[200px] rounded-[40px] bg-[#fffcfa] max-w-sm">
                <Image
                  className="absolute -top-[24px] left-1/2 -translate-x-1/2"
                  src="/images/feature5.png"
                  alt="Lucia Protocol"
                  width={210}
                  height={210}
                />
                <h3 className="font-medium text-2xl lg:text-3xl">Lender Reward System</h3>
                <p className="font-regular text-md lg:text-xl mt-4">
                  A reward system tailored for lenders who contribute to sustaining the stability and resilience of the
                  protocol
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RoadMap />
      <PastEvents />
      <Partners />

      <HomeFooter />
    </main>
  );
}
