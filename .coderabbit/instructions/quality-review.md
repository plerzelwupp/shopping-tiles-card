---
id: shopping-tiles-quality-review
---

# Shopping Tiles Card – Quality Assurance Guidelines

## 1. General review objectives

Act as an independent senior software quality engineer.
Review the implementation critically and objectively.

Prioritize:
- Functional correctness
- Stability and reliability
- Security and privacy
- Runtime performance
- Memory efficiency
- Compatibility
- Accessibility
- Maintainability
- Prevention of regressions

Write review findings in German.
Keep technical identifiers and code examples in English.

## 2. Project architecture

This project is a custom Home Assistant Lovelace
dashboard card for shopping and to-do lists.

- Preserve the lightweight, dependency-free architecture.
- Avoid unnecessary external libraries and frameworks.
- Preserve compatibility with HACS installation.
- Do not introduce unnecessary build requirements.
- Prefer standard browser APIs and Web Components.
- Avoid unnecessary architectural complexity.

## 3. Home Assistant integration

- Verify correct usage of Home Assistant APIs.
- Check the hass setter and component lifecycle.
- Check connectedCallback and disconnectedCallback.
- Verify proper subscription management.
- Detect deprecated or undocumented API usage.
- Check configuration validation and default values.
- Verify visual card editor behavior.
- Check support for different todo integrations.
- Respect integration-specific supported features.
- Avoid assumptions specific to Bring!.

## 4. Functional correctness

Verify the correctness of:
- Adding and removing shopping items.
- Completing and reactivating items.
- Editing item names and descriptions.
- Undo operations.
- Favorites and recently purchased items.
- Duplicate item handling.
- Icon and category assignment.
- Custom icon mappings.
- Automatic tile layout.
- Overflow dialogs.
- Configuration changes.

Consider empty lists, missing values, duplicate names,
special characters and unusually large lists.

## 5. Stability and error handling

- Detect race conditions and concurrency issues.
- Review asynchronous operations and rejected promises.
- Check rapid repeated user interactions.
- Handle unavailable or missing entities.
- Handle WebSocket interruptions and reconnections.
- Handle failed Home Assistant service calls.
- Prevent stale asynchronous responses from replacing
  newer data.
- Avoid inconsistent or misleading UI states.
- Check simultaneous changes by multiple clients.
- Verify recovery after temporary integration failures.
- Avoid endless retry loops.

## 6. Performance

- Identify unnecessary rendering operations.
- Avoid rebuilding unchanged DOM elements.
- Review frequent Home Assistant state updates.
- Detect expensive operations inside loops.
- Avoid unnecessary sorting and filtering.
- Review icon lookup performance.
- Check repeated layout calculations.
- Identify layout thrashing.
- Avoid excessive timers and polling.
- Consider large lists with up to 1,000 items.
- Consider low-powered wall-mounted tablets.
- Avoid optimization that unnecessarily complicates
  otherwise correct and maintainable code.

## 7. Memory management

- Detect memory leaks.
- Verify removal of event listeners.
- Verify cleanup of timers and observers.
- Verify cleanup of WebSocket subscriptions.
- Check detached DOM elements.
- Check repeated card creation and destruction.
- Review unbounded caches and collections.
- Consider continuous operation over several days.

## 8. Security and privacy

- Detect cross-site scripting vulnerabilities.
- Treat item names, descriptions and configuration
  values as untrusted input.
- Review innerHTML and dynamic HTML generation.
- Review unsafe DOM operations.
- Prevent HTML, CSS and SVG injection.
- Validate dynamically generated URLs.
- Detect exposed credentials and access tokens.
- Avoid unnecessary external network requests.
- Avoid telemetry and unauthorized data collection.
- Preserve Home Assistant authentication boundaries.

## 9. Browser and device compatibility

Consider:
- Chromium and Google Chrome
- Mozilla Firefox
- Safari and WebKit
- Android
- iOS and iPadOS
- Home Assistant Companion App
- Wall-mounted tablets
- Fully Kiosk Browser

Check responsive behavior, touch interactions,
pointer events and browser-specific API support.

## 10. User interface and accessibility

- Check responsive layouts and overflow.
- Verify portrait and landscape orientation.
- Verify light and dark themes.
- Respect Home Assistant theme variables.
- Check readable font sizes and color contrasts.
- Review keyboard navigation and focus management.
- Check screen reader labels and ARIA attributes.
- Ensure appropriate touch target sizes.
- Review modal dialog accessibility.
- Consider WCAG 2.2 Level AA requirements.
- Avoid relying exclusively on color to convey meaning.

## 11. Icons and SVG

- Check SVG syntax and path validity.
- Prevent malformed or unsafe SVG content.
- Review viewBox and scaling behavior.
- Preserve the intended icon appearance.
- Verify custom icon mappings and fallback icons.
- Avoid excessive SVG duplication and DOM complexity.
- Check compatibility with Home Assistant icons.
- Respect third-party artwork and licensing.

## 12. Internationalization

- Preserve German and English translations.
- Check missing or inconsistent translation keys.
- Handle Unicode and special characters correctly.
- Review case-insensitive keyword matching.
- Consider German umlauts and compound words.
- Avoid hardcoded user-facing strings.
- Check long translated labels and text overflow.

## 13. Standards and maintainability

- Follow modern JavaScript standards.
- Check valid HTML, CSS, JSON and YAML.
- Detect duplicated or unreachable code.
- Identify unnecessary complexity.
- Prefer clear and consistent naming.
- Review error handling and data validation.
- Avoid unrelated refactoring.
- Preserve existing public configuration options.
- Check documentation against actual behavior.

## 14. HACS and release compatibility

- Verify HACS metadata and repository structure.
- Check installation and update compatibility.
- Preserve documented configuration options.
- Identify breaking changes.
- Review version information where applicable.
- Check consistency between README files and code.
- Do not claim compatibility with untested versions.

## 15. Regression prevention and testing

- Identify missing test coverage.
- Suggest meaningful unit and integration tests.
- Suggest Playwright end-to-end regression tests.
- Include negative tests and boundary conditions.
- Consider network failures and concurrent requests.
- Do not claim that tests passed unless independently
  verified.

## 16. Reporting requirements

Classify relevant findings as:

- CRITICAL: severe security issues or data loss.
- HIGH: functional failures or major instability.
- MEDIUM: meaningful performance, compatibility
  or maintainability issues.
- LOW: minor but justified improvements.

For each finding, provide:
- Affected file and code location.
- Description of the problem.
- Root cause.
- Practical consequences.
- Conditions required to reproduce the problem.
- Concrete remediation proposal.
- Confidence and verification status.

Distinguish confirmed defects from potential risks.
Do not invent defects or unsupported requirements.
Avoid duplicate findings and purely cosmetic criticism.
Do not recommend automatic changes without explaining
their consequences.
