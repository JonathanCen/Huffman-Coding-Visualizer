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

  getLeftChild() {
    return this.leftChild;
  }

  getRightChild() {
    return this.rightChild;
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

  setParent(parent) {
    this.parent = parent;
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

  reassignParent(childrenNodes, parentNode) {
    for (let child of childrenNodes) {
      if (child !== null) {
        child.setParent(parentNode);
      }
    }
  }

  swapNodeFeatures(headNode, currentNode) {
    // Swap each node's attributes
    const headNodeFrequency = headNode.getFrequency(),
      headNodeCharacter = headNode.getCharacter(),
      headNodeChildren = headNode.getChildren();

    const currentNodeChildren = currentNode.getChildren();

    headNode.setFrequency(currentNode.getFrequency());
    headNode.setCharacter(currentNode.getCharacter());
    headNode.setChildren(currentNode.getChildren());

    currentNode.setFrequency(headNodeFrequency);
    currentNode.setCharacter(headNodeCharacter);
    currentNode.setChildren(headNodeChildren);

    // Reassign the children to their appropriate parent
    this.reassignParent(headNodeChildren, currentNode);
    this.reassignParent(currentNodeChildren, headNode);
  }

  updateObjectValues(nodeOne, object, weight) {
    const array = object[weight];
    const nodeOneIndex = array.length;
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

  checkObjectHasProperty(object, weight) {
    return object.hasOwnProperty(weight) && object[weight].length > 0;
  }

  getBlockLeader(object, weight) {
    return object.hasOwnProperty(weight) && object[weight].length > 0 ? object[weight][0] : null;
  }

  /*
   * Uses the Vitter algorithm to create the adaptiveHuffmanTree
   * References: https://en.wikipedia.org/wiki/Adaptive_Huffman_coding,
   *             https://www2.cs.duke.edu/csed/curious/compression/adaptivehuff.html
   */
  oldBuildAdaptiveHuffmanTree() {
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

        // Put the NYTNode in the dictionaries
        this.updateObject(NYTNode, 0, weightToInternalBlockObject);
        
        // Reassign NYTNode and the NYTNode to the currentInternalNode to be iterated through 
        currentInternalNode = NYTNode;
        NYTNode = newNYTNode;
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
        weightToLeafBlockObject[characterLeaf.getFrequency()].splice(0, 1);
        characterLeaf.incrementFrequency();

        // Ensure that the leaf nodes weight w precede the internal nodes weight w
        // Find the leader block node weight w
        
        // Swap the leader block node with currentLeaf 

        // Check if leader block is an internal node, then swap the leader with lead leaf 

        // Update the object
        this.updateObject(characterLeaf, characterLeaf.getFrequency(), weightToLeafBlockObject);

        // Update the currentInternalNode
        currentInternalNode = characterLeaf.getParent();
      }

      // Iterate through all the internal nodes until we hit the root and increment everyone of them 
      while (currentInternalNode.getParent() !== null) {
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

  buildAdaptiveHuffmanTree() {
    // Create a NYT node which will be the entry point for new characters
    const maxNodeOrder = 50000;
    let NYTNode = new HuffmanBinaryTreeNode(0, null, maxNodeOrder);
    const root = NYTNode;
    
    // Create dictionaries:
    // ! Believe can optimize this structure, to have a dictionary linkedlist, s.t. the values can be connected through pointers (allowing easy insertion and deletion)
    const characterToNodeObject = {},
      weightToInternalBlockObject = {},
      weightToLeafBlockObject = {};
    
    // Iterate through each character of the input text
    for (let character of this.inputText) {
      console.log(character);
      console.log(weightToInternalBlockObject);
      console.log(weightToLeafBlockObject);
      // Depending on the whether we seen the character or not the internal node will differ
      let characterLeaf = null;

      // Either insert a new leaf into the tree or increment the frequency of an existing leaf
      if (!characterToNodeObject.hasOwnProperty(character)) {
        // Create two new tree nodes and connect to parent
        const currentNYTNodeOrder = NYTNode.getNodeOrder();
        const newNYTNode = new HuffmanBinaryTreeNode(0, null, currentNYTNodeOrder - 2, NYTNode);
        characterLeaf = new HuffmanBinaryTreeNode(1, character, currentNYTNodeOrder - 1, NYTNode);
        NYTNode.setChildren([newNYTNode, characterLeaf]);

        // Put the new leaf in the dictionaries
        characterToNodeObject[character] = characterLeaf;
        this.updateObject(characterLeaf, 1, weightToLeafBlockObject);

        // Put the NYTNode in the dictionaries
        this.updateObject(NYTNode, 0, weightToInternalBlockObject);

        // Reassign NYTNode and the newNYTNode
        NYTNode = newNYTNode;
      } else {
        // Get the leaf node assoicated with the character
        characterLeaf = characterToNodeObject[character];
        const characterLeafWeight = characterLeaf.getFrequency(); 
        let blockLeader = this.getBlockLeader(weightToInternalBlockObject, characterLeafWeight),
          leafLeader = this.getBlockLeader(weightToLeafBlockObject, characterLeafWeight);

        // Swap the block's leader with this node
        // If the leafLeader is the same as the characterLeaf, if so don't swap
        if (leafLeader !== characterLeaf) {
          console.log("Comparing line 394");

          // Swap the features
          this.swapNodeFeatures(leafLeader, characterLeaf);

          // Swap pointers
          const tmpLeafPointer = characterLeaf;
          characterLeaf = leafLeader;
          leafLeader = tmpLeafPointer;

          // Update the objects
          characterToNodeObject[leafLeader.getCharacter()] = leafLeader;
          characterToNodeObject[characterLeaf.getCharacter()] = characterLeaf;

          // The characterLeaf is now the leader of the leafs
        }

        // If the block's leader is internal node, then swap the characterLeaf with the leafLeader and swap the characterLeaf with the blockLeader
        if (blockLeader !== null && blockLeader !== root && characterLeaf.getParent() !== blockLeader) {
          console.log("Comparing line 412", blockLeader, characterLeaf);
          // Swap the features
          this.swapNodeFeatures(blockLeader, characterLeaf);

          // Swap pointers
          const tmpLeafPointer = characterLeaf;
          characterLeaf = blockLeader;
          blockLeader = tmpLeafPointer;

          // Update the objects
          characterToNodeObject[characterLeaf.getCharacter()] = characterLeaf;

          // Remove the blockLeader node from weightToInternalBlockObject
          // const blockLeaderPreviousIndex = weightToInternalBlockObject[characterLeafWeight].findIndex((node) => node.getNodeOrder() === characterLeaf.getNodeOrder());
          // weightToInternalBlockObject[characterLeafWeight].splice(blockLeaderPreviousIndex, 1);
          weightToInternalBlockObject[characterLeafWeight].splice(0, 1, blockLeader);
          // weightToInternalBlockObject[characterLeafWeight].push(blockLeader);
          weightToInternalBlockObject[characterLeafWeight].sort((a, b) => b.getNodeOrder() - a.getNodeOrder());

          // Remove the characterLeader node from weightToLeafBlockObject and add the characterLeaf to the front of the array
          weightToLeafBlockObject[characterLeafWeight].splice(0, 1, characterLeaf); // Probably not necessary
        }

        // Increase the frequency, and remove it from the dictionary and add it to weight + 1 
        // Remove characterLeafWeight from weightToLeafBlockObject  
        console.log("Checking if removing:", weightToLeafBlockObject);
        weightToLeafBlockObject[characterLeafWeight].splice(0, 1);
        characterLeaf.incrementFrequency();
        this.updateObject(characterLeaf, characterLeafWeight+1, weightToLeafBlockObject);
      }

      console.log(characterLeaf.getParent().getNodeOrder());

      // Iterate upwards from the leaf to the root incrementing and swapping the internal nodes we past
      let currentInternalNode = characterLeaf.getParent();
      console.log(`CurrentInternalNode ${currentInternalNode.getNodeOrder()}`)
      while (currentInternalNode.getParent() !== null) {
        const currentInternalNodeWeight = currentInternalNode.getFrequency();
        // Swap with the leaf node of w+1 weight, swap this currentInternalNode with the blockLeader
        let leafLeader = this.getBlockLeader(weightToLeafBlockObject, currentInternalNodeWeight+1),
          blockLeader = this.getBlockLeader(weightToInternalBlockObject, currentInternalNodeWeight);

        let nextNode = null;

        if (blockLeader !== currentInternalNode) {
          console.log("Comparing line 455", blockLeader.getCharacter(), currentInternalNode.getCharacter());
          // Swap the features
          this.swapNodeFeatures(blockLeader, currentInternalNode);

          // Swap the pointers
          const tmpLeafPointer = currentInternalNode;
          currentInternalNode = blockLeader;
          blockLeader = tmpLeafPointer;

          // The currentInternalNode is now the leader of the internal node block
        }

        // Check if there exists a leafLeader, if so swap; otherwise, no need to swap
        if (leafLeader !== null && leafLeader.getNodeOrder() > currentInternalNode.getNodeOrder()) {
          console.log("Comparing line 469");
          // console.log(
          //   `LeafLeader : ${leafLeader.getNodeOrder()}, currentInternalNode: ${currentInternalNode.getNodeOrder()}`
          // );
          // Swap the features
          this.swapNodeFeatures(currentInternalNode, leafLeader);

          // Swap pointers
          const tmpLeafPointer = leafLeader;
          leafLeader = currentInternalNode;
          currentInternalNode = tmpLeafPointer;
          // Update the objects
          characterToNodeObject[leafLeader.getCharacter()] = leafLeader;

          // Remove the old leafLeader node from weightToLeafBlockObject
          weightToLeafBlockObject[currentInternalNodeWeight+1].splice(0, 1, leafLeader);
          // weightToLeafBlockObject[currentInternalNodeWeight+1].push(leafLeader);
          weightToLeafBlockObject[currentInternalNodeWeight+1].sort((a, b) => b.getNodeOrder()-a.getNodeOrder()); // Do this for now

          // Remove the currentInternal node from the weightToInternalBlockObject
          weightToInternalBlockObject[currentInternalNodeWeight].splice(0, 1, currentInternalNode);

          nextNode = leafLeader.getParent();
        }

        weightToInternalBlockObject[currentInternalNodeWeight].splice(0, 1);
        currentInternalNode.incrementFrequency();
        this.updateObject(currentInternalNode, currentInternalNode.getFrequency(), weightToInternalBlockObject);

        currentInternalNode =
          nextNode !== null ? nextNode : currentInternalNode.getParent();
      }

      // Increment the root node and put it to the correct entry
      weightToInternalBlockObject[currentInternalNode.getFrequency()].splice(0, 1);
      currentInternalNode.incrementFrequency();
      this.updateObject(currentInternalNode, currentInternalNode.getFrequency(), weightToInternalBlockObject);
    }

    return root;
  }
}

export default HuffmanBinaryTree;
