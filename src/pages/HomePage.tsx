import AboutSection from "../components/features/home/AboutSection";
import AdvantagesSection from "../components/features/home/AdvantagesSection";
import HeroSlider from "../components/features/home/HeroSlider";
import { WineSlider } from "../components/features/wine/WineSlider";

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
        <WineSlider />
      </div>
    </main>
  );
};
