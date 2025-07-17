import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-[#f9f7f4] py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 ">
          <img
            src="/photos/wine-glass.jpg"
            alt="Вино та пейзаж"
            className="rounded-md shadow-md object-cover w-full"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Смак українського теруару <br />
            Відчуй характер кожного регіону
          </h3>
          <p className="mt-4 text-gray-700 font-manrope">
            “Terroir UA” — перша онлайн-бібліотека українських вин. Відкрий для
            себе вишуканість Закарпаття, сонячну силу Херсону, традиції
            Бессарабії та інші скарби українського виноробства.
          </p>
          <Link to="/wine">
            <button className="mt-6 px-6 py-3 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-manrope" type="button">
              Обрати зараз →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
