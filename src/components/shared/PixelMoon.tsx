export function PixelMoon({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "pixel-moon pixel-moon-small" : "pixel-moon"} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
