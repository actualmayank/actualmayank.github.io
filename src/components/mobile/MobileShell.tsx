import { Signal, Wifi, BatteryFull } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { mobileTiles, socialLinks, WindowId } from "../../data/portfolioData";
import { PixelMoon } from "../shared/PixelMoon";
import { WindowContent } from "../windows/WindowContents";

type MobileShellProps = {
  play: (name: "startup" | "open" | "close" | "minimize" | "click" | "error") => void;
};

export function MobileShell({ play }: MobileShellProps) {
  const [history, setHistory] = useState<(WindowId | "home")[]>(["home"]);

  const page = history[history.length - 1];
  const [clock, setClock] = useState("");

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date()));
    updateClock();
    const timer = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(timer);
  }, []);

  function openTile(id: string) {
    const external =
      id === "github"
        ? socialLinks[0].href
        : id === "linkedin"
        ? socialLinks[1].href
        : "";
  
    if (external) {
      window.open(external, "_blank", "noreferrer");
      return;
    }
  
    setHistory((prev) => [...prev, id as WindowId]);
    play("open");
  }

  return (
    <main className="phone-shell">
<header className="phone-status">
  <span>{clock}</span>

  <div className="phone-status-icons">
    <Signal size={16} strokeWidth={2.4} />
    <Wifi size={16} strokeWidth={2.4} />
    <BatteryFull size={19} strokeWidth={2.4} />
  </div>
</header>
      <div className="phone-moon"><PixelMoon small /></div>

      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.section
            key="home"
            className="phone-home"
            initial={{ x: -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -32, opacity: 0 }}
          >
            <p className="phone-kicker">MoonOS 98</p>
            <h1>Mayank Kumar</h1>
            <div className="tile-grid">
              {mobileTiles.map(([id, label, size, tone]) => (
                <button key={id} className={`metro-tile ${size} ${tone}`} onClick={() => openTile(id)}>
                  {label}
                </button>
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key={page}
            className="phone-page"
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 48, opacity: 0 }}
          >
            <button
  className="phone-back"
  onClick={() => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  }}
>
  Back
</button>
<WindowContent
  id={page}
  onOpen={(id) => setHistory((prev) => [...prev, id])}
  onThemeChange={() => {}}
/>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}