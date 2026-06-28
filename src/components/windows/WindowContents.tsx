import {
  Volume2,
  VolumeX,
  Globe,
  Terminal,
  Camera
} from "lucide-react";
import { useState } from "react";
import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
  WindowId,
} from "../../data/portfolioData";
import { PixelMoon } from "../shared/PixelMoon";
import { WindowButton } from "../shared/WindowButton";
import { TerminalWindow } from "./TerminalWindow";
import { ReadmeWindow } from "./ReadmeWindow";

type WindowContentProps = {
  id: WindowId;
  onOpen: (id: WindowId) => void;
  onThemeChange?: (theme: "moon" | "cyberpunk") => void;
};

const computerItems: {
  id: WindowId;
  label: string;
  imagePath: string;
}[] = [
  { id: "about", label: "About", imagePath: "/icons/user.png" },
  { id: "projects", label: "Projects", imagePath: "/icons/projects.png" },
  { id: "skills", label: "Skills", imagePath: "/icons/skills.png" },
  { id: "education", label: "Education", imagePath: "/icons/education.png" },
  { id: "experience", label: "Experience", imagePath: "/icons/experience.png" },
  { id: "contact", label: "Contact", imagePath: "/icons/contact.png" },
  { id: "resume", label: "Resume", imagePath: "/icons/resume.png" },
  { id: "terminal", label: "Terminal.exe", imagePath: "/icons/terminal.png" },
  { id: "readme", label: "README.txt", imagePath: "/icons/text.png" },
];

export function WindowContent({
  id,
  onOpen,
  onThemeChange,
}: WindowContentProps) {
  if (id.startsWith("project-")) {
    const project = projects.find((item) => `project-${item.id}` === id);

    if (!project) return null;

    return (
      <section className="content-stack">
        <div className="project-detail-header">
          <img
            src={project.imagePath}
            alt={project.title}
            className="project-detail-image"
          />

          <div>
            <h2>{project.title}</h2>
            <p>
              {project.subtitle} | {project.year}
            </p>
          </div>
        </div>

        {project.badge && (
  <p className="badge achievement-tag">
    {project.badge}
  </p>
)}

<div className="mobile-divider">
  <span />
  <p>ABOUT</p>
  <span />
</div>

<p>{project.description}</p>

<div className="mobile-divider">
  <span />
  <p>TECH STACK</p>
  <span />
</div>

<div className="tag-row skills-container">
  {project.skills.map((skill) => (
    <span key={skill}>{skill}</span>
  ))}
</div>

<div className="mobile-divider">
  <span />
  <p>LINKS</p>
  <span />
</div>

<div className="button-row links-container">
  {project.links.map(([label, href]) => (
    <a
      className="win-button link-card"
      href={href}
      target="_blank"
      rel="noreferrer"
      key={label}
    >
      {label}
    </a>
  ))}
</div>
      </section>
    );
  }

  const content: Partial<Record<WindowId, JSX.Element>> = {
    welcome: <Welcome onOpen={onOpen} />,
    about: <About />,
    projects: <Projects onOpen={onOpen} />,
    skills: <Skills />,
    education: <Education />,
    experience: <Experience onOpen={onOpen} />,
    contact: <Contact />,
    resume: <Resume />,
    computer: <Computer onOpen={onOpen} />,
    recycle: <Recycle />,
    shutdown: <Shutdown />,
    secret: <Secret />,
    certificate: <Certificate />,
    terminal: (
      <TerminalWindow
  onThemeChange={onThemeChange ?? (() => {})}
/>
    ),
    readme: <ReadmeWindow />,
  };

  return content[id] ?? null;
}

