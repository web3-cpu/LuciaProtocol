"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import MenuIcon from "@/assets/menu.svg";
import CloseIcon from "@/assets/close.svg";
import clsx from "clsx";

const MENU_ITEMS: Array<{
  label: string;
  url?: string;
  children?: Array<{
    label: string;
    url: string;
  }>;
}> = [
  {
    label: "Platform Features",
    url: "",
  },
  {
    label: "About Us",
    children: [
      {
        label: "DEX",
        url: "",
      },
      {
        label: "Lucia Attributor",
        url: "",
      },
    ],
  },
  {
    label: "Products",
    url: "",
  },
  {
    label: "Whitepaper",
    url: "",
  },
  {
    label: "FAQ",
    url: "",
  },
  {
    label: "Developers",
    url: "",
  },
  {
    label: "Contact Us",
    url: "",
  },
];

const LuciaProtocolHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute w-full z-50">
      <div className="mx-auto max-w-7xl px-2 lg:px-6 lg:px-8 lg:py-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <CloseIcon className="w-6 h-6 stroke-current" />
              ) : (
                <MenuIcon className="w-6 h-6 stroke-current" />
              )}
            </button>
          </div>
          <div className="flex flex-shrink-0 items-center ml-12 lg:ml-0">
            <Image
              className="w-auto h-10 lg:h-16"
              src="/images/logo.png"
              alt="Lucia Protocol"
              width={250}
              height={100}
            />
          </div>
          <div className="hidden lg:block">
            <div className="flex space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              {MENU_ITEMS.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="cursor-pointer px-3 py-2 text-sm font-normal hover:text-[#E99B4D] group"
                  >
                    <span>{item.label}</span>
                    <div className="absolute mt-2 hidden group-hover:flex -translate-x-1/4 pt-2">
                      <div className="absolute w-0 h-0 border-8 border-solid border-x-transparent border-t-transparent border-b-[#E79B50] -top-2 left-1/2 -translate-x-1/2" />
                      <div className="rounded-b-2xl bg-[#E79B50] p-3 flex flex-col divide-y divide-white divide-dashed">
                        {item.children.map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.url ?? "/"}
                            className="py-2 text-sm font-normal text-[white] hover:text-[#fffa]"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.url ?? "/"}
                    className="px-3 py-2 text-sm font-normal hover:text-[#E99B4D]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
            <button
              type="button"
              className="relative bg-[#E99B4D1A] drop-shadow-[4px_4px_10px_0px_#0000001A] rounded-full border border-solid border-[#E99B4D] px-4 py-2 lg:px-8 lg:py-3"
            >
              <span className="text-[#E99B4D]">Launch App</span>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div
        className={clsx(
          "absolute w-full lg:hidden shadow-[0_20px_20px_0_rgba(0,0,0,0.1)]",
          isMobileMenuOpen ? "" : "hidden",
        )}
        id="mobile-menu"
      >
        <div className="bg-white w-full space-y-1 px-2 pb-3 pt-2 flex flex-col divide-y divide-dashed">
          {MENU_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="cursor-pointer px-3 py-2 text-sm font-normal hover:text-[#E99B4D]">
                <span>{item.label}</span>
                <div className="flex flex-col divide-y divide-dashed">
                  {item.children.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.url ?? "/"}
                      className="px-3 py-2 text-sm font-normal hover:text-[#E99B4D]"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.url ?? "/"}
                className="px-3 py-2 text-sm font-normal hover:text-[#E99B4D]"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};

export default LuciaProtocolHeader;
