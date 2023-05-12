import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
    } catch (error) {
      console.error('Get state error:', error.message);
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Set state error:', error.message);
    }
  }, [state, key]);
  return [state, setState];
};
