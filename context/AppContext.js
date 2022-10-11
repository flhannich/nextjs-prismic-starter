import { createContext, useState, useEffect, useRef } from 'react'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let body = document.querySelector('body');
    body.dataset.darkmode = darkMode;
  },[darkMode]);


  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
