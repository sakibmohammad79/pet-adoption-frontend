import AreaSection from "@/components/UI/Home/AreaSection/AreaSection";
import HeroSection from "@/components/UI/Home/HeroSection/HeroSection";
import NewsLetter from "@/components/UI/Home/NewsLetter/NewsLetter";
import PetSection from "@/components/UI/Home/PetSection/PetSection";
import PopularPet from "@/components/UI/Home/PopularPet/PopularPet";
import ServiceSection from "@/components/UI/Home/ServiceSection/ServiceSection";
import Testimonials from "@/components/UI/Home/Testimonials/Testimonials";
import WhyUsSection from "@/components/UI/Home/WhyUsSection/WhyUsSection";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <PetSection></PetSection>
      <WhyUsSection></WhyUsSection>
      {/* <ServiceSection></ServiceSection> */}
      <PopularPet></PopularPet>
      <Testimonials></Testimonials>
      <NewsLetter></NewsLetter>
      <AreaSection></AreaSection>
    </>
  );
};

export default Home;
