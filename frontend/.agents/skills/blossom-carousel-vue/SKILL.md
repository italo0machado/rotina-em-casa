---
name: blossom-carousel-vue
description: Use when working with Blossom Carousel Vue or Nuxt integration, including installation, component registration, styling, usage examples, Tailwind examples, accessibility or a11y guidance, root element customization, button controls, overscroll events, and Vue-specific carousel implementation.
---

# Blossom Carousel Vue

Use this skill for Blossom Carousel Vue or Nuxt tasks involving package installation, component registration, stylesheet setup, `<BlossomCarousel>` usage examples, root element customization, controls, or overscroll handling.

Blossom Carousel Vue wraps Blossom Carousel Core. For shared carousel behavior, options, lifecycle concepts, events, and engine semantics, also consider the `blossom-carousel-core` skill.

## Package

Install the Vue package:

```bash
npm install @blossom-carousel/vue
```

The Vue package depends on the core package. Always include the core stylesheet in app setup unless the user has already imported it elsewhere:

```js
import "@blossom-carousel/core/style.css";
```

## Vue Setup

Register `BlossomCarousel` globally in a Vue app when the user wants to use the component throughout the app:

```js
import { createApp } from "vue";
import { BlossomCarousel } from "@blossom-carousel/vue";
import "@blossom-carousel/core/style.css";

const app = createApp({});

app.component("BlossomCarousel", BlossomCarousel);
```

For local component usage, import the component in the Vue file instead of registering it globally:

```vue
<script setup>
import { BlossomCarousel } from "@blossom-carousel/vue";
import "@blossom-carousel/core/style.css";
</script>

<template>
  <BlossomCarousel>
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>
</template>
```

Use TypeScript syntax (`<script setup lang="ts">`, typed refs like `ref<InstanceType<typeof BlossomCarousel> | null>(null)`) when the user's project uses TypeScript; otherwise default to JavaScript.

## Nuxt Setup

In Nuxt, create a plugin that registers the component globally:

```ts
// plugins/blossom-carousel.ts
import { BlossomCarousel } from "@blossom-carousel/vue";
import "@blossom-carousel/core/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("BlossomCarousel", BlossomCarousel);
});
```

If the user prefers Nuxt auto-imported components, recommend creating a wrapper component in the app's components directory instead of global plugin registration.

If the user reports hydration mismatches or SSR issues, suggest wrapping `<BlossomCarousel>` in `<ClientOnly>` or setting the plugin to client-only via `plugins/blossom-carousel.client.ts`.

## Basic Usage

Use `<BlossomCarousel>` as the carousel root and pass slides as default slot children:

```vue
<template>
  <BlossomCarousel>
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>
</template>
```

Each direct child becomes a slide. In Vue examples, include `:key` on `v-for` slide elements.

## Root Element

Use the `as` prop to define the HTML element rendered for the carousel root:

```vue
<template>
  <BlossomCarousel as="ul">
    <li v-for="i in 12" :key="i">Slide {{ i }}</li>
  </BlossomCarousel>
</template>
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

Use a Vue template ref when the user needs previous and next buttons. The component exposes `prev()` and `next()` for programmatic navigation:

```vue
<template>
  <BlossomCarousel ref="blossomCarousel">
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>

  <button @click="blossomCarousel.prev()">Previous</button>
  <button @click="blossomCarousel.next()">Next</button>
</template>

<script setup>
const blossomCarousel = ref(null);
</script>
```

Use `prev()` and `next()` on the component ref rather than manually changing scroll positions.

## Overscroll API

Listen for the `overscroll` event when the user wants to customize Blossom's drag engine overscroll behavior. Prevent the event to replace Blossom's default rubberbanding effect:

```vue
<template>
  <BlossomCarousel ref="blossomCarousel" @overscroll.prevent="onOverscroll">
    <div v-for="i in 12" :key="i">Slide {{ i }}</div>
  </BlossomCarousel>
</template>

<script setup>
const blossomCarousel = ref(null);

function onOverscroll(event) {
  const overScroll = event.detail.left;

  Array.from(blossomCarousel.value.children).forEach((slide) => {
    slide.style.transform = `scale(${1 - overScroll * 0.1})`;
  });
}
</script>
```

Read overscroll values from `event.detail`, such as `event.detail.left`, and apply custom visual effects to the carousel slides or root element.
The `blossomCarousel` ref exposes the component instance with methods like `prev()` and `next()`, plus a `children` getter that returns the slide DOM elements.

## Examples Reference

For visual layout recipes, consult `/docs/examples/` and adapt the selected example to Vue or Nuxt syntax.

When adapting docs examples, preserve Vue syntax from this skill: use `<BlossomCarousel>`, `class`, `:key`, Vue refs, and Vue event bindings. The docs examples often include both CSS and optional Tailwind versions; use Tailwind utility classes only if the user explicitly mentions Tailwind usage in their project, otherwise default to regular CSS classes.

## Migration Reference

If the user is moving from another carousel library, use the `blossom-carousel-migration` skill first. It routes to the right guide by title and points to the hosted docs page or local source markdown file as needed.

## Accessibility Reference

When the user explicitly asks about carousel accessibility, a11y, ARIA, keyboard support, focus behavior, reduced motion, screen readers, or WCAG, consult `/docs/a11y/accessibility-guide.md` and adapt its patterns to Vue or Nuxt syntax.

Use the guide for deeper guidance on semantic slide structure, labelled regions, real previous and next buttons, unique control names, keyboard alternatives to dragging, focus visibility, inactive slides, auto-rotation, live regions, picker semantics, forced colors, and manual accessibility testing.

## Implementation Guidance

- Prefer `@blossom-carousel/vue` for Vue and Nuxt projects.
- Import styles from `@blossom-carousel/core/style.css`, not from the Vue package.
- Use `BlossomCarousel` as a Vue component, not as a custom element.
- Preserve valid Vue syntax in examples: use `:key` with `v-for`, wrap examples in `<template>` when showing Vue single-file component snippets, and default to `script setup` unless the user's existing code or explicit request uses the Options API.
- For custom controls, use a Vue ref and call `prev()` or `next()` on the component instance.
- For custom overscroll styling, listen for `@overscroll`, use `.prevent` when replacing the default rubberbanding effect, and read offsets from `event.detail.left`.
- For Nuxt examples, use `defineNuxtPlugin` and register with `nuxtApp.vueApp.component`.
- When the user asks about core carousel behavior rather than Vue integration, refer to Blossom Carousel Core concepts and, when available, the `blossom-carousel-core` skill.

## Common Fixes

If the carousel is unstyled, check that this import exists in app setup or the local component:

```js
import "@blossom-carousel/core/style.css";
```

If the component is unknown in Vue templates, check that either:

- `BlossomCarousel` is imported locally in the component, or
- `app.component('BlossomCarousel', BlossomCarousel)` is called during Vue app setup, or
- a Nuxt plugin registers the component through `nuxtApp.vueApp.component`.

If list markup is invalid, use the `as` prop to align the carousel root with the slide elements, such as `as="ul"` for `li` slides.

If custom previous or next buttons do nothing, check that the template ref is attached to `<BlossomCarousel>` and that button handlers call `blossomCarousel.prev()` or `blossomCarousel.next()` after the component is mounted.

If a custom overscroll effect runs in addition to the default rubberbanding, use `@overscroll.prevent="onOverscroll"` or call `event.preventDefault()` in the handler.
