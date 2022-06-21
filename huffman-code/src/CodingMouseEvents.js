import { active, select, selectAll } from 'd3';

const animatePath = (character, huffmanTreePaths) => {
  // Extract the node paths, branch paths, and leaf number
  const characterPathNodes = huffmanTreePaths[character]["nodePath"],
    branchPathNodes = huffmanTreePaths[character]["branchPath"],
    leafNumber = huffmanTreePaths[character]["leafNumber"];

  console.log(huffmanTreePaths);
  const svgG = select('svg>g>g');

  // Select nodes, branch, leaves
  svgG
      .selectAll("circle.node")
      .filter((_, i) => characterPathNodes.includes(i))
      .transition()
      .duration(750)
      .attr("r", 25);
  
  const pathBranches = selectAll("line").filter((_, i) =>
      branchPathNodes.includes(i)
    ),
    leafNodes = selectAll("rect.node").filter((_, i) => i === leafNumber);

  // Add chain transition 
  //  circleNodes.selectAll();
    // .on("start", () => {
    //   console.log(active(this));
    //   active(this)
    //     .transition()
    //     .attr('r', 25);
    // })
}

const mouseEnter = (e, huffmanTreePaths) => {
  const id = e.target.id.split("-")[2];
  document
    .getElementById(`ascii-coding-${id}`)
    .classList.add("coding-span-hover");
  document
    .getElementById(`huffman-coding-${id}`)
    .classList.add("coding-span-hover");
  document
    .getElementById(`text-coding-${id}`)
    .classList.add("coding-span-hover");
  const character = document.getElementById(`text-coding-${id}`).innerText.trim().split(`'`)[1];
  animatePath(character === 'Space' ? ' ' : character, huffmanTreePaths);
};

const mouseLeave = (e) => {
  const id = e.target.id.split("-")[2];
  document
    .getElementById(`ascii-coding-${id}`)
    .classList.remove("coding-span-hover");
  document
    .getElementById(`huffman-coding-${id}`)
    .classList.remove("coding-span-hover");
  document
    .getElementById(`text-coding-${id}`)
    .classList.remove("coding-span-hover");
};

export { mouseEnter, mouseLeave };
