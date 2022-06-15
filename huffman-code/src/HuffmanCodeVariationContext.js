import React, { createContext, useState } from "react";

const HuffmanCodeVariationContext = createContext();

const HuffmanCodeVariationProvider = ({ children }) => {
  const [huffmanVariation, setHuffmanVariation] = useState("Huffman Coding");

  const updateEncodeText = (newVariation) => {
    setHuffmanVariation(newVariation);
  };

  return (
    <HuffmanCodeVariationContext.Provider
      value={{
        huffmanVariation,
        setHuffmanVariation,
      }}
    >
      {children}
    </HuffmanCodeVariationContext.Provider>
  );
};

export { HuffmanCodeVariationContext, HuffmanCodeVariationProvider };
