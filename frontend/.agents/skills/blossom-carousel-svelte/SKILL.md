---
name: blossom-carousel-svelte
description: Use for Blossom Carousel Svelte or SvelteKit installation, stylesheet setup, Svelte examples, Tailwind examples, accessibility or a11y guidance, controls, overscroll events, and Svelte-specific integration.
---

# Blossom Carousel Svelte

Use this skill for Blossom Carousel Svelte or SvelteKit tasks involving installation, stylesheet setup, component usage, root element customization, controls, or overscroll handling.

Blossom Carousel Svelte wraps Blossom Carousel Core. For shared engine behavior, lifecycle, and direct DOM concepts, also consider the `blossom-carousel-core` skill.

For migration questions from Embla, Swiper, Splide, Slick, or Flickity, use the `blossom-carousel-migration` skill first.

## Package

Install the Svelte package:

```bash
npm install @blossom-carousel/svelte
```

Import the stylesheet exactly once per app, in the app entry file or root layout. Do not include it in individual component examples unless the user explicitly asks for a standalone example.

```js
import "@blossom-carousel/core/style.css";
```

## Svelte Setup

Import the default `BlossomCarousel` component from `@blossom-carousel/svelte` and use it in a Svelte component:

```svelte
<script>
  import BlossomCarousel from "@blossom-carousel/svelte";
</script>

<BlossomCarousel>
  <!-- slides -->
</BlossomCarousel>
```

## Svelte Version

Default to Svelte 5 syntax (runes, `onclick`, `$props`). For Svelte 4 projects, use `on:event` directives and `export let` props. Ask the user if unclear.

## SvelteKit Setup

In SvelteKit, import the core stylesheet from a root layout or another global entry point:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "@blossom-carousel/core/style.css";
</script>

