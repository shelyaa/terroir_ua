import { useEffect, useState } from "react";
import { FadeImage } from "../utils/FadeImage";

const slides = [
  {
    image: "/hero-slider/slide1.jpg",
    title: "Підтримуємо локальних<br />виробників",
    description: "Кожна пляшка на нашому сайті — це історія сімейної справи, ручної<br /> роботи й виноградників, вирощених з любов’ю. Ми співпрацюємо<br /> лише з перевіреними українськими виноробнями.",
  },
  {
    image: "/hero-slider/slide2.jpg",
    title: "Українське вино — нова класика",
    description: "Україна має тисячолітню історію виноробства, яка сьогодні<br /> перетворюється на сучасну винну революцію. Ми відкриваємо<br /> найкраще з українських терруарів і малих виноробень.",
  },
  {
    image: "/hero-slider/slide3.jpg",
    title: "Чесна якість без компромісів",
    description: "Ми ретельно відбираємо вина, які заслуговують бути на вашому<br /> столі. Жодного мас-маркету — лише унікальні позиції, які не<br /> знайдеш у супермаркеті.",
  },
  {
    image: "/hero-slider/slide4.jpg",
    title: "Купуєш — відкриваєш Україну",
    description: "Замовляючи у нас, ти не просто купуєш вино — ти відкриваєш нові<br /> регіони, знайомишся з виноробами і підтримуєш українське<br /> ремесло. Разом будуємо винну культуру країни.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="relative w-full h-[735px] overflow-hidden group transition-all duration-500">
      <FadeImage
        src={slides[current].image}
        alt={slides[current].title}
      />

      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 text-left text-white w-[550]">
  <div className="max-w-2xl">
    <h2
      className="text-2xl md:text-4xl font-semibold"
      dangerouslySetInnerHTML={{ __html: slides[current].title }}
    />
    <p className="mt-4 text-[17px] font-manrope" dangerouslySetInnerHTML={{ __html: slides[current].description }}></p>
  </div>
</div>


      <div className="absolute bottom-14 flex gap-4 justify-center w-full z-30">
  {slides.map((_, index) => (
     <button
     key={index}
     onClick={() => setCurrent(index)}
     className="relative h-5 w-5 rounded-full border-2 border-[#5e0b0b] bg-white transition-all duration-300"
   >
    {current === index && (
  <span className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-[#5e0b0b] transform -translate-x-1/2 -translate-y-1/2" />
)}

   </button>
    
  ))}
</div>
    </section>
  );
};

export default HeroSlider;
