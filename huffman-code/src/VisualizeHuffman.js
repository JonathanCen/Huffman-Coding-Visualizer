import { select, tree, hierarchy, zoom, zoomIdentity } from "d3";

function zoomFit(root, isOnlyRoot) {

  const bounds = root.node().getBBox(),
    svgElement = root.node().parentElement.parentElement;

  const svgContainerWidth = svgElement.width.baseVal.value,
    svgContainerHeight = svgElement.height.baseVal.value,
    treeWidth = bounds.width,
    treeHeight = bounds.height,
    midX = bounds.x + treeWidth / 2,
    midY = bounds.y + treeHeight / 2;
  
  const scale = (isOnlyRoot ? .4 : 0.9) / Math.max(treeWidth / svgContainerWidth, treeHeight / svgContainerHeight);
  const translate = [svgContainerWidth / 2 - scale * midX, svgContainerHeight / 2 - scale * midY];

  root.attr("transform", `translate(${translate}) scale(${scale})`);
}

function visualizeHuffman(data) {
  // Get the svg element and the height/width of it 
  const svg = select('svg');
  const svgHeight = svg.node().getBoundingClientRect().height,
    svgWidth = svg.node().getBoundingClientRect().width;
  
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

  // Node dimensions
  const rectLeafDim = { width: 50, height: 30 },
    nonLeafNodes = { radius : 20 };

  const horizontalSeparation = 16,
    verticalSeparation = 50;  

  // Construst a d3 tree from the height and width of the svg
  const treeLayout = tree().nodeSize([
    rectLeafDim.width + horizontalSeparation,
    rectLeafDim.height + verticalSeparation,
  ]).separation((a, b) => a.parent === b.parent ? 1 : 1.5);

  // Get the root of the data
  const root = hierarchy(data);  
  // const linkPathGenerator = linkVertical()
  //   .x((d) => d.x)
  //   .y((d) => d.y);
  const links = treeLayout(root).links();

  const nodes = root.descendants().reverse();
  nodes.forEach((d) => {d.y = d.depth * 180;})

  /*
  const links = treeLayout(root).links();
  const linkPathGenerator = linkVertical()
    .x(d => d.x)
    .y(d => d.y);
  
  svgG.selectAll('path')
    .data(links).enter()
    .append('path')
      .attr('d', linkPathGenerator)

  svgG
    .selectAll('text')
    .data(root.descendants())
    .enter()
    .append('text')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('text-anchor', 'middle')
    .text((d) => (d.data.name === null ? '' : `'${d.data.name}'`));
  */
  /*
   * 1) Add nodes to the tree (Done)
   * 2) Add the more data to the tree (fix the nodes)
   * 3) Add labels to the paths (Done)
   * 4) Fix the coloring scheme
   * 5) Add transitions 
   * 6) Make it responsive 
   */

  const assignPathText = (d) => {
    return d.source.data.children[0] === d.target.data ? '0' : '1';
  }

  treeLayout(root);

  // svgG.selectAll('path')
  // .data(links).enter()
  // .append('path')
  //   .attr('id', (d, i) => `path-${i}`)
  //   .attr('d', linkPathGenerator)

  //   svgG.selectAll('path-text.label')
  // .data(links).enter()
  //   .append('text')
  //     .attr('id', 'path-text')
  //     .attr('dy', (d, i) => i%2 === 0 ? 12 : -1)
  //   .append('textPath')
  //     .attr('startOffset', '50%')
  //     .attr('text-anchor', 'middle')
  //     .attr('xlink:href', (d, i) => `#path-${i}`)
  //     .text((d) => assignPathText(d));
  
  const computeMidpoint = (d, i, x=true) => {
    return x ? (i%2 === 0 ? ((d.source.x + d.target.x)/2)-10 : (d.source.x + d.target.x)/2) : (d.source.y + d.target.y)/2
  }

  svgG.selectAll('line')
    .data(links).enter()
    .append('line')
      .attr('id', (d, i) => `line-${i}`)
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)
      .attr('stroke', 'darkgray')
      .attr('stroke-width', 2);

  svgG.selectAll('path-text.label')
  .data(links).enter()
    .append('text')
      .classed('path-text', true)
      .attr('x', (d, i) =>  computeMidpoint(d, i))
      .attr('y', (d, i) => computeMidpoint(d, i, false))
      .text((d) => assignPathText(d));

  // Draw circle nodes for non-leaf values
  svgG.selectAll('circle.node')
  .data(root.descendants().filter(node => node.data.name === null)).enter()
    .append('circle')
    .classed('node', true)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', nonLeafNodes.radius)
    .attr('fill', 'lightblue')
    .attr('stroke', 'darkgray')
    .attr('stroke-width', 1);

  svgG.selectAll('rect.node')
    .data(root.descendants().filter(node => node.data.name !== null)).enter()
      .append('rect')
      .attr('x', (d) => d.x - (rectLeafDim.width/2))
      .attr('y', (d) => d.y - (rectLeafDim.height/2))
      .attr('rx', 4)
      .attr('width', rectLeafDim.width)
      .attr('height', rectLeafDim.height)
      .attr('fill', '#edf4fb')
      .attr('stroke', 'darkgray');

  svgG.selectAll('node-text.label')
    .data(root.descendants()).enter()
      .append('text').classed('label', true)
      .style('fill', 'gray')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y+5) // Change the position of the text in the nodes
      .attr('text-anchor', 'middle')
      .text((d) => (d.data.name === null ? d.data.count === 0 ? `'NYT'` : d.data.count : `'${d.data.name}' | ${d.data.count}`));

  
  // svg.select('g.path')
  //   .selectAll('path')
  //   .data(root.links()).enter()
  //   .append('path')
  //     .attr('d', linkPathGenerator)
  //     .classed('link', true)

  zoomFit(svgG, data.name !== null);
    
}

export default visualizeHuffman;