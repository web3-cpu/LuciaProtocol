import { useRef, useState } from "react";
import { Link, Button, Input, Textarea, Card, CardFooter } from "@nextui-org/react";
import Airtable from "airtable";

import { AIRTABLE } from "~/constants";
import { Newsletter } from "~/components/newsletter-card";

import { Header } from "../layouts/header";
import { Footer } from "../components/footer";

// Initialize Airtable with your API key and base ID
const base = new Airtable({ apiKey: AIRTABLE.API_KEY }).base(AIRTABLE.BASE_ID);

interface FormData {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// Function to submit the form data to Airtable
const submitForm = async (formData: FormData) => {
  try {
    // Replace 'YOUR_TABLE_NAME' with the name of your existing table
    const record = await base(AIRTABLE.CONTACT).create({
      "Business name": formData.businessName,
      "First name": formData.firstName,
      "Last name": formData.lastName,
      Email: formData.email,
      Message: formData.message,
    });
    console.log("Form submitted successfully:", record);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const Component = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    if (section === "features" && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Add more sections if needed
  };

  const [formData, setFormData] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
  };

  return (
    <>
      <Header scrollToSection={scrollToSection} />
      <div className="dark-bg min-h-screen flex flex-col">
        {/* Container for columns */}
        <div className="flex flex-col md:flex-row">
          {/* Image Column */}
          <div className="w-full md:w-1/2 hidden md:flex">
            <Card isFooterBlurred radius="none" className="border-none">
              <img src="../images/img_aibot.svg" alt="" className="bg-section" />
              <CardFooter className="flex flex-col gap-y-2 justify-center before:bg-white/10 overflow-hidden py-10 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <span className="text-4xl font-medium text-white">24/7 Suport with LuciaAI Bot</span>
                <p className="text-lg font-light text-white text-center max-w-80">
                  Our advanced LuciaAI chatbot provides prompt and accurate assistance with your inquiries.
                </p>
              </CardFooter>
            </Card>
          </div>
          {/* Contact Form Column */}
          <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-4 md:px-10">
            <form tw="w-full md:w-96" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center md:text-left">
                <span className="h4">Just a few more steps to go!</span>
                <span className="body mb-6">
                  You can reach us anytime via <Link href="mailto:team@luciaprotocol.com">team@luciaprotocol.com</Link>.
                </span>
              </div>
              {/* Form for contact */}
              <div className="flex flex-col gap-y-3">
                <Input
                  placeholder="Company Inc."
                  size="lg"
                  color="primary"
                  isRequired
                  variant="bordered"
                  label="Business name"
                  labelPlacement="outside"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
                <Input
                  placeholder="John"
                  size="lg"
                  color="primary"
                  isRequired
                  variant="bordered"
                  label="First name"
                  labelPlacement="outside"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Doe"
                  size="lg"
                  color="primary"
                  isRequired
                  variant="bordered"
                  label="Last name"
                  labelPlacement="outside"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Input
                  placeholder="you@company.com"
                  size="lg"
                  color="primary"
                  isRequired
                  variant="bordered"
                  label="Email"
                  labelPlacement="outside"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Textarea
                  placeholder="Briefly describe your business, including your industry, target audience, and key goals..."
                  size="lg"
                  color="primary"
                  isRequired
                  variant="bordered"
                  label="Tell us more about your business"
                  labelPlacement="outside"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button size="lg" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* Newsletter and Footer */}
        <Newsletter />
        <Footer scrollToSection={scrollToSection} />
      </div>
    </>
  );
};

export default Component;
