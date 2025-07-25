const reset = '\x1b[0m';

export const escapeCodes = {
  reset,
  clear: '\x1b[g',
  red: '\x1b[1;31m',
  green: '\x1b[1;32m',
};

export const coloredText = {
  red: (text: string) => `${escapeCodes.red}${text}${reset}`,
  green: (text: string) => `${escapeCodes.green}${text}${reset}`,
};
