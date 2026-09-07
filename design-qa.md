# Horizon redesign — visual QA

final result: passed

Source: /workspace/scratch/cd23e33b7057/upload/01-1000013631.png (1487 × 1058).
Implementation: review/desktop.jpg (1353 × 929), review/mobile.jpg (browser capture containing a 390 × 844 CSS iframe).
State: Russian, page top, dark theme. Source normalized proportionally to desktop capture width; bottom is cropped to viewport. No density scaling applied to implementation. Side-by-side evidence: review/comparison.jpg.

## Findings and comparison history
- Initial P1: background horizon was too high and the status note overlapped its bright edge. Regenerated the background using the exact source image, keeping the horizon lower and upper sky darker. Desktop recapture resolves contrast.
- Initial P2: display font was too narrow. Replaced title font with a geometric sans fallback and adjusted tracking. Final title is broad, centered and readable.
- Mobile P2: status note intersected the bright planet rim. Moved it above the vertically stacked actions. Final mobile screenshot verifies readability and no horizontal clipping.
- No remaining actionable P0/P1/P2 findings in the checked views.

## Required fidelity surfaces
- Typography: broad white centered title; Cyrillic sans body and mono labels. Title is live accessible text. Decorative eclipse inside the reference O is not reproduced; minor P3 visual refinement.
- Layout: full-bleed planet, centered hero, header links, rounded actions, thin section separator. Mobile stacks actions. Reference's secondary About action was deliberately changed to browser play per explicit user instruction; About remains in desktop navigation.
- Colors: near-black teal, cyan primary action, pale text and muted supporting text; contrast issue corrected.
- Imagery: generated dedicated background based on selected reference, supplied brand mark reused. WebP background ~106 KB. Minor star/terrain differences expected from regenerated artwork.
- Copy: selected headline and tagline preserved; all three locales supported. Browser URLs updated to requested address; browser section no longer marked coming soon.

## Verification
- npm run build and npm run lint passed.
- RU -> EN -> ZH -> RU checked through language menu; translated browser links present and point to requested URL.
- Factions navigation reaches #factions.
- APK href preserved from existing project. Actual APK download/install not performed.
- Browser action uses requested URL, target=_blank and rel=noopener noreferrer. Activation checked; remote game runtime not verified.
- Console checked: no observed application errors, only browser-extension metadata errors.
- Desktop and 390px mobile browser captures visually inspected; mobile is iframe responsive verification, not real-device emulation.
- Full comparison plus full-size desktop/mobile captures examined; text/actions readable without additional regional crops.

## Follow-up polish
- Optional custom eclipse wordmark asset to reproduce the decorative O.
- The existing lower-section copy still describes multiplayer plans alongside an alpha test status; product availability was not independently audited.
