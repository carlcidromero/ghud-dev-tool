export class AbstractMethodError extends Error {
  constructor(method) {
    super(`Abstract method not implemented. ${method}`);
  }
}
