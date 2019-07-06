import { useState, useEffect } from 'react';

const checkLocalStorage = () => typeof localStorage !== undefined;

function useRememberState<T = string>(
  consistentName: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    setState(getLocalStorage(consistentName, defaultValue));
  }, [consistentName, defaultValue]);

  useEffect(() => {
    setLocalStorage(state, consistentName);
  }, [state, consistentName]);

  const getLocalStorage = (name: string, defaultV: T) => {
    if (checkLocalStorage()) {
      const v = localStorage.getItem(name);
      if (v) return JSON.parse(v) as T;
    }
    return defaultV;
  };
  const setLocalStorage = (v: T, name: string) => {
    if (checkLocalStorage()) localStorage.setItem(name, JSON.stringify(v));
  };

  return [state, setState];
}

export default useRememberState;
