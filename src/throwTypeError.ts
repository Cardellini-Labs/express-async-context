export const throwTypeError = (
  msg: string,
  fn?: (...args: never[]) => unknown,
) => {
  const error = new TypeError(msg);

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(error, fn ?? throwTypeError);
  }

  throw error;
};
