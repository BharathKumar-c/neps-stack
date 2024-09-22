const catchAsync = (fn) => {
  const errorHandler = (req, res, next) => {
    fn(req, res, next).catch((error) => next(error));
  };

  return errorHandler;
};

module.exports = catchAsync;
