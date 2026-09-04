import { FloodTypeCard } from "@/components/flood-type/flood-type-card";

const BUILT_FROM = [
  "A global scale, a fall offset, a rotation progress, a tracking amount, and a pointer lean — five numbers driving every letter on screen.",
  "No per-letter clock and no physics. Each glyph carries four constants — a settle angle, an exit spin, a tumble, and an entrance turn — sampled once and read against the shared ramps above.",
  "The third dimension is a cosine. Scaling a glyph horizontally by cos(yaw) is that glyph turned about its own vertical axis under orthographic projection — no perspective divide, no WebGL.",
  "Motion blur is three flat stamps trailing each letter along its own measured velocity, fired only past the 90th percentile of real displacement so it never shows during the hold.",
];

const CONSTRAINTS = [
  "Set in the body face at its regular weight. A light stroke blown up past 2x still reads as type; a heavy one reads as a blob.",
  "The zoom is a sampled table, not a bezier — it holds, snaps through the middle steeper than any easing curve allows, overshoots by 3%, and settles.",
  "Depth lives in each letter's size, never its position, or the word's ink centre drifts off-centre the moment the zoom opens up.",
  "Two flat colours per word, chosen to separate by hue and by lightness at once — checked past 5:1 contrast, not by eye.",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
        <span className="text-sm font-bold tracking-tight">Flood Type</span>
        <a
          href="https://github.com/prashantkoirala465/flood-type"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            A two-line wordmark that floods the frame.
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            Letters fall in from above, hold dead still, then rush the camera
            until every letter is turned to its own angle and the word
            overruns the card — before it tumbles out the bottom and the next
            word falls into the empty frame.
          </p>
        </div>

        <FloodTypeCard />

        <p className="text-sm text-muted">
          Rest your pointer on the piece during the hold — the type leans
          toward it.
        </p>
      </main>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              How it&apos;s built
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {BUILT_FROM.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              Constraints
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {CONSTRAINTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span>© {year} Prashant Koirala</span>
          <a
            href="https://github.com/prashantkoirala465/flood-type"
            className="transition-colors hover:text-foreground"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
