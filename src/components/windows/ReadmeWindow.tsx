export function ReadmeWindow() {
  return (
    <div
      style={{
        minHeight: "420px",
        background: "#ffffff",
        color: "#000000",
        padding: "20px",
        fontFamily: "Consolas, monospace",
        fontSize: "14px",
        lineHeight: 1.7,
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginTop: 0 }}>README.TXT</h3>

      <p>Welcome to MoonOS 98.</p>

      <p>
        This operating system contains a fake terminal with a few hidden
        commands. Some are useful. Some are questionable.
      </p>

      <hr />

      <h4>Available Commands</h4>

      <pre
  style={{
    background: "#f3f3f3",
    padding: "12px",
    border: "1px solid #999",
    whiteSpace: "pre-wrap",
  }}
>
{`help
about
skills
projects
socials
contact
resume
whoami
date
neofetch

theme cyberpunk
theme moon

clear

coffee
motivation
portfolio

sudo
sudo hire mayank
make me a sandwich
rm -rf /`}
</pre>

      <hr />

      <h4>Notes</h4>

      <ul style={{ paddingLeft: "20px" }}>
        <li>Try changing the wallpaper using the theme commands.</li>
        <li>Some commands are intentionally hidden.</li>
        <li>Not every command is listed here.</li>
        <li>Curiosity is rewarded.</li>
      </ul>

      <hr />

      <small style={{ opacity: 0.7 }}>
        MoonOS 98 • Build 2026
        <br />
        Designed & developed by Mayank Kumar
      </small>
    </div>
  );
}