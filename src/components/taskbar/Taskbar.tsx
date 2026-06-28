import { Volume2, VolumeX } from "lucide-react";
import { WindowId, startMenu, windowTitles } from "../../data/portfolioData";
import { WindowState } from "../../hooks/useWindowManager";
import { PixelMoon } from "../shared/PixelMoon";

type TaskbarProps = {
  windows: WindowState[];
  activeWindowId?: WindowId;
  startOpen: boolean;
  muted: boolean;
  time: string;
  date: string;
  onStart: () => void;
  onOpen: (id: WindowId) => void;
  onToggleMute: () => void;
};

export function Taskbar({ windows, activeWindowId, startOpen, muted, time, date, onStart, onOpen, onToggleMute }: TaskbarProps) {
  return (
    <footer className="taskbar">
      {startOpen && (
        <nav className="start-menu" aria-label="Start menu">
          <div className="start-rail">MoonOS 98</div>
          <div className="start-list">
            {startMenu.map(([id, label]) => (
              <button key={id} onClick={() => onOpen(id)}>
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}

      <button className="start-button" onClick={onStart}>
        <PixelMoon small />
        Start
      </button>

      <div className="task-buttons">
        {windows.map((item) => (
          <button
            key={item.id}
            className={item.id === activeWindowId && !item.isMinimized ? "pressed" : ""}
            onClick={() => onOpen(item.id)}
          >
            {windowTitles[item.id]}
          </button>
        ))}
      </div>

      <div className="system-tray">

      <button
  className="tray-sound"
  aria-label="Toggle sound"
  onClick={onToggleMute}
>
  {muted ? (
    <VolumeX size={16} strokeWidth={2.25} />
  ) : (
    <Volume2 size={16} strokeWidth={2.25} />
  )}
</button>

<div className="tray-divider" />

<span className="tray-brand">
  MoonOS
</span>

<div className="tray-divider" />

<div className="tray-clock">
  <span>{time}</span>
  <small>{date}</small>
</div>

</div>
    </footer>
  );
}
