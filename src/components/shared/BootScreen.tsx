import { motion } from "framer-motion";
import { PixelMoon } from "./PixelMoon";

export function BootScreen() {
  return (
    <motion.div
      className="boot-screen"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45 }}
    >
      <PixelMoon small />
      <h1>Starting MoonOS 98...</h1>
      <div className="boot-bar">
        <span />
      </div>
      <p>loading portfolio.sys</p>
    </motion.div>
  );
}
