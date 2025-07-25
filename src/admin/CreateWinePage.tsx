import { useEffect, useState } from "react";
import { ProductForm } from "../components/forms/ProductForm";
import { useParams } from "react-router-dom";
import { getWineById } from "../api/wines";
import { Wine } from "../types/Wine";

export const CreateWinePage = () => {
  const { id } = useParams();
  const [wine, setWine] = useState<Wine | null>(null);

  useEffect(() => {
    if (id) {
      getWineById(id).then(setWine);
    }
  }, [id]);
  return (
    <>
      <div className="mx-auto py-4 max-w-7xl items-start flex justify-between px-4 ">
        <h1 className="text-3xl font-semibold">Додати вино</h1>
      </div>
      <ProductForm product={wine}/>
    </>
  );
};
