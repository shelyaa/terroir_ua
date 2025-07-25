import { useEffect, useState } from "react";
import { Wine, wineType, wineTypeReverseMap } from "../../types/Wine";
import { Label } from "../ui/label";
import { FormInput } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { addProduct, updateProduct } from "../../api/products";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";

export function ProductForm({ product }: { product?: Wine | null }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  type FormDataType = {
    name: string;
    producer: string;
    agingMethod: string;
    region: string;
    sweetness: string;
    price: string | number;
    description: string;
    percentage: string | number;
    year: string | number;
    volume: string | number;
    type: string;
    variety: string;
    ownerDescription: string;
    rate: string | number;
    dateAdded: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    producer: "Shabo",
    agingMethod: "",
    region: "",
    sweetness: "",
    price: "",
    description: "",
    percentage: "",
    year: "",
    volume: "",
    type: "Червоне",
    variety: "",
    ownerDescription: "",
    rate: "",
    dateAdded: new Date().toISOString().slice(0, 19),
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        producer: product.producer || "Shabo",
        agingMethod: product.agingMethod || "",
        region: product.region || "",
        sweetness: product.sweetness || "",
        price: product.price || "",
        description: product.description || "",
        percentage: product.percentage || "",
        year: product.year || "",
        volume: product.volume || "",
        type: wineType[product.type] || "Червоне",
        variety: product.variety || "",
        ownerDescription: product.ownerDescription || "",
        rate: product.rate || "",
        dateAdded:
          typeof product.dateAdded === "string"
            ? product.dateAdded
            : product.dateAdded instanceof Date
              ? product.dateAdded.toISOString().slice(0, 19)
              : new Date().toISOString().slice(0, 19),
      });
    }
  }, [product]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const payload = {
      ...formData,
      price: formData.price === "" ? null : Number(formData.price),
      percentage:
        formData.percentage === "" ? null : Number(formData.percentage),
      year: formData.year === "" ? null : Number(formData.year),
      volume: formData.volume === "" ? null : Number(formData.volume),
      rate: formData.rate ? Number(formData.rate) : null,

      dateAdded:
        typeof formData.dateAdded === "string"
          ? formData.dateAdded
          : new Date().toISOString().slice(0, 19),
    };
    console.log(payload);
    const fd = new FormData();
    fd.append(
      "wine",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
    if (imageFile) {
      fd.append("image", imageFile);
    }
    let result;
    if (product?.id) {
      result = await updateProduct(product.id, fd, token ?? undefined);
    } else {
      result = await addProduct(fd, token ?? undefined);
    }

    if (result && typeof result === "object") {
      setError(result as Record<string, string>);
    }
    setPending(false);
    console.log(imageFile);

    navigate("/admin/products");
  };

  return (
    <div className=" mx-auto max-w-7xl px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-2 gap-3"
      >
        <div>
          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="name">
              Назва
            </Label>
            <FormInput
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            {error.name && <div className="text-destructive">{error.name}</div>}
          </div>

          <div className="space-y-2 mb-4">
            <Label
              className="font-manrope font-normal text-sm"
              htmlFor="producer"
            >
              Виноробня
            </Label>
            <select
              id="producer"
              name="producer"
              value={formData.producer}
              onChange={handleChange}
              className="border-black rounded px-3 py-2 w-full border-1"
              required
            >
              <option value="Shabo">Shabo</option>
              <option value="Biologist">Biologist</option>
              <option value="Колоніст">Колоніст</option>
              <option value="Beykush Winery">Beykush Winery</option>
              <option value="Villa Tinta">Villa Tinta</option>
              <option value="Frumushika-Nova">Frumushika-Nova</option>
              <option value="46 Parallel Wine Group">
                46 Parallel Wine Group
              </option>
              <option value="Don Alejandro Winery">Don Alejandro Winery</option>
              <option value="Father’s Wine">Father’s Wine</option>
              <option value="SliVino Village">SliVino Village</option>
            </select>
            {error.producer && (
              <div className="text-destructive">{error.producer}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="price">
              Спосіб витримки
            </Label>
            <FormInput
              type="text"
              id="agingMethod"
              name="agingMethod"
              required
              value={formData.agingMethod}
              onChange={handleChange}
            />
            {error.agingMethod && (
              <div className="text-destructive">{error.agingMethod}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="price">
              Регіон виробництва
            </Label>
            <FormInput
              type="text"
              id="region"
              name="region"
              required
              value={formData.region}
              onChange={handleChange}
            />
            {error.region && (
              <div className="text-destructive">{error.region}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <Label
              className="font-manrope font-normal text-sm"
              htmlFor="sweetness"
            >
              Ступінь солодкості
            </Label>
            <FormInput
              type="text"
              id="sweetness"
              name="sweetness"
              required
              value={formData.sweetness}
              onChange={handleChange}
            />
            {error.sweetness && (
              <div className="text-destructive">{error.sweetness}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <Label
              className="font-manrope font-normal text-sm"
              htmlFor="variety"
            >
              Сорт винограду
            </Label>
            <FormInput
              type="text"
              id="variety"
              name="variety"
              required
              value={formData.variety}
              onChange={handleChange}
            />
            {error.variety && (
              <div className="text-destructive">{error.variety}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <Label
              className="font-manrope font-normal text-sm"
              htmlFor="description"
            >
              Опис вина
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="border-1 border-black "
            />
            {error.description && (
              <div className="text-destructive">{error.description}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <Label
              className="font-manrope font-normal text-sm"
              htmlFor="ownerDescription"
            >
              Опис від винороба
            </Label>
            <Textarea
              id="ownerDescription"
              name="ownerDescription"
              required
              value={formData.ownerDescription}
              onChange={handleChange}
              className="border-1 border-black"
            />
            {error.ownerDescription && (
              <div className="text-destructive">{error.ownerDescription}</div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="image">
              Завантажити зображення
            </Label>
            <FormInput
              type="file"
              id="image"
              name="image"
              required={product == null}
              onChange={handleImageChange}
            />
            {product && (
              <img
                src={`http://localhost:8080` + product.imageUrl}
                height="200"
                width="200"
                alt="Product Image"
              />
            )}
            {product && (
              <div className="text-muted-foreground">{product.imageUrl}</div>
            )}
            {error.image && (
              <div className="text-destructive">{error.image}</div>
            )}
          </div>
        </div>
        <div>
          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="type">
              Тип вина
            </Label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border-black rounded px-3 py-2 w-full border-1"
              required
            >
              <option value="Червоне">Червоне</option>
              <option value="Біле">Біле</option>
              <option value="Рожеве">Рожеве</option>
              <option value="Ігристе">Ігристе</option>
              <option value="Десертне">Десертне</option>
              <option value="Портвейн">Портвейн</option>
              <option value="Апельсинове">Апельсинове</option>
            </select>
            {error.type && <div className="text-destructive">{error.type}</div>}
          </div>
          <div className="space-y-2 mb-4">
            <Label
              className="font-manrope font-normal text-sm"
              htmlFor="percentage"
            >
              Алкоголь, %
            </Label>
            <FormInput
              type="number"
              id="percentage"
              name="percentage"
              required
              value={formData.percentage}
              onChange={handleChange}
            />
            {error.percentage && (
              <div className="text-destructive">{error.percentage}</div>
            )}
          </div>
          <div className="space-y-2 mb-4">
            <Label
              className="font-manrope font-normal text-sm"
              htmlFor="volume"
            >
              Обʼєм, мл
            </Label>
            <FormInput
              type="number"
              id="volume"
              name="volume"
              required
              value={formData.volume}
              onChange={handleChange}
            />
            {error.volume && (
              <div className="text-destructive">{error.volume}</div>
            )}
          </div>
          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="year">
              Рік урожаю
            </Label>
            <FormInput
              type="number"
              id="year"
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
            />
            {error.year && <div className="text-destructive">{error.year}</div>}
          </div>
          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="price">
              Ціна
            </Label>
            <FormInput
              type="number"
              id="price"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
            />
            {error.price && (
              <div className="text-destructive">{error.price}</div>
            )}
          </div>
          <div className="space-y-2 mb-4">
            <Label className="font-manrope font-normal text-sm" htmlFor="rate">
              Рейтинг
            </Label>
            <FormInput
              type="number"
              id="rate"
              name="rate"
              required
              value={formData.rate}
              onChange={handleChange}
            />
            {error.rate && <div className="text-destructive">{error.rate}</div>}
          </div>
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="px-30 py-3 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-medium font-manrope text-sm flex items-center"
        >
          {pending ? "Збереження..." : "Зберегти → "}
        </Button>
      </form>
    </div>
  );
}
