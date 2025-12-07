# Development Effort Summary

## Session Overview

**Focus**: Security Hardening, Reliability, and Canvas Compatibility Debugging.

## Key Accomplishments

### 🛡️ Security Hardening

Implemented a defense-in-depth strategy for the QTI validator:

1. **XSS Detection**: The validator now scans all question content for malicious tags (`<script>`, `<iframe`, `<object>`, `<embed`) and protocols (`javascript:`).
2. **Path Traversal Prevention**: Resource paths are checked to ensure they do not attempt to traverse up the directory tree (`../`), protecting the host system.
3. **Torture Test Suite**: Created `tests/fixtures/torture.md` and `tests/torture.test.ts` to permanently regression-test these security features.

### 🎲 Deterministic Builds

**Problem**: The previous generator used `Math.random()` for IDs, making regression testing impossible as every run produced different files.
**Solution**: Implemented **Content-Based Hashing** (SHA-256). The same Markdown input now produces the *exact* same QTI package every time (Idempotency).

### 🐛 Bug Fixes & Refinements

#### 1. Canvas Short Answer Logic

* **Issue**: Canvas reported "The importer couldn't determine the correct answers" for Short Answer questions.
* **Cause**: The parser was not extracting the "Answer: ..." text into the options object, and the generator expected an ID match instead of a Text match.
* **Fix**: Updated `parser/markdown.ts` to extract the answer text and `generator/qti.ts` to use `<varequal>` string matching for Short Answers.

#### 2. Image Display in Canvas

* **Issue**: Images were bundled in the zip but not displaying in Canvas questions.
* **Cause**: The `imsmanifest.xml` listed images as resources but failed to link them as *dependencies* of the assessment resource.
* **Fix**: Updated `index.ts` to inject `<dependency identifierref="...">` tags into the manifest.

#### 3. Validation Suite

* **Action**: Created `examples/canvas-validation.md`, a comprehensive "Smoke Test" exam covering all supported question types (Math, Logic, Code, Media).
* **Result**: This file validates cleanly and imports successfully into Canvas.

## Current Status

* **Tests**: 35 tests passing (Full Core + Torture + Regression).
* **Version**: 0.4.1 (Ready for Release).
* **Stability**: High.
