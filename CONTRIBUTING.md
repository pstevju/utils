# Contributing

We welcome contributions of all kinds! Whether you're reporting a bug, suggesting a new feature, or submitting a pull request, here’s how you can get involved:

## How to Contribute

1. **Fork the Repository**: Click the "Fork" button on the top right of this page to create your own copy of the repository.
2. **Clone the Repository**: Clone the forked repository to your local machine:
   ```bash
   git clone https://github.com/pstevju/utils.git
   cd your-repo-name
   ```
3. **Create a New Branch**: Create a new branch for your feature, bug fix, or enhancement:
   ```bash
   git checkout -b my-new-branch
   ```

4. **Make Your Changes**: Write clear, concise, and testable code. Please ensure:
   - You follow the existing coding style (e.g., formatting with Prettier if applicable).
   - You include comments where necessary.
   - Your code is thoroughly tested.

5. **Test Your Changes**: Before submitting, ensure that all tests pass and your changes are covered:
   ```bash
   npm run test
   ```

6. **Commit Your Changes**: Use descriptive and meaningful commit messages:
   ```bash
   git add .
   git commit -m "Add feature X or Fix issue Y"
   ```

7. **Push Your Changes**: Push your branch to your forked repository:
   ```bash
   git push origin my-new-branch
   ```

8. **Submit a Pull Request**: Once your changes are complete, go to the original repository and submit a pull request:
   - Ensure your pull request clearly describes the problem or feature.
   - Link any related issues or pull requests.

## Code of Conduct

Please note that we expect contributors to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Respectful and inclusive participation is crucial to maintain a welcoming environment.

## Commit Message Guidelines

- **Write meaningful commit messages**: Commit messages should explain what has changed and why.
- **Use imperative language**: Example: "Fix bug X" instead of "Fixed bug X."
- **Reference issues**: If your commit resolves an open issue, include the issue number, e.g., `Fixes #123`.

## Reporting Issues

If you encounter a bug or would like to request a new feature, feel free to [open an issue](https://github.com/pstevju/utils/issues). When reporting issues:
- Clearly describe the problem.
- Provide steps to reproduce the issue if applicable.
- Include any relevant logs or screenshots.

## Style Guide

To ensure consistency across the project, please adhere to the following style guidelines:
- **Code formatting**: We use [Prettier](https://prettier.io/) to format code. Run `npm run format` before submitting.
- **Linting**: Run `npm run lint` to ensure there are no linting errors.
- **Testing**: Ensure that all new code includes appropriate unit tests and passes existing tests.

## Getting Help

If you need help, don’t hesitate to ask questions. You can:
- [Open an issue](https://github.com/yourusername/yourrepo/issues).
- Reach out to the maintainers by [creating a discussion](https://github.com/yourusername/yourrepo/discussions).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).