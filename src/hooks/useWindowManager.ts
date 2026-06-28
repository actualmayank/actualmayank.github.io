import { useCallback, useMemo, useState } from "react";
import { WindowId } from "../data/portfolioData";
import { useLocalStorage } from "./useLocalStorage";

export type WindowState = {
  id: WindowId;
  x: number;
  y: number;
  width: number;
  height: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};

const baseGeometry: Record<
  WindowId,
  Omit<
    WindowState,
    "id" | "isOpen" | "isMinimized" | "isMaximized" | "zIndex"
  >
> = {
  welcome: { x: 330, y: 90, width: 560, height: 380 },
  about: { x: 285, y: 70, width: 660, height: 510 },
  projects: { x: 380, y: 115, width: 720, height: 550 },
  skills: { x: 315, y: 185, width: 570, height: 440 },
  education: { x: 430, y: 135, width: 610, height: 470 },
  experience: { x: 350, y: 110, width: 740, height: 560 },
  contact: { x: 455, y: 110, width: 550, height: 530 },
  resume: { x: 530, y: 150, width: 470, height: 390 },
  computer: { x: 405, y: 95, width: 570, height: 420 },
  recycle: { x: 500, y: 165, width: 430, height: 280 },
  shutdown: { x: 510, y: 210, width: 430, height: 220 },
  secret: { x: 465, y: 170, width: 470, height: 260 },
  certificate: { x: 505, y: 110, width: 500, height: 420 },

  terminal: { x: 360, y: 100, width: 720, height: 500 },
  readme: { x: 440, y: 140, width: 540, height: 470 },

  "project-fluxlane": { x: 430, y: 120, width: 560, height: 420 },
  "project-subwise": { x: 450, y: 140, width: 560, height: 420 },
  "project-gistify": { x: 470, y: 160, width: 560, height: 420 },
};

const initialWindows = Object.fromEntries(
  Object.entries(baseGeometry).map(([id, geometry], index) => [
    id,
    {
      id,
      ...geometry,
      isOpen: id === "welcome",
      isMinimized: false,
      isMaximized: false,
      zIndex: index + 1,
    },
  ]),
) as Record<WindowId, WindowState>;

function createWindowState(id: WindowId, index = 0): WindowState {
  return {
    id,
    ...baseGeometry[id],
    isOpen: id === "welcome",
    isMinimized: false,
    isMaximized: false,
    zIndex: index + 1,
  };
}

function normalizeWindows(stored: Record<WindowId, WindowState>) {
  const entries = Object.keys(baseGeometry).map((id, index) => {
    const windowId = id as WindowId;
    const saved = stored?.[windowId];
    const fallback = createWindowState(windowId, index);

    return [
      windowId,
      {
        ...fallback,
        ...saved,
        id: windowId,
        width: Number.isFinite(saved?.width) ? saved.width : fallback.width,
        height: Number.isFinite(saved?.height)
          ? saved.height
          : fallback.height,
        x: Number.isFinite(saved?.x) ? saved.x : fallback.x,
        y: Number.isFinite(saved?.y) ? saved.y : fallback.y,
        zIndex: Number.isFinite(saved?.zIndex)
          ? saved.zIndex
          : fallback.zIndex,
      },
    ];
  });

  return Object.fromEntries(entries) as Record<WindowId, WindowState>;
}

function clamp(state: WindowState) {
  const maxX = Math.max(0, window.innerWidth - 130);
  const maxY = Math.max(0, window.innerHeight - 120);

  return {
    ...state,
    x: Math.min(Math.max(0, state.x), maxX),
    y: Math.min(Math.max(0, state.y), maxY),
  };
}

export function useWindowManager() {
  const [storedWindowsById, setWindowsById] = useLocalStorage(
    "moonos-window-state",
    initialWindows,
  );

  const windowsById = useMemo(
    () => normalizeWindows(storedWindowsById),
    [storedWindowsById],
  );

  const [topZ, setTopZ] = useState(() =>
    Math.max(...Object.values(windowsById).map((item) => item.zIndex || 0)),
  );

  const windows = useMemo(() => Object.values(windowsById), [windowsById]);
  const openWindows = windows.filter((item) => item.isOpen);
  const visibleWindows = openWindows.filter((item) => !item.isMinimized);

  const activeWindowId = visibleWindows.reduce<WindowState | null>(
    (active, item) => (!active || item.zIndex > active.zIndex ? item : active),
    null,
  )?.id;

  const patchWindow = useCallback(
    (id: WindowId, patch: Partial<WindowState>) => {
      setWindowsById((current) => ({
        ...current,
        [id]: clamp({ ...normalizeWindows(current)[id], ...patch }),
      }));
    },
    [setWindowsById],
  );

  const focusWindow = useCallback(
    (id: WindowId) => {
      setTopZ((currentTop) => {
        const nextTop = currentTop + 1;

        setWindowsById((current) => ({
          ...current,
          [id]: {
            ...normalizeWindows(current)[id],
            zIndex: nextTop,
            isMinimized: false,
          },
        }));

        return nextTop;
      });
    },
    [setWindowsById],
  );

  const openWindow = useCallback(
    (id: WindowId) => {
      setTopZ((currentTop) => {
        const nextTop = currentTop + 1;

        setWindowsById((current) => ({
          ...current,
          [id]: {
            ...normalizeWindows(current)[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextTop,
          },
        }));

        return nextTop;
      });
    },
    [setWindowsById],
  );

  const closeWindow = (id: WindowId) =>
    patchWindow(id, {
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
    });

  const minimizeWindow = (id: WindowId) =>
    patchWindow(id, { isMinimized: true });

  const toggleMaximize = (id: WindowId) =>
    patchWindow(id, {
      isMaximized: !windowsById[id].isMaximized,
      isMinimized: false,
    });

  return {
    windows,
    openWindows,
    visibleWindows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    patchWindow,
  };
}