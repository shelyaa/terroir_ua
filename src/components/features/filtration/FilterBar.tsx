import React from "react";

interface Props {
  searchParams: URLSearchParams;
  onSelectType: (type: string) => void;
}

const wineTypes = [
  { label: "Усі", value: "Усі" },
  { label: "Червоні", value: "Червоне" },
  { label: "Білі", value: "Біле" },
  { label: "Рожеві", value: "Рожеве" },
  { label: "Ігристі", value: "Ігристе" },
  { label: "Десертні", value: "Десертне" },
  { label: "Портвейн", value: "Портвейн" },
  { label: "Апельсинові", value: "Апельсинове" },
];

export const FilterBar: React.FC<Props> = ({ searchParams, onSelectType }) => {
  const selectedType = searchParams.get("type") || "Усі";

  return (
    <div className="flex md:gap-20 flex-wrap justify-center gap-8">
      {wineTypes.map((type) => (
        <button
          key={type.value}
          onClick={() => onSelectType(type.value)}
          className={`py-2 text-xl  cursor-pointer hover:text-black ${
            selectedType === type.value
              ? "text-black font-semibold "
              : "text-gray"
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};
