import Image from "next/image";

const Partners = () => (
  <div className="mt-20">
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold	bg-gradient-to-r from-[#E99B4D] to-[#B49AC6] bg-clip-text text-transparent leading-tight text-center">
      Partners
    </h2>

    <div className="mx-auto max-w-7xl px-2 lg:px-6 lg:px-8 flex justify-center flex-wrap gap-3 mt-12 lg:mt-16">
      <div className="border border-solid border-[#F6E7D9] rounded-3xl bg-[#FAF8F4] py-12 px-10 grow lg:grow-0 flex items-center justify-center">
        <Image
          className="h-16 w-auto"
          src="/images/partners/fractal_id.png"
          alt="Fractal ID"
          width={300}
          height={100}
        />
      </div>
      <div className="border border-solid border-[#F6E7D9] rounded-3xl bg-[#FAF8F4] py-12 px-10 grow lg:grow-0 flex items-center justify-center">
        <Image className="h-16 w-auto" src="/images/partners/cred.png" alt="Cred" width={300} height={100} />
      </div>
      <div className="border border-solid border-[#F6E7D9] rounded-3xl bg-[#FAF8F4] py-12 px-10 grow lg:grow-0 flex items-center justify-center">
        <Image className="h-16 w-auto" src="/images/partners/pwrchain.png" alt="Pwr Chain" width={300} height={100} />
      </div>
      <div className="border border-solid border-[#F6E7D9] rounded-3xl bg-[#FAF8F4] py-12 px-10 grow lg:grow-0 flex items-center justify-center">
        <Image
          className="h-16 w-auto"
          src="/images/partners/cintrifuse.png"
          alt="Cintrifuse"
          width={300}
          height={100}
        />
      </div>
      <div className="border border-solid border-[#F6E7D9] rounded-3xl bg-[#FAF8F4] py-12 px-10 grow lg:grow-0 flex items-center justify-center">
        <Image
          className="h-16 w-auto"
          src="/images/partners/manta_network.png"
          alt="Manta Network"
          width={300}
          height={100}
        />
      </div>
    </div>
  </div>
);

export default Partners;
