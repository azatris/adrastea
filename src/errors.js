class InvalidActivityParameterError extends Error {
	constructor(s) {
	super(s);
	this.name = this.constructor.name;

	if (this instanceof InvalidAccessibilityError) {
		this.type = 'accessibility';
	} else if (this instanceof InvalidPriceError) {
		this.type = 'price';
	}

	this.message = `Invalid ${this.type} parameter`;
	this.statusCode = 500;
  }
}

class InvalidAccessibilityError extends InvalidActivityParameterError { }
class InvalidPriceError extends InvalidActivityParameterError { }

module.exports = {
	  InvalidActivityParameterError,
	  InvalidAccessibilityError,
	  InvalidPriceError
}
