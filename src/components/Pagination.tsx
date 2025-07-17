
interface Props {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
}

const PaginationRounded = ({ page, totalPages, onChange }: Props) => {
  return (
    page >= 1 && (
      <div className="flex gap-2 font-manrope text-sm font-medium">
        <button
          onClick={() => onChange(Math.max(page - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Назад
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`px-4 py-2 border rounded ${page === i ? "bg-red-800 text-white " : "hover:bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onChange(Math.min(page + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Вперед
        </button>
      </div>
    )
  );
};

export default PaginationRounded;