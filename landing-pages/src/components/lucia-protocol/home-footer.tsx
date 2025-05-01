import RightArrowIcon from "@/assets/right-arrow.svg";

const HomeFooter = () => (
  <div className="mt-20 bg-[url('/images/home-footer.png')] bg-top bg-cover pt-80 pb-40">
    <div className="mx-auto max-w-md md:max-w-xl lg:max-w-3xl">
      <h3 className="text-center text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-snug">
        Discover What Lucia Protocol Can Offer You
      </h3>
      <p className="text-center text-xl md:text-2xl lg:text-3xl text-white mt-6 lg:mt-12 font-normal">
        Unlock the Future of Finance Today
      </p>

      <div className="flex flex-col items-center mt-8">
        <button className="relative w-80 mt-8 bg-white h-16 rounded-r-full rounded-l-full outline-none pl-10 pr-10 py-3 text-left">
          <span className="text-2xl font-medium text-[#E99B4D]">Get Early Access</span>
          <div className="absolute top-[1px] right-[1px] w-[62px] h-[62px] flex items-center justify-center rounded-full bg-[#E99B4D]">
            <RightArrowIcon className="fill-white" />
          </div>
        </button>
        <p className="text-white mt-2">Available on iOS & Android soon</p>
      </div>
    </div>
  </div>
);

export default HomeFooter;
