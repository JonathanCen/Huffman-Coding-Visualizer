import React, { createContext, useState, useEffect, useContext } from "react";
import { HuffmanCodeVariationContext } from "./HuffmanCodeVariationContext";
import HuffmanBinaryTree from "./HuffmanCodingAlgorithm";

const EncodeTextContext = createContext();

const EncodeTextProvider = ({ children }) => {
  const { huffmanVariation } = useContext(HuffmanCodeVariationContext);

  const [text, setText] = useState([]);
  const [binaryCode, setBinaryCode] = useState([]);
  const [huffmanCoding, setHuffmanCoding] = useState([]);

  useEffect(() => {
    // Set the ascii code for every char in the text
    setBinaryCode(text.map((char) => char.charCodeAt(0).toString(2)));
  }, [text]);

  useEffect(() => {
    if (text.length !== 0) {
      // Construct the huffman tree
      const huffmanTree = new HuffmanBinaryTree(text, huffmanVariation);
      // Set the huffman coding
    }
  }, [text, huffmanVariation]);

  return (
    <EncodeTextContext.Provider
      value={{
        text,
        setText,
        binaryCode,
        huffmanCoding,
      }}
    >
      {children}
    </EncodeTextContext.Provider>
  );
};

export { EncodeTextContext, EncodeTextProvider };
