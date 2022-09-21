import React, { useCallback } from "react";

export default function useDebounce(delay: number = 500) {
  const [isSearching, setIsSearching] = React.useState(false);

  const search = useCallback(
    (fn: () => Promise<void>): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (isSearching) {
          return;
        }
        setIsSearching(true);
        setTimeout(async () => {
          try {
            await fn();
            resolve();
          } catch (e) {
            reject(e);
          } finally {
            setIsSearching(false);
          }
        }, delay);
      });
    },
    [isSearching, delay]
  );

  return search;
}
