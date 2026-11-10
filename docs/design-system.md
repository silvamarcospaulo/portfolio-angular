# Portfolio Soft UI Design System

## Principles

Preserve the original Lexend typography, neutral light and dark surfaces, blue focus accents, rounded shapes and neumorphic depth. Animation should support navigation and reading, never hide content or interfere with keyboard access.

## Tokens

| Category | CSS tokens |
| --- | --- |
| Surfaces | `--color-primary`, `--color-secondary` |
| Typography | `--color-text-title`, `--color-text-subtitle` |
| Accent | `--color-link`, `--color-link-focus` |
| Depth | `--shadow-dark`, `--shadow-light`, `--soft-depth-raised`, `--soft-depth-sunken` |
| Shape | `--soft-radius-sm`, `--soft-radius-md`, `--soft-radius-lg` |
| Layout | `--content-width` |

Use `.soft-ui-container` for raised panels and consistent box shadows. Use inset shadows for skill badges and icon wells. Keep interactive controls legible with a visible focus state.

## Animation guidelines

On desktop, GSAP ScrollTrigger maps vertical page progress to horizontal movement in the career timeline. The timeline stays vertical on mobile. Respect `prefers-reduced-motion`, clean up animation instances on component destruction, and refresh measurements after translated text changes.

Do not constrain the height or enable vertical scrolling inside career cards. When the viewport is too short for a pinned timeline, navigation should remain accessible through the track itself.

## Content

Keep professional roles and projects factual. Mark unfinished products explicitly. Show real screenshots where available and a designed placeholder where they are not. Avoid external iframe previews.

## Quality checks

Run `npm run verify:portfolio` and `npm run build`. Validate 390×844, 768×1024, 1366×768, and 1920×1080 in a real browser, including both themes and all three languages.
