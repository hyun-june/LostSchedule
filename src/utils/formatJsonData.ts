export const jsonFormatter = (data: string) => JSON.parse(data);

// 전체 태그 제거
export const cleanText = (data: string) => data?.replace(/<[^>]*>/g, "");

export const getFirstNumber = (data: string) => data?.match(/\d+/)?.[0];

export const getLastNumber = (data: string) => data?.match(/\d+(?!.*\d)/)?.[0];

export const toNumberForItemLevel = (level: string) =>
  Number(level.replace(/,/g, ""));
