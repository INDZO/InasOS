export const searchTokens = (value: string) => normalizeSearch(value).trim().split(/\s+/).filter(Boolean);

export function normalizeSearch(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/đ/g, "dj");
}
