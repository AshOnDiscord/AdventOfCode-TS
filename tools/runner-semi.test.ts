import { expect, test } from "bun:test";
import { parseFlags } from "./util";

const { flags } = parseFlags(process.argv);

const { day1, day2 } = await import(
  `../${flags.year}/day-${flags.day}/index.ts`
);

test("Part 1", async () => {
  const input = await Bun.file(
    `${flags.year}/day-${flags.day}/sample-1.txt`
  ).text();
  const answer = await Bun.file(
    `${flags.year}/day-${flags.day}/answer-1.txt`
  ).text();
  if (input.trim() === "") {
    throw new Error("No input found");
  }
  if (answer.trim() === "") {
    throw new Error("No answer found");
  }
  const data = await day1(input);
  expect("" + data).toBe(answer);
});

test("Part 2", async () => {
  // use p1 as a fallback for the input
  const input =
    (
      await Bun.file(`${flags.year}/day-${flags.day}/sample-2.txt`).text()
    ).trim() ||
    (await Bun.file(`${flags.year}/day-${flags.day}/sample-1.txt`).text());
  const answer = (
    await Bun.file(`${flags.year}/day-${flags.day}/answer-2.txt`).text()
  ).trim();
  if (input.trim() === "") {
    throw new Error("No input found");
  }
  if (answer.trim() === "") {
    throw new Error("No answer found");
  }
  const data = await day2(input);
  expect("" + data).toBe(answer);
});
