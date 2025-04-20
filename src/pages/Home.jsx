"use client";

import ContactUs from "../components/contact/ContactUs";
import PopularServices from "../components/popular/Popular";
import Slider from "../components/slider/Slider";
import Testimonials from "../components/testimonials/Testimonials";
import Categories from "../components/categories/Categories";
import HowItWorks from "../components/how-it-works/HowItWorks";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-4">
      <Slider />
      <div className="container mx-auto px-4">
        <Categories />
      </div>
      <div className="container mx-auto px-4">
        <PopularServices />
      </div>
      <div className="container mx-auto px-4">
        <HowItWorks />
      </div>
      <Testimonials />
      <div className="container mx-auto px-4">
        <ContactUs />
      </div>
    </div>
  );
}
