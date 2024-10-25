
import ts from 'typescript';
import { parseString, parseVariables } from '../StringParser';

export default class Console {
  private data: string;
  private methods: Array<string> = ['log', 'warn', 'error', 'info'];

  constructor(data: string) {
    this.data = data;
  }

  public async parse(): Promise<string> {
    const source = ts.createSourceFile('script.temp.ts', this.data, ts.ScriptTarget.Latest, true);
    const lines: string[] = this.data.split('\n');

    const checkNode = (node: ts.Node) => {
      if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
        const method = node.expression.name.getText(source);
        
        // Check if the method is a console method
        if (node.expression.expression.getText() !== 'console') return;
        if (!this.methods.includes(method)) return;

        const args = node.arguments.map(arg => arg.getText(source));

        if(args.length > 0) {
          const line = node.getStart(source);

          let parsedArg = parseVariables(args[0]);
          parsedArg = parseString(parsedArg);

          lines[line] = `send "${parsedArg}" to console`;
        }
      }
      ts.forEachChild(node, checkNode);
    }

    source.forEachChild(checkNode);

    return lines.join('\n');
  }
}