import { useNavigate } from "react-router-dom";
import { Link, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
interface NavbarProps {
  scrollToSection: (section: string) => void;
}

// @ts-expect-error icons may not load
const chevronDown: IconProp = faChevronDown;

export const Header: React.FC<NavbarProps> = ({ scrollToSection }) => {
  // const store = useStore();
  // const user = store.authUser;
  // const queryClient = useQueryClient();

  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove the token from local storage
  //   queryClient.clear();
  // };

  const navigate = useNavigate();
  const dropdownref = useRef<HTMLDivElement>(null);

  // State for each dropdown
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For the overall mobile menu

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownref.current && !dropdownref.current.contains(event.target as Node)) {
      setIsCompanyDropdownOpen(false);
      setIsProductDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-content-foreground1 backdrop-blur sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo_unicorn.svg" alt="Lucia Protocol Logo" className="w-8 h-8 mr-2" />
          <span className="text-lg font-semibold text-white">Lucia Protocol</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <Link href="/" className="text-white">
            Home
          </Link>
          <div className="relative">
            <Link
              onClick={() => {
                setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
                setIsProductDropdownOpen(false); // Close Product dropdown when Company is opened
              }}
              className="flex items-center text-white hover:cursor-pointer gap-x-2"
            >
              Company <FontAwesomeIcon icon={chevronDown} />
            </Link>
            {isCompanyDropdownOpen && (
              <div
                ref={dropdownref}
                className="absolute z-10 right-0 mt-2 max-w-md bg-content1 text-content-foreground1 shadow-lg rounded-lg"
              >
                {/* Desktop Menu */}
                <div className="p-8">
                  <div className="hidden md:flex flex-col mb-6">
                    <span className="text-xl font-semibold">Company</span>
                    <span>Learn more about our company.</span>
                  </div>
                  <div className="w-64">
                    <h2 className="text-orange-400 font-medium mb-4">Overview</h2>
                    <ul className="space-y-2">
                      <li
                        className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                        onClick={() => setIsCompanyDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <img src="/icons/ui-icons/users_menu.svg" alt="About" className="w-5 h-5 mr-2" />
                          About
                        </span>
                        <p className="text-sm text-gray-400">Learn more about our mission, values, and team.</p>
                      </li>
                      <li
                        className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                        onClick={() => setIsCompanyDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <img src="/icons/ui-icons/announcement-02.svg" alt="News" className="w-5 h-5 mr-2" />
                          News
                        </span>
                        <p className="text-sm text-gray-400">The latest company news, updates and info.</p>
                      </li>
                      <li className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer">
                        <span
                          className="flex items-center"
                          onClick={() => {
                            navigate("/contact");
                            setIsCompanyDropdownOpen(false);
                          }}
                        >
                          <img src="/icons/ui-icons/send.svg" alt="Contact" className="w-5 h-5 mr-2" />
                          Contact
                        </span>
                        <p className="text-sm text-gray-400">Get in touch with us for support or inquiries.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <Link
              onClick={() => {
                setIsProductDropdownOpen(!isProductDropdownOpen);
                setIsCompanyDropdownOpen(false); // Close Company dropdown when Product is opened
              }}
              className="flex items-center text-white hover:cursor-pointer gap-x-2"
            >
              Product <FontAwesomeIcon icon={chevronDown} />
            </Link>
            {isProductDropdownOpen && (
              <div
                ref={dropdownref}
                className="absolute z-10 -left-80 sm:-left-80 mt-2 max-w-3xl bg-content1 text-content-foreground1 shadow-2xl rounded-lg"
              >
                {/* Desktop Menu */}
                <div className="p-8">
                  <div className="hidden md:flex flex-col mb-6">
                    <span className="text-xl font-semibold">Product</span>
                    <span>Learn more about our flagship product.</span>
                  </div>
                  <div className="hidden md:flex flex-row space-x-10">
                    <div className="w-96">
                      <h2 className="text-orange-400 font-medium mb-4">Get Started</h2>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="https://docs.clickinsights.xyz"
                            target="_blank"
                            color="foreground"
                            onClick={() => setIsProductDropdownOpen(false)}
                          >
                            Start Here
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://docs.clickinsights.xyz/tokenomics/tokenomics.html"
                            target="_blank"
                            color="foreground"
                            onClick={() => setIsProductDropdownOpen(false)}
                          >
                            Tokenomics
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://docs.clickinsights.xyz/product_overview/data-driven-marketing.html"
                            target="_blank"
                            color="foreground"
                            onClick={() => setIsProductDropdownOpen(false)}
                          >
                            Product Overview
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://docs.clickinsights.xyz/increasing_conversion_rate/return-on-marketing-investment.html"
                            target="_blank"
                            color="foreground"
                            onClick={() => setIsProductDropdownOpen(false)}
                          >
                            Increasing Conversion Rate
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://docs.clickinsights.xyz/case-studies.html"
                            target="_blank"
                            color="foreground"
                            onClick={() => setIsProductDropdownOpen(false)}
                          >
                            Case Studies
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="w-96">
                      <h2 className="text-orange-400 font-medium mb-4">Overview</h2>
                      <ul className="space-y-2">
                        <li
                          className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                          onClick={() => {
                            scrollToSection("metrics");
                            setIsProductDropdownOpen(false);
                          }}
                        >
                          <span className="flex items-center">
                            <img src="/icons/ui-icons/zap.svg" alt="Metrics" className="w-5 h-5 mr-2" />
                            Metrics
                          </span>
                          <p className="text-sm text-gray-400">Explore key performance metrics and analytics.</p>
                        </li>
                        <li
                          className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                          onClick={() => {
                            scrollToSection("features");
                            setIsProductDropdownOpen(false);
                          }}
                        >
                          <span className="flex items-center">
                            <img src="/icons/ui-icons/rocket_menu.svg" alt="Features" className="w-5 h-5 mr-2" />
                            Features
                          </span>
                          <p className="text-sm text-gray-400">Explore key features and advanced capabilities.</p>
                        </li>
                        <li
                          className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                          onClick={() => {
                            scrollToSection("demo");
                            setIsProductDropdownOpen(false);
                          }}
                        >
                          <span className="flex items-center">
                            <img src="/icons/ui-icons/play-circle_menu.svg" alt="Demo" className="w-5 h-5 mr-2" />
                            Demo
                          </span>
                          <p className="text-sm text-gray-400">Experience how our platform can boost results.</p>
                        </li>
                      </ul>
                    </div>
                    <div className="w-96">
                      <h2 className="text-orange-400 font-medium mb-4">Support</h2>
                      <ul className="space-y-2">
                        <li
                          className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                          onClick={() => {
                            window.open("https://docs.clickinsights.xyz/");
                            setIsProductDropdownOpen(false);
                          }}
                        >
                          <span className="flex items-center">
                            <img src="/icons/ui-icons/file.svg" alt="Documentation" className="w-5 h-5 mr-2" />
                            Documentation
                          </span>
                          <p className="text-sm text-gray-400">
                            Find guides and resources to help you use our platform.
                          </p>
                        </li>
                        <li
                          className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                          onClick={() => {
                            navigate("/contact");
                            setIsProductDropdownOpen(false);
                          }}
                        >
                          <span className="flex items-center">
                            <img src="/icons/ui-icons/life-buoy.svg" alt="Help and support" className="w-5 h-5 mr-2" />
                            Help and support
                          </span>
                          <p className="text-sm text-gray-400">Get help from our support team for your inquiries.</p>
                        </li>
                        <li
                          className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                          onClick={() => {
                            navigate("/FAQ");
                            setIsProductDropdownOpen(false);
                          }}
                        >
                          <span className="flex items-center">
                            <img src="/icons/ui-icons/help-circle.svg" alt="FAQs" className="w-5 h-5 mr-2" />
                            FAQs
                          </span>
                          <p className="text-sm text-gray-400">Get quick answers to common questions.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Dropdown menu footer */}
                <div className="flex flex-row justify-between items-center bg-content2 px-8 py-4 rounded-b-lg">
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xl font-semibold">Ready to get started?</span>
                    <span>Take your ads to the next-level with Lucia.</span>
                  </div>
                  <Button
                    variant="bordered"
                    onClick={() => {
                      navigate("/contact");
                      setIsProductDropdownOpen(false);
                    }}
                  >
                    Request Demo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:flex sm:hidden justify-right space-x-8">
          <Link className="text-white hover:cursor-pointer" onClick={() => navigate("/login")}>
            Log in
          </Link>
          <Button className="text-white" size="lg" onClick={() => navigate("/contact")}>
            Request Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-content1 text-content-foreground1 border-b border-zinc-700">
          <Link href="/" className="block px-6 py-4 text-white hover:bg-content2">
            Home
          </Link>
          <div className="relative">
            <button
              onClick={() => {
                setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
                setIsProductDropdownOpen(false); // Close Product dropdown when Product is opened
              }}
              className="flex items-center justify-between w-full text-left px-6 py-4 hover:bg-content2"
            >
              <span>Company</span>
              <FontAwesomeIcon icon={chevronDown} />
            </button>
            {isCompanyDropdownOpen && (
              <div className="bg-content1 my-4 px-2">
                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                  <div className="md:hidden container mx-auto px-6 py-4 border-solid border border-zinc-700 rounded-lg">
                    <ul className="space-y-2">
                      <li
                        className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                        onClick={() => {
                          setIsCompanyDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <span className="flex items-center">
                          <img src="/icons/ui-icons/users_menu.svg" alt="About" className="w-5 h-5 mr-2" />
                          About
                        </span>
                        <p className="text-sm text-gray-400">Learn more about our mission, values, and team.</p>
                      </li>
                      <li
                        className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                        onClick={() => {
                          setIsCompanyDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <span className="flex items-center">
                          <img src="/icons/ui-icons/announcement-02.svg" alt="News" className="w-5 h-5 mr-2" />
                          News
                        </span>
                        <p className="text-sm text-gray-400">The latest company news, updates and info.</p>
                      </li>
                      <li className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer">
                        <span
                          className="flex items-center"
                          onClick={() => {
                            navigate("/contact");
                            setIsCompanyDropdownOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <img src="/icons/ui-icons/send.svg" alt="Contact" className="w-5 h-5 mr-2" />
                          Contact
                        </span>
                        <p className="text-sm text-gray-400">Get in touch with us for support or inquiries.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setIsProductDropdownOpen(!isProductDropdownOpen);
                setIsCompanyDropdownOpen(false); // Close Company dropdown when Product is opened
              }}
              className="flex items-center justify-between w-full text-left px-6 py-4 hover:bg-content2"
            >
              <span>Product</span>
              <FontAwesomeIcon icon={chevronDown} />
            </button>
            {isProductDropdownOpen && (
              <div className="bg-content1 my-4 px-2">
                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                  <div>
                    <div className="md:hidden container mx-auto px-6 py-4 border-solid border border-zinc-700 rounded-t-lg">
                      <div className="space-y-8">
                        {/* Title */}
                        <div className="flex flex-col">
                          <span className="text-lg font-semibold">Product</span>
                          <span>Learn more about our flagship product.</span>
                        </div>
                        {/* Get Started */}
                        <div>
                          <h2 className="text-orange-400 text-base font-medium mb-2">Get Started</h2>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="https://docs.clickinsights.xyz/"
                                target="_blank"
                                color="foreground"
                                onClick={() => {
                                  setIsProductDropdownOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                Start Here
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://docs.clickinsights.xyz/tokenomics/tokenomics.html"
                                target="_blank"
                                color="foreground"
                                onClick={() => {
                                  setIsProductDropdownOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                Tokenomics
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://docs.clickinsights.xyz/product_overview/data-driven-marketing.html"
                                target="_blank"
                                color="foreground"
                                onClick={() => {
                                  setIsProductDropdownOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                Product Overview
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://docs.clickinsights.xyz/increasing_conversion_rate/return-on-marketing-investment.html"
                                target="_blank"
                                color="foreground"
                                onClick={() => {
                                  setIsProductDropdownOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                Increasing Conversion Rate
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://docs.clickinsights.xyz/case-studies.html"
                                target="_blank"
                                color="foreground"
                                onClick={() => {
                                  setIsProductDropdownOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                Case Studies
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* Overview */}
                        <div>
                          <h2 className="text-orange-400 text-base font-medium mb-2">Overview</h2>
                          <ul className="space-y-2">
                            <li
                              className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                              onClick={() => {
                                scrollToSection("metrics");
                                setIsProductDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <span className="flex items-center">
                                <img src="/icons/ui-icons/zap.svg" alt="Metrics" className="w-5 h-5 mr-2" />
                                Metrics
                              </span>
                              <p className="text-sm text-gray-400">Explore key performance metrics and analytics.</p>
                            </li>
                            <li
                              className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                              onClick={() => {
                                scrollToSection("features");
                                setIsProductDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <span className="flex items-center">
                                <img src="/icons/ui-icons/rocket_menu.svg" alt="Features" className="w-5 h-5 mr-2" />
                                Features
                              </span>
                              <p className="text-sm text-gray-400">Explore key features and advanced capabilities.</p>
                            </li>
                            <li
                              className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                              onClick={() => {
                                scrollToSection("demo");
                                setIsProductDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <span className="flex items-center">
                                <img src="/icons/ui-icons/play-circle_menu.svg" alt="Demo" className="w-5 h-5 mr-2" />
                                Demo
                              </span>
                              <p className="text-sm text-gray-400">Experience how our platform can boost results.</p>
                            </li>
                          </ul>
                        </div>
                        {/* Support */}
                        <div>
                          <h2 className="text-orange-400 text-base font-medium mb-2">Support</h2>
                          <ul className="space-y-2">
                            <li
                              className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                              onClick={() => {
                                window.open("https://docs.clickinsights.xyz/");
                                setIsProductDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <span className="flex items-center">
                                <img src="/icons/ui-icons/file.svg" alt="Documentation" className="w-5 h-5 mr-2" />
                                Documentation
                              </span>
                              <p className="text-sm text-gray-400">
                                Find guides and resources to help you use our platform.
                              </p>
                            </li>
                            <li
                              className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer"
                              onClick={() => {
                                navigate("/contact");
                                setIsProductDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <span className="flex items-center">
                                <img
                                  src="/icons/ui-icons/life-buoy.svg"
                                  alt="Help and support"
                                  className="w-5 h-5 mr-2"
                                />
                                Help and support
                              </span>
                              <p className="text-sm text-gray-400">
                                Get help from our support team for your inquiries.
                              </p>
                            </li>
                            <li className="rounded-lg p-2 hover:bg-content2 hover:cursor-pointer">
                              <span
                                className="flex items-center"
                                onClick={() => {
                                  navigate("FAQs");
                                  setIsProductDropdownOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                <img src="/icons/ui-icons/help-circle.svg" alt="FAQs" className="w-5 h-5 mr-2" />
                                FAQs
                              </span>
                              <p className="text-sm text-gray-400">Get quick answers to common questions.</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Dropdown menu footer */}
                    <div className="flex flex-row justify-center items-center bg-content2 px-8 py-4 border-solid border-r border-l border-b border-zinc-700 rounded-b-lg">
                      <Button
                        variant="light"
                        className="text-orange-400 text-lg"
                        onClick={() => {
                          navigate("/contact");
                          setIsProductDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Request Demo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="px-4 py-4">
            <Button href="/login" color="secondary" className="w-full px-6 py-2 text-black font-semibold rounded-lg">
              Log in
            </Button>
            <Button href="/register" className="w-full text-white font-semibold py-2 mt-2 px-6 rounded-lg">
              Request Demo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
