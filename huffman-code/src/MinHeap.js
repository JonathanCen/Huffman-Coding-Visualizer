/*
 * Creates a minheap given an input array
 */
class MinHeap {
  constructor(array) {
    this.heap = array;
    this.length = array.length;
  }

  /*
   * Helper functions
   */
  computeLeftChildIndex(index) {
    return index * 2 + 1;
  }

  computeRightChildIndex(index) {
    return index * 2 + 2;
  }

  computeParentIndex(index) {
    return index % 2 === 1
      ? Math.floor((index - 1) / 2)
      : Math.floor((index - 2) / 2);
  }

  swap(firstNodeIndex, secondNodeIndex) {
    // console.log("Swapping: ", this.heap[firstNodeIndex], "with ", this.heap[secondNodeIndex]);
    const tmpNode = this.heap[firstNodeIndex];
    this.heap[firstNodeIndex] = this.heap[secondNodeIndex];
    this.heap[secondNodeIndex] = tmpNode;
  }

  getNodeFrequency(index) {
    return index < this.heap.length
      ? this.heap[index].getFrequency()
      : Infinity;
  }

  getNodeCharacter(index) {
    return index < this.heap.length
      ? this.heap[index].getCharacter()
      : undefined;
  }

  getNodeNumber(index) {
    return index < this.heap.length
      ? this.heap[index].getNodeNumber()
      : undefined;
  }

  /*
   * 1. Min frequency closer to the root
   * 2. Leaf nodes (with character) closer to root
   * 3. If both leaf nodes, ASCII code smaller closer to root
   * 4. If both non leaf nodes, then order by time of creation
   */

  /*
   * Sift Down: iteratively sifts down on an element (index)
   */
  oldSiftDown(index) {
    let leftChildIndex = this.computeLeftChildIndex(index),
      rightChildIndex = this.computeRightChildIndex(index);

    let leftChildFrequency = this.getNodeFrequency(leftChildIndex),
      rightChildFrequency = this.getNodeFrequency(rightChildIndex);

    let currentNodeFrequency = this.getNodeFrequency(index);

    // Ensure that the index is indexable and
    while (
      index < this.heap.length &&
      (currentNodeFrequency > leftChildFrequency ||
        currentNodeFrequency > rightChildFrequency)
    ) {
      // Get the min value and index among both children
      const minChildValue = Math.min(leftChildFrequency, rightChildFrequency);
      const minChildIndex =
        minChildValue === leftChildFrequency ? leftChildIndex : rightChildIndex;

      // Swap the current position with the min child index
      this.swap(index, minChildIndex);

      // Set the index to the swapped index, and reset left/right child index and child value
      index = minChildIndex;
      currentNodeFrequency = this.heap[index].getFrequency();
      leftChildIndex = this.computeLeftChildIndex(index);
      rightChildIndex = this.computeRightChildIndex(index);
      leftChildFrequency = this.getNodeFrequency(leftChildIndex);
      rightChildFrequency = this.getNodeFrequency(rightChildIndex);
    }
  }

  checkFrequencyEquality(currentNodeIndex, childNodeIndex) {
    const childFrequency = this.getNodeFrequency(childNodeIndex),
      childCharacter = this.getNodeCharacter(childNodeIndex),
      childNodeNumber = this.getNodeNumber(childNodeIndex);

    const currentNodeFrequency = this.getNodeFrequency(currentNodeIndex),
      currentNodeCharacter = this.getNodeCharacter(currentNodeIndex),
      currentNodeNumber = this.getNodeNumber(currentNodeIndex);

    return (
      currentNodeFrequency === childFrequency &&
      ((childCharacter !== undefined &&
        ((childCharacter !== null && currentNodeCharacter === null) ||
          (childCharacter !== null &&
            currentNodeCharacter !== null &&
            childCharacter.charCodeAt(0) < currentNodeCharacter.charCodeAt(0)))) ||
      (childCharacter === null &&
        currentNodeCharacter === null &&
        childNodeNumber < currentNodeNumber))
    );
  }

  greaterPrioChildIndex(leftChildIndex, rightChildIndex) {
    const leftChildCharacter = this.getNodeCharacter(leftChildIndex),
      leftChildNodeNumber = this.getNodeNumber(leftChildIndex),
      rightChildCharacter = this.getNodeCharacter(rightChildIndex),
      rightChildNodeNumber = this.getNodeNumber(rightChildIndex);

    let greaterPrioIndex = null;
    // If both children are leaf nodes
    if (
      leftChildCharacter !== null && 
      rightChildCharacter !== null
     ) {
      greaterPrioIndex =
        leftChildCharacter.charCodeAt(0) < rightChildCharacter.charCodeAt(0)
          ? leftChildIndex
          : rightChildIndex;
    } else if (
      leftChildCharacter !== null ||
      rightChildCharacter !== null
    ) {
      greaterPrioIndex =
        leftChildCharacter !== null
          ? leftChildIndex
          : rightChildIndex;
    } else {
      greaterPrioIndex =
        leftChildNodeNumber < rightChildNodeNumber
          ? leftChildIndex
          : rightChildIndex;
    }
    return greaterPrioIndex;
  }

