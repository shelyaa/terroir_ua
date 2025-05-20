import React from "react";

interface Props {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const wineTypes = [
  { label: "Червоні", value: "Червоне" },
  { label: "Білі", value: "Біле" },
  { label: "Рожеві", value: "Рожеве" },
  { label: "Ігристі", value: "Ігристе" },
  { label: "Десертні", value: "Десертне" },
  { label: "Портвейн", value: "Портвейн" },
  { label: "Апельсинові", value: "Апельсинове" },
];

const FilterBar: React.FC<Props> = ({ selectedType, onSelectType }) => (
  <div className="flex gap-20">
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

export default FilterBar;
