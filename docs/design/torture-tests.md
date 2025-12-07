# Torture Test Integration Plan

## Goal

Harden the Examify QTI generator and Canvas Emulator to withstand "torture" inputs (edge cases, malicious payloads, and resource exhaustion).

## Torture Scenarios

| Category | Scenario | Current Status | Emulator Update Required |
|----------|----------|----------------|--------------------------|
| **Structure** | Duplicate Questions | ✅ Handled by Parser IDs | ✅ Globally Unique Verified |
| **Logic** | Multiple Answer (Nested) | ✅ Fixed in Validator | ✅ Verified in Regression |
| **Content** | Short Stems (< 5 chars) | ✅ Handled by header-prepend | ✅ Enforced by Validator |
| **Security** | Malicious HTML (`<script>`) | ✅ Handled | ✅ Blocked by Validator |
| **Security** | Path Traversal (`../../`) | ✅ Handled | ✅ Blocked by Validator |
| **Resources** | Huge Files / Quizzes | ⚠️ Unchecked | ⚠️ Pending (Future Work) |

## Implementation Plan

### 1. Emulator Updates (`src/diagnostic/validator.ts`)

* **Security Check**: Scan `mattext` for `<script>`, `<iframe`, `<object>`, `javascript:`.
* **Path Security**: Ensure all resource paths resolve *within* the package (`!path.startsWith('..')` and `!isAbsolute`).
* **Global Uniqueness**: Ensure *ident* attributes are globally unique across the entire manifest/package, not just within files.

### 2. Integration Test

* Move `scratch/torture-test.md` to `tests/fixtures/torture.md`.
* Create `tests/torture.test.ts` that:
    1. Converts `torture.md` -> QTI.
    2. Runs `emulator.validatePackage()`.
    3. Asserts `isValid: true`.

### 3. CI Integration

* Run the torture test as part of `npm test`.

## Brainstorming: Future "Fuzzing"

* **Random Fuzzer**: A script that generates random markdown garbage (unclosed brackets, emoji floods, null bytes) and feeds it to the parser to ensure no crashes.
