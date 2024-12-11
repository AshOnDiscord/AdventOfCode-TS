const day1 = async (input: string) => {
  const rows = input.split("\n");
  let safe = 0;
  for (const row of rows) {
    const arr = row.split(" ").map(Number);
    const increasing = arr.every((x, i) => {
      if (i === 0) return true;
      return x > arr[i - 1];
    });
    const decreasing = arr.every((x, i) => {
      if (i === 0) return true;
      return x < arr[i - 1];
    });
    if (!increasing && !decreasing) continue;
    const maxJump = arr.reduce((acc, cur, i) => {
      if (i === 0) return 0;
      if (increasing) return Math.max(acc, cur - arr[i - 1]);
      return Math.max(acc, arr[i - 1] - cur);
    }, 0);
    if (maxJump <= 3) safe++;
  }
  return safe;
};

const day2 = async (input: string) => {
  const rows = input.split("\n");
  let safe = 0;
  for (const row of rows) {
    const arr = row.split(" ").map(Number);
    const modified: number[][] = new Array(arr.length);
    for (let i = 0; i < modified.length; i++) {
      modified[i] = arr.slice(0, i).concat(arr.slice(i + 1));
    }
    modified.push(arr);
    for (const newArr of modified) {
      const increasing = newArr.every((x, i) => {
        if (i === 0) return true;
        return x > newArr[i - 1];
      });
      const decreasing = newArr.every((x, i) => {
        if (i === 0) return true;
        return x < newArr[i - 1];
      });
      if (!increasing && !decreasing) continue;
      const maxJump = newArr.reduce((acc, cur, i) => {
        if (i === 0) return 0;
        if (increasing) return Math.max(acc, cur - newArr[i - 1]);
        return Math.max(acc, newArr[i - 1] - cur);
      }, 0);
      if (maxJump <= 3) {
        safe++;
        console.log(newArr, arr);
        break;
      } else {
        console.log(newArr, arr, maxJump, increasing, decreasing);
      }
    }
  }
  return safe;
};

export { day1, day2 };