<slot />
```

Then import and use the component where the carousel is rendered:

```svelte
<script>
  import BlossomCarousel from "@blossom-carousel/svelte";

  const slides = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<BlossomCarousel>
  {#each slides as slide (slide)}
    <div>Slide {slide}</div>
  {/each}
</BlossomCarousel>
```

## Basic Usage

Use `<BlossomCarousel>` as the carousel root and pass slides as children:

```svelte
<script>
  const slides = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<BlossomCarousel>
  {#each slides as slide (slide)}
    <div>Slide {slide}</div>
  {/each}
</BlossomCarousel>
```

Each direct child becomes a slide. In Svelte examples, use a keyed `{#each}` block when rendering generated slide lists.

## Options

The Svelte wrapper currently exposes `as` for the carousel root element. For other carousel configuration options, refer to the `blossom-carousel-core` skill.

## Root Element

Use the `as` prop to define the HTML element rendered for the carousel root:

```svelte
<script>
  const slides = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<BlossomCarousel as="ul">
  {#each slides as slide (slide)}
    <li>Slide {slide}</li>
  {/each}
</BlossomCarousel>
```

This renders the carousel root as a `ul` and keeps the slide elements as `li` children:

```html
<ul>
  <li>Slide 1</li>
  <li>Slide 2</li>
  <li>Slide 3</li>
  ...
</ul>
```

Match the root element to the slide markup; for list-like carousels, use `as="ul"` with `li` slides.

## Button Controls

Use `bind:this` for previous and next buttons:

```svelte
<script>
  import BlossomCarousel from "@blossom-carousel/svelte";

  let blossomCarousel;
</script>

<BlossomCarousel bind:this={blossomCarousel}>
  <!-- slides -->
</BlossomCarousel>

<button onclick={() => blossomCarousel?.prev()}>Prev</button>
<button onclick={() => blossomCarousel?.next()}>Next</button>
```

Call `prev()` and `next()` on the component binding rather than manually changing scroll positions.
When using TypeScript, type the binding as `let blossomCarousel: BlossomCarousel;` and import types from `@blossom-carousel/svelte`. Type overscroll handlers as `CustomEvent<{ left: number }>`.

## Overscroll API

Listen for `overscroll` to customize Blossom's drag overscroll behavior. Prevent the event when replacing the default rubberbanding effect:

```svelte
<script>
  let blossomCarousel;

  function onOverscroll(event) {
    event.preventDefault();

    const overScroll = event.detail.left;

    Array.from(blossomCarousel?.children ?? []).forEach((slide) => {
      slide.style.transform = `scale(${1 - overScroll * 0.1})`;
    });
  }
</script>

<BlossomCarousel bind:this={blossomCarousel} onoverscroll={onOverscroll}>
  {#each Array.from({ length: 12 }, (_, index) => index + 1) as slide (slide)}
    <div>Slide {slide}</div>
  {/each}
</BlossomCarousel>
```

Read offsets from `event.detail.left` and apply custom visual effects to slides or the root element.
The `bind:this` reference exposes the component instance with `prev()`, `next()`, and an `element` property that points to the carousel root element. Use `blossomCarousel.element.children` to access slide DOM nodes.

## Examples Reference

For visual layout recipes, consult `/docs/examples/` and adapt the selected example to Svelte or SvelteKit syntax.

When adapting docs examples, preserve Svelte syntax from this skill: use `<BlossomCarousel>`, `class`, keyed `{#each}` blocks, `bind:this`, and Svelte event bindings. The docs examples often include both CSS and optional Tailwind versions; use Tailwind utility classes only when the user states their project uses Tailwind or explicitly requests a Tailwind example. Otherwise default to regular CSS classes.

## Accessibility Reference

When the user explicitly asks about carousel accessibility, a11y, ARIA, keyboard support, focus behavior, reduced motion, screen readers, or WCAG, consult `/docs/a11y/accessibility-guide.md` and adapt its patterns to Svelte or SvelteKit syntax.

Use the guide for deeper accessibility patterns and testing guidance.

## Implementation Guidance

- Prefer `@blossom-carousel/svelte` for Svelte and SvelteKit projects.
- Import the component as the default export: `import BlossomCarousel from "@blossom-carousel/svelte"`.
- Import styles from `@blossom-carousel/core/style.css`, not from the Svelte package.
- Use `BlossomCarousel` as a Svelte component, not as a custom element.
- Preserve valid Svelte syntax: use keyed `{#each items as item (key)}` blocks, not React-style `key` props.
- For custom controls, use `bind:this` and call `prev()` or `next()` on the component binding.
- For custom overscroll styling, listen for `onoverscroll`, call `event.preventDefault()` when replacing the default rubberbanding effect, and read offsets from `event.detail.left`.
- For SvelteKit examples, place global stylesheet imports in `src/routes/+layout.svelte` or another app-level entry point.
- For core carousel behavior rather than Svelte integration, refer to the `blossom-carousel-core` skill when available.
- If asked about features not documented in this skill, such as autoplay, pagination, or vertical orientation, defer to the `blossom-carousel-core` skill or state that the feature is not documented here.

## Common Fixes

If the carousel is unstyled, check that this import exists in the app entry file, root layout, or component:

```js
import "@blossom-carousel/core/style.css";
```

If Svelte examples contain React-style keys, replace `key={value}` with a keyed each block:

```svelte
{#each slides as slide (slide)}
  <div>Slide {slide}</div>
{/each}
```

If the component import fails, check that the Svelte package is imported as a default export:

```js
import BlossomCarousel from "@blossom-carousel/svelte";
```

If list markup is invalid, use the `as` prop to align the carousel root with the slide elements, such as `as="ul"` for `li` slides.

If custom previous or next buttons do nothing, check that `bind:this` is attached to `<BlossomCarousel>` and that button handlers call `blossomCarousel?.prev()` or `blossomCarousel?.next()` after the component is mounted.

If a custom overscroll effect runs in addition to the default rubberbanding, call `event.preventDefault()` in the `onoverscroll` handler.
