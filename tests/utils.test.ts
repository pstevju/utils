import { describe, expect, it, vi } from 'vitest';
import { curry, debounce, deepClone, memoize, once, poll, retry, sleep, throttle } from '../src/utils';

describe('debounce', () => {
	it('should delay the execution of the input function', async () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn();
		expect(mockFn).not.toBeCalled();

		await new Promise((resolve) => setTimeout(resolve, 200));

		expect(mockFn).toBeCalled();
	});

	it('should pass the arguments to the debounced function', async () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn('arg1', 'arg2');
		expect(mockFn).not.toBeCalled();

		await new Promise((resolve) => setTimeout(resolve, 200));

		expect(mockFn).toBeCalledWith('arg1', 'arg2');
	});

	it('should debounce multiple function calls', async () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		debouncedFn();
		debouncedFn();
		debouncedFn();

		expect(mockFn).not.toBeCalled();

		await new Promise((resolve) => setTimeout(resolve, 200));

		expect(mockFn).toBeCalledTimes(1);
	});
});

describe('throttle', () => {
	it('should call the input function immediately', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn();

		expect(mockFn).toBeCalled();
	});

	it('should not call the input function again within the specified limit', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn();
		throttledFn();
		throttledFn();

		expect(mockFn).toBeCalledTimes(1);
	});

	it('should call the input function again after the specified limit has passed', async () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn();
		expect(mockFn).toBeCalled();

		await new Promise((resolve) => setTimeout(resolve, 200));

		throttledFn();
		expect(mockFn).toBeCalledTimes(2);
	});

	it('should pass the arguments to the throttled function', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 100);

		throttledFn('arg1', 'arg2');

		expect(mockFn).toBeCalledWith('arg1', 'arg2');
	});
});

describe('once', () => {
	it('should call the input function only once', () => {
		const mockFn = vi.fn();
		const onceFn = once(mockFn);

		onceFn();
		onceFn();
		onceFn();

		expect(mockFn).toBeCalledTimes(1);
	});

	it('should return the result of the input function', () => {
		const mockFn = vi.fn().mockReturnValue('result');
		const onceFn = once(mockFn);

		const result = onceFn();

		expect(result).toBe('result');
	});

	it('should pass the arguments to the input function', () => {
		const mockFn = vi.fn();
		const onceFn = once(mockFn);

		onceFn('arg1', 'arg2');

		expect(mockFn).toBeCalledWith('arg1', 'arg2');
	});
});

describe('memoize', () => {
	it('should return the cached result for the same arguments', () => {
		const mockFn = vi.fn().mockReturnValue('result');
		const memoizedFn = memoize(mockFn);

		const result1 = memoizedFn('arg1', 'arg2');
		const result2 = memoizedFn('arg1', 'arg2');

		expect(mockFn).toBeCalledTimes(1);
		expect(result1).toBe('result');
		expect(result2).toBe('result');
	});

	it('should call the input function again for different arguments', () => {
		const mockFn = vi.fn().mockReturnValue('result');
		const memoizedFn = memoize(mockFn);

		const result1 = memoizedFn('arg1', 'arg2');
		const result2 = memoizedFn('arg3', 'arg4');

		expect(mockFn).toBeCalledTimes(2);
		expect(result1).toBe('result');
		expect(result2).toBe('result');
	});
});

describe('curry', () => {
	it('should return a curried version of the input function', () => {
		const mockFn = vi.fn();
		const curriedFn = curry(mockFn);

		expect(typeof curriedFn).toBe('function');
	});

	it('should execute the curried function when all arguments are provided', () => {
		const mockFn = vi.fn();
		const curriedFn = curry(mockFn);

		curriedFn('arg1', 'arg2', 'arg3');

		expect(mockFn).toBeCalledWith('arg1', 'arg2', 'arg3');
	});

	it('should return a new function when some arguments are provided', () => {
		const mockFn = vi.fn();
		const curriedFn = curry(mockFn);

		const result = curriedFn('arg1');

		expect(typeof result).toBe('function');
		expect(result).not.toBe(mockFn);
	});

	it('should execute the curried function when all arguments are provided in multiple calls', () => {
		const mockFn = vi.fn();
		const curriedFn = curry(mockFn);

		curriedFn('arg1')('arg2')('arg3');

		expect(mockFn).toBeCalledWith('arg1', 'arg2', 'arg3');
	});

	it('should return the result of the curried function', () => {
		const mockFn = vi.fn().mockReturnValue('result');
		const curriedFn = curry(mockFn);

		const result = curriedFn('arg1', 'arg2');

		expect(result).toBe('result');
	});
});

