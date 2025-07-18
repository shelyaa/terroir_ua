import { FC, useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "./ProductCard";
import { Wine } from "../types/Wine";
import { ChevronLeft, ChevronRight, DotSquare } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

type RecommendationSliderProps = {
  id: string | number;
};

export const RecommendationSlider: FC<RecommendationSliderProps> = ({ id }) => {
  const [products, setProducts] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false },
    [Autoplay()]
  );

  useEffect(() => {
    fetch(`http://localhost:8080/wines/${id}/recommendations`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(Array.isArray(data.content) ? data.content : []);
        setLoading(false);
          console.log(data.content)

      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [id]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  if (loading) return <p>Завантаження...</p>;
  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <div className="my-12 mx-auto max-w-7xl">
      <h2 className="text-[#250001] text-center text-3xl font-semibold mb-8">
        Рекомендовані вина
      </h2>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {products.map((product) => (
              <div className="embla__slide" key={product.id}>
                <ProductCard wine={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={scrollPrev}
            className="py-3 px-3 rounded-full bg-white hover:bg-gray-300"
            aria-label="Попередній"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="px-3 py-3 rounded-full bg-white hover:bg-gray-300"
            aria-label="Наступний"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};