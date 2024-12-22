import { useEffect, useState } from "react";

export default function useHideOnScroll() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let rAFHandle = 0;

    function updateVisibility() {
      setVisible(window.scrollY < 10);
    }

    function onScroll() {
      if (rAFHandle) {
        cancelAnimationFrame(rAFHandle);
      }

      rAFHandle = requestAnimationFrame(updateVisibility);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible;
}
