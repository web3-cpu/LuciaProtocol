import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export const FAQ = () => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "h6",
    indicator: "text-medium",
    content: "body",
  };

  const content = {
    a1: `To get started with a demo, simply reach out via our ${(
      <Link href={"/contact"} size="sm" color="primary">
        Us
      </Link>
    )} page or click the Request a Demo button. We’ll schedule a personalized walkthrough of our platform, highlighting key features, use cases, and integration capabilities.`,
    a2: "Web3 ad attribution refers to tracking and analyzing the performance of digital ad campaigns using decentralized technologies, such as blockchain. Unlike traditional methods, Web3 ad attribution offers greater transparency, immutability, and control over how advertising data is collected and shared.",
    a3: "AI enhances Web3 ad attribution by analyzing vast amounts of decentralized data to identify trends, optimize ad spend, and deliver deeper insights. Our AI-powered platform automates data analysis, offering real-time campaign insights, audience segmentation, and predictive analytics to maximize the efficiency of your ad strategies.",
    a4: "Decentralized attribution provides increased transparency, better data security, and reduced reliance on third-party intermediaries. It ensures that data is tamper-proof and verifiable on the blockchain, offering advertisers full ownership and control of their campaign performance metrics.",
    a5: "Our platform is built with privacy and security at its core. By leveraging blockchain technology, we ensure that all data is encrypted and stored in a decentralized manner. Users maintain control over their data, and sensitive information is protected with cutting-edge encryption protocols and privacy-preserving algorithms.",
    a6: "Yes, our platform is designed to integrate seamlessly with most ad tech stacks. We support a range of APIs and provide flexible options for incorporating your existing tools, ensuring that you can leverage our technology without disrupting your current workflow.",
  };

  const navigate = useNavigate();

  const renderCustomIcon = (isOpen: boolean | undefined) => {
    return isOpen ? <AiOutlineMinusCircle size={20} /> : <AiOutlinePlusCircle size={20} />;
  };

  return (
    <div className="dark-bg flex flex-col justify-center py-10 px-4 sm:px-8 lg:py-20 lg:px-20">
      <span className="h4 text-center self-center">Frequently asked questions</span>

      <div className="body self-center text-center mt-2 sm:mt-0 max-w-full sm:max-w-[70%] lg:max-w-[50%]">
        Learn how our solutions can optimize your ad strategy.
      </div>

      {/* Container for FAQs */}
      <div className="px-0 sm:px-10 lg:px-40 py-4 lg:py-10">
        <Accordion itemClasses={itemClasses} defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="How can I get started with a demo of your platform?"
            title="How can I get started with a demo of your platform?"
            indicator={({ isOpen }) => renderCustomIcon(isOpen)} // Custom icons
            disableIndicatorAnimation
          >
            <span>
              To get started with a demo, simply reach out via our{" "}
              <Link href={"/contact"} size="sm" color="primary" underline="always">
                Contact Us
              </Link>{" "}
              page or click the{" "}
              <Link href={"/contact"} size="sm" color="primary" underline="always">
                Request Demo
              </Link>{" "}
              button. We’ll schedule a personalized walkthrough of our platform, highlighting key features, use cases,
              and integration capabilities.
            </span>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="What is Web3 ad attribution?"
            title="What is Web3 ad attribution?"
            indicator={({ isOpen }) => renderCustomIcon(isOpen)}
            disableIndicatorAnimation
          >
            {content.a2}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="How does AI enhance Web3 ad attribution?"
            title="How does AI enhance Web3 ad attribution?"
            indicator={({ isOpen }) => renderCustomIcon(isOpen)}
            disableIndicatorAnimation
          >
            {content.a3}
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="What are the benefits of decentralized attribution?"
            title="What are the benefits of decentralized attribution?"
            indicator={({ isOpen }) => renderCustomIcon(isOpen)}
            disableIndicatorAnimation
          >
            {content.a4}
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="How does your platform handle privacy and data security?"
            title="How does your platform handle privacy and data security?"
            indicator={({ isOpen }) => renderCustomIcon(isOpen)}
            disableIndicatorAnimation
          >
            {content.a5}
          </AccordionItem>
          <AccordionItem
            key="6"
            aria-label="Can I integrate your platform with my existing ad tech stack?"
            title="Can I integrate your platform with my existing ad tech stack?"
            indicator={({ isOpen }) => renderCustomIcon(isOpen)}
            disableIndicatorAnimation
          >
            {content.a6}
          </AccordionItem>
        </Accordion>
      </div>

      {/* Container for still have questions */}
      <div className="section-bg flex flex-col items-center gap-y-4 rounded-xl w-full p-6 sm:p-8 lg:p-10 mt-8">
        {/* Container for images */}
        <div className="flex flex-row relative items-center justify-center">
          <img
            width={48}
            src="./images/inigo.png"
            alt="Photo of our Director of Marketing, Inigo Vaca"
            className="absolute rounded-full sm:-left-9 border-3 border-[#FFFFFF]"
          />
          <img
            width={56}
            src="./images/ling.png"
            alt="Photo of our CEO, Ling Qing Meng"
            className="z-10 mb-2 rounded-full border-3 border-[#FFFFFF]"
          />
          <img
            width={48}
            src="./images/andrew.png"
            alt="Photo of our COO, Andrew Jacobs"
            className="absolute rounded-full sm:-right-9 border-3 border-[#FFFFFF]"
          />
        </div>

        <span className="h6 text-center">Still have questions?</span>
        <span className="body text-center">
          Can’t find the answer you’re looking for? Please chat to our friendly team.
        </span>

        <Button className="primary-btn" size="lg" onPress={() => navigate("/contact")}>
          Get in touch
        </Button>
      </div>
    </div>
  );
};
