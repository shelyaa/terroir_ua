import { ProductForm } from "../components/forms/ProductForm";

export const CreateWinePage = () => {
  return (
    <>
      <div className="mx-auto py-4 max-w-7xl items-start flex justify-between ">
        <h1 className="text-3xl font-semibold">Додати вино</h1>
      </div>
      <ProductForm />
    </>
  );
};
