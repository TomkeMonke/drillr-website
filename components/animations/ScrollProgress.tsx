/**
 * Thin progress bar pinned to the top of the viewport that fills as the user scrolls.
 * Pure CSS via scroll-timeline (Chromium 115+); collapses to an invisible 2px strip elsewhere.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none"
    >
      <div className="scroll-progress-bar h-full bg-gradient-to-r from-primary via-primary-light to-accent" />
    </div>
  );
}
