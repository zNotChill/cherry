
export function parseVariables(str: string): string {
  // find each ${variable} in the string and replace it with %{variable}%
  return str.replace(/\${(.*?)}/g, "%{$1}%");
}

export function parseString(str: string): string {
  return str.replace(/`/g, "");
}