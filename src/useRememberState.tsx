import { useEffect, useRef, useState } from "react";

function getLocalStorage<T>(name: string, defaultV: T) {
  try {
    if (typeof window !== "undefined") {
      const v = localStorage.getItem(name);
      if (v) return JSON.parse(v) as T;
    }
  } catch {}
  return defaultV;
}

function setLocalStorage<T>(v: T, name: string) {
  try {
    localStorage.setItem(name, JSON.stringify(v));
  } catch {}
}

function useRememberState<T = any>(
  consistentName: string,
  defaultValue: T,
  { SSR }: { SSR?: boolean } = { SSR: false }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() =>
    SSR ? defaultValue : getLocalStorage(consistentName, defaultValue)
  );

  useEffect(() => {
    if (SSR) setState(getLocalStorage(consistentName, defaultValue));
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setLocalStorage(state, consistentName);
    }
  }, [state]);

  useEffect(() => {
    if (!isInitialMount.current) {
      setState(getLocalStorage(consistentName, defaultValue));
    }
  }, [consistentName]);

  return [state, setState];
}

export default useRememberState;
