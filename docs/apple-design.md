# CaseTrack — macOS design references

CaseTrack is a React web application. This implementation follows Apple's macOS interaction and visual guidance; it does not embed SwiftUI/AppKit or claim to be a native Mac application.

## Apple developer resources and corresponding implementation

| Apple resource | Developer code or tool | CaseTrack implementation |
| --- | --- | --- |
| [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) | [Apple Design Resources](https://developer.apple.com/design/resources/) includes official macOS design templates | Desktop sidebar/content split, clear content hierarchy, restrained surfaces |
| [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars) | [NavigationSplitView](https://developer.apple.com/documentation/swiftui/navigationsplitview), [NSSplitViewController](https://developer.apple.com/documentation/appkit/nssplitviewcontroller) | Grouped navigation with visible selection; a working show/hide control; bottom tabs on narrow screens |
| [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) | [SwiftUI toolbar](https://developer.apple.com/documentation/swiftui/view/toolbar(content:)-5w0tj) | Compact sticky toolbar with page identity, sidebar toggle, and reminders link |
| [Color](https://developer.apple.com/design/human-interface-guidelines/color) | [NSColor](https://developer.apple.com/documentation/appkit/nscolor) semantic system colors | Shared CSS tokens; neutral surfaces; blue actions and selection; labeled green, amber, red, purple statuses |
| [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | [NSVisualEffectView](https://developer.apple.com/documentation/appkit/nsvisualeffectview), [SwiftUI Material](https://developer.apple.com/documentation/swiftui/material) | CSS backdrop blur limited to navigation chrome; opaque readable content cards; reduced-transparency fallback |
| [Fonts](https://developer.apple.com/documentation/technologyoverviews/fonts) | [System Fonts](https://developer.apple.com/fonts/system-fonts/), [NSFont.systemFont](https://developer.apple.com/documentation/appkit/nsfont/systemfont(ofsize:)) | `-apple-system, BlinkMacSystemFont, system-ui, sans-serif`; San Francisco on Apple systems, OS system font elsewhere; no hosted Inter request |
| [SF Symbols](https://developer.apple.com/sf-symbols/) | Apple's SF Symbols macOS authoring app | Identified as a native development tool. Existing Lucide SVG icons are retained for the cross-platform web app; they are not described as SF Symbols |
| [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) | OS Reduce Motion / Reduce Transparency / Increase Contrast preferences | CSS preference queries, keyboard focus rings, skip link, navigation labels, current-page announcements, browser zoom enabled |

## Palette

| Role | Color |
| --- | --- |
| Window canvas | `#F5F5F7` |
| Content surface | `#FFFFFF` |
| Primary text | `#1D1D1F` |
| Secondary text | `#636366` |
| Action / selection blue | `#0068D9` |
| Complete | `#217547` |
| Attention | `#946000` |
| Urgent | `#C42B24` |
| Correction | `#7841B3` |

These are web implementation choices inspired by the HIG, not a claim that fixed CSS hex values reproduce macOS dynamic system colors. Native Liquid Glass uses OS rendering; CSS blur is an approximation. Light appearance is intentional in this revision.

The subsequent Occu-Med content correction removes the seeded case, medical information, and fabricated activity. Case views now start empty and reflect browser-local entries. See `occumed-content-sources.md` for the current data and terminology scope.

## Validation of the initial UI redesign

- CaseTrack production build and frontend TypeScript check pass.
- Shared library, API server, and scripts TypeScript checks pass.
- Chromium rendered the 19 applicant routes at 1440px, 768px, 390px and 320px, plus three administrator routes: 79 renders with no uncaught page exceptions or document horizontal overflow.
- Interaction checks passed: demo applicant login, sidebar hide/show, task expansion using Enter, upload navigation, sending a demo message, mobile navigation, and a single current-page indication for each administrator route.
- Desktop dashboard, mobile dashboard, task list, administrator dashboard, and login screenshots were visually inspected after transitions settled. Screenshots were captured on Linux; San Francisco itself is supplied by the browser on macOS.
- The separate, unchanged mockup sandbox fails its TypeScript check because `./.generated/mockup-components` is absent from the repository. It is not the CaseTrack frontend.
- Vite exits successfully with nonblocking source-map messages for existing UI components and a bundle-size warning.

Screenshots were used for local visual review and are excluded from the public branch. The existing public `src/data/mockData.ts` is unchanged.
