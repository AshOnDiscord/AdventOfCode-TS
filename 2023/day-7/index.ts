Array.prototype.sum = function () {
  return this.reduce((acc, num) => acc + num, 0);
};

declare global {
  interface Array<T> {
    sum(): T;
  }
}

Object.prototype.deepCopy = function () {
  return JSON.parse(JSON.stringify(this));
};

declare global {
  interface Object {
    deepCopy(): Object;
  }
}

console.log([1, 5, 3].deepCopy());

const day1 = async (input: string) => {
  return "";
};

const day2 = async (input: string) => {
  return "";
};

export { day1, day2 };
