import { select, transition, tree, hierarchy, zoom, easeCircle, easeBounce } from "d3";

function zoomFit(root, isOnlyRoot) {
  // Get the tree bounds and svg element
  const bounds = root.node().getBBox(),
    svgElement = root.node().parentElement.parentElement;

  // Get the svg container dimensions/tree dimensions
  const svgContainerWidth = svgElement.width.baseVal.value,
    svgContainerHeight = svgElement.height.baseVal.value,
    treeWidth = bounds.width,
    treeHeight = bounds.height,
    midX = bounds.x + treeWidth / 2,
    midY = bounds.y + treeHeight / 2;
  
  // Compute the scale and translate needed to center the tree
  const scale = (isOnlyRoot ? .4 : 0.85) / Math.max(treeWidth / svgContainerWidth, treeHeight / svgContainerHeight);
  const translate = [svgContainerWidth / 2 - scale * midX, svgContainerHeight / 2 - scale * midY];

  // Apply the scale and translate to the tree
  root.attr("transform", `translate(${translate}) scale(${scale})`);
}

function visualizeHuffman(data) {
  // Get the svg element and the height/width of it 
  const svg = select('svg');
  const svgWidth = svg.node().getBoundingClientRect().width;

  // Clear the current svg content
  svg.selectAll('*').remove();

  // Use margin convention to show the entire tree
  const margin = { top: 25, right: 0, bottom: 20, left: svgWidth/2};

  // Create some groups 
  const zoomG = svg.append('g');  
  const svgG = zoomG.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
  // Enable zooming on the svg
  svg.call(zoom().on('zoom', (e) => {
      zoomG.attr('transform', e.transform);
    }));

  // Node dimensions & spacing among nodes
  const rectLeafDim = { width: 50, height: 30 },
    nonLeafNodes = { radius : 20 };

  const horizontalSeparation = 16,
    verticalSeparation = 50;  

  // Construst a d3 tree from the height and width of the svg
  const treeLayout = tree().nodeSize([
    rectLeafDim.width + horizontalSeparation,
    rectLeafDim.height + verticalSeparation,
  ]).separation((a, b) => a.parent === b.parent ? 1 : 1.5);

  // Get the root/links/nodes of the data
  const root = hierarchy(data);  
  const links = treeLayout(root).links();
  const nodes = root.descendants().reverse();

  // Normalize the depth
  nodes.forEach((d) => {d.y = d.depth * 180;})

  /*
   * 1) Add nodes to the tree (Done)
   * 2) Add the more data to the tree (fix the nodes) (Done)
   * 3) Add labels to the paths (Done)
   * 4) Fix the coloring scheme 
   * 5) Add transitions 
   * 6) Make it responsive (Done)
   */

  treeLayout(root);

  // Draw the branches/lines of the tree
  const branches = svgG.selectAll('line')
    .data(links).enter();

  branches.append('line')
        .attr('id', (d, i) => `line-${i}`)
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)
        .attr('stroke', 'darkgray')
        .attr('stroke-width', 1e-6);

  // Computes the mid point for the x and y axis of the line text
  const computeMidpoint = (d, i, x=true) => {
    return x ? (i%2 === 0 ? ((d.source.x + d.target.x)/2)-10 : (d.source.x + d.target.x)/2) : (d.source.y + d.target.y)/2
  }

  // Assigns the text for the branches (left = 0; right = 1)
  const assignPathText = (d) => {
    return d.source.data.children[0] === d.target.data ? "0" : "1";
  };

  // Add text on the branches
  const branchText = svgG.selectAll('path-text.label')
    .data(links).enter();
  
  branchText.append('text')
        .classed('path-text', true)
        .attr('x', (d, i) =>  computeMidpoint(d, i))
        .attr('y', (d, i) => computeMidpoint(d, i, false))
        .text((d) => assignPathText(d))
        .attr("fill-opacity", 1e-6);

  // Add transition for branches
  const duration = 750;
  const branchTransition = transition()
    .duration(duration)
    .ease(easeBounce);

  branches.selectAll("line")
    .transition(branchTransition)
    .attr('stroke-width', 2);
  
  branchText.selectAll("text")
    .transition(branchTransition)
    .attr("fill-opacity", 1);

  // Draw circle nodes for non-leaf values
  const circleNodes = svgG.selectAll('circle.node')
    .data(root.descendants().filter(node => node.data.name === null)).enter()
  
  circleNodes.append('circle')
    .classed('node', true)
    .attr('id', (_,i) => `circle-node-${i}`)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 1e-6)
    // .attr('r', nonLeafNodes.radius)
    .attr('fill', 'lightblue')
    .attr('stroke', 'darkgray')
    .attr('stroke-width', 1e-6);

