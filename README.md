[![Build Status](https://github.com/pstevju/utils/actions/workflows/test.yml/badge.svg)](https://github.com/pstevju/utils/actions)
[![Codecov](https://codecov.io/gh/pstevju/utils/branch/main/graph/badge.svg)](https://codecov.io/gh/pstevju/utils)
![npm](https://img.shields.io/npm/v/@pstevju/utils)
![npm](https://img.shields.io/npm/dm/@pstevju/utils)
![Bundle Size](https://badgen.net/bundlephobia/min/@pstevju/utils)
![License](https://img.shields.io/github/license/pstevju/utils)
![GitHub last commit](https://img.shields.io/github/last-commit/pstevju/utils)

# Utils

A relatively small collection of utility functions for everyday use.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Available Functions](#available-functions)
  - [debounce](#debounce)
  - [throttle](#throttle)
  - [once](#once)
  - [memoize](#memoize)
  - [curry](#curry)
  - [deepClone](#deepclone)
  - [retry](#retry)
  - [poll](#poll)
  - [sleep](#sleep)
- [Contributing](#contributing)
- [Testing](#testing)
- [License](#license)

## Features

- Lightweight and fast.
- Written in TypeScript with type declarations.
- Debouncing and throttling for performance optimization.
- Memoization for caching expensive function calls.
- Retry logic, polling, and more utilities for handling asynchronous operations.

## Installation

To install this package, use NPM or Yarn:

```bash
npm install @pstevju/utils
# or
yarn add @pstevju/utils
```

## Usage

Here's how to use some of the utilities from the library:

### Example: Debounce

```typescript
import { debounce } from '@pstevju/utils';

const debouncedFunction = debounce(() => {
  console.log('Debounced function executed');
}, 300);

window.addEventListener('resize', debouncedFunction);
```

### Example: Throttle

```typescript
import { throttle } from '@pstevju/utils';

const throttledFunction = throttle(() => {
  console.log('Throttled function executed');
}, 500);

window.addEventListener('scroll', throttledFunction);
```

## Available Functions

### debounce

Creates a debounced function that delays invoking the function until after the specified `wait` time has passed.

```typescript
debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void
```

### throttle

Creates a throttled function that only invokes `func` at most once per every `limit` milliseconds.

```typescript
throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void
```

### once

Creates a function that can only be invoked once.

```typescript
once<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> | undefined
```

### memoize

Memoizes a function, caching its results based on the arguments passed to it.

```typescript
memoize<T extends (...args: any[]) => any>(func: T): T
```

### curry

Transforms a function that takes multiple arguments into a sequence of functions, each taking a single argument.

```typescript
curry<T extends (...args: any[]) => any>(func: T): (...args: any[]) => any
```

### deepClone

Creates a deep copy of an object or array.

```typescript
deepClone<T>(obj: T): T
```

### retry

Retries a function that returns a promise, with a delay between attempts, up to a specified number of retries.

```typescript
retry<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T>
```

### poll

Polls a function at a given interval until a condition is met or the maximum number of attempts is reached.

```typescript
poll<T>(fn: () => Promise<T>, validate: (result: T) => boolean, interval: number, maxAttempts: number): Promise<T>
```

### sleep

Pauses execution for a given amount of time.

```typescript
sleep(ms: number): Promise<void>
```

## Contributing

We welcome contributions! Whether you're reporting a bug, suggesting a new feature, or submitting a pull request, please follow our [Contribution Guidelines](./CONTRIBUTING.md).

## Testing

We use **Vitest** for unit testing and **c8** for code coverage. To run tests and check coverage, use the following commands:

### Run Tests

```bash
npm run test
```

### Check Coverage

```bash
npm run coverage
```

A full coverage report will be generated in the `coverage` directory.

## License

This project is licensed under the [MIT License](./LICENSE).