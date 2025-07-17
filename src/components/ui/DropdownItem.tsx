import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const DropdownItem = ({
  title,
  options,
}: {
  title: string;
  options: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pb-1 mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-2xl font-medium border-b border-gray-400"
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-2 font-manrope font-medium text-gray-800">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className="text-sm text-left hover:text-black border-b border-gray-300 py-2 pl-4"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
