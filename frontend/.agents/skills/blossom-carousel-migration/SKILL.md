---
name: blossom-carousel-migration
description: Use when migrating from Embla, Swiper, Splide, Slick, or Flickity to Blossom Carousel in any framework. Covers choosing the right migration guide, mapping old concepts to Blossom, and locating the source docs or hosted pages.
---

# Blossom Carousel Migration

Use this skill when the user is moving from another carousel library to Blossom Carousel. It is the routing layer for migration questions and should point the user to the correct guide without duplicating framework-specific implementation details.

## Supported Migrations

Match the source library to the corresponding guide:

- Embla → "Migrating from Embla" (`content/docs/6.migration-guides/1.embla.md`)
- Swiper → "Migrating from Swiper" (`content/docs/6.migration-guides/2.swiper.md`)
- Splide → "Migrating from Splide" (`content/docs/6.migration-guides/3.splide.md`)
- Slick → "Migrating from Slick" (`content/docs/6.migration-guides/4.slick.md`)
- Flickity → "Migrating from Flickity" (`content/docs/6.migration-guides/5.flickity.md`)

## How To Guide The User

- If the source library is not stated, ask the user explicitly which library they are migrating from before proceeding.
- If multiple source libraries are in use, handle each migration separately and reference each corresponding guide title and filename from the Supported Migrations list.
- When referencing a guide, use these exact titles and filenames: Embla → "Migrating from Embla" (`content/docs/6.migration-guides/1.embla.md`), Swiper → "Migrating from Swiper" (`content/docs/6.migration-guides/2.swiper.md`), Splide → "Migrating from Splide" (`content/docs/6.migration-guides/3.splide.md`), Slick → "Migrating from Slick" (`content/docs/6.migration-guides/4.slick.md`), Flickity → "Migrating from Flickity" (`content/docs/6.migration-guides/5.flickity.md`).
- If the source library is not in the supported list, say it is not officially covered, then offer to map concepts generically using the Migration Framing section and point to `blossom-carousel-core`.
- Use the hosted docs page at `https://blossom-carousel.dev/docs/migration-guides/<library>` when the user is reading docs on the web.
- If the context is unclear, ask whether the user is working locally or reading the hosted docs before choosing between the hosted page and the local markdown file.
- Use the source markdown file under `content/docs/6.migration-guides/` when working in the local workspace.
- If the expected migration guide file is not found at that path, inform the user and fall back to `https://blossom-carousel.dev/docs/migration-guides/<library>` rather than fabricating a path.
- Keep the advice at the concept-mapping level unless the user asks for framework-specific code.

## Migration Framing

When helping with a migration, translate the old library into Blossom terms:

- wrapper or viewport → `<BlossomCarousel>` root
- slides or cells → direct children
- library options → CSS, scroll snap, or native browser APIs
- library methods and events → Blossom methods, refs, or browser observers

## Common Follow-Ups

If the user wants implementation help after reading a guide, switch to the relevant framework skill:

- `blossom-carousel-vue`
- `blossom-carousel-react`
- `blossom-carousel-svelte`
- `blossom-carousel-web`
- `blossom-carousel-core`
