import React, { createContext, useState, useEffect, useContext } from "react";
import { HuffmanCodeVariationContext } from "./HuffmanCodeVariationContext";
import visualizeHuffman from "./VisualizeHuffman";
import { select } from 'd3';
import HuffmanBinaryTree from "./HuffmanCodingAlgorithm";

const EncodeTextContext = createContext();

const EncodeTextProvider = ({ children }) => {
  const { huffmanVariation } = useContext(HuffmanCodeVariationContext);

  const [text, setText] = useState([]);
  const [binaryCode, setBinaryCode] = useState([]);
  const [huffmanTreeJSON, setHuffmanTreeJSON] = useState({});
  const [huffmanTreePaths, setHuffmanTreePaths] = useState({}); // This is to animate the paths
  const [huffmanCoding, setHuffmanCoding] = useState([]);

  useEffect(() => {
    // Check if there is text in the textbox
    if (text.length !== 0) {
      // Set the ascii code for every char in the text
      setBinaryCode(text.map((char) => char.charCodeAt(0).toString(2)));

      // Construct the huffman tree based on the variation
      const huffmanTree = new HuffmanBinaryTree(text, huffmanVariation);
      // huffmanTree.printTree();

      // Get the encoding
      const huffmanEncoding = huffmanTree.generateEncoding();
      setHuffmanCoding(text.map((char) => huffmanEncoding[char]["stringPath"]));
      setHuffmanTreePaths(huffmanEncoding);

      // Visualize it
      const huffmanJSON = huffmanTree.jsonify();
      setHuffmanTreeJSON(huffmanJSON);
      visualizeHuffman(huffmanJSON);
    } else {
      // Then the text is empty so reset all the state and svg
      setHuffmanCoding([]);
      setBinaryCode([]);
      const svg = select('svg');
      svg.selectAll('*').remove();
    }
  }, [text, huffmanVariation]);

  // Rerenders the tree whenever the screen resizes
  useEffect(() => {
    // Handler function for rerendering
    const handleResize = () => {
      if (Object.entries(huffmanTreeJSON).length > 0) {
        visualizeHuffman(huffmanTreeJSON);
      }
    };
    
    // Add an event handler on the window
    window.addEventListener("resize", handleResize);
    
    // Removes the handler once we exit
    return _ => {window.removeEventListener("resize", handleResize);}
  }, [huffmanTreeJSON]);

  return (
    <EncodeTextContext.Provider
      value={{
        text,
        setText,
        binaryCode,
        huffmanCoding,
        huffmanTreePaths,
      }}
    >
      {children}
    </EncodeTextContext.Provider>
  );
};

export { EncodeTextContext, EncodeTextProvider };
