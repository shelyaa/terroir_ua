import { FC, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "../types/Product";

export const ProductSlider: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3002/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка при отриманні даних:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="my-12">
      <h1 className="text-[#250001] text-center text-4xl font-semibold mb-10">Пропозиції місяця</h1>
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
