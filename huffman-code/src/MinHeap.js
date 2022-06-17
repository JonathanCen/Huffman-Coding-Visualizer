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
    // console.log(
    //   "before:",
    //   this.heap[firstNodeIndex],
    //   this.heap[secondNodeIndex]
    // );
    const tmpNode = this.heap[firstNodeIndex];
    this.heap[firstNodeIndex] = this.heap[secondNodeIndex];
    this.heap[secondNodeIndex] = tmpNode;
    // console.log(
    //   "after:",
    //   this.heap[firstNodeIndex],
    //   this.heap[secondNodeIndex]
    // );
  }

  getNodeValue(index) {
    return index < this.heap.length ? this.heap[index].frequency : Infinity;
  }

  /*
   * Sift Down: iteratively sifts down on an element (index)
   */
  siftDown(index) {
    let leftChildIndex = this.computeLeftChildIndex(index),
      rightChildIndex = this.computeRightChildIndex(index);

    let leftChildValue = this.getNodeValue(leftChildIndex),
      rightChildValue = this.getNodeValue(rightChildIndex);

    let currentNodeValue = this.heap[index].getFrequency();
    
    // console.log(
    //   "Tree: ",
    //   index,
    //   currentNodeValue,
    //   "left child: ",
    //   leftChildIndex,
    //   leftChildValue,
    //   "right child: ",
    //   rightChildIndex,
    //   rightChildValue
    // );

    // Ensure that the index is indexable and
    while (
      index < this.heap.length &&
      (currentNodeValue > leftChildValue || currentNodeValue > rightChildValue)
    ) {
      // Get the min value and index among both children
      const minChildValue = Math.min(
        leftChildValue,
        rightChildIndex < this.heap.length ? rightChildValue : Infinity
      );
      const minChildIndex =
        minChildValue === leftChildValue ? leftChildIndex : rightChildIndex;

      // Swap the current position with the min child index
      this.swap(index, minChildIndex);

      // Set the index to the swapped index, and reset left/right child index and child value
      index = minChildIndex;
      currentNodeValue = this.heap[index].getFrequency();
      leftChildIndex = this.computeLeftChildIndex(index);
      rightChildIndex = this.computeRightChildIndex(index);
      leftChildValue = this.getNodeValue(leftChildIndex);
      rightChildValue = this.getNodeValue(rightChildIndex);
    }
  }

  /*
   * Sift up: iteratively sift up on an element (index)
   */
  siftUp(index) {
    // If the index is odd, then its a left child; if the index is even, then its a right child
    let parentIndex = this.computeParentIndex(index);
    while (index > 0 && this.getNodeValue(index) < this.getNodeValue(parentIndex)) {
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
    // console.log('After heap: ', this.heap);
  }

  /*
   * Insertion: Append to the end to the heap and sift up
   */
  insert(insertNode) {
    this.heap.push(insertNode);
    this.length += 1;
    // console.log(this.heap);
    this.siftUp(this.heap.length - 1);
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
        ? { "frequency": this.heap[index].frequency }
        : {
            "character": this.heap[index].character,
            "frequency": this.heap[index].frequency,
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
