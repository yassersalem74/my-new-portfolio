# Yasser Salem — Portfolio

A responsive portfolio built with React, Vite, Tailwind CSS, and React Router.

## Development

```sh
npm install
npm run dev
```

`npm run build` creates the production site in `dist`. `npm run lint` checks the source.

## Structure

```text
src/
  components/
    layout/       Shared navbar and site layout
    home/         Hero section, portrait composition, developer card, and stats
    about/        About section, info cards, statistics, and curved image panel
    skills/       Skills header, category cards, logo tiles, and workflow icons
    projects/     Project cards, detail pages, screenshot gallery, and frame viewer
    experience/   Timeline groups, experience cards, and date ranges
    contact/      Contact links, portrait, opportunity cards, and email form
    ui/           Logo, technology logos, CV button, and page intro
  context/        Shared light/dark theme state
  hooks/          Theme context hook
  data/
    portfolio.js  Navigation, profile assets, and technology information
    skills.js     Skill categories and the items shown in each category
    projects.json Project details, screenshots, and live preview destinations
    experience.json Education, internships, and dated work experience
    contact.json  Email and social profile URLs
  pages/          One component for every page, plus a 404 page
  App.jsx         Route definitions
  main.jsx        React and BrowserRouter entry point
  index.css       Tailwind theme, base styles, and reusable utilities
public/
  me.jpg
  about-image.png
  YasserSalemResume-2026 (1).pdf
  monogram.svg
```

## Pages

- `/` — Home with the reference-inspired hero
- `/about` — About
- `/projects` — Project gallery
- `/projects/:projectId` — Project description, features, details, and screenshots
- `/experience` — Education, internships, and work experience timeline
- `/skills` — Skills
- `/contact` — LinkedIn/GitHub/WhatsApp/Email links and a message form

Every navigation item opens a separate page. The shared navbar highlights the current route and collapses into a keyboard-accessible mobile menu.

A YS outline fills with an orange gradient and moving liquid waves, surrounded by orbiting accents and a soft glow, on the initial document load and each browser refresh. The loading boundary lives above the router, so navigation between pages never replays it. It waits for the document load with a short minimum display time and a 4.5-second fallback; reduced-motion preferences receive a brief static logo. All loader colors derive from the central theme variables.

The navbar reuses the same `BrandMark` in a compact size, without captions. Its letters remain filled with a gentle wave and a slower orbit; clicking the mark returns home. Reduced-motion preferences use a static, fully filled mark.

Profile assets and navigation can be updated in `src/data/portfolio.js`. The home statistics are in `src/components/home/HeroStats.jsx`. Content on the supporting pages is a starting point for further customization.

## Static hosting

Configure your host to serve `index.html` for unmatched application paths so direct visits and refreshes at routes like `/about` work. Vite handles this during development and preview.

Typography uses Google Fonts with system font fallbacks.

## Colors and dark mode

The entire palette is centralized in `src/index.css`. Change `--brand-primary` (currently `#fe5316`) to change the accent throughout the portfolio. Lighter and darker brand shades, glows, borders, and shadows derive from it with `color-mix()`. Light surfaces, text, and status colors are under `:root`; dark equivalents are under `:root[data-theme="dark"]`.

Use semantic Tailwind classes such as `bg-surface`, `bg-canvas`, `text-ink`, `text-muted`, `text-accent`, and `border-border` in new components. `text-accent` provides readable orange small text in each mode, while `primary` retains the exact brand color. Primary buttons use the `on-primary` foreground token. Technology, company, and social marks keep their original brand colors, and live projects retain their own appearance.

The navbar's moon/sun button changes every portfolio page. The first visit follows the device preference; a chosen mode is saved under `yasser-portfolio-theme` and survives route changes and reloads. It also synchronizes across tabs. If browser storage is unavailable, switching still works within the current tab. An early script applies the mode before React renders, and the favicon and browser theme color follow the selected palette.

## Experience timeline

Edit `src/data/experience.json` to update education, internships, or work roles. Each group contains an ordered `entries` array. Entries support `title`, `organization`, optional `label`, `description`, `highlights`, and `skills`. Dates use `YYYY-MM`; an `endDate` of `null` displays **Present** and highlights a current role.

An optional `logo` object with `src`, `alt`, `width`, and `height` displays an organization logo in the card header. ITI entries use `public/iti-logo.png`, and X-Motion uses `public/xmotion_sa_logo.jfif`.

