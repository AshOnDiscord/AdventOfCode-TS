const day1 = async (input: string) => {
  const [order, updates] = input.split("\n\n");
  const orders = order
    .split("\n")
    .map((order) => order.split("|").map((n) => Number(n)));
  const updatesList = updates
    .split("\n")
    .map((update) => update.split(",").map((n) => Number(n)));

  const orderMap = new Map<
    number,
    { before: Set<number>; after: Set<number> }
  >();

  for (const order of orders) {
    const [before, after] = order;
    if (!orderMap.has(before)) {
      orderMap.set(before, { before: new Set(), after: new Set() });
    }
    if (!orderMap.has(after)) {
      orderMap.set(after, { before: new Set(), after: new Set() });
    }
    orderMap.get(before)!.after.add(after);
    orderMap.get(after)!.before.add(before);
  }

  let middles: number[] = [];
  updateLoop: for (const update of updatesList) {
    for (const [i, current] of update.entries()) {
      const prev = update.slice(0, i);
      const next = update.slice(i + 1);
      const prevSet = orderMap.get(current)?.before ?? new Set();
      const nextSet = orderMap.get(current)?.after ?? new Set();

      for (const prevNum of prev) {
        if (!prevSet.has(prevNum)) {
          continue updateLoop;
        }
      }
      for (const nextNum of next) {
        if (!nextSet.has(nextNum)) {
          continue updateLoop;
        }
      }
    }
    // debugger;
    middles.push(update[(update.length - 1) / 2]);
  }

  console.log(middles);
  return middles.reduce((a, b) => a + b, 0);
};

const day2 = async (input: string) => {
  const [order, updates] = input.split("\n\n");
  const orders = order
    .split("\n")
    .map((order) => order.split("|").map((n) => Number(n)));
  const updatesList = updates
    .split("\n")
    .map((update) => update.split(",").map((n) => Number(n)));

  const orderMap = new Map<
    number,
    { before: Set<number>; after: Set<number> }
  >();

  for (const order of orders) {
    const [before, after] = order;
    if (!orderMap.has(before)) {
      orderMap.set(before, { before: new Set(), after: new Set() });
    }
    if (!orderMap.has(after)) {
      orderMap.set(after, { before: new Set(), after: new Set() });
    }
    orderMap.get(before)!.after.add(after);
    orderMap.get(after)!.before.add(before);
  }

  let wrongUpdates: number[][] = [];
  updateLoop: for (const update of updatesList) {
    for (const [i, current] of update.entries()) {
      const prev = update.slice(0, i);
      const next = update.slice(i + 1);
      const prevSet = orderMap.get(current)?.before ?? new Set();
      const nextSet = orderMap.get(current)?.after ?? new Set();

      for (const prevNum of prev) {
        if (!prevSet.has(prevNum)) {
          wrongUpdates.push(update);
          continue updateLoop;
        }
      }
      for (const nextNum of next) {
        if (!nextSet.has(nextNum)) {
          wrongUpdates.push(update);
          continue updateLoop;
        }
      }
    }
    // debugger;
  }
  const middles: number[] = [];
  for (const update of wrongUpdates) {
    // fix the ordering
    let newUpdate = update.slice();
    while (true) {
      let hasSwap = false;
      outer: for (let i = 0; i < newUpdate.length - 1; i++) {
        const current = newUpdate[i];
        const prev = newUpdate.slice(0, i);
        const next = newUpdate.slice(i + 1);
        const prevSet = orderMap.get(current)?.before ?? new Set();
        const nextSet = orderMap.get(current)?.after ?? new Set();

        for (const [j, prevNum] of prev.entries()) {
          if (!prevSet.has(prevNum)) {
            // swap
            newUpdate[i] = prevNum;
            newUpdate[j] = current;
            hasSwap = true;
            continue outer;
          }
        }

        for (const [j, nextNum] of next.entries()) {
          if (!nextSet.has(nextNum)) {
            // swap
            newUpdate[i] = nextNum;
            newUpdate[i + 1 + j] = current;
            hasSwap = true;
            continue outer;
          }
        }
      }
      if (!hasSwap) {
        break;
      }
    }
    middles.push(newUpdate[(newUpdate.length - 1) / 2]);
  }

  console.log(middles);
  return middles.reduce((a, b) => a + b, 0);
};

export { day1, day2 };
