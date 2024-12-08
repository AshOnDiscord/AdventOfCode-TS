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

const inputFile = `${directory}/input.txt`;
const sampleFile1 = `${directory}/sample-1.txt`;
const sampleFile2 = `${directory}/sample-2.txt`;
const answerFile1 = `${directory}/answer-1.txt`;
const answerFile2 = `${directory}/answer-2.txt`;
const codePath = `${directory}/index.ts`;

Bun.write(Bun.file(inputFile), input.trim());
Bun.write(Bun.file(sampleFile1), "\n");
Bun.write(Bun.file(sampleFile2), "\n");
Bun.write(Bun.file(answerFile1), "\n");
Bun.write(Bun.file(answerFile2), "\n");
Bun.write(Bun.file(codePath), await Bun.file("./tools/template.ts"));

Bun.openInEditor(codePath, {
  editor: "vscode",
  line: 2,
  column: 3,
});
Bun.sleepSync(100);
Bun.openInEditor(answerFile2, {
  editor: "vscode",
});
Bun.sleepSync(100);
Bun.openInEditor(answerFile1, {
  editor: "vscode",
});
Bun.sleepSync(100);
Bun.openInEditor(sampleFile2, {
  editor: "vscode",
});
Bun.sleepSync(100);
Bun.openInEditor(sampleFile1, {
  editor: "vscode",
});

console.log(`Files written`);
