class HuffmanBinaryTreeNode {
  constructor(
    frequency,
    character = null,
    leftChild = null,
    rightChild = null
  ) {
    this.character = character;
    this.frequency = frequency;
    this.left = leftChild;
    this.right = rightChild;
  }
}

class HuffmanBinaryTree {
  constructor(inputText, huffmanVariation) {
    this.variation = huffmanVariation;
    this.inputText = inputText;
    this.root =
      huffmanVariation === "Huffman Coding"
        ? this.buildHuffmanTree()
        : this.buildAdaptiveHuffmanTree();
  }

  constructFrequencyObject() {
    return this.inputText.reduce(
      (currentObject, character) => (
        (currentObject[character] = currentObject.hasOwnProperty(character)
          ? currentObject[character] + 1
          : 1),
        currentObject
      ),
      {}
    );
  }

  /*
   * Returns the root of the Huffman tree
   */
  buildHuffmanTree() {
    // Create a dictionary storing the frequency of the inputText
    const inputTextFrequencyObject = this.constructFrequencyObject();

    // Build individual tree nodes for each unique character
    const nodes = [];
    for (const [character, frequency] of Object.entries(
      inputTextFrequencyObject
    )) {
      nodes.push(new HuffmanBinaryTreeNode(character, frequency));
    }

    // Construct a min heap storing the frequency of each character

    // Keep on popping off the top two elements and merging them until there is only one node left in the min heap

    // Return the only node
  }

  buildAdaptiveHuffmanTree() {}
}

export default HuffmanBinaryTree;
