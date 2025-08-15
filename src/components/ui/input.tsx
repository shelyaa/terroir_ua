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
function FormInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full font-manrope font-sm rounded-md border bg-main px-3 py-2 placeholder:text-sm placeholder:font-manrope ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-black text-lg",
        className
      )}
      {...props}
    />
  );
}




export { Input, FormInput }
