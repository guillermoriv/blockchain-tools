export const clamp = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    const left = text.slice(0, Math.floor(maxLength / 2) - 1);
    const right = text.slice(-Math.ceil(maxLength / 2));
    return `${left}...${right}`;
  }

  return text;
};
