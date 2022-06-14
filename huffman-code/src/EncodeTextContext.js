import React, { createContext, useState } from "react";

const EncodeTextContext = createContext();

const EncodeTextProvider = ({ children }) => {
  const [encodeText, setEncodeText] = useState([]);

  const updateEncodeText = (newEncodeText) => {
    setEncodeText(newEncodeText);
  };

  return (
    <EncodeTextContext.Provider
      value={{
        encodeText,
        updateEncodeText,
      }}
    >
      {children}
    </EncodeTextContext.Provider>
  );
};

export { EncodeTextContext, EncodeTextProvider };
