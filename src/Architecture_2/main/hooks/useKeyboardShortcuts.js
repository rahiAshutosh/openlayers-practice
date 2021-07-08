import { useEffect, useRef } from "react";
import { mapObj } from "../../libraries/ol-wrapper";

const useKeyboardShortcuts = () => {
  const exitDrawingMode = useRef(null);

  useEffect(() => {
    exitDrawingMode.current = (e) => {
      const escapePressed = e.key === 'Escape';
      if (escapePressed) {
        mapObj.endDrawing();
      }
    };
    document.addEventListener('keydown', exitDrawingMode.current);
    return () => document.removeEventListener('keydown', exitDrawingMode.current);
  }, []);
};

export default useKeyboardShortcuts;