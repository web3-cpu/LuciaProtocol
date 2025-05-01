import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white py-6">
      {/* Main Navbar */}
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Products</h1>
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        {/* Desktop Menu */}
        <div className="hidden md:grid md:grid-cols-3 space-x-12">
          <div>
            <h2 className="text-yellow-400 mb-4">Get Started</h2>
            <ul className="space-y-2">
              <li>Start Here</li>
              <li>Tokenomics</li>
              <li>Product Overview</li>
              <li>Increasing Conversion Rate</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div>
            <h2 className="text-yellow-400 mb-4">Overview</h2>
            <ul className="space-y-2">
              <li>
                <span className="flex items-center">
                  <img src="/icons/metrics.svg" alt="Metrics" className="w-5 h-5 mr-2" />
                  Metrics
                </span>
                <p className="text-sm text-gray-400">Explore key performance metrics and analytics.</p>
              </li>
              <li>
                <span className="flex items-center">
                  <img src="/icons/features.svg" alt="Features" className="w-5 h-5 mr-2" />
                  Features
                </span>
                <p className="text-sm text-gray-400">Explore key features and advanced capabilities.</p>
              </li>
              <li>
                <span className="flex items-center">
                  <img src="/icons/demo.svg" alt="Demo" className="w-5 h-5 mr-2" />
                  Demo
                </span>
                <p className="text-sm text-gray-400">Experience how our platform can boost results.</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-yellow-400 mb-4">Support</h2>
            <ul className="space-y-2">
              <li>
                <span className="flex items-center">
                  <img src="/icons/documentation.svg" alt="Documentation" className="w-5 h-5 mr-2" />
                  Documentation
                </span>
                <p className="text-sm text-gray-400">Find guides and resources to help you use our platform.</p>
              </li>
              <li>
                <span className="flex items-center">
                  <img src="/icons/support.svg" alt="Help and support" className="w-5 h-5 mr-2" />
                  Help and support
                </span>
                <p className="text-sm text-gray-400">Get help from our support team for your inquiries.</p>
              </li>
              <li>
                <span className="flex items-center">
                  <img src="/icons/faqs.svg" alt="FAQs" className="w-5 h-5 mr-2" />
                  FAQs
                </span>
                <p className="text-sm text-gray-400">Get quick answers to common questions.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden container mx-auto px-6 py-4">
          <div className="space-y-8">
            {/* Get Started */}
            <div>
              <h2 className="text-yellow-400 mb-2">Get Started</h2>
              <ul className="space-y-2">
                <li>Start Here</li>
                <li>Tokenomics</li>
                <li>Product Overview</li>
                <li>Increasing Conversion Rate</li>
                <li>Case Studies</li>
              </ul>
            </div>
            {/* Overview */}
            <div>
              <h2 className="text-yellow-400 mb-2">Overview</h2>
              <ul className="space-y-2">
                <li>Metrics</li>
                <li>Features</li>
                <li>Demo</li>
              </ul>
            </div>
            {/* Support */}
            <div>
              <h2 className="text-yellow-400 mb-2">Support</h2>
              <ul className="space-y-2">
                <li>Documentation</li>
                <li>Help and support</li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