  /*
   * 1. Min frequency closer to the root (1)
   * 2. If current frequency same as the child, Leaf nodes (with character) closer to root
   * 2a. If both leaf nodes, ASCII code smaller closer to root
   * 2b. If both non leaf nodes, then order by time of creation
   */
  siftDown(index) {
    while (index < this.length) {
      const leftChildIndex = this.computeLeftChildIndex(index),
        rightChildIndex = this.computeRightChildIndex(index);

      const leftChildFrequency = this.getNodeFrequency(leftChildIndex),
        rightChildFrequency = this.getNodeFrequency(rightChildIndex);

      const currentNodeFrequency = this.getNodeFrequency(index);

      // Get the min value and index among both children
      const minChildValue = Math.min(leftChildFrequency, rightChildFrequency);

      // Check if the current node can swap with the smallest frequency among the children
      if (currentNodeFrequency > minChildValue) {
        const minChildIndex =
          leftChildFrequency === rightChildFrequency
            ? this.greaterPrioChildIndex(leftChildIndex, rightChildIndex)
            : minChildValue === leftChildFrequency
            ? leftChildIndex
            : rightChildIndex; ;
          this.swap(index, minChildIndex);
        index = minChildIndex;
        // Since we can swap with one of the children, we can continue to check the new children
        continue;
      }

      // Check if the current node frequency is the same as the childrens
      let newIndex = undefined;

      // Check if the current node's frequency is the same as the left or right child
      if (
        currentNodeFrequency === leftChildFrequency &&
        currentNodeFrequency === rightChildFrequency
      ) {
        // If both child have the same frequency then we will swap with the best child
        const greaterChildIndex = this.greaterPrioChildIndex(
          leftChildIndex,
          rightChildIndex
        );
        if (this.checkFrequencyEquality(index, greaterChildIndex)) {
          this.swap(index, greaterChildIndex);
          newIndex = greaterChildIndex;
        }
      } else if (this.checkFrequencyEquality(index, leftChildIndex)) {
        this.swap(index, leftChildIndex);
        newIndex = leftChildIndex;
      } else if (this.checkFrequencyEquality(index, rightChildIndex)) {
        this.swap(index, rightChildIndex);
        newIndex = rightChildIndex;
      }

      // If we are not able to assign a newIndex to the current index, then we were not able to swap
      // and we break out of the loop
      if (newIndex === undefined) {
        break;
      }

      // Reset the index to the current node position index
      index = newIndex;
    }
  }

  /*
   * Sift up: iteratively sift up on an element (index)
   */
  siftUp(index) {
    // If the index is odd, then its a left child; if the index is even, then its a right child
    let parentIndex = this.computeParentIndex(index);
    while (
      index > 0 &&
      this.getNodeFrequency(index) < this.getNodeFrequency(parentIndex)
    ) {
      // Swap the two index
      this.swap(index, parentIndex);

      // Set the index to the swapped index, and reset the parentIndex
      index = parentIndex;
      parentIndex = this.computeParentIndex(index);
    }
  }

  /* !!! Need to test this function
   * Creates a minHeap from the array
   * Starts from the last parent element and sift down until we hit the leaf or don't need to sift down
   */
  heapify() {
    // console.log('Before heap: ', this.heap);
    let parentIndex = Math.floor(this.heap.length / 2) - 1;
    while (parentIndex > -1) {
      this.siftDown(parentIndex);
      parentIndex -= 1;
    }
  }

  /*
   * Insertion: Append to the end to the heap and sift up
   */
  insert(insertNode) {
    this.heap.push(insertNode);
    this.length += 1;
    this.siftUp(this.length - 1);
  }

  /*
   * Deletion: Swap the root with the last element and sift down
   */
  deleteMin() {
    // Swap root with the last element
    this.swap(0, this.heap.length - 1);

    // Then remove the last element and decrement the length
    const removedNode = this.heap.pop();
    this.length -= 1;

    // Then sift down on the root element
    if (this.length > 0) {
      this.siftDown(0);
    }

    // Return the removed node
    return removedNode;
  }

  /*
   * Convert heap to JSON format, so d3js can parse the tree properly
   */
  jsonifyHelper(index) {
    // Compute the left/right child index
    const leftChildIndex = this.computeLeftChildIndex(index),
      rightChildIndex = this.computeRightChildIndex(index);

    // Create a default node
    const currentNode =
      this.heap[index].character === null
        ? { frequency: this.heap[index].frequency }
        : {
            character: this.heap[index].character,
            frequency: this.heap[index].frequency,
          };

    // Check if leaf index
    if (
      !(leftChildIndex < this.heap.length || rightChildIndex < this.heap.length)
    ) {
      return currentNode;
    }

    // Then its some parent node, so it has some children
    const nodeChildren = [];

    if (leftChildIndex < this.heap.length) {
      nodeChildren.push(this.jsonifyHelper(leftChildIndex));
    }

    if (rightChildIndex < this.heap.length) {
      nodeChildren.push(this.jsonifyHelper(rightChildIndex));
    }

    // Assign the children back to the node
    currentNode["children"] = nodeChildren;

    return currentNode;
  }

  jsonify() {
    return this.jsonifyHelper(0);
  }
}

export default MinHeap;
