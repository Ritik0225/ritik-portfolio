export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade" />
      <div className="noise" />
    </div>
  );
}
