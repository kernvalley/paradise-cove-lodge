---
layout: page
title: CHANGELOG
permalink: /changelog/
robots: noindex
---
<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Moved components into separate script
- Make loading of GA background task

### Fixed
- Disable polyfill for `:focus-within` - `:not(:focus-within), :not([focus-within])`

## [v1.4.1] - 2023-04-23

### Added
- Page nav for keyboard users (main, nav, footer links)
- Menu nav for keyboard users (jump to seafood, for example)

### Fixed
- Misc. screen reader issues
- Scrolling to element by anchor fix for menu items/sections
- Make focus ring more visible for keyboard navigation

## [v1.4.0] - 2023-03-04

### Added
- Implement `TrustedTypes` support

## [v1.2.0] - 2021-01-21

### Changed
- Update data structure for consistency with other projects
- Re-write to use `jekyll-common` submodule as `_includes/common/`

## [v1.1.1] - 2020-12-27

### Added
- Preloading of background images, complete with `media` to preload correct image before CSS has loaded
- `content-visibility: auto` for most under-the-fold sections to improve rendering perf
- Add theme hanling via `cookieStore`
- Add share buttons to menu items
- Implement `/.well-known/menu` redirecting to JSON-LD version of menu at `/menu/all.json`

### Changed
- Update Leaflet version to 1.7.1
- Lazy load `<leaflet-map>` and `<github-user>`
- Update weather component
- Move customElement shim to own script (as `<script nomodule>`)
- Update nav layout
- Disable lake cam link
- Update contact page design (FAQ and contact form)
- Remove unused `pwa-install` script
- Move shims/polyfills to external scripts
- Convert JSON data to YAML in `_data/`
- Update dependencies
- Load `<leaflet-map>` and `<leaflet-marker>` components as separate `<script>`

### Fixed
- Add missing `"utm_campaign"` param [#152](https://github.com/kernvalley/paradise-cove-lodge/issues/152)
- Fix bad custom property for nav link hover/active background

## [v1.1.0] - 2020-08-29

### Added
- FAQ on Contact Page
- [#KeepKernClean](https://www.kernriverconservancy.org/) badge
- Call to place order button/link on menu page
- Add `<weather-current>` to sidebar
- Preload or preconnect to various required assets to improve load times

### Changed
- Add margins for sidebar on mobile
- Use `contact-form.html` template for contact page
- Add "honeypot" to contact form
- Update Super Linter and various config
- Update menu section names, prices, etc.
- Update room prices
- Add FAQ to contact page
- Add contact links (`tel:` & Maps link with address) to contact page
- Replace Contact Page nav icon
- Add `integrity` attribute to custom elements polyfill `<script>`

### Fixed
- `enctype` for contact form
- Various typos

## [v1.0.5] 2020-08-01

### Added
- Google Analytics script
- Google Webmaster Verification
- Outbound link tracking

### Changed
- Update dependencies
- Make buttons and CSS compatible with new button styles
- Improve load times by loading polyfills dynamically
- Remove optional Google Analytics script and move to dynamic import if tracking id set
- Use CDN styles for contact page

### Fixed
- Ensure `<nav>` remains visible on page load [shgysk8zer0/core-css#97](https://github.com/shgysk8zer0/core-css/pull/97)
- Add missing page layout
- Use correction `autocomplete` for phone on contact page

### Removed
- Tel number from rentals in sidebar

## [v1.0.4] - 2020-07-17

### Added
- Add preconnect link hints

### Changed
- Update editor config with indent style and width
- Update eslint to indent on `switch`
- Updates to webapp manifest
- Make icons compatible with new maskable icons spec
- Remov service worker registration function
- Update CSP
- Use eslint on entire project instead of just `js/`

## [v1.0.3] - 2020-06-29

### Added
- Watch submodules via dependabot

## [v1.0.2] - 2020-06-29

### Added
- GitHub Actions Super Linter
- Dependabot v2

### Changed
- Update Issue & Pull Request templates, etc.
- Numerous dependency updates
- Update README with more status badges
- Use non-json file for webapp manifest (JSON lint issues when mixed with Liquid)
- Use `<github-user>` for dev credits

### Fixed
- Various linting/syntax errors in markdown & JSON

## [v1.0.1] - 2020-06-25

### Added
- Dependbot config
- Changelog

## [v1.0.0] - 2019-06-24

### Initial Release
<!-- markdownlint-restore -->
