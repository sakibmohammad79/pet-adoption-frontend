import AreaSection from "@/components/UI/Home/AreaSection/AreaSection";
import ContactSection from "@/components/UI/Home/ContactSection/ContactSection";
import HeroSection from "@/components/UI/Home/HeroSection/HeroSection";
import NewsLetter from "@/components/UI/Home/NewsLetter/NewsLetter";
import PetSection from "@/components/UI/Home/PetSection/PetSection";
import PopularPet from "@/components/UI/Home/PopularPet/PopularPet";
import Testimonials from "@/components/UI/Home/Testimonials/Testimonials";
import WhyUsSection from "@/components/UI/Home/WhyUsSection/WhyUsSection";



const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <PetSection></PetSection>
      <WhyUsSection></WhyUsSection>
      <PopularPet></PopularPet>
      <Testimonials></Testimonials>
      <NewsLetter></NewsLetter>
      <ContactSection/>
      <AreaSection></AreaSection>
    </>
  );
};

export default Home;
