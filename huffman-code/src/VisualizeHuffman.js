import { select, tree, hierarchy, linkVertical, zoom } from 'd3';

function visualizeHuffman(data) {
  // Get the svg element and the height/width of it 
  const svg = select("svg");
  const svgHeight = svg.node().getBoundingClientRect().height,
    svgWidth = svg.node().getBoundingClientRect().width;
  
  // Clear the current svg content
  svg.selectAll("*").remove();

  // Use margin convention to show the entire tree
  const margin = { top: 25, right: 0, bottom: 10, left: 0};
  const innerHeight = svgHeight - margin.top - margin.bottom,
    innerWidth = svgWidth - margin.left - margin.right;
  
  // Create some groups 
  const zoomG = svg.append("g");  
  const svgG = zoomG.append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
  // Enable zooming on the svg
  svg.call(zoom().on("zoom", (e) => {
      zoomG.attr("transform", e.transform);
    }));

  // Construst a d3 tree from the height and width of the svg
  const treeLayout = tree().size([innerWidth, innerHeight]);

  // Get the root of the data
  const root = hierarchy(data);  
  const links = treeLayout(root).links();
  const linkPathGenerator = linkVertical()
    .x(d => d.x)
    .y(d => d.y);
  
  svgG.selectAll("path")
    .data(links).enter()
    .append("path")
      .attr("d", linkPathGenerator)

  svgG.selectAll("text")
    .data(root.descendants()).enter()
    .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("text-anchor", "middle")
      .text((d) => `'${d.data.name === null ? "null" : d.data.name}'`);

}

export default visualizeHuffman;