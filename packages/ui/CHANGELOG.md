# @flytrap/ui

## 0.5.0

### Minor Changes

- d639d41: Prepare the design system packages for external distribution.

  - Build `@flytrap/ui` to `dist` and publish compiled JavaScript, declarations, CSS and assets.
  - Emit Node-compatible `.js` extensions for relative ESM imports in the published build.
  - Add component-level Button tokens for `outline`, `ghost` and `link` states.
  - Introduce Changesets so token/UI versions can move together intentionally.

### Patch Changes

- Updated dependencies [d639d41]
  - @flytrap/tokens@0.2.0
