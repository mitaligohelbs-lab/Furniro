export const CompareStackSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex justify-between mx-5 mt-1">
        <div className="h-4 w-40 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-300">
          <div className="grid grid-cols-5 border-b border-[#9F9F9F]">
            <div className="p-4">
              <div className="h-5 w-24 bg-gray-300 rounded" />
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 flex flex-col items-center gap-3">
                <div className="w-70 h-45 bg-gray-300 rounded" />
                <div className="h-5 w-32 bg-gray-300 rounded" />
                <div className="h-4 w-20 bg-gray-300 rounded" />
                <div className="h-4 w-28 bg-gray-300 rounded" />
              </div>
            ))}
          </div>

          {Array.from({ length: 4 }).map((_, row) => (
            <div key={row} className="grid grid-cols-5 border-b">
              <div className="p-4">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-3 w-28 bg-gray-300 rounded mb-2" />
                ))}
              </div>

              {Array.from({ length: 4 }).map((_, col) => (
                <div key={col} className="p-4 border-l border-[#9F9F9F]">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-3 w-24 bg-gray-300 rounded mb-2"
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}

          <div className="grid grid-cols-5">
            <div />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 border-l border-[#9F9F9F]">
                <div className="h-10 w-full bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BrowseSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-70 w-50 bg-gray-300 rounded-md" />

      <div className="flex justify-center pt-2">
        <div className="h-6 w-40 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse w-40 md:w-70 px-2 md:px-0">
      <div className="relative">
        <div className="h-35 md:h-72 w-full bg-gray-300" />
        <div className="absolute top-2.5 right-2.5 h-9 md:h-10 w-9 md:w-10 bg-gray-400 rounded-full" />
      </div>

      <div className="bg-[#F4F5F7] p-2 space-y-2">
        <div className="h-5 md:h-7 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 md:h-5 w-1/2 bg-gray-300 rounded" />
        <div className="flex justify-between items-center">
          <div className="h-4 md:h-5 w-20 bg-gray-300 rounded" />
          <div className="h-4 md:h-5 w-16 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export const ShapeImageSkeleton = () => {
  return (
    <div className="animate-pulse w-20 mx-auto">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="mb-6 break-inside-avoid">
          <div
            className={`w-full bg-gray-300 rounded ${
              index === 2 ? "h-60" : "h-40"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export const ItemDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-20 bg-[#F9F1E7] flex items-center px-5 gap-3">
        <div className="h-4 w-16 bg-gray-300 rounded" />
        <div className="h-4 w-16 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-5 px-3">
        <div className="flex gap-4">
          <div className="flex md:flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-300 rounded-xl" />
            ))}
          </div>
          <div className="h-100 w-full bg-gray-300 rounded-xl" />
        </div>

        <div className="space-y-3">
          <div className="h-8 w-3/4 bg-gray-300 rounded" />
          <div className="h-5 w-32 bg-gray-300 rounded" />

          <div className="flex gap-3">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-32 bg-gray-300 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-300 rounded" />
            <div className="h-3 w-5/6 bg-gray-300 rounded" />
            <div className="h-3 w-4/6 bg-gray-300 rounded" />
          </div>

          <div className="h-10 w-40 bg-gray-300 rounded" />

          <hr />

          <div className="space-y-1">
            <div className="h-4 w-40 bg-gray-300 rounded" />
            <div className="h-4 w-48 bg-gray-300 rounded" />
            <div className="h-4 w-36 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 px-5">
        <div className="flex gap-3">
          <div className="h-5 w-32 bg-gray-300 rounded" />
          <div className="h-5 w-40 bg-gray-300 rounded" />
          <div className="h-5 w-32 bg-gray-300 rounded" />
        </div>

        <div className="space-y-2 max-w-4xl w-full">
          <div className="h-3 w-full bg-gray-300 rounded" />
          <div className="h-3 w-5/6 bg-gray-300 rounded" />
          <div className="h-3 w-4/6 bg-gray-300 rounded" />
        </div>

        <div className="flex gap-3 mt-4">
          <div className="w-150 h-60 bg-gray-300 rounded" />
          <div className="w-150 h-60 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="mt-10 px-5">
        <div className="h-8 w-48 bg-gray-300 rounded mx-auto mb-5" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 bg-gray-300 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};
