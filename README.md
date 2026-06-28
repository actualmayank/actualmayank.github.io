# MoonOS 98

MoonOS 98 is a polished retro operating-system portfolio for Mayank Kumar. On desktop it behaves like a Windows 98-inspired space desktop with draggable, resizable windows. On mobile it becomes a Windows Phone-inspired tile interface.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- react-rnd

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Edit Portfolio Content

Most content lives in:

```text
src/data/portfolioData.ts
```

Update this file to replace:

- Profile name, role, intro, stats, and system info
- Project titles, descriptions, skills, years, and badges
- Education entries
- Experience entries
- Social links
- Contact email
- Resume path
- Profile image path

## Replace Assets

This project currently uses CSS-generated retro icons, CSS moon art, and browser-generated tones, so no copyrighted Windows assets are included.

Recommended replacement paths:

- Profile image: `public/images/profile-placeholder.png`
- Resume PDF: `public/resume/Mayank-Kumar-Resume.pdf`
- Certificate image: add it under `public/images/` and replace the certificate placeholder in `src/components/windows/WindowContents.tsx`
- Sounds: replace the generated tones in `src/hooks/useSound.ts` with local audio files if desired
- Wallpaper assets: replace or extend the CSS moon/stars in `src/styles.css`

## Deployment To Vercel

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

## Notes

- Window positions and mute preference are saved in `localStorage`.
- Type `moon` or `mayank` on the desktop to open the hidden developer mode window.
- The shutdown option opens a dialog only; it does not close the website.
