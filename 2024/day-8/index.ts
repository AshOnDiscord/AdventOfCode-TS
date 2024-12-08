const day1 = async (input: string) => {
  const grid = input.split("\n").map((row) => row.split(""));
  const antiNodes: Set<string> = new Set();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == ".") continue;
      for (let k = 0; k < grid.length; k++) {
        for (let l = 0; l < grid[k].length; l++) {
          if (i == k && j == l) continue;
          const current = grid[i][j];
          const other = grid[k][l];
          if (current == other) {
            const currentPos = {
              x: i,
              y: j,
            };
            const otherPos = {
              x: k,
              y: l,
            };
            const diffX = otherPos.x - currentPos.x;
            const diffY = otherPos.y - currentPos.y;

            const firstAnti = {
              x: currentPos.x - diffX,
              y: currentPos.y - diffY,
            };
            const secondAnti = {
              x: otherPos.x + diffX,
              y: otherPos.y + diffY,
            };
            if (
              firstAnti.x >= 0 &&
              firstAnti.y >= 0 &&
              firstAnti.x < grid.length &&
              firstAnti.y < grid[0].length
            ) {
              antiNodes.add(firstAnti.x + "," + firstAnti.y);
            }
            if (
              secondAnti.x >= 0 &&
              secondAnti.y >= 0 &&
              secondAnti.x < grid.length &&
              secondAnti.y < grid[0].length
            ) {
              antiNodes.add(secondAnti.x + "," + secondAnti.y);
            }
          }
        }
      }
    }
  }
  return antiNodes.size;
};

const day2 = async (input: string) => {
  const grid = input.split("\n").map((row) => row.split(""));
  const antiNodes: Set<string> = new Set();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == ".") continue;
      for (let k = 0; k < grid.length; k++) {
        for (let l = 0; l < grid[k].length; l++) {
          if (i == k && j == l) continue;
          const current = grid[i][j];
          const other = grid[k][l];
          if (current == other) {
            const currentPos = {
              x: i,
              y: j,
            };
            const otherPos = {
              x: k,
              y: l,
            };
            const diffX = otherPos.x - currentPos.x;
            const diffY = otherPos.y - currentPos.y;

            let firstAnti = {
              x: currentPos.x - diffX,
              y: currentPos.y - diffY,
            };
            const secondAnti = {
              x: otherPos.x + diffX,
              y: otherPos.y + diffY,
            };
            antiNodes.add(currentPos.x + "," + currentPos.y);
            antiNodes.add(otherPos.x + "," + otherPos.y);
            while (
              firstAnti.x >= 0 &&
              firstAnti.y >= 0 &&
              firstAnti.x < grid.length &&
              firstAnti.y < grid[0].length
            ) {
              antiNodes.add(firstAnti.x + "," + firstAnti.y);
              firstAnti.x -= diffX;
              firstAnti.y -= diffY;
            }
            while (
              secondAnti.x >= 0 &&
              secondAnti.y >= 0 &&
              secondAnti.x < grid.length &&
              secondAnti.y < grid[0].length
            ) {
              antiNodes.add(secondAnti.x + "," + secondAnti.y);
              secondAnti.x += diffX;
              secondAnti.y += diffY;
            }
          }
        }
      }
    }
  }
  const gridCopy = grid.map((row) => row.slice());
  for (const antiNode of antiNodes) {
    gridCopy[parseInt(antiNode.split(",")[0])][
      parseInt(antiNode.split(",")[1])
    ] = "#";
  }
  console.log(gridCopy.map((row) => row.join("")).join("\n"));
  return antiNodes.size;
};

export { day1, day2 };
