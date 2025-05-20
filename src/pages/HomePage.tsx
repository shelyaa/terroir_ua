import AboutSection from "../components/AboutSection";
import AdvantagesSection from "../components/AdvantagesSection";
import HeroSlider from "../components/HeroSlider";
import { ProductSlider } from "../components/ProductsSlider";

export const HomePage = () => {
  return (
    <main>
      <HeroSlider />
      <AboutSection />
      <AdvantagesSection />
      <ProductSlider />
    </main>
  );
};
