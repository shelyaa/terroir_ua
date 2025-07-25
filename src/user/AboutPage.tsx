import { FadeImage } from "../utils/FadeImage";

export const AboutPage = () => {
  return (
    <div className="">
      <div className="max-h-[491px] mb-20">
        <FadeImage src="/about/about-1.jpg" alt="about1" />
      </div>
      <div className="mb-20 flex flex-col lg:flex-row gap-5 items-center max-w-7xl md:mx-auto mx-4">
        <div className="md:w-[560px] flex justify-center w-50">
          <FadeImage
            src="/about/about-2.jpg"
            alt="wine-bottle"
          />
        </div>
        <div className="w-full lg:w-[512px] text-center lg:text-left">
          <h2 className="text-3xl font-semibold mb-4">Наша місія</h2>
          <p className="font-manrope text-base font-normal">
            Показати Україну винного походження, підтримати малих і середніх
            виробників, і дати можливість покупцям обирати вина свідомо: не лише
            за смаком, а й за історією.
          </p>
        </div>
      </div>
      <section className="bg-[#521b1a] text-white py-14 px-4 mb-20">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center font-manrope">
          <div className="flex flex-col items-center">
            <img
              src="wine-icons/bottle.png"
              alt="bottle"
              className="h-15 mb-5"
            />
            <p className="max-w-[300px] w-full">
              Знаходимо виноробні по всій Україні — від Закарпаття до Одещини,
              від Херсонщини до Поділля.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="wine-icons/grape.png" alt="grape" className="h-15 mb-5" />
            <p className="max-w-[300px] w-full">
              Дбайливо відбираємо вина, які мають характер, автентичність і
              якість.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="wine-icons/glass.png" alt="glass" className="h-15 mb-5" />
            <p className="max-w-[300px] w-full">
              Пропонуємо зручну покупку напряму від виробника — без націнок і
              посередників.
            </p>
          </div>
        </div>
      </section>
      <div className=" mb-20 flex flex-col lg:flex-row gap-5 items-center max-w-7xl md:mx-auto justify-end mx-4">
        <div className="w-full lg:w-[512px] text-center lg:text-left">
          <h2 className="text-3xl font-semibold mb-4">Чому українське вино?</h2>
          <p className="font-manrope text-base font-normal">
            Україна має тисячолітню історію виноробства, унікальні теруари і
            нову хвилю виноробів, які не бояться експериментувати. Наші вина вже
            отримують визнання у світі — і ми хочемо, щоб вони були такими ж
            знаними і вдома.
          </p>
        </div>
        <div className="w-full lg:w-[560px] flex justify-center">
          <img
            src="/about/about-3.jpg"
            alt="wine-bottle"
            className="w-full h-auto max-w-[310px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};
