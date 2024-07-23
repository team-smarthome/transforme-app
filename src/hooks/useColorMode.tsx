import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'dark');

  useEffect(() => {
    // const className = 'dark';
    const bodyClass = window.document.body.classList;

    // colorMode === 'dark'
    // ?
    bodyClass.add('dark');
    // : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
