import { throwTypeError } from './throwTypeError.js';

describe('throwTypeError', () => {
  it('throws a TypeError with specified message', () => {
    expect(() => throwTypeError('Some Error')).toThrow(
      new TypeError('Some Error'),
    );
  });

  it('patches the stack trace to start from the provided function', () => {
    const captureStackTrace = jest.spyOn(Error, 'captureStackTrace');

    function consumer() {
      throwTypeError('Some Error', consumer);
    }

    expect(consumer).toThrow(new TypeError('Some Error'));
    expect(captureStackTrace).toHaveBeenCalledTimes(1);
    expect(captureStackTrace.mock.calls[0]?.[0]).toBeInstanceOf(TypeError);
    expect(captureStackTrace.mock.calls[0]?.[1]).toBe(consumer);

    captureStackTrace.mockRestore();
  });

  it('still throws when Error.captureStackTrace is not available', () => {
    const originalCaptureStackTrace = Error.captureStackTrace;

    Object.defineProperty(Error, 'captureStackTrace', {
      configurable: true,
      value: undefined,
    });

    try {
      expect(() => throwTypeError('Some Error')).toThrow(
        new TypeError('Some Error'),
      );
    } finally {
      Object.defineProperty(Error, 'captureStackTrace', {
        configurable: true,
        value: originalCaptureStackTrace,
      });
    }
  });
});
