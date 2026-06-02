const { ZodError } = require('zod');
const AppError = require('./appError');

const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errorMessages = err.issues.map(
        (issue) => `${issue.path.join('.')} - ${issue.message}`,
      );
      return next(
        new AppError(`Invalid request data. ${errorMessages.join(' | ')}`, 400),
      );
    }
    next(err);
  }
};

module.exports = validateRequest;
