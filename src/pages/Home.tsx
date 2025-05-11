import AboutSection from "../components/AboutSection";
import AdvantagesSection from "../components/AdvantagesSection";
import HeroSlider from "../components/HeroSlider";
import { ProductSlider } from "../components/ProductsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <AboutSection />
      <AdvantagesSection />
      <ProductSlider />
    </main>
  );
}
