export const SkeletonCartItem = () => (
  <div className="relative flex items-center w-full py-8 px-6 gap-12 flex-col md:flex-row border-b animate-pulse">
    {/* Кнопка видалення (невидима в скелетоні для збереження структури) */}
    
    {/* Зображення */}
    <div className="w-70 flex-shrink-0 flex justify-center">
      <div className="w-38 h-54 bg-gray-200 rounded" />
    </div>

    {/* Основна інформація */}
    <div className="flex flex-col flex-1 w-full">
      <div className="h-10 w-2/3 mb-6 bg-gray-200 rounded" />
      <div className="flex items-baseline gap-10 mb-6">
        <div className="h-7 w-24 bg-gray-200 rounded" />
        <div className="h-7 w-24 bg-gray-200 rounded" />
      </div>
      <div className="w-50 font-manrope text-sm">
        <div className="mb-2 h-5 w-1/3 bg-gray-200 rounded" />
        <div className="flex items-center  w-50 h-10">
          <div className="flex-1 h-7 bg-gray-200 rounded" />
          <div className="flex-1 h-7 bg-gray-100 rounded mx-2" />
          <div className="flex-1 h-7 bg-gray-200 rounded" />
        </div>
      </div>
    </div>

    {/* Додаткова інформація (показується лише на md+) */}
    <div className="min-w-[220px] md:grid grid-cols-2 gap-x-8 gap-y-4 text-lg hidden">
      <div>
        <div className="h-5 w-24 bg-gray-200 rounded mb-1" />
        <div className="h-5 w-20 bg-gray-100 rounded" />
      </div>
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded mb-1" />
        <div className="h-5 w-20 bg-gray-100 rounded" />
      </div>
      <div>
        <div className="h-5 w-24 bg-gray-200 rounded mb-1" />
        <div className="h-5 w-16 bg-gray-100 rounded" />
      </div>
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded mb-1" />
        <div className="h-5 w-20 bg-gray-100 rounded" />
      </div>
    </div>
  </div>
);