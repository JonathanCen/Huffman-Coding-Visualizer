import React, { createContext, useState, useEffect, useContext } from "react";
import { HuffmanCodeVariationContext } from "./HuffmanCodeVariationContext";
import visualizeHuffman from "./VisualizeHuffman";
import { select } from 'd3';
import HuffmanBinaryTree from "./HuffmanCodingAlgorithm";

const EncodeTextContext = createContext();

const EncodeTextProvider = ({ children }) => {
  const { huffmanVariation } = useContext(HuffmanCodeVariationContext);

  const [text, setText] = useState([]);
  // const [huffmanTree, setHuffmanTree] = useState(null); // This is not used
  const [binaryCode, setBinaryCode] = useState([]);
  const [huffmanCoding, setHuffmanCoding] = useState([]);

  useEffect(() => {
    // Check if there is text in the textbox
    if (text.length !== 0) {
      // Set the ascii code for every char in the text
      setBinaryCode(text.map((char) => char.charCodeAt(0).toString(2)));

      // Construct the huffman tree based on the variation
      const huffmanTree = new HuffmanBinaryTree(text, huffmanVariation);
      // setHuffmanTree(huffmanTree);
      huffmanTree.printTree();

      // Get the encoding
      const huffmanEncoding = huffmanTree.generateEncoding();
      setHuffmanCoding(text.map((char) => huffmanEncoding[char]));

      // Visualize it
      const huffmanJSON = huffmanTree.jsonify();
      visualizeHuffman(huffmanJSON);
    } else {
      // Then the text is empty so reset all the state and svg
      setHuffmanCoding([]);
      setBinaryCode([]);
      const svg = select('svg');
      svg.selectAll('*').remove();
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
