import * as React from "react"
import { cn } from "../../lib/utils"


function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full border-0 border-b border-gray-400 bg-transparent px-0 py-2 text-base text-gray-900 placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-0 focus:border-black",
        className
      )}
      {...props}
    />
  );
}

export { Input }
