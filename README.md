# Flood Type

A two-line wordmark that falls in one letter at a time, holds dead still, then rushes the camera until it overruns the frame with every letter turned to its own angle — before it tumbles out the bottom and the next word falls into the empty frame.

## Why

The obvious way to build something like this is a spring or a physics engine driving each letter's own clock. That version is hard to reason about and easy to make look mushy. This one is the opposite: the whole piece is a handful of numbers per frame — a global scale, a fall offset, a rotation progress, a tracking amount, a pointer lean — plus four constants per letter. No per-letter clock, no springs, no blur, no gradients. Everything on screen is a per-letter affine transform read off a few small sampled curves.

That constraint is also what makes the "3D" work without a 3D engine. Drawing a glyph at a horizontal scale of `cos(yaw)` *is* that glyph turned about its own vertical axis under orthographic projection — no perspective divide, no WebGL, one cosine per letter.

## How it works

- **The zoom is a table, not an easing function.** It's authored as a sampled curve read with a fractional index — it hangs almost still for the first third, snaps through the middle steeper than any cubic-bezier would allow, overshoots the settled size by a few percent, and settles back. The overshoot is what makes the type read as having mass.
- **Depth lives in size, never in position.** Each letter gets a small random depth so the lockup isn't one flat plane being enlarged, but only its *scale* is driven by that depth — its position always uses the shared global scale. Multiplying position by a per-letter depth would break the symmetry glyph offsets have around the line centre, and the word would visibly drift off-centre as the zoom opens up.
- **The entrance is ordered by distance from centre, not by index** — outermost letters land first, the word closes on its own middle — and the turn is driven off the arrival progress raised to a power, so the letter is still turned as it crosses into frame instead of finishing its turn off-screen above the top edge.
- **Fast letters get a smear, not a blur.** Two-color canvas has no cheap blur, so instead each letter trailing above a measured-velocity threshold gets a couple of extra flat stamps drawn back along its own motion — read as speed the way a printed multiple exposure does.
- **Per-letter rotation is heavy-tailed.** Drawn as `maxAngle * random()^2.6` with a random sign, so most letters stay close to upright and the one or two that go wild read as deliberate rather than as uniform noise.

## Stack

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS v4
- **Rendering:** a single `<canvas>` and the 2D context — no WebGL, no CSS animation, no animation library
- **Font:** [Archivo](https://fonts.google.com/specimen/Archivo) at regular weight, loaded through `next/font`

The animation itself (`src/components/flood-type/`) doesn't import React or Next — `engine.ts` is a plain class over a canvas element, `params.ts` is the tuning table, and `flood-type-card.tsx` is the thin wrapper that mounts it, watches for visibility and reduced-motion, and forwards the pointer.

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Status

Single showcase piece cycling through a handful of two-color word pairs. Build log lives in commit history.
