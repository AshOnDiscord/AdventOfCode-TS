const day1 = async (input: string) => {
  const inital = input
    .trim()
    .split(" ")
    .map((x) => +x);

  let stones: (number | number[])[] = inital.slice();
  let blinkCount = 25;
  for (let blink = 0; blink < blinkCount; blink++) {
    for (let i = 0; i < stones.length; i++) {
      const stone = stones[i] as number;
      if (stone === 0) {
        stones[i] = 1;
      } else if (`${stone}`.length % 2 === 0) {
        const left = +`${stone}`.slice(0, `${stone}`.length / 2);
        const right = +`${stone}`.slice(`${stone}`.length / 2);
        stones[i] = [left, right];
      } else {
        stones[i] = stone * 2024;
      }
    }
    stones = stones.flat();
    // console.log(blink, stones);
  }
  console.log(stones.length);
  return stones.length;
};

const day2 = async (input: string) => {
  const inital = input
    .trim()
    .split(" ")
    .map((x) => +x);

  let stones: Map<number, number> = new Map();
  for (const stone of inital) {
    if (stones.has(stone)) {
      stones.set(stone, stones.get(stone)! + 1);
    } else {
      stones.set(stone, 1);
    }
  }
  let blinkCount = 75;
  for (let blink = 0; blink < blinkCount; blink++) {
    const newStones = new Map();
    for (const [stone, count] of stones) {
      if (stone === 0) {
        if (newStones.has(1)) {
          newStones.set(1, count + newStones.get(1)!);
        } else {
          newStones.set(1, count);
        }
      } else if (`${stone}`.length % 2 === 0) {
        const left = +`${stone}`.slice(0, `${stone}`.length / 2);
        const right = +`${stone}`.slice(`${stone}`.length / 2);
        if (newStones.has(left)) {
          newStones.set(left, count + newStones.get(left)!);
        } else {
          newStones.set(left, count);
        }
        if (newStones.has(right)) {
          newStones.set(right, count + newStones.get(right)!);
        } else {
          newStones.set(right, count);
        }
      } else {
        if (newStones.has(stone * 2024)) {
          newStones.set(stone * 2024, count + newStones.get(stone * 2024)!);
        } else {
          newStones.set(stone * 2024, count);
        }
      }
    }
    stones = newStones;
    console.log(blink);
  }
  let sum = 0;
  for (const [stone, count] of stones) {
    sum += count;
  }

  console.log(sum);
  return sum;
};

export { day1, day2 };
