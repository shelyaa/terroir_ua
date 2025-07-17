import { useState } from "react";

export function FadeImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`opacity-0 transition-opacity duration-700 ${loaded ? "opacity-100" : ""}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