The timeline alternates cards around a central line on desktop. On smaller screens it uses a single column with a line on the left and dates inside each card. The dates and responsibilities follow the supplied résumé.

## Contact form

Contact links are in `src/data/contact.json`. LinkedIn, GitHub, WhatsApp, and Email appear together beside the portrait on desktop, with the message form spanning the full content width underneath. The desktop portrait is capped at 360px, and compact cards and a three-column field row reduce vertical scrolling. On smaller screens, the content stacks in one column. LinkedIn, GitHub, and WhatsApp use local SVG images in `public/social/`; Email uses an icon that follows the theme and opens a `mailto:` link.

The form sends a real POST request to the [FormSubmit AJAX endpoint](https://formsubmit.co/ajax-documentation) for `yassersalem9099@gmail.com`. There are no API keys or private SMTP credentials in the client. The sender's email is included as Reply-To, and the subject identifies the portfolio inquiry.

**Email activation is complete:** the owner confirmed receiving and activating FormSubmit's confirmation email for `yassersalem9099@gmail.com` during setup. If the recipient is changed or FormSubmit requests activation again, submit once, then open its confirmation email and click the activation link. Check the spam folder too. Confirm a normal inquiry arrives before sharing a new form. See [FormSubmit setup](https://formsubmit.co/).

The form validates required fields and email addresses, prevents duplicate requests while sending, includes a honeypot field, and times out after 45 seconds. It clears the draft only after the service reports success. Errors retain the draft and offer a direct email link. A timeout reports that confirmation was unavailable, since a delayed response does not prove the submission failed. A successful response indicates the service accepted the submission; it cannot independently prove inbox receipt.

## Project gallery

Edit `src/data/projects.json` to add projects or update their details. Each entry supports:

```json
{
  "id": "unique-project-id",
  "title": "Project title",
  "description": "A short description",
  "overview": "Describe the project, its purpose, and the experience you built.",
  "features": ["First key feature", "Second key feature"],
  "details": {
    "type": "Brand Website",
    "status": "Live",
    "role": "Front-End Development",
    "platform": "Web"
  },
  "gallery": [
    { "src": "/projects/project-screenshot.webp", "label": "Desktop view", "type": "desktop" },
    { "src": "/projects/project-mobile.webp", "label": "Mobile view", "type": "mobile" }
  ],
  "tags": ["React", "Responsive"],
  "image": "/projects/project-screenshot.webp",
  "mobileImage": "/projects/project-mobile.webp",
  "url": "https://your-project.example",
  "featured": true,
  "cover": "industry",
  "headline": ["A custom cover", "for this project"]
}
```

Put screenshots in `public/projects/` and use paths beginning with `/projects/`. An optional `mobileImage` adds the phone preview over the desktop screenshot. When `image` is `null` or cannot load, a cover illustration is shown. **Other Projects** opens `https://github.com/yassersalem74` in a new tab. Alaa Eldien’s site currently redirects to its login page; its captured previews reflect that public entry point. A missing or invalid URL shows a coming-soon page inside the viewer.

Set `featured` to `false` to list a project only after clicking **View All Projects**. Cover styles are `dessert`, `studio`, `industry`, `platform`, `custom`, `collection`, and `github`.

Project cards open their own description pages at `/projects/:projectId`. Click the main screenshot or the **Live Demo** button beside the project title to open the modal iframe, with desktop/tablet/mobile sizes, reload, close, and Escape support. Both controls support keyboard activation. Screenshot thumbnails change the main preview. Add more `gallery` entries for additional pages or sections; use `type: "mobile"` for a tall screenshot that should fit inside the preview. When `gallery` is omitted, the desktop and mobile image fields are used. Optional `client` and `year` fields in `details` appear when supplied.

GitHub URLs are the sole exception: exact `github.com` and `www.github.com` hosts open directly in a new tab with `noopener noreferrer`, bypassing the description page. Other destinations remain in the viewer without displayed destination URLs. The iframe sandbox permits scripts, forms, and same-origin site features, while omitting permission for popups, downloads, and top-level navigation.

An iframe does not keep its destination secret: URLs remain inspectable in the browser and the built JavaScript. Live sites must permit your portfolio to embed them; `X-Frame-Options` or CSP `frame-ancestors` can prevent a preview. Those restrictions must be adjusted on the project site you control. Cross-origin frame errors cannot reliably be detected from the portfolio, and the frame load event does not prove successful embedding. Do not add sensitive/private URLs to this client-side JSON.
