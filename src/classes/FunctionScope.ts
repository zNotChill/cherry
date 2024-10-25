import { config } from "../config";
import ts from 'typescript';
import chalk from 'chalk';

export default class FunctionScope {
  private data: string;
  public allowedCalls: Set<string>;

  constructor(data: string) {
    this.data = data;
    this.allowedCalls = new Set(config.function_scope.allowed_calls);
  }

  public async check(): Promise<boolean> {
    const source = ts.createSourceFile('script.temp.ts', this.data, ts.ScriptTarget.Latest, true);
    let errors: Array<{
      line: number;
      message: string;
      code: string;
    }> = [];

    const checkNode = (node: ts.Node) => {
      const { line } = source.getLineAndCharacterOfPosition(node.getStart());
      const codeSnippet = this.data.split('\n')[line].trim();

      if (ts.isImportDeclaration(node)) return;
      if (ts.isFunctionDeclaration(node)) return;
      if (ts.isFunctionExpression(node)) return;
      if (ts.isArrowFunction(node)) return;

      if (ts.isVariableStatement(node)) {
        const declaration = node.declarationList.declarations[0];
        const name = declaration.name.getText();

        if (declaration.initializer) {
          const call = declaration.initializer.getText().split('.')[0];

          if (!this.allowedCalls.has(call)) {
            errors.push({
              line,
              message: `Function call not allowed: ${call}`,
              code: codeSnippet
            });
          }
        }
      }

      ts.forEachChild(node, checkNode);
    }

    checkNode(source);

    if (errors.length) {
      errors.forEach(error => {
        console.error(
          chalk.yellow(`[Line ${error.line + 1}]`),
          chalk.redBright(error.message)
        );
        console.error("  ->", chalk.cyanBright(error.code));
      });
      return false;
    }

    return true;
  }
}