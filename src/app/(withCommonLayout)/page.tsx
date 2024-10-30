import HeroSection from "@/components/UI/Home/HeroSection/HeroSection";
import PetSection from "@/components/UI/Home/PetSection/PetSection";
import ServiceSection from "@/components/UI/Home/ServiceSection/ServiceSection";
import WhyUsSection from "@/components/UI/Home/WhyUsSection/WhyUsSection";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <PetSection></PetSection>
      <WhyUsSection></WhyUsSection>
      <ServiceSection></ServiceSection>
    </>
  );
};

export default Home;
