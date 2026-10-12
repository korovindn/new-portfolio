export const tokenize = (input: string): string[] => {
  const tokens: string[] = [];
  let current = "";
  let quote: string | null = null;
  let started = false;

  for (const char of input) {
    if (quote) {
      if (char === quote) {
        quote = null;
      } else {
        current += char;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
      started = true;
    } else if (/\s/.test(char)) {
      if (started) {
        tokens.push(current);
        current = "";
        started = false;
      }
    } else {
      current += char;
      started = true;
    }
  }

  if (started) {
    tokens.push(current);
  }

  return tokens;
};
