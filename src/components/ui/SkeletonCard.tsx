
export const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-300 rounded-lg w-full max-w-[290px] h-[350px] flex flex-col items-center p-4">
    <div className="bg-gray-200 h-55 w-40 mb-4 mt-4 rounded-lg" />
    <div className="bg-gray-200 h-6 w-40 mb-4 rounded" />
    <div className="flex gap-18">
      <div className="bg-gray-200 h-6 w-14 rounded" />
      <div className="bg-gray-200 h-6 w-10 rounded" />
    </div>
  </div>
);
