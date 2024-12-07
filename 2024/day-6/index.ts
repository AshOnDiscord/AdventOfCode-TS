const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const day1 = async (input: string) => {
  const gridStr: string[][] = input.split("\n").map((row) => row.split(""));
  let starting: [number, number] = [0, 0];
  for (const [i, row] of gridStr.entries()) {
    for (const [j, column] of row.entries()) {
      if (column == "^") {
        starting = [i, j];
      }
    }
  }
  const grid: boolean[][] = gridStr.map((row) => row.map((col) => col === "#"));

  let directionIndex = 0;
  let pointer = starting;
  const seen = new Set<string>();

  for (;;) {
    if (pointer[0] < 0 || pointer[0] > grid.length - 1) {
      break;
    }
    if (pointer[1] < 0 || pointer[1] > grid[pointer[0]].length - 1) {
      break;
    }
    // if currently in a wall, back up and turn right
    const current = grid[pointer[0]][pointer[1]];
    let direction = directions[directionIndex % directions.length];
    if (current) {
      pointer[0] -= direction[0];
      pointer[1] -= direction[1];
      directionIndex++;
    }
    seen.add(`${pointer[0]}|${pointer[1]}`);
    direction = directions[directionIndex % directions.length];
    pointer[0] += direction[0];
    pointer[1] += direction[1];
  }

  return seen.size;
};

const day2 = async (input: string) => {
  const gridStr: string[][] = input.split("\n").map((row) => row.split(""));
  let starting: [number, number] = [0, 0];
  for (const [i, row] of gridStr.entries()) {
    for (const [j, column] of row.entries()) {
      if (column == "^") {
        starting = [i, j];
      }
    }
  }
  const ogGrid: boolean[][] = gridStr.map((row) =>
    row.map((col) => col === "#")
  );

  let loops = 0;

  for (let i = 0; i < ogGrid.length; i++) {
    for (let j = 0; j < ogGrid[i].length; j++) {
      const gridCopy = JSON.parse(JSON.stringify(ogGrid));
      gridCopy[i][j] = true;
      if (gridCopy[starting[0]][starting[1]]) {
        continue; // must be valid
      }

      let directionIndex = 0;
      let pointer = JSON.parse(JSON.stringify(starting));
      const prev = [{ pos: [0, 0], directionIndex: 0 }];

      for (;;) {
        if (pointer[0] < 0 || pointer[0] > gridCopy.length - 1) {
          break;
        }
        if (pointer[1] < 0 || pointer[1] > gridCopy[pointer[0]].length - 1) {
          break;
        }
        // if currently in a wall, back up and turn right
        const current = gridCopy[pointer[0]][pointer[1]];
        let direction = directions[directionIndex % directions.length];
        if (current) {
          pointer[0] -= direction[0];
          pointer[1] -= direction[1];
          directionIndex++;
          prev.push({
            pos: JSON.parse(JSON.stringify(pointer)),
            directionIndex,
          });
          const looped =
            prev.filter(
              (el) =>
                el.pos[0] == pointer[0] &&
                el.pos[1] == pointer[1] &&
                el.directionIndex % direction.length ==
                  directionIndex % direction.length
            ).length > 1;
          if (looped) {
            console.log(i, j + "!!");
            loops++;
            break;
          }
        }
        direction = directions[directionIndex % directions.length];
        pointer[0] += direction[0];
        pointer[1] += direction[1];

        // detect if we've made a loop
      }
      // console.log(i, j);
    }
  }
  console.log(loops);
  return loops;
};

export { day1, day2 };
