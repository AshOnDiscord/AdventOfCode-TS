const day1 = async (input: string) => {
  return 0;
  const blocks = input
    .split("")
    .map((block, i) => {
      if (i % 2 == 0) return new Array(+block).fill(+i / 2);
      return new Array(+block).fill(".");
    })
    .flat();

  const blocksCopy = blocks.slice();
  for (let i = 0; i < blocksCopy.length; i++) {
    if (blocksCopy[i] !== ".") continue;
    for (let j = blocksCopy.length - 1; j >= 0; j--) {
      if (blocksCopy[j] === ".") continue;
      // swap
      const temp = blocksCopy[i];
      blocksCopy[i] = blocksCopy[j];
      blocksCopy[j] = temp;
      break;
    }
  }
  const blocksCopy2 = blocksCopy.filter((block) => block !== ".");
  const checksum = blocksCopy2.map((block, i) => block * i);

  return checksum.reduce((a, b) => a + b);
};

const day2 = async (input: string) => {
  const blocks = input
    .split("")
    .map((block, i) => ({
      length: +block,
      value: i % 2 == 0 ? +i / 2 : null,
    }))
    .flat();
  console.log(printBlocks(blocks));

  const blocks2 = JSON.parse(JSON.stringify(blocks));
  for (let i = 0; i < blocks2.length; i++) {
    if (blocks2[i].value !== null) continue;
    for (let j = blocks2.length - 1; j > i; j--) {
      if (blocks2[j].value === null || blocks2[j].length > blocks2[i].length)
        continue;
      const diff = blocks2[i].length - blocks2[j].length;
      // debugger;
      const other = blocks2[j];
      blocks2[j] = {
        length: other.length,
        value: null,
      };
      // blocks2.splice(i, 0, other[0]);
      blocks2[i] = other;
      if (diff > 0) {
        // insertion
        blocks2.splice(i + 1, 0, {
          length: diff,
          value: null,
        });
      }
      break;
    }
  }
  console.log(
    blocks2
      .map((block) => (block.value === null ? "." : block.value))
      .join(" | ")
  );
  const checkSumArr = [];
  for (let i = 0; i < blocks2.length; i++) {
    const block = blocks2[i];
    checkSumArr.push(...new Array(block.length).fill(block.value));
  }
  console.log(checkSumArr.map((a, i) => `${a ?? 0}-${i}`).join("|"));
  const checkSum = checkSumArr
    .map((a, i) => (a ?? 0) * i)
    .reduce((a, b) => a + b);
  console.log(checkSum);
  return checkSum;
};

const printBlocks = (
  blocks: {
    length: number;
    value: number | null;
  }[]
) => {
  let string = "";
  for (const block of blocks) {
    if (block.value === null) {
      string += new Array(block.length).fill(".").join("");
    } else {
      string += new Array(block.length).fill(block.value).join("");
    }
  }
  return string;
};

export { day1, day2 };
