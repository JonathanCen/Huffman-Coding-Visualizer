const mouseEnter = (e) => {
  const id = e.target.id.split("-")[2];
  document
    .getElementById(`ascii-coding-${id}`)
    .classList.add("coding-span-hover");
  document
    .getElementById(`huffman-coding-${id}`)
    .classList.add("coding-span-hover");
};

const mouseLeave = (e) => {
  const id = e.target.id.split("-")[2];
  document
    .getElementById(`ascii-coding-${id}`)
    .classList.remove("coding-span-hover");
  document
    .getElementById(`huffman-coding-${id}`)
    .classList.remove("coding-span-hover");
};

export { mouseEnter, mouseLeave };
