const day1 = async (input: string) => {
  const data = input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((x) => x)
      .map(Number)
  );

  const left = data.map(([x, y]) => x).sort((a, b) => a - b);
  const right = data.map(([x, y]) => y).sort((a, b) => a - b);

  const joined = left.map((x, i) => [x, right[i]]);

  const distance = joined.reduce((acc, cur) => {
    const [x, y] = cur;
    console.log(Math.abs(x - y), x, y);
    return acc + Math.abs(x - y);
  }, 0);

  console.log(distance);

  return distance;
};

const day2 = async (input: string) => {
  const data = input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((x) => x)
      .map(Number)
  );

  const left = data.map(([x, y]) => x);
  const right = data.map(([x, y]) => y);

  const similarity = left.map((x) => {
    const count = right.filter((y) => y === x).length;
    return count * x;
  });

  const sum = similarity.reduce((acc, cur) => acc + cur, 0);

  console.log(similarity, sum);

  return sum;
};

export { day1, day2 };
