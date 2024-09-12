// utils.ts

/**
 * Debounce function: Delays the processing of the input function until after a specified wait time has passed.
 * @param func The function to debounce
 * @param wait The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>): void => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}

/**
 * Throttle function: Ensures the input function is called at most once per specified interval.
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
	let lastFunc: ReturnType<typeof setTimeout>;
	let lastRan: number;

	return function (...args: Parameters<T>) {
		const now = Date.now();
		if (!lastRan) {
			func(...args);
			lastRan = now;
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(
				() => {
					if (now - lastRan >= limit) {
						func(...args);
						lastRan = now;
					}
				},
				limit - (now - lastRan),
			);
		}
	};
}

/**
 * Once function: Ensures the input function is called only once.
 * @param func The function to execute only once
 * @returns A function that will only be executed once
 */
export function once<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> | undefined {
	let called = false;
	let result: ReturnType<T>;

	return function (...args: Parameters<T>) {
		if (!called) {
			called = true;
			result = func(...args);
		}
		return result;
	};
}

/**
 * Memoize function: Caches the result of the input function based on its arguments.
 * @param func The function to memoize
 * @returns A memoized version of the function
 */
export function memoize<T extends (...args: any[]) => any>(func: T): T {
	const cache = new Map<string, ReturnType<T>>();
	return function (...args: Parameters<T>) {
		const key = JSON.stringify(args);
		if (!cache.has(key)) {
			const result = func(...args);
			cache.set(key, result);
			return result;
		}
		return cache.get(key) as ReturnType<T>;
	} as T;
}

/**
 * Curry function: Transforms a function that takes multiple arguments into a series of functions that take one argument.
 * @param func The function to curry
 * @returns A curried version of the function
 */
export function curry<T extends (...args: any[]) => any>(func: T): (...args: any[]) => any {
	return function curried(...args: any[]) {
		if (args.length >= func.length) {
			return func(...args);
		} else {
			return function (...nextArgs: any[]) {
				return curried(...args, ...nextArgs);
			};
		}
	};
}

/**
 * Deep clone function: Creates a deep copy of an object or array.
 * @param obj The object or array to deep clone
 * @returns A deep cloned copy of the input
 */
export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * Retry logic: Retries a function a specified number of times with a delay between attempts.
 * @param fn The function to retry (must return a Promise)
 * @param retries The number of retry attempts
 * @param delay The delay between retries in milliseconds
 * @returns A Promise that resolves with the function's result or rejects after max retries
 */
export async function retry<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> {
	try {
		return await fn();
	} catch /*(error)*/ {
		if (retries > 0) {
			await sleep(delay);
			return retry(fn, retries - 1, delay);
		} else {
			throw new Error('Max retries reached');
		}
	}
}

/**
 * Polling logic: Repeatedly calls a function at a given interval until a condition is met or max attempts are reached.
 * @param fn The function to call at each interval (must return a Promise)
 * @param validate The condition function to check if polling should stop
 * @param interval The interval time in milliseconds between polling attempts
 * @param maxAttempts The maximum number of polling attempts
 * @returns A Promise that resolves when the condition is met or rejects after max attempts
 */
export function poll<T>(fn: () => Promise<T>, validate: (result: T) => boolean, interval: number, maxAttempts: number): Promise<T> {
	let attempts = 0;

	const executePoll = async (resolve: any, reject: any) => {
		const result = await fn();
		attempts++;
		if (validate(result)) {
			resolve(result);
		} else if (attempts === maxAttempts) {
			reject(new Error('Max attempts reached'));
		} else {
			setTimeout(() => executePoll(resolve, reject), interval);
		}
	};

	return new Promise(executePoll);
}

/**
 * Sleep function: Creates a delay in async functions.
 * @param ms The delay in milliseconds
 * @returns A Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