function Welcome({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <section className="welcome-panel">
      <PixelMoon />

      <div className="content-stack">
        <h1>Welcome to MoonOS 98</h1>
        <p>Welcome to MoonOS 98 - Mayank Kumar&apos;s interactive portfolio.</p>
        <p>
          Double-click a desktop icon to explore projects, skills, education,
          experience, and more.
        </p>

        <div className="button-row">
          <WindowButton onClick={() => onOpen("projects")}>
            Explore Projects
          </WindowButton>

          <WindowButton onClick={() => onOpen("resume")}>
            View Resume
          </WindowButton>

          <WindowButton onClick={() => onOpen("contact")}>
            Contact Me
          </WindowButton>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-grid">
      <div className="profile-preview">
        <img
          src={profile.profileImagePath}
          alt={profile.name}
          className="profile-image"
        />
        <small>{profile.name}</small>
      </div>

      <div className="content-stack">
        <h2>{profile.name}</h2>
        <strong>{profile.role}</strong>
        <p>{profile.intro}</p>

        <div className="explorer-grid">
          {profile.stats.map((stat) => (
            <span key={stat}>{stat}</span>
          ))}
        </div>

        <dl className="system-info">
          {profile.systemInfo.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Projects({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <section className="content-stack">
      <h2>Featured project folders</h2>

      <div className="project-list">
        {projects.map((project) => (
          <button
            key={project.id}
            className="project-file"
            onClick={() => onOpen(`project-${project.id}` as WindowId)}
          >
            <img
              src={project.imagePath}
              alt={project.title}
              className="project-thumbnail"
            />

            <div className="project-file-content">
              <strong className="project-file-title">
                {project.title} - {project.subtitle}
              </strong>

              <div className="project-file-meta">
                <span className="project-year">{project.year}</span>

                <span className="project-skills">
                  {project.skills.map((skill, index) => (
                    <span key={skill}>
                      {skill}
                      {index < project.skills.length - 1 && (
                        <span className="skill-separator">•</span>
                      )}
                    </span>
                  ))}
                </span>
              </div>

              <p className="project-file-description">
                {project.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="control-panel">
      {skillGroups.map((group) => (
        <div className="control-folder" key={group.category}>
          <img
            src={group.imagePath}
            alt={group.category}
            className="content-icon"
          />

          <h3>{group.category}</h3>

          {group.skills.map((skill, index) => (
            <div className="skill-meter" key={skill}>
              <span>{skill}</span>
              <meter min="0" max="100" value={72 + ((index * 7) % 24)} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

function Education() {
  return (
    <section className="timeline-list">
      {education.map((item) => (
        <article key={item.school}>
          <img
            src={item.imagePath}
            alt={item.school}
            className="content-icon"
          />

          <div>
            <h3>{item.school}</h3>
            <p>{item.degree}</p>
            <small>{item.years}</small>
          </div>
        </article>
      ))}
    </section>
  );
}

function Experience({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <section className="timeline-list experience-list">
      {experience.map((item) => (
        <article key={`${item.role}-${item.place}`} className="experience-card">
          <img
            src={item.imagePath}
            alt={item.place}
            className="content-icon"
          />

          <div className="experience-content">
            <h3 className="experience-role">{item.role}</h3>
            <strong className="experience-company">{item.place}</strong>
            <small className="experience-meta">{item.meta}</small>
            <p className="experience-description">{item.description}</p>

            {item.hasCertificate && (
              <WindowButton onClick={() => onOpen("certificate")}>
                Open Certificate Preview
              </WindowButton>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

function Contact() {
  return (
    <section className="socials-page">
      <div className="ie-socials-window">
        <strong className="ie-title">Internet Explorer</strong>

        <div className="address-bar">https://moonbucks.me/socials</div>

        <div className="social-links-list">
          <a
            href="https://linkedin.com/in/actualmayank"
            target="_blank"
            rel="noreferrer"
          >
            <Globe size={18}/>
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/actualmayank"
            target="_blank"
            rel="noreferrer"
          >
            <Terminal size={18}/>
            <span>GitHub</span>
          </a>

          <a
            href="https://instagram.com/actualmayank"
            target="_blank"
            rel="noreferrer"
          >
            <Camera size={18}/>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="resume-preview">
      <img
        src="/icons/resume.png"
        alt="Resume PDF icon"
        className="resume-icon"
      />

      <h2>Mayank-Kumar-Resume.pdf</h2>

      <div
        style={{
          marginTop: "8px",
          marginBottom: "18px",
          fontSize: "12px",
          color: "#666",
          lineHeight: 1.6,
        }}
      >
        <strong>Type:</strong> Adobe PDF Document
        <br />
        <strong>Size:</strong> 1.2 MB
        <br />
        <strong>Modified:</strong> June 2026
      </div>

      <hr
        style={{
          width: "100%",
          margin: "12px 0",
          border: "none",
          borderTop: "1px solid #bcbcbc",
        }}
      />

      <p
        style={{
          fontSize: "13px",
          color: "#555",
          marginBottom: "20px",
        }}
      >
        Preview unavailable.
        <br />Adobe Acrobat Reader is not installed.
        Choose an action below.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <WindowButton>Open Resume</WindowButton>
        </a>

        <a
          href={profile.resumePath}
          download="Mayank-Kumar-Resume.pdf"
          style={{ textDecoration: "none" }}
        >
          <WindowButton>Save As...</WindowButton>
        </a>
      </div>
    </section>
  );
}

function Computer({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <section className="explorer-grid">
      {computerItems.map((item) => (
        <button key={item.id} onClick={() => onOpen(item.id)}>
          <img
            src={item.imagePath}
            alt={item.label}
            className="computer-icon"
          />
          {item.label}
        </button>
      ))}
    </section>
  );
}

function Recycle() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const deletedFiles = [
    "old_cringe_projects.zip",
    "sleep_schedule.exe",
    "social_life_backup.rar",
    "motivation_2023.txt",
    "gym_consistency.dll",
    "overthinking_v2.exe",
  ];

  return (
    <section className="content-stack">
      <div>
        <h2>Recycle Bin</h2>
        <p className="empty-note">
          6 deleted items. Some were removed for everyone&apos;s safety.
        </p>
      </div>

      <div
        style={{
          border: "2px inset #ffffff",
          background: "#ffffff",
          padding: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: "10px",
        }}
      >
        {deletedFiles.map((file) => (
          <button
            key={file}
            type="button"
            onClick={() => setSelectedFile(file)}
            style={{
              border:
                selectedFile === file
                  ? "1px dotted #000000"
                  : "1px solid transparent",
              background:
                selectedFile === file ? "#000080" : "transparent",
              color: selectedFile === file ? "#ffffff" : "#000000",
              padding: "10px 6px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            <img
              src="/icons/text.png"
              alt=""
              draggable={false}
              style={{
                width: "34px",
                height: "34px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 7px",
                imageRendering: "pixelated",
              }}
            />
            {file}
          </button>
        ))}
      </div>

      {selectedFile && (
        <div
          style={{
            border: "2px outset #d4d0c8",
            background: "#d4d0c8",
            padding: "12px",
            marginTop: "4px",
          }}
        >
          <strong>{selectedFile}</strong>

          <p style={{ margin: "8px 0 0" }}>
            File permanently deleted after character development.
          </p>
        </div>
      )}
    </section>
  );
}

function Shutdown() {
  return (
    <section className="content-stack">
      <p>
        Are you sure you want to shut down MoonOS 98? The moon will miss you.
      </p>

      <div className="button-row">
        <WindowButton>Just kidding</WindowButton>
        <WindowButton>Stay online</WindowButton>
      </div>
    </section>
  );
}

function Secret() {
  return (
    <section className="content-stack">
      <h2>MoonOS Developer Mode Activated</h2>
      <p>
        You found the secret panel. Congrats, you now have 1 imaginary Bitcoin.
      </p>
    </section>
  );
}

function Certificate() {
  return (
    <section className="certificate-preview">
      <h2>Certificate Preview</h2>

      <img
        src="/images/codealpha-certificate.png"
        alt="CodeAlpha Python Developer Internship Certificate"
        className="certificate-image"
      />
    </section>
  );
}