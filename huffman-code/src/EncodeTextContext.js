import React, { createContext, useState, useEffect, useContext } from "react";
import { HuffmanCodeVariationContext } from "./HuffmanCodeVariationContext";
import {
  huffman_coding,
  adaptive_huffman_coding,
} from "./HuffmanCodingAlgorithm";

const EncodeTextContext = createContext();

const EncodeTextProvider = ({ children }) => {
  const { huffmanVariation } = useContext(HuffmanCodeVariationContext);

  const [text, setText] = useState([]);
  const [asciiCoding, setASCIICoding] = useState([]);
  const [huffmanCoding, setHuffmanCoding] = useState([]);

  useEffect(() => {
    console.log("Context");
    // Set the ascii code for every char in the text
    setASCIICoding(text.map((char) => char.charCodeAt(0)));
  }, [text]);

  useEffect(() => {
    console.log("Buidling Huffman Tree");

    if (asciiCoding.length !== 0) {
      // Construct the huffman tree
      const huffmanTree =
        huffmanVariation === "Huffman Coding"
          ? huffman_coding(asciiCoding)
          : adaptive_huffman_coding(asciiCoding);
      // Set the huffman coding
    }
  }, [asciiCoding, huffmanVariation]);

  return (
    <EncodeTextContext.Provider
      value={{
        text,
        setText,
        asciiCoding,
        huffmanCoding,
      }}
    >
      {children}
    </EncodeTextContext.Provider>
  );
};

export { EncodeTextContext, EncodeTextProvider };
