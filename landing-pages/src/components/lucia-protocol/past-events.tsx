"use client";
import { useRef } from "react";
import Image from "next/image";

import RightArrowIcon from "@/assets/right-arrow.svg";

const PastEvents: React.FC = () => {
  const ref = useRef(null);
  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-6 lg:px-8 lg:py-8 mt-20">
      <div className="bg-[#D0CFE9] px-8 py-12 lg:p-16 rounded-[50px] shadow-[0_14px_24px_0_#0000001A]">
        <h2 className="text-white font-medium text-4xl lg:text-6xl text-center mb-12 lg:mb-16">Past Events</h2>
        <div className="relative select-none">
          <div className="flex items-center gap-8 rounded-[40px] overflow-auto no-scrollbar" ref={ref}>
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/1.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/3.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/2.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/4.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/5.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/6.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/7.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/8.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/9.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/10.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/11.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/12.png"
              alt="Image"
              width={800}
              height={500}
            />
            <Image
              className="rounded-[40px] lg:h-[500px]"
              src="/images/events/13.png"
              alt="Image"
              width={800}
              height={500}
            />
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 rotate-180 -left-6 w-12 h-12 border border-white flex items-center justify-center rounded-full"
            onClick={() => {
              const container = ref.current;
              //@ts-ignore
              container.scrollLeft -= 150;
            }}
          >
            <RightArrowIcon className="fill-white" />
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-6 w-12 h-12 border border-white flex items-center justify-center rounded-full"
            onClick={() => {
              const container = ref.current;
              //@ts-ignore
              container.scrollLeft += 150;
            }}
          >
            <RightArrowIcon className="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
