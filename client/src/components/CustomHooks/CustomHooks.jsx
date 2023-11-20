import { useEffect, useState } from "react";

const useWindowDimension = () => {
  const [dimensions, setDimensions] = useState(getWindowDimension());

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimension());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [JSON.stringify(dimensions)]);

  return { dimensions };
};

const useOutsideClickHandler = (ref, action, disableOutsideClick = false) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!disableOutsideClick) {
        if (!ref.current || ref.current?.contains(event.target)) return null;

        event.stopPropagation();
        action();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export { useWindowDimension, useOutsideClickHandler };
