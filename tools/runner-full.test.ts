import { expect, test } from "bun:test";
import { parseFlags } from "./util";

const { flags } = parseFlags(process.argv);

const { day1, day2 } = await import(
  `../${flags.year}/day-${flags.day}/index.ts`
);

test("Part 1", async () => {
  const input = await Bun.file(
    `${flags.year}/day-${flags.day}/input.txt`
  ).text();
  if (input.trim() === "") {
    throw new Error("No input found");
  }
  const data = await day1(input);
  console.log("DAY 1", data);
});

test("Part 2", async () => {
  const input = await Bun.file(
    `${flags.year}/day-${flags.day}/input.txt`
  ).text();
  if (input.trim() === "") {
    throw new Error("No input found");
  }
  const data = await day2(input);
  console.log("DAY 2", data);
});
