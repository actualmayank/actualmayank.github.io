import { FormEvent, useEffect, useRef, useState } from "react";

type TerminalWindowProps = {
  onThemeChange: (theme: "moon" | "cyberpunk") => void;
};

type TerminalLine = {
  type: "command" | "output" | "error";
  text: string;
};

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "",
    "about       - who is Mayank?",
    "skills      - inspect technical abilities",
    "projects    - view featured projects",
    "socials     - find Mayank online",
    "contact     - send a transmission",
    "resume      - resume information",
    "whoami      - identify current user",
    "date        - check system time",
    "neofetch    - system information",
    "moon        - ???",
    "theme cyberpunk - activate cyberpunk wallpaper",
    "theme moon      - restore MoonOS wallpaper",
    "clear       - clear terminal",
  ],

  about: [
    "Mayank Kumar",
    "CSE student | developer | content creator",
    "Building cool things for the internet.",
    "Currently powered by caffeine and questionable sleep schedules.",
  ],

  skills: [
    "Languages: JavaScript, TypeScript, Java, Python, SQL",
    "Frameworks: React, Node.js, Express",
    "Tools: Git, GitHub, VS Code, MongoDB",
    "Creative: YouTube, storytelling, editing, marketing",
  ],

  projects: [
    "Featured projects:",
    "",
    "• FluxLane  - traffic prediction system",
    "• Subwise   - subscription tracker SaaS",
    "• Gistify   - AI-powered Chrome extension",
    "",
    "Tip: Open My Projects for the full showcase.",
  ],

  socials: [
    "GitHub:   github.com/actualmayank",
    "LinkedIn: linkedin.com/in/actualmayank",
    "Instagram: instagram.com/actualmayank",
    "",
    "Signal strength: immaculate.",
  ],

  contact: [
    "Opening communications channel...",
    "Email: mayank12999@gmail.com",
    "",
    "Or open Contact Me from the desktop.",
  ],

  resume: [
    "Resume file located at:",
    "C:\\MoonOS\\Documents\\Mayank-Kumar-Resume.pdf",
    "",
    "Open Resume.pdf from the desktop to download it.",
  ],

  whoami: [
    "visitor@moon-os",
    "Status: curious enough to open the terminal.",
  ],

  date: [new Date().toString()],

  neofetch: [
    "          🌙",
    "     MoonOS 98",
    "----------------------",
    "Host: mayank.dev",
    "OS: MoonOS 98",
    "Shell: moonsh 1.0",
    "Theme: midnight",
    "Uptime: since you found this website",
    "Mood: shipping",
  ],

  moon: [
    "🌙 The moon is watching.",
    "Keep exploring.",
  ],

  secret: [
    "Achievement unlocked: Terminal Explorer",
    "You found a hidden command.",
  ],

  coffee: [
    "Brewing virtual coffee...",
    "Productivity +10",
    "Sleep schedule -3",
  ],

  motivation: [
    "You are closer than you think.",
    "Now go build something.",
  ],

  portfolio: [
    "You are already inside it.",
    "Very meta.",
  ],

  sudo: [
    "Nice try.",
    "You do not have root access to Mayank's life.",
  ],

  "sudo hire mayank": [
    "Access granted.",
    "Great decision. Let's build something cool.",
  ],

  "make me a sandwich": [
    "What? Make it yourself.",
  ],

  "rm -rf /": [
    "Deleting portfolio...",
    "Just kidding. That would be tragic.",
  ],
};

export function TerminalWindow({
  onThemeChange,
}: TerminalWindowProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", text: "MoonOS Terminal v1.0.0" },
    { type: "output", text: 'Type "help" to see available commands.' },
    { type: "output", text: "" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    if (command === "theme cyberpunk") {
      onThemeChange("cyberpunk");

      setHistory([
        ...history,
        {
          type: "command",
          text: `C:\\MoonOS\\Users\\visitor> ${rawCommand}`,
        },
        {
          type: "output",
          text: "Cyberpunk wallpaper activated.",
        },
        {
          type: "output",
          text: "",
        },
      ]);

      setInput("");
      return;
    }

    if (command === "theme moon") {
      onThemeChange("moon");

      setHistory([
        ...history,
        {
          type: "command",
          text: `C:\\MoonOS\\Users\\visitor> ${rawCommand}`,
        },
        {
          type: "output",
          text: "MoonOS wallpaper restored.",
        },
        {
          type: "output",
          text: "",
        },
      ]);

      setInput("");
      return;
    }

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const nextHistory: TerminalLine[] = [
      ...history,
      {
        type: "command",
        text: `C:\\MoonOS\\Users\\visitor> ${rawCommand}`,
      },
    ];

    const output = COMMANDS[command];

    if (output) {
      output.forEach((line) => {
        nextHistory.push({
          type: "output",
          text: line,
        });
      });
    } else {
      nextHistory.push({
        type: "error",
        text: `'${rawCommand}' is not recognized as a MoonOS command.`,
      });

      nextHistory.push({
        type: "output",
        text: 'Type "help" for available commands.',
      });
    }

    nextHistory.push({ type: "output", text: "" });

    setHistory(nextHistory);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        minHeight: "420px",
        height: "100%",
        background: "#050505",
        color: "#39ff14",
        padding: "16px",
        fontFamily: "Consolas, Monaco, monospace",
        fontSize: "14px",
        lineHeight: 1.55,
        overflowY: "auto",
        cursor: "text",
      }}
    >
      <div style={{ color: "#a7ff9b", marginBottom: "14px" }}>
        Microsoft MoonOS [Version 98.0.2026]
        <br />
        (c) Nuclex Inc. All rights reserved.
      </div>

      {history.map((line, index) => (
        <div
          key={`${line.text}-${index}`}
          style={{
            color:
              line.type === "command"
                ? "#ffffff"
                : line.type === "error"
                ? "#ff6b6b"
                : "#39ff14",
            whiteSpace: "pre-wrap",
            minHeight: line.text ? undefined : "1.2em",
          }}
        >
          {line.text}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#ffffff",
        }}
      >
        <span style={{ color: "#39ff14", whiteSpace: "nowrap" }}>
          C:\MoonOS\Users\visitor&gt;
        </span>

        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#ffffff",
            font: "inherit",
            caretColor: "#39ff14",
          }}
        />
      </form>

      <div ref={terminalEndRef} />
    </div>
  );
}