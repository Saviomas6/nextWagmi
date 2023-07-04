import { useEffect, useState } from "react";

export const useIsMounted = () => {
  const [IsMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return IsMounted;
};
