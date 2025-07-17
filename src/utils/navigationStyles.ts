export const getIconClass = (
  path: string,
  isActive: (path: string) => boolean
) =>
  `p-2 rounded-full transition duration-200 w-10 h-10 flex items-center justify-center hover:text-black ${
    isActive(path)
      ? "border-1 border-[#590004] text-[#590004] bg-white"
      : "text-[#5A5A5A]"
  }`;

export const getPageClass = (
  path: string,
  isActive: (path: string) => boolean
) =>
  `pb-1 inline-flex items-center justify-center w-25 hover:text-black border-b-1 border-[#F3F3F3] ${
    isActive(path) ? "border-gray" : ""
  }`;
