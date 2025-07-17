import { Link } from "react-router-dom";
import { ProductsTable } from "../components/ProductsTable";

export const AdminProductsPage = () => {
  return (
    <>
      <div className="mx-auto py-4 max-w-5xl items-start flex justify-between ">
        <h1 className="text-3xl font-semibold">Вина</h1>
        <button className="px-8 py-3 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-semibold font-manrope text-sm">
          <Link to="/admin/products/new">Додати вино</Link>
        </button>
      </div>
        <ProductsTable />

    </>
  );
};
