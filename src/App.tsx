import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DesktopShell } from "./components/desktop/DesktopShell";
import { MobileShell } from "./components/mobile/MobileShell";
import { BootScreen } from "./components/shared/BootScreen";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useSound } from "./hooks/useSound";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 760px)");
  const [booting, setBooting] = useState(true);
  const sound = useSound();

  useEffect(() => {
    sound.play("startup");
    const timer = window.setTimeout(() => setBooting(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence>{booting && <BootScreen />}</AnimatePresence>
      {!booting && (
        isMobile ? (
          <MobileShell play={sound.play} />
        ) : (
          <DesktopShell muted={sound.muted} toggleMuted={sound.toggleMuted} play={sound.play} />
        )
      )}
    </ErrorBoundary>
  );
}
