import { useState } from "react";
import { styled } from "styled-components";

import "twin.macro";

const Collapsible = ({
  title,
  children,
  index,
  isOpen,
  handleClick,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
  isOpen: boolean;
  handleClick: (index: number) => void;
}) => {
  return (
    <FAQItem>
      <div tw="flex" onClick={() => handleClick(index)}>
        <Question>{title}</Question>
        <QuestionImage src="/icons/Play.png" alt="" />
      </div>
      {isOpen && (
        <ChildrenContainer>
          <QuestionText>{children}</QuestionText>
        </ChildrenContainer>
      )}
    </FAQItem>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex((openIndex: number | null) => (openIndex === index ? null : index));
  };

  const faqs = [
    {
      question: "Can I connect my Shopify Account?",
      body: "Yes, you can connect your Shopify account by following these steps.",
    },
    {
      question: "How do I connect my Google Ads account?",
      body: "You can connect your Google Ads account by following these steps.",
    },
    {
      question: "Can I connect my Shopify Account?",
      body: "Yes, you can connect your Shopify account by following these steps.",
    },
    {
      question: "How do I connect my Google Ads account?",
      body: "You can connect your Google Ads account by following these steps.",
    },
  ];

  return (
    <Section>
      <Header>Popular Frequently Asked Questions</Header>
      <Description>We have handpicked the top and most effective FAQ’s personalized for you.</Description>
      {faqs.map(({ question, body }, key) => (
        <Collapsible index={key} title={question} isOpen={openIndex === key} handleClick={handleClick}>
          <p>{body}</p>
        </Collapsible>
      ))}
    </Section>
  );
};

const Section = styled.section`
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #000;
  font-weight: 600;
  padding: 30px;
`;

const Header = styled.h2`
  font:
    700 16px Montserrat,
    sans-serif;
`;

const Description = styled.p`
  color: #85817c;
  margin-top: 10px;
  font:
    400 13px/20px Montserrat,
    sans-serif;
`;

const FAQItem = styled.div`
  border-radius: 12px;
  background-color: var(--Background-1, #fdfaf7);
  margin-top: 24px;
  white-space: nowrap;
  line-height: 20px;
  padding: 16px 19px;
  justify-content: space-between;
  align-items: flex-start;
`;

const ChildrenContainer = styled.div`
  flex-grow: 1;
  font-weight: normal;
  overflow: auto;
  white-space: normal;
  text-align: left;

  display: flex;
`;

const Question = styled.div`
  font-family: Montserrat, sans-serif;
  fort-weight: 800;
  flex-grow: 1;
  text-align: left;
`;

const QuestionImage = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 25px;
  align-self: start;
`;

const QuestionText = styled.div`
  margin-top: 10px;
`;

export default FAQSection;
