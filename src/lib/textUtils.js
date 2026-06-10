export function cleanText(value) {
  return String(value)
    .trim()
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'");
}

export function cleanCode(value) {
  return cleanText(value)
    .replace(/\s+/g, "")
    .replace(/;+$/g, "")
    .replace(/"/g, "'");
}
