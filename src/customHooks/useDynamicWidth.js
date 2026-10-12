import { useState, useEffect } from "react";

export function useDynamicWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const elementWidth = windowWidth < 450 ? "100%" : 460;

  return {
    width: elementWidth,
    maxWidth: 460,
  };
}
