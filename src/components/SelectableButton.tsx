import React from "react";

interface SelectableButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const SelectableButton: React.FC<SelectableButtonProps> = ({
  label,
  selected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 rounded-full border border-yellow transition-colors duration-200 font-manrope bg-white text-sm font-medium 
      ${selected ? "bg-yellow" : "hover:bg-[#fad46b]"}
    `}
  >
    {label}
  </button>
);

