import { useRef, useState } from "react";
import { WindowId } from "../../data/portfolioData";
import { RetroIcon } from "../icons/RetroIcon";

type DesktopIconProps = {
  id: WindowId;
  label: string;
  icon: string;
  tooltip: string;
  x: number;
  y?: number;
  active: boolean;
  onOpen: (id: WindowId) => void;
  onSelect: (id: WindowId) => void;
};

export function DesktopIcon({
  id,
  label,
  icon,
  tooltip,
  x,
  y,
  active,
  onOpen,
  onSelect,
}: DesktopIconProps) {
  const [pos, setPos] = useState({ x, y: y ?? 0 });

  const dragStart = useRef<{
    pointerX: number;
    pointerY: number;
    x: number;
    y: number;
  } | null>(null);

  const lastClick = useRef(0);
  const didDrag = useRef(false);

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.stopPropagation();

    onSelect(id);

    didDrag.current = false;

    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      ...pos,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragStart.current || event.buttons !== 1) return;

    const deltaX = event.clientX - dragStart.current.pointerX;
    const deltaY = event.clientY - dragStart.current.pointerY;

    // Tiny movement = normal click. Bigger movement = icon drag.
    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      didDrag.current = true;
    }

    if (!didDrag.current) return;

    const nextX = Math.max(0, dragStart.current.x + deltaX);
    const nextY = Math.max(0, dragStart.current.y + deltaY);

    setPos({ x: nextX, y: nextY });
  }

  function onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    dragStart.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    // Don't open the window after dragging an icon.
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }

    const now = Date.now();

    // Double-click opens the app/window.
    if (now - lastClick.current < 420) {
      onOpen(id);
      lastClick.current = 0;
      return;
    }

    lastClick.current = now;
  }

  return (
    <button
      type="button"
      className={`desktop-icon ${active ? "selected" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      title={tooltip}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onOpen(id);
        }
      }}
    >
      <RetroIcon kind={icon} size={38} />
      <span>{label}</span>
    </button>
  );
}