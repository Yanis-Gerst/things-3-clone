import { useEffect, useRef } from "react";

export const useEffectAfterInitRender = (
  callback: () => void,
  dependencyArray: any[]
) => {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencyArray]);
};
