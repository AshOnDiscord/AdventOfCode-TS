import { parseFlags } from "./util";

declare module "bun" {
  interface Env {
    session: string;
  }
}

if (!Bun.env.session) {
  throw new Error("No session token found");
}

const { flags } = parseFlags(process.argv);

console.log(`Fetching data for day ${flags.day}, year ${flags.year}.`);

const res = await fetch(
  `https://adventofcode.com/${flags.year}/day/${flags.day}/input`,
  {
    headers: {
      cookie: `session=${Bun.env.session}`,
    },
  }
);
const input = await res.text();

console.log(`Data fetched`);

const directory = `${flags.year}/day-${flags.day}`;

Bun.write(Bun.file(`${directory}/input.txt`), input.trim());
Bun.write(Bun.file(`${directory}/sample-1.txt`), "\n");
Bun.write(Bun.file(`${directory}/sample-2.txt`), "\n");
Bun.write(Bun.file(`${directory}/answer-1.txt`), "\n");
Bun.write(Bun.file(`${directory}/answer-2.txt`), "\n");
Bun.write(
  Bun.file(`${directory}/index.ts`),
  await Bun.file("./tools/template.ts")
);

console.log(`Files written`);
