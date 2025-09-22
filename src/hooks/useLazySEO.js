// hooks/useLazySEO.js (para carga diferida de imágenes)
import { useEffect } from "react";

export const useLazySEO = (imageUrl) => {
  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
    }
  }, [imageUrl]);
};
