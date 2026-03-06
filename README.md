# airhaohan — Personal Homepage

A modern personal academic homepage built with **React + Vite + Tailwind CSS 4**, featuring the **Frutiger Aero** aesthetic (circa 2004–2013). The site includes a blog system with KaTeX math rendering, a Bilibili video showcase, and a BibTeX-powered publications page.

> **Live Preview:** Deploy to GitHub Pages or Manus to get a live URL.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Wouter (client-side routing) |
| Styling | Tailwind CSS 4 + custom Frutiger Aero CSS |
| Math Rendering | KaTeX (via CDN) |
| Markdown | markdown-it |
| Build Tool | Vite 7 |
| Package Manager | pnpm |
| Deployment | GitHub Pages (via Actions) / Manus |

---

## Project Structure

```
personal-homepage/
├── client/
│   ├── index.html              # Entry HTML (KaTeX CDN loaded here)
│   └── src/
│       ├── App.tsx             # Router + global layout (Navbar + Bubbles)
│       ├── index.css           # Frutiger Aero global styles
│       ├── components/
│       │   ├── BubbleBackground.tsx   # Animated floating bubbles
│       │   ├── Navbar.tsx             # Glassmorphism navigation bar
│       │   └── ProfileSidebar.tsx     # Profile card sidebar
│       ├── data/
│       │   ├── blogPosts.ts    # Blog post content (Markdown + KaTeX)
│       │   ├── homeContent.ts  # About, Education, News data
│       │   ├── papers.bib      # BibTeX publications data
│       │   └── videos.json     # Bilibili video list
│       ├── lib/
│       │   ├── markdownRenderer.ts  # Markdown + KaTeX renderer
│       │   ├── parseBib.ts          # BibTeX parser + author highlighter
│       │   └── siteConfig.ts        # Global site configuration
│       └── pages/
│           ├── Home.tsx         # Homepage (About + Education + News)
│           ├── Blog.tsx         # Blog list with search & tag filter
│           ├── BlogPost.tsx     # Individual blog post with math
│           ├── Videos.tsx       # Bilibili video grid + embedded player
│           ├── Publications.tsx # Papers list with BibTeX parsing
│           └── NotFound.tsx     # 404 page
├── vite.config.ts
└── package.json
```

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/personal-homepage.git
cd personal-homepage

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:3000`.

---

## Customization Guide

### 1. Update Personal Information

Edit `client/src/lib/siteConfig.ts`:

```typescript
export const siteConfig = {
  name: "your-username",
  fullName: "Your Full Name",
  title: "Your Title",
  affiliation: "Your Lab / Institution",
  email: "you@example.edu",
  bilibiliUid: "YOUR_BILIBILI_UID",
  highlightName: "YourFirstName",  // Name to bold in paper author lists
  social: {
    github: "https://github.com/your-username",
    bilibili: "https://space.bilibili.com/YOUR_UID",
    googleScholar: "https://scholar.google.com/...",
  },
  // ...
};
```

### 2. Add a New Blog Post

Add a new entry to `client/src/data/blogPosts.ts`:

```typescript
{
  slug: "my-new-post",          // URL: /blog/my-new-post
  title: "My Post Title",
  date: "2025-03-01",
  tags: ["Tag1", "Tag2"],
  description: "Brief description shown in the list.",
  readingTime: 10,              // Estimated reading time in minutes
  content: `
# My Post Title

Regular markdown content here.

## Math Example

Inline math: $E = mc^2$

Display math:
$$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$
`
}
```

**KaTeX Math Syntax:**
- Inline: `$formula$` — e.g., `$E = mc^2$`
- Display block: `$$formula$$` — renders centered on its own line

### 3. Add a New Publication

Edit `client/src/pages/Publications.tsx` and add a BibTeX entry to the `bibContent` string:

```bibtex
@inproceedings{yourkey2025,
  title     = {Your Paper Title},
  author    = {YourFirstName and Coauthor, Name},
  booktitle = {Conference Name},
  year      = {2025},
  venue     = {CONF 2025},
  url       = {https://link-to-paper.com},
  abstract  = {Your abstract text here.}
}
```

The parser will automatically:
- Sort papers by year (newest first)
- Group papers by year
- **Bold + underline** your name (set `highlightName` in `siteConfig.ts`)
- Show abstract in a collapsible section

### 4. Update Bilibili Videos

Edit `client/src/data/videos.json`:

```json
[
  {
    "bvid": "BV1xxxxxxxxx",
    "title": "Video Title",
    "description": "Video description",
    "cover": "https://cover-image-url.jpg",
    "pubdate": "2025-01-15",
    "duration": "25:30",
    "view": 5000,
    "tags": ["Tag1", "Tag2"]
  }
]
```

**Auto-fetch Script:** Run the following Python script to automatically fetch your latest Bilibili videos:

```bash
python3 scripts/fetch_bilibili.py
```

*(See `scripts/fetch_bilibili.py` for the implementation — requires your Bilibili UID)*

### 5. Update Homepage Content

Edit `client/src/data/homeContent.ts` to update:
- `aboutContent` — About Me section (supports `**bold**` syntax)
- `educationData` — Education timeline entries
- `newsData` — Recent news/updates list

---

## Deployment

### Option A: Manus (Recommended — Zero Config)

1. Click the **Publish** button in the Manus Management UI.
2. Your site is live at `https://your-project.manus.space`.
3. Custom domains available in Settings → Domains.

### Option B: GitHub Pages

#### Step 1: Create Repository

```bash
git init
git add .
git commit -m "Initial commit: Frutiger Aero personal homepage"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build
        env:
          VITE_ANALYTICS_ENDPOINT: ""
          VITE_ANALYTICS_WEBSITE_ID: ""

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Step 3: Configure GitHub Pages

1. Go to your repository **Settings → Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Push to `main` branch to trigger deployment.

#### Step 4: Fix Base URL (if using a project repo)

If your repo is `username.github.io/repo-name` (not root domain), add to `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/repo-name/",  // Add this line
  // ...
});
```

---

## Frutiger Aero Design System

The site uses a custom Frutiger Aero design system defined in `client/src/index.css`:

| CSS Class | Purpose |
|---|---|
| `.glass-card` | Glassmorphism card with gloss highlight |
| `.glass-card-dark` | Dark variant glass card |
| `.aero-btn` | Glossy Aero-style button |
| `.nav-glass` | Navigation bar glass effect |
| `.nav-link` | Navigation link with hover state |
| `.tag-aero` | Tag/badge with glass effect |
| `.section-heading` | Section title with underline |
| `.prose-aero` | Blog content typography |
| `.timeline-dot` | Education timeline dot |
| `.fade-in-up` | Entrance animation |
| `.bubble` | Floating bubble animation |

**Color Palette:**

| Variable | Value | Usage |
|---|---|---|
| `--fa-azure` | `#0A4F8C` | Deep blue background |
| `--fa-teal` | `#0B8C6E` | Teal accent |
| `--fa-sky` | `#4AADE8` | Sky blue highlight |
| `--fa-mint` | `#5CC8A0` | Mint green |
| `--fa-glass-white` | `rgba(255,255,255,0.18)` | Glass fill |
| `--fa-glass-border` | `rgba(255,255,255,0.35)` | Glass border |

---

## License

MIT License — feel free to use and adapt for your own personal homepage.

---

*Built with ❤️ using React + Vite + Tailwind CSS. Inspired by the Frutiger Aero aesthetic of 2004–2013.*
