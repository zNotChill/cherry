
export const config: Config = {
  indent_size: 1,
  indent_type: 'tab',
  function_scope: {
    allowed_calls: [
      'Events',
      'Server',
      'Meta'
    ],
  },
}

export interface Config {
  indent_size: number;
  indent_type: 'space' | 'tab';
  function_scope: {
    allowed_calls: string[];
  }
}

export function generateIndent(indent_size: number, indent_type: 'space' | 'tab') {
  return indent_type === 'space' ? ' '.repeat(indent_size) : '\t'.repeat(indent_size);
}