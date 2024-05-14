
export function parseType(value: any) {
  if (parseFloat(value)) return { type: "float", value: parseFloat(value) };
  if (parseInt(value)) return { type: "number", value: parseInt(value) };
  if (value === "true" || value === "false") return { type: "boolean", value: value === "true" };
  if (value === "null") return { type: "null", value: null };
  return { type: "raw", value };
}