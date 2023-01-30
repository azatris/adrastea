export class InvalidActivityParameterError extends Error {
  constructor(s) {
    super(s);
    this.name = this.constructor.name;

    if (this instanceof InvalidAccessibilityError) {
      this.type = "accessibility";
    } else if (this instanceof InvalidPriceError) {
      this.type = "price";
    }

    this.message = `Invalid ${this.type} parameter`;
    this.statusCode = 500;
  }
}

export class InvalidAccessibilityError extends InvalidActivityParameterError {}
export class InvalidPriceError extends InvalidActivityParameterError {}
