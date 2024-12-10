const day1 = async (input: string) => {
  const grid = input
    .split("\n")
    .filter((a) => a.trim())
    .map((line, i) =>
      line.split("").map((char, j) => ({
        x: i,
        y: j,
        height: +char,
      }))
    );

  const trailheads = grid.flat().filter((cell) => cell.height === 0);
  const scores = trailheads.map((cell) => {
    const seen = new Set<string>();
    const queue = [cell];
    while (queue.length > 0) {
      const cell = queue.shift()!;
      if (seen.has(cell.x + "," + cell.y)) continue;
      seen.add(cell.x + "," + cell.y);
      // check all neighbors
      for (const neighbor of [
        { x: cell.x - 1, y: cell.y },
        { x: cell.x + 1, y: cell.y },
        { x: cell.x, y: cell.y - 1 },
        { x: cell.x, y: cell.y + 1 },
      ]) {
        if (neighbor.x < 0 || neighbor.x >= grid.length) continue;
        if (neighbor.y < 0 || neighbor.y >= grid[0].length) continue;
        const neighborCell = grid[neighbor.x][neighbor.y];
        if (neighborCell.height === cell.height + 1) {
          queue.push(neighborCell);
        }
      }
    }
    const seenCells = grid
      .flat()
      .filter((cell) => seen.has(cell.x + "," + cell.y) && cell.height === 9);

    return seenCells.length;
  });

  const sum = scores.reduce((a, b) => a + b);

  console.log(trailheads, scores, trailheads.length, sum);
  return sum;
};

const day2 = async (input: string) => {
  const grid = input
    .split("\n")
    .filter((a) => a.trim())
    .map((line, i) =>
      line.split("").map((char, j) => ({
        x: i,
        y: j,
        height: +char,
      }))
    );

  const trailheads = grid.flat().filter((cell) => cell.height === 0);
  const scores = trailheads.map((cell) => {
    let paths = 0;
    const queue = [cell];
    while (queue.length > 0) {
      const cell = queue.shift()!;

      if (cell.height === 9) {
        paths++;
        continue;
      }

      // check all neighbors
      for (const neighbor of [
        { x: cell.x - 1, y: cell.y },
        { x: cell.x + 1, y: cell.y },
        { x: cell.x, y: cell.y - 1 },
        { x: cell.x, y: cell.y + 1 },
      ]) {
        if (neighbor.x < 0 || neighbor.x >= grid.length) continue;
        if (neighbor.y < 0 || neighbor.y >= grid[0].length) continue;
        const neighborCell = grid[neighbor.x][neighbor.y];
        if (neighborCell.height === cell.height + 1) {
          queue.push(neighborCell);
        }
      }
    }
    return paths;
  });

  const sum = scores.reduce((a, b) => a + b);

  console.log(trailheads, scores, trailheads.length, sum);
  return sum;
};

export { day1, day2 };
