import { expect, test } from "bun:test";
import { parseFlags } from "./util";

const { flags } = parseFlags(process.argv);

if (!Bun.env.session) {
  throw new Error("No session token found");
}

const input = await Bun.file(`${flags.year}/day-${flags.day}/input.txt`).text();
if (input.trim() === "") {
  throw new Error("No input found");
}

const { day1, day2 } = await import(
  `../${flags.year}/day-${flags.day}/index.ts`
);

test("Part 1", async () => {
  const data = new FormData();
  data.append("level", "1");
  data.append("answer", await day1(input));

  const res = await fetch(
    `https://adventofcode.com/${flags.year}/day/${flags.day}/answer`,
    {
      credentials: "include",
      headers: {
        cookie: `session=${Bun.env.session}`,
      },
      referrer: "https://adventofcode.com/2022/day/7",
      // body: "level=1&answer=a",
      body: data,
      method: "POST",
      mode: "cors",
    }
  );
  console.log(await res.text());
});
