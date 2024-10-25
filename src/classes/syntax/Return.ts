import ts from 'typescript';
import { LineDiff } from '../../interfaces/Line';

export default class Return {
  private data: string;
  private parentReturnType: string;

  constructor(data: string, parentReturnType: string = 'any') {
    this.data = data;
    this.parentReturnType = parentReturnType;
  }

  public async parse(): Promise<LineDiff[]> {
    const source = ts.createSourceFile('scriptreturn.temp.ts', this.data, ts.ScriptTarget.Latest, true);
    const newLines: LineDiff[] = [];

    // check if the node is a return statement
    const checkNode = (node: ts.Node) => {
      if (ts.isReturnStatement(node)) {
        const expression = node.expression?.getText(source);
        const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));

        // TODO: Add some sort of logic to check if the return type is correct
        // TODO: this will be a lot of work though so i won't blame myself if i don't do it

        newLines.push({
          line: line + 1,
          content: `return ${expression}`
        });
      }
      ts.forEachChild(node, checkNode);
    };

    checkNode(source);

    // return the affected lines
    // with their line numbers and the new content
    return newLines;
  }
}