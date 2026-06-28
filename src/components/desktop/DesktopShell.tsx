import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { desktopIcons, WindowId } from "../../data/portfolioData";
import { useWindowManager } from "../../hooks/useWindowManager";
import { PixelMoon } from "../shared/PixelMoon";
import { DesktopIcon } from "./DesktopIcon";
import { DesktopWindow } from "./DesktopWindow";
import { WindowContent } from "../windows/WindowContents";
import { Taskbar } from "../taskbar/Taskbar";

type DesktopShellProps = {
  muted: boolean;
  toggleMuted: () => void;
  play: (
    name: "startup" | "open" | "close" | "minimize" | "click" | "error"
  ) => void;
};

export function DesktopShell({
  muted,
  toggleMuted,
  play,
}: DesktopShellProps) {
  const manager = useWindowManager();

  // No icon selected when the desktop first loads.
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);

  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [typed, setTyped] = useState("");
  const [wallpaperTheme, setWallpaperTheme] = useState<"moon" | "cyberpunk">("moon");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
  
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(now)
      );
  
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(now)
      );
    };
  
    updateClock();
  
    const timer = window.setInterval(updateClock, 1000);
  
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const next = (typed + event.key.toLowerCase()).slice(-8);

      setTyped(next);

      if (next.includes("moon") || next.includes("mayank")) {
        manager.openWindow("secret");
        play("open");
        setTyped("");
      }
    }

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [manager, play, typed]);

  function openWindow(id: WindowId) {
    manager.openWindow(id);
    setStartOpen(false);
    play(id === "shutdown" ? "error" : "open");
  }

  function handleDesktopPointerDown(event: React.PointerEvent<HTMLElement>) {
    const target = event.target as HTMLElement;

    const clickedIcon = target.closest(".desktop-icon");
    const clickedWindow = target.closest(".win-window");
    const clickedTaskbar = target.closest(".taskbar");
    const clickedStartMenu = target.closest(".start-menu");

    // Click anywhere empty on the wallpaper = deselect desktop icon.
    if (!clickedIcon && !clickedWindow && !clickedTaskbar && !clickedStartMenu) {
      setSelectedIcon(null);
    }
  }

  return (
    <motion.main
  className={`desktop-area ${wallpaperTheme === "cyberpunk" ? "cyberpunk-theme" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onPointerDown={handleDesktopPointerDown}
    >
      <div className="wallpaper-wordmark">MoonOS 98</div>

      <PixelMoon />

      <div className="stars" aria-hidden="true" />

      <div className="crt-noise" aria-hidden="true" />

      {(() => {
  const leftColumnIcons = desktopIcons.filter(
    ([, , , , iconX]) => iconX === 10,
  );

  return desktopIcons.map(([id, label, icon, tooltip, x, y]) => {
    const isLeftColumn = x === 10;

    const leftIndex = leftColumnIcons.findIndex(
      ([iconId]) => iconId === id,
    );

    /*
      Desktop height minus:
      - top breathing room: 28px
      - taskbar safe space: 105px
      - icon visual height: ~68px
    */
    const availableHeight = window.innerHeight - 28 - 105 - 68;

    const evenlySpacedY =
      isLeftColumn && leftColumnIcons.length > 1
        ? 28 + (availableHeight / (leftColumnIcons.length - 1)) * leftIndex
        : y;

    return (
      <DesktopIcon
        key={id}
        id={id}
        label={label}
        icon={icon}
        tooltip={tooltip}
        x={x}
        y={evenlySpacedY}
        active={selectedIcon === id}
        onSelect={setSelectedIcon}
        onOpen={openWindow}
      />
    );
  });
})()}

      {manager.visibleWindows.map((windowState) => (
        <DesktopWindow
          key={windowState.id}
          state={windowState}
          active={windowState.id === manager.activeWindowId}
          onFocus={manager.focusWindow}
          onChange={manager.patchWindow}
          onMaximize={(id) => {
            manager.toggleMaximize(id);
            play("click");
          }}
          onMinimize={(id) => {
            manager.minimizeWindow(id);
            play("minimize");
          }}
          onClose={(id) => {
            manager.closeWindow(id);
            play("close");
          }}
        >
          <WindowContent
          id={windowState.id}
          onOpen={openWindow}
          onThemeChange={setWallpaperTheme}
          />
        </DesktopWindow>
      ))}

      <Taskbar
        windows={manager.openWindows}
        activeWindowId={manager.activeWindowId}
        startOpen={startOpen}
        muted={muted}
        time={time}
        date={date}
        onStart={() => {
          setStartOpen((open) => !open);
          play("click");
        }}
        onOpen={openWindow}
        onToggleMute={toggleMuted}
      />
    </motion.main>
  );
}