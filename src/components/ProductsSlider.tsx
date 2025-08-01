import { FC, useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "./ProductCard";
import { Wine } from "../types/Wine";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export const ProductSlider: FC = () => {
  const [products, setProducts] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
    fetch("http://localhost:8080/wines")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.content);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="mx-auto max-w-7xl">
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
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="px-3 py-3 rounded-full bg-white hover:bg-gray-300"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
