import Image from "next/image";
import Link from "next/link";

import XIcon from "@/assets/x.svg";
import TelegramIcon from "@/assets/telegram.svg";
import DiscordIcon from "@/assets/discord.svg";
import LinkedinIcon from "@/assets/linkedin.svg";
import GradientArrowIcon from "@/assets/gradient-arrow.svg";

const LuciaProtocolFooter = () => {
  return (
    <div className="w-full bg-white rounded-t-[48px] relative -top-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 lg:px-8 lg:pt-8">
        <div className="flex justify-between py-12 flex-col lg:flex-row gap-6">
          <div>
            <Image
              className="w-auto h-10 lg:h-16"
              src="/images/logo.png"
              alt="Lucia Protocol"
              width={250}
              height={100}
            />
          </div>
          <div>
            <p className="text-lg font-semibold mb-4">Follow</p>
            <div className="flex gap-2">
              <a href="https://twitter.com/luciaprotocol" target="_blank">
                <XIcon />
              </a>
              <a href="https://t.me/+ktxyuIoFAuVhNTMx" target="_blank">
                <TelegramIcon />
              </a>
              <a href="https://discord.gg/ECuzSyshbv" target="_blank">
                <DiscordIcon />
              </a>
              <a href="https://www.linkedin.com/company/luciaprotocol/" target="_blank">
                <LinkedinIcon />
              </a>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-4">Quick Links</p>
            <ul>
              <li className="text-lg font-extralight">
                <Link href="">Contact Us</Link>
              </li>
              <li className="text-lg font-extralight">
                <Link href="">Terms & Conditions</Link>
              </li>
              <li className="text-lg font-extralight">
                <Link href="">Privacy Policy</Link>
              </li>
              <li className="text-lg font-extralight">
                <Link href="">Docs</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-semibold mb-4">Subscribe</p>
            <div>
              <p className="text-lg mb-2 font-extralight">Sign up to get the latest news & updates</p>
              <form className="relative max-w-md">
                <div className="pr-8">
                  <input
                    className="w-full bg-gradient-to-r from-[#977F93] via-[#E99B4D] to-[#B49AC6] h-[60px] rounded-r-xl rounded-l-xl text-white placeholder:text-white outline-none pl-6 pr-10 py-3 text-lg"
                    type="email"
                    placeholder="E-Mail"
                  />
                </div>
                <div className="absolute top-0 right-[10px] w-[60px] h-[60px] bg-gradient-to-r from-[#977F93] via-[#E99B4D] to-[#B49AC6] rounded-full flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-white"
                  >
                    <GradientArrowIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#F5CDA9] via-[#E89B4F] to-[#B49AC6] h-0.5" />
        <div className="py-6">
          <p className="text-[#727272] text-sm">
            <strong>DISCLAIMER</strong> Lucia Protocol is a technology services provider. Use of the Lucia Protocol
            involves risks, including but not limited to the potential loss of digital assets. Before using the Lucia
            Protocol, you should review our documentation to ensure you understand how the Protocol works. As described
            in our Terms, the Lucia Protocol is provided on an “as is” and “as available” basis, at your own risk. We
            explicitly disclaim any representation or warranties of any kind relating to the Protocol, and no developer
            or entity will be liable for claims or damages of any kind associated with use or inability to use the
            Protocol.
          </p>
          <p className="text-center mt-6 text-lg font-extralight">Copyright @ Lucia Protocol 2024</p>
        </div>
      </div>
    </div>
  );
};

export default LuciaProtocolFooter;
