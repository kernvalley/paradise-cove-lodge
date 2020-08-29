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

### Added
- #KeepKernClean badge
- Call to place order button/link on menu page
- Add `<weather-current>` to sidebar
- Preload or preconnect to various required assets to improve load times

### Changed
- Use `contact-form.html` template for contact page
- Add "honeypot" to contact form
- Update Super Linter and various config

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
