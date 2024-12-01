import { parseArgs } from "util";

const getDate = () => {
  // if >11pm, then next day for buffering
  const date = new Date();
  if (date.getHours() > 23) {
    return date.getDate() + 1;
  }
  return date.getDate();
};

const parseFlags = (args: string[]) => {
  const parsed = parseArgs({
    args: args,
    options: {
      year: {
        type: "string",
        default: "" + new Date().getFullYear(),
        short: "y",
      },
      day: {
        type: "string",
        default: "" + getDate(),
        short: "d",
      },
    },
    strict: true,
    allowPositionals: true,
  });

  const flags = parsed.values as {
    year: string;
    day: string;
    [key: string]: string;
  };

  if (isNaN(+flags.day)) {
    throw new Error("Day must be a number");
  }

  return { args: parsed, flags };
};

export { parseFlags };
