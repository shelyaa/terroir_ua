const AdvantagesSection = () => {
  return (
    <section className="bg-[#521b1a] text-white py-14 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center font-manrope">
        <div className="flex flex-col items-center">
          <img src="wine-icons/bottle.png" alt="bottle" className="h-15 mb-5" />
          <p>
            100% українське вино: Усі <br /> виробники — тільки з України.
            Ми <br /> підтримуємо локальних виноробів.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src="wine-icons/grape.png" alt="grape" className="h-15 mb-5" />
          <p>
            Рейтинг від спільноти: Реальні <br /> відгуки та оцінки від <br /> шанувальників українського вина.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src="wine-icons/glass.png" alt="glass" className="h-15 mb-5" />
          <p>
            Більше 250 вин: Унікальна <br /> добірка з різних регіонів країни. <br /> Червоні, білі, рожеві, ігристі.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
