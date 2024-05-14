
export class CherryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CherryError';
  }
}