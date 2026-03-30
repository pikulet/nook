import { useEffect, useState } from "react";

/**
 * Returns true once Zustand persist stores have rehydrated from localStorage.
 * Components that depend on persisted state should gate on this to avoid
 * SSR hydration mismatches and flash-of-default-state.
 */
export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
