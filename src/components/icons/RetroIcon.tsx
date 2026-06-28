type RetroIconProps = {
  kind: string;
  size?: number;
};

export function RetroIcon({ kind, size = 38 }: RetroIconProps) {
  return (
    <img
      src={`/icons/${kind}.png`}
      alt={kind}
      width={size}
      height={size}
      draggable={false}
      style={{
        objectFit: "contain",
        imageRendering: "pixelated",
        display: "block",
      }}
    />
  );
}