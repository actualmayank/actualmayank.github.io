import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

type SoundName = "startup" | "open" | "close" | "minimize" | "click" | "error";

const tones: Record<SoundName, number[]> = {
  startup: [220, 330, 440, 660],
  open: [520, 660],
  close: [300, 190],
  minimize: [420, 260],
  click: [620],
  error: [160, 130],
};

export function useSound() {
  const [muted, setMuted] = useLocalStorage("moonos-muted", false);

  const play = useCallback(
    (name: SoundName) => {
      if (muted) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const context = new AudioContextClass();
        const now = context.currentTime;

        tones[name].forEach((frequency, index) => {
          const osc = context.createOscillator();
          const gain = context.createGain();
          const start = now + index * 0.08;
          osc.type = "square";
          osc.frequency.value = frequency;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.045, start + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.075);
          osc.connect(gain);
          gain.connect(context.destination);
          osc.start(start);
          osc.stop(start + 0.08);
        });
      } catch {
        // Browsers may block AudioContext before a user gesture. UI should never crash over sound.
      }
    },
    [muted],
  );

  return { muted, toggleMuted: () => setMuted((current) => !current), play };
}
