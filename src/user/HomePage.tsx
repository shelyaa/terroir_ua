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
      <div className="my-12">
        <h1 className="text-[#250001] text-center text-3xl font-semibold mb-10">
          Пропозиції місяця
        </h1>
        <ProductSlider />
      </div>
    </main>
  );
};
