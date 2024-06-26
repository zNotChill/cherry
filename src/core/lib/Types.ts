
export function parseType(value: any) {
  if (parseFloat(value)) return { type: "float", value: parseFloat(value) };
  if (parseInt(value)) return { type: "number", value: parseInt(value) };
  if (value === "true" || value === "false") return { type: "boolean", value: value === "true" };
  if (value === "null") return { type: "null", value: null };

  // check if the value is a class
  if(value.class) return { type: "class", value: value, class: value.class, parseAs: value.type };

  return { type: "raw", value };
}

export function typeReplace(attr: string, replacement: any) {
  if (replacement.toString() !== "player") {
    let rep = replacement.toString();

    if (replacement.plural) {
      attr = attr.replace("'s", "");
      rep += "'";
    }
    attr = attr.replace("player", rep);
  }
  return attr;
}