const directions = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const day1 = async (input: string) => {
  // const seen = new Set<string>();
  let seen = 0;
  const grid = input.split("\n").map((x) => x.split(""));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== "X") continue;
      directionLoop: for (const [dx, dy] of directions) {
        for (const [k, char] of "XMAS".split("").entries()) {
          if (grid[i + dx * k] === undefined) {
            continue directionLoop;
          }
          if (grid[i + dx * k][j + dy * k] === undefined) {
            continue directionLoop;
          }
          const current = grid[i + dx * k][j + dy * k];
          if (current !== char) {
            continue directionLoop;
          }
        }
        seen++;
      }
    }
  }
  return seen;
};

const day2 = async (input: string) => {
  let seen = 0;
  const grid = input.split("\n").map((x) => x.split(""));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== "A") continue;
      const topLeft = grid[i - 1]?.[j - 1];
      const bottomRight = grid[i + 1]?.[j + 1];

      const topRight = grid[i - 1]?.[j + 1];
      const bottomLeft = grid[i + 1]?.[j - 1];

      if (!topLeft || !bottomRight || !topRight || !bottomLeft) {
        continue;
      }

      if (
        (topLeft === "M" && bottomRight === "S") ||
        (topLeft === "S" && bottomRight === "M")
      ) {
        if (
          (topRight === "M" && bottomLeft === "S") ||
          (topRight === "S" && bottomLeft === "M")
        ) {
          seen++;
        }
      }
    }
  }
  return seen;
};

export { day1, day2 };
