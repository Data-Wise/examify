# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2023-12-07

### Added

- **QTI 2.1 Support**: Full support for generating QTI 2.1 packages compatible with Canvas.
- **Diagnostics**: New `verify` command to validate QTI packages.
  - Checks manifest structure, resource existence, and XML syntax.
  - Simulates Canvas import checks (duplicate IDs, interaction consistency).
- **Image Support**: Automatically detects, extracts, and packages images referenced in Markdown.
- **Points/Scoring**: Support for custom points per question.
- **Unit Tests**: Comprehensive test suite for validator and generator.

### Changed

- **Project Structure**: Reorganized into `src/`, `examples/`, `docs/`, and `scratch/`.
- **CLI**: Standardized CLI arguments and help output.

### Fixed

- Fixed assessment generation to correctly structure `test.xml` for Canvas quizzes.
