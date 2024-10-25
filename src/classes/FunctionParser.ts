import ts from 'typescript';
import chalk from 'chalk';
import { config, generateIndent } from '../config';
import Console from './syntax/Console';
import Return from './syntax/Return';

interface FunctionInfo {
  name: string;
  params: Parameter[];
  returnType: string;
  content: string;
  begins_at_line: number;
  ends_at_line: number;
}

interface Parameter {
  name: string;
  type: string;
}

export class FunctionParser {
  private data: string;
  private indent: number;
  private indent_text: string;

  constructor(data: string) {
    this.data = data;
    this.indent = config.indent_size;
    this.indent_text = generateIndent(this.indent, config.indent_type);
  }

  private getBody(body: ts.Node, source: ts.SourceFile): string {
    if(!body) return '';
    const bodyText = body.getText(source).trim();

    if (ts.isBlock(body)) {
      const content = body.statements.map(statement => 
        statement.getText(source).trim()).join('\n');
      return content;
    }

    return bodyText;
  }

  private getParameters(parameters: ts.NodeArray<ts.ParameterDeclaration>, source: ts.SourceFile): Parameter[] {
    return parameters.map(param => {
      return {
        name: param.name.getText(source),
        type: param.type ? param.type.getText(source) : 'any'
      }
    });
  }

  private getReturnType(returnType: ts.TypeNode, source: ts.SourceFile): string {
    return returnType ? returnType.getText(source) : 'any';
  }

  private getFunctionInfo(node: ts.FunctionDeclaration | ts.MethodDeclaration, source: ts.SourceFile): FunctionInfo | null {
    if(!node) return null;

    const name = node.name!.getText(source);
    const parameters = this.getParameters(node.parameters, source);
    const returnType = this.getReturnType(node.type!, source);
    const content = this.getBody(node.body!, source);
    const { line: begins_at_line } = source.getLineAndCharacterOfPosition(node.getStart());
    const { line: ends_at_line } = source.getLineAndCharacterOfPosition(node.getEnd());

    return {
      name,
      params: parameters,
      returnType,
      content,
      begins_at_line,
      ends_at_line
    }
  }

  public async parse(): Promise<string[]> {
    const source = ts.createSourceFile('script.temp.ts', this.data, ts.ScriptTarget.Latest, true);
    let functions: FunctionInfo[] = [];

    const parsed: string[] = [];
    const promises: Promise<void>[] = [];

    const checkNode = async (node: ts.Node) => {
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        const functionInfo = this.getFunctionInfo(node, source);
        if (!functionInfo) return;
        functions.push(functionInfo);

        // Prepare function parameters
        const functionParameters: string[] = functionInfo.params.map(param => {
          let paramName = param.name;
          paramName = paramName.replace(/-/g, ''); // Remove hyphens (Skript variable prefix for global, temporary variables that are not saved)
          paramName = paramName.replace(/_/g, ''); // Remove underscores (Skript variable prefix for local variables)
          return `${paramName}: ${param.type}`;
        });
        const indent = generateIndent(this.indent, config.indent_type);
        let content: string[] = [];
        
        // Do all the parsing here
        const parseFunction = async () => {
          const consoleParser = await (new Console(functionInfo.content)).parse(); // Parses all "console" methods
          content.push(...consoleParser.split('\n'));

          const returnParser = await (new Return(content.join('\n'))).parse(); // Parses all "return" statements
          returnParser.forEach(line => {
            content[line.line - 1] = line.content;
          });
          
          // Indent the content and remove empty lines
          content = content.map(line => `${indent}${line}`); // Indent the content
          content = content.filter(line => line.trim() !== ''); // Remove empty lines

          // Prepare the function
          parsed.push(
            `function ${functionInfo.name}(${functionParameters.join(', ')}) :: ${functionInfo.returnType}:\n${content.join('\n')}\n`
          )
        }

        promises.push(parseFunction());
      }

      ts.forEachChild(node, checkNode);
    }

    checkNode(source);

    // wait for all functions to be parsed
    await Promise.all(promises);

    return parsed;
  }
}