/*
  // Add tooltips to the leaf nodes of the tree
  const tooltip = svgG
    .append("div")
    .classed("tooltip", true)
    .style("opacity", 1);

  svg.on('mouseover', (e, d) => {
    svgG.selectAll('rect.node')
      .transition()
      .duration(100)
      .attr("width", rectLeafDim.width)
      .attr("height", rectLeafDim.height);
    svgG.selectAll('text.label')
      .transition()
      .duration(100)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y+5) // Change the position of the text in the nodes
    tooltip.transition()
      .duration(150)
      .style("opacity", 0);
  })
*/
  // Draw a rectangle for leaf nodes
  const rectangleNodes = svgG.selectAll('rect.node')
    .data(root.descendants().filter(node => node.data.name !== null)).enter();
  
  rectangleNodes.append('rect')
    .classed('node', true)
    .attr('id', (d, i) => `rect-node-${i}`)
    .attr('x', (d) => d.x - (rectLeafDim.width/2))
    .attr('y', (d) => d.y - (rectLeafDim.height/2))
    .attr('rx', 4)
    .attr('width', 1e-6)
    .attr('height', 1e-6)
    .attr('fill', '#edf4fb')
    .attr('stroke', 'darkgray');

/*
    .on('mouseover',  (e, d) => {
      const idNum = e.target.id.split("-")[2];
      svgG.select(`#rect-node-${idNum}`)
        .transition()
        .duration(100)
        .attr("width", rectLeafDim.width + 10)
        .attr("height", rectLeafDim.height + 10);
      svgG
        .select(`#leaf-node-${idNum}`)
        .transition()
        .duration(100)
        .attr("x", (d) => d.x + 5)
        .attr("y", (d) => d.y + 10);
      tooltip.transition()
        .duration(150)
        .style("opacity", 1)
      tooltip.html(`Coding: ${110101}`)
        .style('left', d.x+100)
        .style('top', d.y)
      e.stopImmediatePropagation();
  }).on('mouseout', (e, d) => {
    const idNum = e.target.id.split("-")[2];
    svgG
      .select(`#rect-node-${idNum}`)
      .attr("width", rectLeafDim.width + 10)
      .attr("height", rectLeafDim.height + 10);
    svgG
      .select(`#leaf-node-${idNum}`)
      .attr("x", (d) => d.x + 5)
      .attr("y", (d) => d.y + 10);
  })
*/
  
  // Add the text to the nodes of the tree
  const nodeText = svgG.selectAll('node-text.label')
    .data(root.descendants()).enter();
  
  var leafIdCounter = 0
  nodeText.append('text').classed('label', true)
    .attr('id', (d, i) => d.data.name !== null ? `leaf-node-${leafIdCounter++}` : '')
    .style('fill', 'gray')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y+5) // Change the position of the text in the nodes
    .attr('text-anchor', 'middle')
    .text((d) => (d.data.name === null ? d.data.count === 0 ? `'NYT'` : d.data.count : `'${d.data.name}' | ${d.data.count}`))
    .style("fill-opacity", 1e-6);
/*
    .on('mouseover',  (e, d) => {
      const idNum = e.target.id.split("-")[2];
      svgG.select(`#rect-node-${idNum}`)
        .attr("width", rectLeafDim.width + 10)
        .attr("height", rectLeafDim.height + 10);
      svgG.select(`#leaf-node-${idNum}`)
        .attr("x", (d) => d.x + 5)
        .attr("y", (d) => d.y + 10);
      e.stopImmediatePropagation();

  }).on('mouseout', (e, d) => {
      const idNum = e.target.id.split("-")[2];
      svgG.select(`#rect-node-${idNum}`)
        .attr("width", rectLeafDim.width + 10)
        .attr("height", rectLeafDim.height + 10);
      svgG.select(`#leaf-node-${idNum}`)
        .attr("x", (d) => d.x + 5)
        .attr("y", (d) => d.y + 10);
  })
*/
  // Adding transition for nodes
  const nodeTransition = transition()
    .duration(duration)
    .ease(easeCircle);

  circleNodes.selectAll("circle")
    .transition(nodeTransition)
    .attr("r", nonLeafNodes.radius)
    .attr("stroke-width", 1);

  rectangleNodes.selectAll("rect")
    .transition(nodeTransition)
    .attr('width', rectLeafDim.width)
    .attr('height', rectLeafDim.height);

  nodeText.selectAll("text")
    .transition(nodeTransition)
    .style("fill-opacity", 1);

  // Realign the zoom of the svg allowing the entire tree to be seen
  zoomFit(svgG, data.name !== null);
    
}

export default visualizeHuffman;