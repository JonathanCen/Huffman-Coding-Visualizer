import { select, tree, hierarchy } from 'd3';

function visualizeHuffman(data) {
  const svg = select("svg");
  const svgHeight = svg.node().getBoundingClientRect().height,
    svgWidth = svg.node().getBoundingClientRect().width;
  console.log('data:', data);
  const root = hierarchy(data);
  console.log(root);
}

export default visualizeHuffman;