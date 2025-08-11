import { Link } from "react-router-dom";
import { FadeImage } from "../components/ui/FadeImage";

export const WineryPage = () => {
  return (
    <div className="mx-4">
      <div className="py-8 max-w-7xl mx-auto mb-10 flex flex-col lg:flex-row gap-20 items-center">
        <div className="w-full lg:w-[560px] flex justify-center">
          <FadeImage
            src="/winery/wine-bottle.jpg"
            alt="wine-bottle"
        />
        </div>
        <div className="w-full lg:w-[512px] text-center lg:text-left">
          <h2 className="text-3xl font-semibold mb-4">Наші виноробні</h2>
          <p className="font-manrope text-base font-normal">
            Українське виноробство відроджується — і ми раді познайомити вас з виноробами, які створюють унікальні вина з душею. Тут ви знайдете короткі історії виноробень, з якими ми співпрацюємо. Це люди, що люблять свою справу і вкладають серце в кожну пляшку.
          </p>
        </div>
      </div>

      <h1 className="w-full text-3xl font-semibold bg-bordo text-white py-10 text-center mb-8">
        Наші головні винороби
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {winemakers.map((w) => (
          <Link to={w.link} key={w.name}>
            <div className="cursor-pointer w-full max-w-[500px] md:h-130 max-h-180 mx-auto flex flex-col gap-4 items-center border border-[#9F9F9F] p-4 hover:shadow-md transition">
              <img
                src={w.image}
                alt={w.name}
                className="md:w-80 md:h-80 object-contain w-40 h-40"
              />
              <h3 className="text-3xl font-semibold text-center">{w.name}</h3>
              <p className="text-xl text-justify text-bordo">{w.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const winemakers = [
  {
    name: "46 Parallel Wine Group",
    link: "https://46parallel.wine/en/",
    image: "/producers/46-parallel-wine-group.png",
    description:
      "Молодий бренд, що прагне представити Україну на світовій винній карті. Вина виробляються на 46-й паралелі, що є спільною з відомими виноробними регіонами, такими як Бордо та Бургундія.",
  },
  {
    name: "SHABO",
    link: "https://shabo.ua/czentr-kulturi-vina/",
    image: "/producers/shabo.png",
    description:
      "Один із найвідоміших українських виробників вина, розташований у селі Шабо Одеської області. Вина SHABO отримали понад 500 міжнародних нагород.",
  },
  {
    name: "Don Alejandro Winery",
    link: "https://donalejandro.com.ua/home/",
    image: "/producers/don-alejandro-winery.png",
    description:
      "Виноробня, що поєднує традиційні методи з інноваційними підходами у виробництві вина.",
  },
  {
    name: "Beykush Winery",
    link: "https://beykush.com/en/?srsltid=AfmBOorm930qVhI9XZQtU9J27ZimU2uSNcPHIOhU5bbfVcFqSYsE4tik",
    image: "/producers/beykush-winery.png",
    description:
      "Розташована в Очакові, Миколаївської області. Вина Beykush відомі своєю унікальною етикеткою, що відображає місцеву флору.",
  },
];