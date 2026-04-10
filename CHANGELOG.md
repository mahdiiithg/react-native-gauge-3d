# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-04-10

### Fixed
- Publish transpiled package files so Expo Snack and web bundlers can consume the package.
- Point package entry fields at the built output instead of raw JSX source.
- Remove an unused `Arc` import from `react-native-svg`.
- Correct README examples for installation and `useElementSize` usage.

## [1.0.0] - 2026-04-10

### Added
- Initial release of react-native-gauge-3d
- SVG-based gauge component with customizable appearance
- Dark mode support
- Alert system with high/low thresholds
- Range indicator visualization
- Smooth needle animations
- Built-in settings panel
- Value conversion support
- Editable values with tap-to-edit
- Render props for custom extensibility
- Utility exports (useElementSize, getSpeedColor, icons)
- TypeScript-friendly props
- iOS and Android support
- Expo compatibility

[1.0.0]: https://github.com/mahdiiithg/react-native-gauge/releases/tag/v1.0.0
