---
name: blossom-carousel-web
description: Use for Blossom Carousel Web Components installation, custom element setup, CDN usage, stylesheet imports, HTML examples, Tailwind examples, accessibility or a11y guidance, controls, and overscroll events.
---

# Blossom Carousel Web

Use this skill for Blossom Carousel Web Components. For package installation, use Package and Module Setup. For CDN setup, use CDN Setup. For framework-free HTML, controls, or events, use Basic Usage, Button Controls, and Overscroll API.

Blossom Carousel Web wraps Blossom Carousel Core. For shared engine behavior, lifecycle, and direct DOM concepts, also consider the `blossom-carousel-core` skill.

For migration questions from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Package

Install the Web Components package:

```bash
npm install @blossom-carousel/web
```

Import the custom element definition and the core stylesheet:

```js
import "@blossom-carousel/web";
import "@blossom-carousel/core/style.css";
```

Always include the core stylesheet import in code examples. Only omit it if the user explicitly states they have already imported `@blossom-carousel/core/style.css` elsewhere.

## Module Setup

Use package imports when the project has a bundler or build tool:

```js
import "@blossom-carousel/web";
import "@blossom-carousel/core/style.css";
```

After `@blossom-carousel/web` is imported, the `<blossom-carousel>` custom element is registered and can be used in HTML.

When used in an SSR environment, guard the Web package import and any `document.querySelector` calls so they only run in the browser.

## CDN Setup

Use the CDN build when the user is working without a package manager or build step:

```html
<script src="https://unpkg.com/@blossom-carousel/web/dist/blossom-carousel-web.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/@blossom-carousel/core/dist/blossom-carousel-core.css"
/>
```

Place the script before using `<blossom-carousel>`, or load it with `defer` when it appears in the document head.

## Basic Usage

Use `<blossom-carousel>` as the carousel root and pass slides as direct children:

```html
<blossom-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  ...
</blossom-carousel>
```

Each direct child becomes a slide.

If the user asks about configuration options or attributes, refer them to the `blossom-carousel-core` skill.

## Options

If the user asks about configuration options, refer them to the `blossom-carousel-core` skill.

If the user asks about configuration options, refer them to the `blossom-carousel-core` skill.

## Button Controls

Use the custom element instance for previous and next buttons:

```js
const blossomCarousel = document.querySelector("#blossom-carousel");
```

```html
<button onclick="blossomCarousel.prev()">Previous</button>
<button onclick="blossomCarousel.next()">Next</button>
```

Call `prev()` and `next()` on the `<blossom-carousel>` element rather than manually changing scroll positions.

## Overscroll API

Listen for `overscroll` to customize Blossom's drag overscroll behavior. Prevent the event when replacing the default rubberbanding effect:

```js
blossomCarousel.addEventListener("overscroll", (event) => {
  event.preventDefault();

  const overScroll = event.detail.left;

  Array.from(blossomCarousel.children).forEach((slide) => {
    slide.style.transform = `scale(${1 - overScroll * 0.1})`;
  });
});
```

Read offsets from `event.detail.left` and apply custom visual effects to slides or the root element.
For events other than `overscroll`, refer to the `blossom-carousel-core` skill.

## Examples Reference

For visual layout recipes, consult `/docs/examples/` and adapt the selected example to Web Component syntax.

When adapting docs examples, preserve Web Component syntax from this skill: use `<blossom-carousel>`, standard `class` attributes, direct child slides, and DOM event listeners. The docs examples often include both CSS and optional Tailwind versions; use Tailwind utility classes only when the user's project uses Tailwind or asks for it, and otherwise use regular CSS classes.

## Accessibility Reference

When the user explicitly asks about carousel accessibility, a11y, ARIA, keyboard support, focus behavior, reduced motion, screen readers, or WCAG, consult `/docs/a11y/accessibility-guide.md` and adapt its patterns to framework-free HTML or Web Component usage.

Use the guide for deeper guidance on semantic slide structure, labelled regions, real previous and next buttons, unique control names, keyboard alternatives to dragging, focus visibility, inactive slides, auto-rotation, live regions, picker semantics, forced colors, and manual accessibility testing.

## Implementation Guidance

- Prefer `@blossom-carousel/web` for framework-free websites and Web Component usage.
- Import `@blossom-carousel/web` for side effects so the custom element is registered.
- Import styles from `@blossom-carousel/core/style.css`, not from the Web package.
- Use the lowercase custom element tag `<blossom-carousel>` in HTML.
- Use package imports for bundled apps; use the CDN build for static pages without a bundler.
- Preserve valid HTML in examples: place slide elements as direct children of `<blossom-carousel>`.
- For custom controls, call `prev()` or `next()` on the `<blossom-carousel>` element instance.
- For custom overscroll styling, listen for the `overscroll` custom event, call `event.preventDefault()` when replacing the default rubberbanding effect, and read offsets from `event.detail.left`.
- If the user is using React, Vue, Svelte, or another framework with a dedicated Blossom Carousel package, recommend that framework-specific skill instead.
- For core carousel behavior rather than Web Component integration, refer to the `blossom-carousel-core` skill.

## Common Fixes

If `<blossom-carousel>` does not upgrade into a working component, check that the Web package has been imported:

```js
import "@blossom-carousel/web";
```

If the carousel is unstyled, check that the core stylesheet is imported or linked:

```js
import "@blossom-carousel/core/style.css";
```

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@blossom-carousel/core/dist/blossom-carousel-core.css"
/>
```

If the user is using the CDN snippet in the document head and the component is not ready when HTML is parsed, add `defer` to the script tag:

```html
<script
  defer
  src="https://unpkg.com/@blossom-carousel/web/dist/blossom-carousel-web.umd.js"
></script>
```

If slides are not detected as expected, make sure the slide elements are direct children of `<blossom-carousel>`.

If custom previous or next buttons do nothing, check that the selected element is the `<blossom-carousel>` instance and that handlers call `blossomCarousel.prev()` or `blossomCarousel.next()` after the custom element is registered.

If a custom overscroll effect runs in addition to the default rubberbanding, call `event.preventDefault()` in the `overscroll` event listener.
