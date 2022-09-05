import { useState, useEffect } from "react";

function useWindowsWidth() {
  const hasWindow = typeof window !== "undefined";

  function getWindowsWidth() {
    const width = hasWindow ? window.innerWidth : null;
    return width;
  }

  const [windowsWidth, setWindowsWidth] = useState(getWindowsWidth());

  useEffect(() => {
    setTimeout(() => {
      if (hasWindow) {
        function handleResize() {
          setWindowsWidth(getWindowsWidth());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, 1000);
  }, [setTimeout]);

  return windowsWidth;
}

export default useWindowsWidth;
