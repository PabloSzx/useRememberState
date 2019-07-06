import { useState, useEffect } from 'react';

const checkLocalStorage = () => typeof localStorage !== undefined;

function getLocalStorage<T = string>(name: string, defaultV: T) {
  if (checkLocalStorage()) {
    const v = localStorage.getItem(name);
    if (v) return JSON.parse(v) as T;
  }
  return defaultV;
}
function setLocalStorage<T = string>(v: T, name: string) {
  if (checkLocalStorage()) localStorage.setItem(name, JSON.stringify(v));
}

function useRememberState<T = string>(
  consistentName: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    getLocalStorage<T>(consistentName, defaultValue)
  );

  useEffect(() => {
    setLocalStorage<T>(state, consistentName);
  }, [state]);

  return [state, setState];
}

export default useRememberState;
