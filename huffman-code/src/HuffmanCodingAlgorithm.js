import MinHeap from "./MinHeap";

class HuffmanBinaryTreeNode {
  constructor(
    frequency,
    character = null,
    nodeOrder = null,
    parent = null,
    leftChild = null,
    rightChild = null
  ) {
    this.character = character;
    this.frequency = frequency;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    // nodeNumber - tracks the node is created for static huffman
    // nodeOrder - tracks the ordering of node from left to right, bottom to up for adaptive huffman
    this.nodeNumber = HuffmanBinaryTreeNode.getNodeNumber();
    this.nodeOrder = nodeOrder;
  }

  static creationCounter = 0;

  static getNodeNumber() {
    return this.creationCounter++;
  }

  /*
   * Get methods
   */
  getFrequency() {
    return this.frequency;
  }

  getCharacter() {
    return this.character;
  }

  getNodeNumber() {
    return this.nodeNumber;
  }

  getNodeOrder() {
    return this.nodeOrder;
  }

  getChildren() {
    return [this.leftChild, this.rightChild];
  }

  getParent() {
    return this.parent;
  }

  /*
   * Set and Increment methods
   */
  setFrequency(newFrequency) {
    this.frequency = newFrequency;
  }

  setCharacter(newCharacter) {
    this.character = newCharacter;
  }

  setChildren(children) {
    this.leftChild = children[0];
    this.rightChild = children[1];
  }

