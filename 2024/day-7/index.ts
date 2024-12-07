const day1 = async (input: string) => {
  const equations = input.split("\n").map((row) => {
    const [sum, numbers] = row.split(": ");
    return {
      sum: parseInt(sum),
      numbers: numbers.split(" ").map((num) => parseInt(num)),
    };
  });
  const validEquations = equations.filter((equation) => {
    const [first, ...rest] = equation.numbers;
    // try + or * for each number
    // use a binary number where 0 is + and 1 is *
    for (let i = 0; i < Math.pow(2, rest.length); i++) {
      const binary = i.toString(2).padStart(rest.length, "0");
      const sum = rest.reduce((acc, num, index) => {
        if (binary[index] == "1") {
          return acc + num;
        } else {
          return acc * num;
        }
      }, first);
      if (sum == equation.sum) {
        return true;
      }
    }
    return false;
  });
  console.log(validEquations);
  return validEquations.reduce((acc, equation) => {
    return acc + equation.sum;
  }, 0);
};

const day2 = async (input: string) => {
  const equations = input.split("\n").map((row) => {
    const [sum, numbers] = row.split(": ");
    return {
      sum: parseInt(sum),
      numbers: numbers.split(" ").map((num) => parseInt(num)),
    };
  });
  const validEquations = equations.filter((equation) => {
    const [first, ...rest] = equation.numbers;
    // try + or * for each number
    // use a ternary number where 0 is + and 1 is *, 2 is join
    for (let i = 0; i < Math.pow(3, rest.length); i++) {
      const ternary = i.toString(3).padStart(rest.length, "0");
      let sum = first;
      for (let i = 0; i < rest.length; i++) {
        // if (ternary === "020" && first == 6) {
        //   debugger;
        // }
        const num = rest[i];
        if (ternary[i] == "1") {
          sum += num;
        } else if (ternary[i] == "2") {
          sum *= num;
        } else {
          sum = +`${sum}${num}`;
        }
      }
      if (sum == equation.sum) {
        return true;
      }
    }
    return false;
  });
  console.log(validEquations);
  return validEquations.reduce((acc, equation) => {
    return acc + equation.sum;
  }, 0);
};

export { day1, day2 };
