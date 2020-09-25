import { useEffect, useRef, useState } from "react";

const getLocalStorage =
  typeof window !== "undefined"
    ? <T extends unknown>(name: string, defaultV: T) => {
        try {
          const v = localStorage.getItem(name);
          if (v !== null) return JSON.parse(v) as T;
        } catch (e) {}
        return defaultV;
      }
    : <T extends unknown>(_name: string, defaultV: T) => defaultV;

function setLocalStorage<T>(v: T, name: string) {
  try {
    localStorage.setItem(name, JSON.stringify(v));
  } catch (e) {}
}

function removeLocalStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}

export function useRememberState<T>(
  consistentName: string,
  defaultValue: T,
  {
    SSR = false,
    debounceWait = 500,
  }: { SSR?: boolean; debounceWait?: number } = {}
) {
  const debounceWaitRef = useRef(debounceWait);
  debounceWaitRef.current = debounceWait;

  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;

  const [state, setState] = useState<T>(() =>
    SSR ? defaultValue : getLocalStorage(consistentName, defaultValue)
  );

  useEffect(() => {
    if (SSR) setState(getLocalStorage(consistentName, defaultValueRef.current));
  }, [consistentName]);

  const isInitialMount = useRef(true);

  const timeoutRef = useRef<any>();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const exec =
        state !== defaultValueRef.current
          ? () => {
              timeoutRef.current = undefined;
              setLocalStorage(state, consistentName);
            }
          : () => {
              timeoutRef.current = undefined;
              removeLocalStorage(consistentName);
            };

      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);

      if (debounceWaitRef.current <= 0) {
        exec();
      } else {
        timeoutRef.current = setTimeout(exec, debounceWaitRef.current);
      }
    }
  }, [state, consistentName]);

  useEffect(() => {
    if (!isInitialMount.current) {
      setState(getLocalStorage(consistentName, defaultValueRef.current));
    }
  }, [consistentName]);

  return [state, setState] as const;
}
