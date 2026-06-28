import { Rnd } from "react-rnd";
import { WindowId, windowTitles } from "../../data/portfolioData";
import { WindowState } from "../../hooks/useWindowManager";

type DesktopWindowProps = {
  state: WindowState;
  active: boolean;
  children: React.ReactNode;
  onFocus: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onChange: (id: WindowId, patch: Partial<WindowState>) => void;
};

export function DesktopWindow({
  state,
  active,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onChange,
}: DesktopWindowProps) {
  if (!state.isOpen || state.isMinimized) return null;

  const bounds = ".desktop-area";

  /*
    Fullscreen window:
    - x/y = 0 means it starts exactly at desktop edge
    - taskbar is left visible because desktop-area should end above it
    - 100% uses the desktop area, not browser viewport
  */
  const size = state.isMaximized
    ? { width: "100%", height: "100%" }
    : { width: state.width, height: state.height };

  const position = state.isMaximized
    ? { x: 0, y: 0 }
    : { x: state.x, y: state.y };

  const handleTitleBarDoubleClick = () => {
    onMaximize(state.id);
  };

  return (
    <Rnd
      className={`win-window ${active ? "active" : "inactive"} ${
        state.isMaximized ? "maximized" : ""
      }`}
      bounds={bounds}
      dragHandleClassName="win-titlebar"
      size={size}
      position={position}
      minWidth={330}
      minHeight={220}
      style={{
        zIndex: state.zIndex,
        transition: "none",
      }}
      disableDragging={state.isMaximized}
      enableResizing={!state.isMaximized}
      onMouseDown={(event) => {
        event.stopPropagation();
        onFocus(state.id);
      }}
      onDragStop={(_, data) =>
        onChange(state.id, {
          x: data.x,
          y: data.y,
        })
      }
      onResizeStop={(_, __, ref, ___, positionData) =>
        onChange(state.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: positionData.x,
          y: positionData.y,
        })
      }
    >
      <article className="window-frame">
        <header
          className="win-titlebar"
          onDoubleClick={handleTitleBarDoubleClick}
        >
          <span>{windowTitles[state.id]}</span>

          <div
            className="window-controls"
            onDoubleClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Minimize"
              onClick={(event) => {
                event.stopPropagation();
                onMinimize(state.id);
              }}
            >
              _
            </button>

            <button
              aria-label={state.isMaximized ? "Restore window" : "Maximize window"}
              title={state.isMaximized ? "Restore" : "Maximize"}
              onClick={(event) => {
                event.stopPropagation();
                onMaximize(state.id);
              }}
            >
              {state.isMaximized ? "❐" : "□"}
            </button>

            <button
              aria-label="Close"
              onClick={(event) => {
                event.stopPropagation();
                onClose(state.id);
              }}
            >
              x
            </button>
          </div>
        </header>

        <div className="window-body">{children}</div>
      </article>
    </Rnd>
  );
}