import MinHeap from "./MinHeap";

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

  getFrequency() {
    return this.frequency;
  }

  getCharacter() {
    return this.character;
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

    // Prints the tree by level using BFS
  printTree() {
    let queue = [this.root],
      level = 0;
    while (queue.length > 0) {
      
      let newQueue = [];
      for (let node of queue) {
        console.log(`Level ${level}: ${node.getCharacter()} ${node.getFrequency()}`);
        if (node.left != null) {
          newQueue.push(node.left);
        }
        if (node.right != null) {
          newQueue.push(node.right);
        }
      }
      queue = newQueue;
      level ++; 
    }
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
      nodes.push(new HuffmanBinaryTreeNode(frequency, character));
    }

    // Construct a min heap storing the frequency of each character
    const minHeap = new MinHeap(nodes);
    minHeap.heapify();
    // console.log("Verifying heap")
    // let currentMin = new HuffmanBinaryTreeNode(-1);
    // while (minHeap.length > 0) {
    //   console.log("Heap length:", minHeap.length);
    //   const headNode = minHeap.deleteMin();
    //   console.log(headNode);
    //   if (headNode.getFrequency() < currentMin.getFrequency()) {
    //     console.log("ERROR at: ", headNode, currentMin);
    //   }
    //   console.log("\n");
    //   currentMin = headNode;
    // }
    for (let node of minHeap.heap) {
      console.log(node);
    }

    // Keep on popping off the top two elements and merging them until there is only one node left in the min heap
    while (minHeap.length > 1) {
      console.log(minHeap.length);
      // Get the two smallest nodes in the minHeap
      const smallestFrequencyNode = minHeap.deleteMin(),
        secondSmallestFrequencyNode = minHeap.deleteMin();
      
      console.log("After delete length: ", minHeap.length);
      
      const mergedNodeFrequency = smallestFrequencyNode.getFrequency() + secondSmallestFrequencyNode.getFrequency();

      // Merge them into one node, by creating a new node the combined frequencies
      let mergedNode = new HuffmanBinaryTreeNode(
        mergedNodeFrequency,
        null,
        smallestFrequencyNode,
        secondSmallestFrequencyNode
      );

      // Put the new node back into the minHeap
      minHeap.insert(mergedNode);
      console.log("After insert length: ", minHeap.length);

    }

    // Return the only node
    return minHeap.deleteMin();
  }

  buildAdaptiveHuffmanTree() {}
}

export default HuffmanBinaryTree;
