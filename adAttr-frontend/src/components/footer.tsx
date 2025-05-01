import { Link } from "@nextui-org/link";

interface NavbarProps {
  scrollToSection: (section: string) => void;
}

export const Footer: React.FC<NavbarProps> = ({ scrollToSection }) => {
  return (
    <div className="dark-bg flex flex-col justify-center max-w-full">
      {/* Main Footer Section */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full py-20 px-10 md:px-20 gap-y-10 md:gap-y-0">
        {/* Branding */}
        <div className="flex flex-col gap-y-4 md:w-1/4">
          <img src="./Logo.svg" alt="Lucia Protocol logo" className="w-48" />
          <span className="body">Know where your users came from, what they're doing, and why.</span>
        </div>

        {/* Section Columns - Center on tablet and mobile */}
        <div className="flex flex-col md:flex-row md:justify-center w-full md:w-3/4 lg:flex-row lg:justify-end">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-x-16 md:text-left">
            {/* Product Section */}
            <div className="flex flex-col gap-y-4">
              <span className="footer-header">Product</span>
              <Link className="body hover:cursor-pointer" onClick={() => scrollToSection("overview")}>
                Overview
              </Link>
              <Link className="body hover:cursor-pointer" onClick={() => scrollToSection("metrics")}>
                Metrics
              </Link>
              <Link className="body hover:cursor-pointer" onClick={() => scrollToSection("features")}>
                Features
              </Link>
              <Link className="body hover:cursor-pointer" onClick={() => scrollToSection("demo")}>
                Demo
              </Link>
              <Link className="body" href="/FAQ">
                FAQ
              </Link>
            </div>

            {/* Company Section */}
            <div className="flex flex-col gap-y-4">
              <span className="footer-header">Company</span>
              <Link className="body" href="/">
                About Us
              </Link>
              <Link className="body" href="/">
                News
              </Link>
              <Link className="body" href="/contact">
                Contact
              </Link>
            </div>

            {/* Social Section */}
            <div className="flex flex-col gap-y-4">
              <span className="footer-header">Social</span>
              <Link className="body" href="https://twitter.com/luciaprotocol">
                Twitter
              </Link>
              <Link className="body" href="https://www.linkedin.com/company/luciaprotocol/">
                LinkedIn
              </Link>
              <Link className="body" href="https://t.me/+ktxyuIoFAuVhNTMx">
                Telegram
              </Link>
              <Link className="body" href="https://discord.gg/ECuzSyshbv">
                Discord
              </Link>
            </div>

            {/* Legal Section */}
            <div className="flex flex-col gap-y-4">
              <span className="footer-header">Legal</span>
              <Link className="body" href="/">
                Terms
              </Link>
              <Link className="body" href="/">
                Privacy
              </Link>
              <Link className="body" href="/">
                Licenses
              </Link>
              <Link className="body" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Social Logo Section */}
      <div className="section-bg flex flex-col md:flex-row justify-between items-center w-full py-10 px-10 md:px-20 gap-y-4 md:gap-y-0">
        {/* Center text on mobile */}
        <span className="body text-center md:text-left">
          © 2021 Decentralized Holding Corporation. All rights reserved.
        </span>
        <div className="flex flex-row justify-center md:justify-end w-full md:w-auto gap-x-4">
          <Link href="https://twitter.com/luciaprotocol">
            <img src="./icons/twitter.svg" alt="X (Formerly known as Twitter) logo" className="w-6" />
          </Link>
          <Link href="https://www.linkedin.com/company/luciaprotocol/">
            <img src="./icons/linkedin.svg" alt="LinkedIn logo" className="w-6" />
          </Link>
          <Link href="https://discord.gg/ECuzSyshbv">
            <img src="./icons/discord.svg" alt="Discord logo" className="w-6" />
          </Link>
          <Link href="https://t.me/+ktxyuIoFAuVhNTMx">
            <img src="./icons/telegram.svg" alt="Telegram logo" className="w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