describe('deepClone', () => {
	it('should create a deep copy of an object', () => {
		const obj = { a: 1, b: { c: 2 } };
		const clonedObj = deepClone(obj);

		expect(clonedObj).toEqual(obj);
		expect(clonedObj).not.toBe(obj);
		expect(clonedObj.b).not.toBe(obj.b);
	});

	it('should create a deep copy of an array', () => {
		const arr = [1, [2, 3], { a: 4 }];
		const clonedArr = deepClone(arr);

		expect(clonedArr).toEqual(arr);
		expect(clonedArr).not.toBe(arr);
		expect(clonedArr[1]).not.toBe(arr[1]);
		expect(clonedArr[2]).not.toBe(arr[2]);
	});

	it('should handle circular references', () => {
		const obj: any = { a: 1 };
		obj.b = obj;

		const clonedObj = deepClone(obj);

		expect(clonedObj).toEqual(obj);
		expect(clonedObj).not.toBe(obj);
		expect(clonedObj.b).toBe(clonedObj);
	});
});

describe('retry', () => {
	it('should resolve with the function result', async () => {
		const mockFn = vi.fn().mockResolvedValue('result');
		const result = await retry(mockFn, 3, 100);

		expect(mockFn).toBeCalledTimes(1);
		expect(result).toBe('result');
	});

	it('should reject after max retries', async () => {
		const mockFn = vi.fn().mockRejectedValue(new Error('Failed'));
		await expect(retry(mockFn, 3, 100)).rejects.toThrow('Max retries reached');

		expect(mockFn).toBeCalledTimes(4);
	});

	it('should retry the function until it succeeds', async () => {
		const mockFn = vi.fn().mockRejectedValueOnce(new Error('Failed')).mockRejectedValueOnce(new Error('Failed')).mockResolvedValue('result');

		const result = await retry(mockFn, 3, 100);

		expect(mockFn).toBeCalledTimes(3);
		expect(result).toBe('result');
	});

	it('should delay between retries', async () => {
		const mockFn = vi.fn().mockRejectedValueOnce(new Error('Failed')).mockRejectedValueOnce(new Error('Failed')).mockResolvedValue('result');

		const startTime = Date.now();
		await retry(mockFn, 3, 100);
		const endTime = Date.now();

		expect(endTime - startTime).toBeGreaterThanOrEqual(300);
	});

	it('should pass the function result to each retry attempt', async () => {
		const mockFn = vi.fn().mockRejectedValueOnce(new Error('Failed')).mockRejectedValueOnce(new Error('Failed')).mockResolvedValue('result');

		await retry(mockFn, 3, 100);

		expect(mockFn).toBeCalledWith();
		expect(mockFn).toBeCalledWith(new Error('Failed'));
		expect(mockFn).toBeCalledWith(new Error('Failed'));
	});
});

describe('poll', () => {
	it('should resolve when the condition is met', async () => {
		const mockFn = vi.fn().mockResolvedValue('result');
		const validate = vi.fn().mockReturnValue(true);

		const result = await poll(mockFn, validate, 100, 3);

		expect(mockFn).toBeCalledTimes(1);
		expect(validate).toBeCalledWith('result');
		expect(result).toBe('result');
	});

	it('should reject after max attempts', async () => {
		const mockFn = vi.fn().mockResolvedValue('result');
		const validate = vi.fn().mockReturnValue(false);

		await expect(poll(mockFn, validate, 100, 3)).rejects.toThrow('Max attempts reached');

		expect(mockFn).toBeCalledTimes(3);
		expect(validate).toBeCalledTimes(3);
	});

	it('should call the function at each interval', async () => {
		const mockFn = vi.fn().mockResolvedValue('result');
		const validate = vi.fn().mockReturnValue(false);

		await poll(mockFn, validate, 100, 3);

		expect(mockFn).toBeCalledTimes(3);
		expect(validate).toBeCalledTimes(3);
	});

	it('should delay between polling attempts', async () => {
		const mockFn = vi.fn().mockResolvedValue('result');
		const validate = vi.fn().mockReturnValue(false);

		const startTime = Date.now();
		await poll(mockFn, validate, 100, 3);
		const endTime = Date.now();

		expect(endTime - startTime).toBeGreaterThanOrEqual(300);
	});

	it('should pass the function result to the condition function', async () => {
		const mockFn = vi.fn().mockResolvedValue('result');
		const validate = vi.fn().mockReturnValue(false);

		await poll(mockFn, validate, 100, 3);

		expect(mockFn).toBeCalledWith();
		expect(validate).toBeCalledWith('result');
	});
});

describe('sleep', () => {
	it('should resolve after the specified delay', async () => {
		const delay = 1000;
		const startTime = Date.now();
		await sleep(delay);
		const endTime = Date.now();
		const elapsed = endTime - startTime;

		expect(elapsed).toBeGreaterThanOrEqual(delay);
	});

	it('should not resolve before the specified delay', async () => {
		const delay = 1000;
		const startTime = Date.now();
		await sleep(delay);
		const endTime = Date.now();
		const elapsed = endTime - startTime;

		expect(elapsed).toBeGreaterThanOrEqual(delay);
	});
});
