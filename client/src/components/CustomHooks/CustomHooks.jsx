import React, { useEffect, useState } from "react";

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

export { useWindowDimension };