  incrementFrequency() {
    this.frequency++;
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
    console.log("Printing current tree.");

    let queue = [this.root],
      level = 0;

    // Continiously iterate through each node until queue is empty
    while (queue.length > 0) {
      let newQueue = [],
        currentLevel = [];

      // Iterate through each node in the queue
      for (let node of queue) {
        currentLevel.push([
          node.getCharacter() === null
            ? "null"
            : node.getCharacter() === " "
            ? "Space"
            : node.getCharacter(),
          node.getFrequency(),
        ]);
        const nodeChildren = node.getChildren();
        if (nodeChildren[0] !== null) {
          newQueue.push(nodeChildren[0]);
        }
        if (nodeChildren[1] !== null) {
          newQueue.push(nodeChildren[1]);
        }
      }

      // Print out each node in each level
      console.log(`Level ${level}: ${currentLevel.toString()}`);
      queue = newQueue;
      level++;
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

    // Keep on popping off the top two elements and merging them until there is only one node left in the min heap
    while (minHeap.length > 1) {
      // Get the two smallest nodes in the minHeap
      const smallestFrequencyNode = minHeap.deleteMin(),
        secondSmallestFrequencyNode = minHeap.deleteMin();
      
      // Combine the two node's frequency
      const mergedNodeFrequency =
        smallestFrequencyNode.getFrequency() +
        secondSmallestFrequencyNode.getFrequency();

      // Merge them into one node, by creating a new node the combined frequencies
      let mergedNode = new HuffmanBinaryTreeNode(
        mergedNodeFrequency,
        null,
        null,
        null,
        smallestFrequencyNode,
        secondSmallestFrequencyNode
      );

      // Put the new node back into the minHeap
      minHeap.insert(mergedNode);
    }

    // Return the only node
    return minHeap.deleteMin();
  }


  swapNodeFeatures(headNode, currentNode) {
    const headNodeFrequency = headNode.getFrequency(),
      headNodeCharacter = headNode.getCharacter(),
      headNodeChildren = headNode.getChildren();

    headNode.setFrequency(currentNode.getFrequency());
    headNode.setCharacter(currentNode.getCharacter());
    headNode.setChildren(currentNode.getChildren());

    currentNode.setFrequency(headNodeFrequency);
    currentNode.setCharacter(headNodeCharacter);
    currentNode.setChildren(headNodeChildren);
  }

  updateObject(node, weight, blockObject) {
    if (!blockObject.hasOwnProperty(weight)) {
      blockObject[weight] = [node];
    } else {
      // Tail end will be lowest order; head will be the highest order
      blockObject[weight].push(node);
    }
  }

  binarySearch(array, targetNodeNumber) {
    let left = 0, right = array.length-1;
    while (left < right) {
      const mid = left + Math.floor((right - left)/2);
      if (array[mid].getNodeNumber() < targetNodeNumber) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left
  }

  /*
   * Uses the Vitter algorithm to create the adaptiveHuffmanTree
   * References: https://en.wikipedia.org/wiki/Adaptive_Huffman_coding,
   *             https://www2.cs.duke.edu/csed/curious/compression/adaptivehuff.html
   */
  buildAdaptiveHuffmanTree() {
    console.log(this.inputText);
    // Create a NYT node which will be the entry point for new characters
    let NYTNode = new HuffmanBinaryTreeNode(0, null, 5000);
    const root = NYTNode;
    // Create dictionaries: 
    // characterToNodeObject - key = character, value = tree nodes instance
    // weightToBlockObject - key = number, value = [[internal tree nodes], [leaf nodes]]
    const characterToNodeObject = {},
      weightToInternalBlockObject = {},
      weightToLeafBlockObject = {};   // ! this data structure can be optimized

    // Read each character in the array and update the HuffmanTree one at a time
    for (let character of this.inputText) {
      let currentInternalNode = null;

      // Check if we haven't seen this character already
      if (!characterToNodeObject.hasOwnProperty(character)) {
        const currentNYTNodeOrder = NYTNode.getNodeOrder();
        
        // Create two new tree nodes and cpnnect to parent
        const newLeafNode = new HuffmanBinaryTreeNode(1, character, currentNYTNodeOrder - 1, NYTNode),
          newNYTNode = new HuffmanBinaryTreeNode(0, null, currentNYTNodeOrder - 2, NYTNode);
        NYTNode.setChildren([newNYTNode, newLeafNode]);

        // Put the newLeafNode in the dictionaries
        characterToNodeObject[character] = newLeafNode;
        this.updateObject(newLeafNode, 1, weightToLeafBlockObject);
        // if (!weightToLeafBlockObject.hasOwnProperty(1)) {
        //   weightToLeafBlockObject[1] = [newLeafNode];
        // } else {
        //   // The tail end will be the lowest order
        //   weightToLeafBlockObject[1].push(newLeafNode);
        // }

        // Put the NYTNode in the dictionaries
        this.updateObject(NYTNode, 0, weightToInternalBlockObject);
        // if (!weightToInternalBlockObject.hasOwnProperty(0)) {
        //   weightToInternalBlockObject[0] = [NYTNode];
        // } else {
        //   weightToInternalBlockObject[0].push(NYTNode);
        // }
        
        // Reassign NYTNode and the NYTNode to the currentInternalNode to be iterated through 
        currentInternalNode = NYTNode;
        NYTNode = newNYTNode;
        console.log(NYTNode);
      } else {
        // Get the character's corresponding node
        let characterLeaf = characterToNodeObject[character];

        // Get the block's head leaf 
        let headLeaf = weightToLeafBlockObject[characterLeaf.getFrequency()][0];

        // Swap the block's head leaf with this node 
        if (headLeaf !== characterLeaf) {
          this.swapNodeFeatures(headLeaf, characterLeaf);
          // Update the dictionary
          characterToNodeObject[headLeaf.getCharacter()] = headLeaf;
          characterToNodeObject[characterLeaf.getCharacter()] = characterLeaf;
          
          // Swap pointers
          const tmpCharLeaf = characterLeaf;
          characterLeaf = headLeaf;
          headLeaf = tmpCharLeaf;
        }
        
        // Increment the characterLeaf and remove the node from block and add the node to new block
        // const characterLeafIndex = this.binarySearch(
        //   weightToLeafBlockObject[characterLeaf.getFrequency()],
        //   characterLeaf.getNodeOrder()
        // );
        weightToLeafBlockObject[characterLeaf.getFrequency()].splice(0, 1);
        characterLeaf.incrementFrequency();
        // Ensure that the leaf nodes precede the internal nodes
        // const lastNodeInternalNodeBlock = 
        //   weightToInternalBlockObject.hasOwnProperty(characterLeaf.getFrequency()) 
        //     && weightToInternalBlockObject[characterLeaf.getFrequency()].length > 0 
        //     ? weightToInternalBlockObject[characterLeaf.getFrequency()][weightToInternalBlockObject[characterLeaf.getFrequency()].length-1] 
        //     : null;   
        // if (lastNodeInternalNodeBlock && characterLeaf.getNodeOrder() > lastNodeInternalNodeBlock.getNodeOrder()) {
        //   // Swap the nodes and update dictionary
        //   this.swapNodeFeatures(characterLeaf, lastNodeInternalNodeBlock);
        //   weightToInternalBlockObject[characterLeaf.getFrequency()][weightToInternalBlockObject[characterLeaf.getFrequency()].length-1] = characterLeaf;
        //   weightToInternalBlockObject[characterLeaf.getFrequency()].sort((a, b) => b.getNodeOrder() - a.getNodeOrder())
        //   characterLeaf = lastNodeInternalNodeBlock;
        //   characterToNodeObject[characterLeaf.getCharacter()] = characterLeaf;
        // }
        this.updateObject(characterLeaf, characterLeaf.getFrequency(), weightToLeafBlockObject);

        // Update the currentInternalNode
        currentInternalNode = characterLeaf.getParent();
      }
      console.log("Character ", character);
      // Iterate through all the internal nodes until we hit the root and increment everyone of them 
      while (currentInternalNode.getParent() !== null) {
        console.log(currentInternalNode);
        console.log(weightToInternalBlockObject);
        console.log(
          `Frequency: ${currentInternalNode.getFrequency()}; ${weightToInternalBlockObject[currentInternalNode.getFrequency()]}`
        );
        // Get the block's head internal node
        let headInternalNode = weightToInternalBlockObject[currentInternalNode.getFrequency()][0];

        // Swap block head with current Internal Node
        if (headInternalNode !== currentInternalNode) {
          this.swapNodeFeatures(headInternalNode, currentInternalNode);

          // Swap pointers
          const tmpInternalNode = currentInternalNode;
          currentInternalNode = headInternalNode;
          headInternalNode = tmpInternalNode;
        }

        // Increment the currentInternalNode
        weightToInternalBlockObject[currentInternalNode.getFrequency()].splice(0, 1);
        currentInternalNode.incrementFrequency();
        
        // Ensure the currentInternalNode is ahead of the head of the block leaf
        const headBlockLeaf = 
          weightToLeafBlockObject.hasOwnProperty(currentInternalNode.getFrequency())
          && weightToLeafBlockObject[currentInternalNode.getFrequency()].length > 0
          ? weightToLeafBlockObject[currentInternalNode.getFrequency()][0]
          : null;
        if (headBlockLeaf && currentInternalNode.getNodeOrder() < headBlockLeaf.getNodeOrder()) {
          // Swap the two nodes
          this.swapNodeFeatures(currentInternalNode, headBlockLeaf);
          weightToLeafBlockObject[currentInternalNode.getFrequency()][0] = currentInternalNode;
          weightToLeafBlockObject[currentInternalNode.getFrequency()].sort((a, b) => b.getNodeOrder() - a.getNodeOrder())
          characterToNodeObject[currentInternalNode.getCharacter()] = currentInternalNode;
          currentInternalNode = headBlockLeaf;
        }
        this.updateObject(currentInternalNode, currentInternalNode.getFrequency(), weightToInternalBlockObject);

        // Reset the internal node pointer
        currentInternalNode = currentInternalNode.getParent();
      }
      weightToInternalBlockObject[currentInternalNode.getFrequency()].splice(0, 1);
      currentInternalNode.incrementFrequency();
      this.updateObject(currentInternalNode, currentInternalNode.getFrequency(), weightToInternalBlockObject);
    }

    console.log(characterToNodeObject);
    console.log(root);
    return root;
  }
}

export default HuffmanBinaryTree;
