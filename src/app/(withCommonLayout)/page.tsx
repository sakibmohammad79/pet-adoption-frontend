import HeroSection from "@/components/UI/Home/HeroSection/HeroSection";
import PetSection from "@/components/UI/Home/PetSection/PetSection";
import PopularPet from "@/components/UI/Home/PopularPet/PopularPet";
import ServiceSection from "@/components/UI/Home/ServiceSection/ServiceSection";
import Testimonials from "@/components/UI/Home/Testimonials/Testimonials";
import WhyUsSection from "@/components/UI/Home/WhyUsSection/WhyUsSection";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <PetSection></PetSection>
      <WhyUsSection></WhyUsSection>
      <ServiceSection></ServiceSection>
      <PopularPet></PopularPet>
      <Testimonials></Testimonials>
    </>
  );
};

export default Home;
