# Pattern Library

Patterns are reusable product compositions. They describe how Flytrap components, tokens, accessibility rules and product intent work together to solve a repeated interface problem.

A pattern is not a single component. It is a documented arrangement of components with a clear user problem, anatomy, interaction contract, accessibility expectations and implementation evidence.

## Pattern documentation contract

Every Flytrap pattern should include:

| Field | Purpose |
|--|--|
| Problem | The user or product problem the pattern solves. |
| Use when | Situations where the pattern is appropriate. |
| Avoid when | Situations where the pattern would create confusion, risk or unnecessary complexity. |
| Anatomy | The required regions, controls or states that make the pattern work. |
| Components | Flytrap UI exports expected to compose the pattern. |
| Accessibility | Keyboard, screen reader, contrast, focus and state requirements. |
| Evidence | The app, doc, test or visual audit that proves the pattern exists. |

## AI-managed streaming flow

Status: **production candidate**  
Evidence: `apps/studio`

### Problem

AI-powered streaming experiences can become opaque when the system changes content without showing why. This pattern keeps the user in control while recommendations adapt to a visible mood or intent signal.

### Use when

- A media, learning or content surface adapts recommendations from explicit user intent.
- The product needs visible confidence, recommendation reasons and playback state.
- Sensitive or high-impact content changes require approval before playback.

### Avoid when

- The system cannot explain why a recommendation changed.
- There is no safe fallback when the user rejects a recommendation.
- The product would hide or infer emotional state without a clear user control.

### Anatomy

1. **Mood input** — the user controls the active mood or intent.
2. **Recommendation rail** — ranked media or content recommendations.
3. **Playback state** — current item, progress and next action.
4. **Confidence signal** — visible confidence or fit score.
5. **Approval gate** — explicit approval for high-impact changes.
6. **Assistant trace** — recent prompt, reasoning or system action history.

### Components

- `MoodSelector`
- `MoodSignal`
- `RecommendationRail`
- `MediaCard`
- `PlayerControls`
- `ModelConfidence`
- `PersonalizationPanel`
- `HumanApprovalPrompt`
- `ReasoningStream`
- `ToolCallBlock`

### Accessibility contract

- Mood controls remain visible, labelled and reversible.
- Recommendation changes include a text reason, not color alone.
- High-impact changes require explicit approval.
- Playback controls expose current state to keyboard and assistive technology.
- Rejected recommendations return to a safe active item.

## Dashboard layout

Status: **stable**  
Evidence: `apps/dashboard`

### Problem

Operational interfaces often need dense status, metrics, actions and history at the same time. This pattern creates a predictable structure so density does not become visual noise.

### Use when

- A team needs to monitor quality, adoption, release health or AI workflow status.
- The page combines navigation, KPI cards, tables and activity history.
- Users need to move quickly between status, evidence and next actions.

### Avoid when

- The page has one primary task and does not need persistent navigation.
- The content is editorial rather than operational.
- The dashboard would show metrics without clear ownership or action.

### Anatomy

1. **Navigation shell** — persistent routes or sections.
2. **Hero status** — page summary and current operational state.
3. **KPI region** — high-signal metrics with labels and deltas.
4. **Data region** — tables, lists or structured comparisons.
5. **Activity timeline** — recent changes, risk or release history.
6. **Action region** — recommended next actions or owner handoff.

### Components

- `Page`
- `Section`
- `Sidebar`
- `KpiStatCard`
- `SmartDataTable`
- `Timeline`
- `StatusIndicator`
- `InlineNotification`
- `RecommendationRail`

### Accessibility contract

- The page exposes meaningful landmarks and headings.
- KPI values include text labels and do not rely on color alone.
- Navigation communicates the current section.
- Tables include readable column headers and empty states.
- Timeline entries remain understandable in source order.

## Release readiness flow

Status: **governance**  
Evidence: CI, `pnpm adoption:report`, `pnpm visual:audit`, `.planning/progress.md`

### Problem

A design system release needs traceable proof. This pattern turns quality gates into a repeatable release contract so a component or page is not shipped based on visual approval alone.

### Use when

- A component, token set, public page or product consumer is ready to ship.
- The team needs to prove quality through tests, accessibility checks and adoption evidence.
- A release owner needs a compact decision record.

### Avoid when

- The work is exploratory and not intended to ship.
- Evidence is not available yet.
- The decision needs a broader product or legal review outside the DS gates.

### Anatomy

1. **Gate** — required command, audit or review.
2. **Evidence** — artifact proving the gate passed.
3. **Owner** — person or role accountable for the decision.
4. **Risk** — known limitation or follow-up.
5. **Decision** — ship, hold, iterate or deprecate.

### Components

- `DataList`
- `Timeline`
- `StatusIndicator`
- `InlineNotification`
- `SmartDataTable`
- `CodeBlock`
- `TokenSwatch`

### Accessibility contract

- Status is communicated with text, not color alone.
- Evidence links have explicit labels.
- Checklist order follows the actual release flow.
- Risk and decision states are available to keyboard and screen reader users.

## Adding a new pattern

1. Prove the pattern in at least one app, page or test fixture.
2. Document the problem, anatomy, components and accessibility contract.
3. Add an anchor in the public docs page.
4. Add visual-audit coverage when the pattern is part of the public page.
5. Update the roadmap or progress file with the evidence.

Patterns should graduate from **draft** to **production candidate** only when they have an implementation, accessibility review and a clear owner.
