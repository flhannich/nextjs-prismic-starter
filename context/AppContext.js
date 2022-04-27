import { createContext, useState, useEffect, useRef } from 'react'
import uiContents from '@data/uiContents.json';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(false);

  const configRef = useRef(null);
  const fontsRef = useRef(null);

  useEffect(() => {
    let body = document.querySelector('body');
    body.dataset.darkmode = darkMode;
  },[darkMode]);


  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        uiContents,
        configRef,
        fontsRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
