export const WineDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 font-manrope font-medium text-sm animate-pulse">
      {/* Back Link Skeleton */}
      <div className="flex items-center text-gray-300 mb-6">
        <div className="h-6 w-6 bg-gray-300 rounded mr-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side Skeleton */}
        <div className="space-y-6">
          {/* Wine Name */}
          <div className="h-10 w-2/3 bg-gray-300 rounded mb-2" />

          {/* Price, percentage, volume */}
          <div className="flex items-center gap-6 text-xl mb-4">
            <div className="h-6 w-16 bg-gray-300 rounded" />
            <div className="h-6 w-12 bg-gray-300 rounded" />
            <div className="h-6 w-16 bg-gray-300 rounded" />
          </div>

          {/* Quantity Selector */}
          <div className="w-40">
            <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
            <div className="h-8 w-40 bg-gray-300 rounded mb-2"></div>
          </div>

          {/* Description */}
          <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
          <div className="h-20 w-full bg-gray-300 rounded" />

          {/* Add to Cart Button */}
          <div className="flex items-center gap-4 mt-4 w-[300px]">
            <div className="h-10 w-40 bg-gray-300 rounded" />
          </div>

          {/* Comments/Owner Description */}
          <div className="h-4 w-32 bg-gray-300 rounded mt-6 mb-2" />
          <div className="h-10 w-full bg-gray-300 rounded mb-2" />

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6">
            <div>
              <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
              <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
              <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
              <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
            </div>
            <div>
              <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
              <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
              <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
            </div>
          </div>
        </div>

        {/* Right Side Skeleton (Image, Rating, Button) */}
        <div className="flex flex-col items-center">
          <div className="h-80 w-80 bg-gray-300 rounded mb-6" />
          <div>
            <div className="mt-20 flex flex-col items-center">
              <div className="flex items-center gap-4 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-8 w-8 bg-gray-300 rounded-full" />
                ))}
                <div className="h-8 w-16 bg-gray-300 rounded ml-5" />
              </div>
              <div className="h-8 w-40 bg-gray-300 rounded mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
