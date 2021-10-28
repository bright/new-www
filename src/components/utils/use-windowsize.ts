import React from "react";
import { useEffect, useState } from 'react'


interface WindowSize {
    width: number
   
  }


export const useWindowSize = ():WindowSize => {
  
   
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isSSR ? window.innerWidth : 500 });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth });
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}