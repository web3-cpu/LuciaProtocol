import * as React from "react";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Airtable from "airtable";

import { AIRTABLE } from "~/constants";

// Initialize Airtable with your API key and base ID
const base = new Airtable({ apiKey: AIRTABLE.API_KEY }).base(AIRTABLE.BASE_ID);

interface FormData {
  email: string;
}

// Function to submit the form data to Airtable
const submitForm = async (formData: FormData) => {
  try {
    // Replace 'YOUR_TABLE_NAME' with the name of your existing table
    const record = await base(AIRTABLE.NEWSLETTER).create({
      Email: formData.email,
    });
    console.log("Form submitted successfully:", record);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: "",
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
    <div className="dark-bg flex flex-col justify-center max-w-full py-20 px-6 lg:px-20">
      <div className="newsletter-bg flex flex-col md:flex-row justify-between items-center p-8 lg:p-16 w-full rounded-lg gap-y-6 lg:gap-y-0">
        {/* Text Section */}
        <div className="flex flex-col gap-y-4 text-center md:text-left lg:w-1/2">
          <span className="newsletter-h5">Join our newsletter</span>
          <span className="newsletter-h6">Stay in the loop of everything you need to know.</span>
        </div>

        {/* Input and Button Section */}
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 lg:gap-x-4 lg:w-1/2 lg:justify-end">
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="max-w-full md:max-w-md p-3 rounded-lg border-solid border-2 placeholder:text-orange-900 active:bg-orange-900"
              style={{ background: "#FFDCAA", borderColor: "#AC6707", color: "#AC6707" }}
            />
            <span className="" style={{ color: "#AC6707" }}>
              We care about your data in our privacy policy.
            </span>
          </div>
          <Button className="primary-btn" size="lg" type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </div>

    // <div className="dark-bg flex flex-col justify-center max-w-full py-20 px-20">
    //   <div className="newsletter-bg flex flex-row justify-between items-center p-16 w-full rounded-lg">
    //     <div className="flex flex-col gap-y-4">
    //       <span className="newsletter-h5">Join our newsletter</span>
    //       <span className="newsletter-h6">Stay in the loop of everything you need to know.</span>
    //     </div>
    //     <div className="flex flex-row gap-x-4">
    //       <Input
    //         type="email"
    //         variant="bordered"
    //         size="lg"
    //         radius="md"
    //         placeholder="Enter your email..."
    //         description="We care about your data in our privacy policy."
    //         className="max-w-md"
    //       />
    //       <Button className="primary-btn" size="lg">
    //         Subscribe
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};
