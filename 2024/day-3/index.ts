const day1 = async (input: string) => {
  // mul(number,number)
  const matches = input.match(/mul\((\d+),(\d+)\)/g);
  const data = matches?.map((match) =>
    match
      .slice("mul(".length)
      .split(",")
      .map((x) => parseInt(x))
  );
  console.log(data);
  const sum = data?.reduce((acc, cur) => {
    return acc + cur[0] * cur[1];
  }, 0);
  return sum;
};

const day2 = async (input: string) => {
  // mul(number,number) or do() or don't()
  const matches = input.match(/mul\(\d+,\d+\)|don\'t\(\)|do\(\)/g)!;
  const data = matches.map((match) => {
    if (match.includes("don't")) {
      return {
        type: "stop",
      };
    }
    if (match.includes("mul")) {
      return {
        type: "mul",
        value: match
          .slice("mul(".length)
          .split(",")
          .map((x) => parseInt(x)),
      };
    } else {
      return {
        type: "continue",
      };
    }
  });

  let sum = 0;
  let enabled = true;
  for (const item of data) {
    console.log(item);
    if (item.type === "mul" && enabled) {
      sum += item.value![0] * item.value![1];
    } else if (item.type === "stop") {
      enabled = false;
    } else if (item.type === "continue") {
      enabled = true;
    }
  }
  return sum;
};

export { day1, day2 };
