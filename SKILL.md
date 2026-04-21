---
# Takamul Scroll-Stop Builder Skill (Customized)

This skill is customized for the Takamul project. It integrates a scroll-driven video animation on the homepage using the provided video file. All design, branding, and content are sourced from the existing Takamul workspace. No external questions, interviews, or branding steps are required.

name: scroll-stop-builder-takamul
description: |
  Integrates a scroll-driven video animation on the homepage of the Takamul project using the provided video. As the user scrolls, new frames from the video are revealed, creating a professional, interactive effect. All content, branding, and design are sourced from the existing Takamul workspace—no external or generic content is used.
---

## Takamul Scroll-Stop Builder Skill (Customized)

This skill is customized for the Takamul project. It integrates a scroll-driven video animation on the homepage using the provided video file. All design, branding, and content are sourced from the existing Takamul workspace. No external questions, interviews, or branding steps are required.

---

## Overview
- Adds a scroll-driven video animation to the homepage using the provided video (a4b20306632e7b9f5ea4bf01f91962a2_1776781012.mp4).
- As the user scrolls, frames from the video are revealed, creating an interactive, professional effect.
- Uses only Takamul's existing design system, colors, and assets.

## Steps
1. Extract frames from the video using FFmpeg:
   ```bash
   mkdir -p public/scroll-frames
   ffmpeg -i a4b20306632e7b9f5ea4bf01f91962a2_1776781012.mp4 -vf "fps=30,scale=1920:-2" -q:v 2 public/scroll-frames/frame_%04d.jpg
   ```
2. Add a React component (e.g., components/home/ScrollVideoSection.tsx) to preload and render frames on a canvas, mapping scroll position to frame index.
3. Import and render this component at the top of app/[lang]/page.tsx.
4. Use only Takamul's existing colors, fonts, and layout for styling.

## Notes
- No interview, branding, or content questions—everything is sourced from the current workspace.
- Only the homepage is affected, and only the provided video is used.
- Ignore all optional sections and effects unless already present in the project.

---

## Prerequisites

- **FFmpeg** must be installed (`brew install ffmpeg` if not)
- The user provides a video file (MP4, MOV, WebM, etc.)
- The video should be relatively short (3-10 seconds is ideal)
- **The first frame of the video MUST be on a white background.** This is a hard requirement — the opening shot should show the product/object clean on white. If the user's video doesn't start this way, let them know and ask for a re-export or a separate white-background hero image.

---

## Design System (Built from User's Answers)

Once the interview is complete, construct the design system from the user's answers:

- **Fonts**: Space Grotesk (headings), Archivo (body), JetBrains Mono (code/mono)
- **Accent color**: From user's answer (used for buttons, glows, progress bars, highlights)
- **Background color**: From user's answer (used for body, sections)
- **Text colors**: Derive from the background — if dark bg, use white primary + muted secondary; if light bg, use dark primary + muted secondary
- **Selection**: Accent color background with contrasting text
- **Scrollbar**: Dark track with gradient thumb using accent color, glow on hover
- **Cards**: Glass-morphism — semi-transparent bg, subtle border, `backdrop-filter: blur(20px)`, `border-radius: 20px`
- **Buttons**: Primary = accent color bg with contrasting text + accent glow; Secondary = transparent with white/dark border
- **Effects**: Floating background orbs (accent color tones, blurred), subtle grid overlay, animated starscape
- **Brand name & logo**: Used in navbar, footer, loader, and anywhere branding appears

---

## Technique: Frame Sequence + Canvas

The most reliable approach for scroll-driven video:

1. **Extract frames** from the video using FFmpeg
2. **Preload all frames** as images with a loading indicator
3. **Draw frames to a canvas** based on scroll position
4. The scroll position maps to a frame index — scrolling forward advances the video, scrolling backward reverses it

This is the same technique Apple uses for their product pages.

**Why not `<video>` with `currentTime`?**
Browser video decoders aren't optimized for seeking on every scroll event. Canvas + pre-extracted
frames is buttery smooth and gives frame-perfect control.

---

## The Build Process

### Step 1: Analyze the Video

```bash
ffprobe -v quiet -print_format json -show_streams -show_format "{VIDEO_PATH}"
```

Extract duration, fps, resolution, total frame count. Target 60-150 frames total.

### Step 2: Extract Frames

```bash
mkdir -p "{OUTPUT_DIR}/frames"
ffmpeg -i "{VIDEO_PATH}" -vf "fps={TARGET_FPS},scale=1920:-2" -q:v 2 "{OUTPUT_DIR}/frames/frame_%04d.jpg"
```

Use `-q:v 2` for high quality JPEG. Use JPEG not PNG for smaller files.

### Step 3: Build the Website

Create a single HTML file. The site has these sections (top to bottom):

1. **Starscape** — Fixed canvas behind everything with twinkling animated stars
2. **Loader** — Full-screen with brand logo, "Loading" text, accent-colored progress bar
3. **Scroll Progress Bar** — Fixed top, accent gradient, 3px tall
4. **Navbar** — Brand logo + name, transforms from full-width to centered pill on scroll
5. **Hero** — Title, subtitle, CTA buttons, scroll hint, background orbs + grid
6. **Scroll Animation** — Sticky canvas with frame sequence, annotation cards with snap-stop
7. **Specs** — Four stat numbers with count-up animation on scroll
8. **Features** — Glass-morphism cards in a grid
9. **CTA** — Call to action section
10. **Testimonials** — *(only if user opted in)* Horizontal drag-to-scroll testimonial cards
11. **Card Scanner** — *(only if user opted in)* Three.js particle showcase
12. **Footer** — Brand name and links

For full implementation details of each section, read `references/sections-guide.md`.

### Step 4: Key Implementation Patterns

**Canvas rendering with Retina support:**

```javascript
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
```

**Cover-fit drawing (desktop) — zoomed contain-fit (mobile):**
On desktop, use cover-fit so the frame fills edge-to-edge. On mobile, use a slightly zoomed
contain-fit approach so the object stays centered and visible.

**Annotation cards with snap-stop scroll:**
Annotation cards appear at specific scroll progress points (data-show/data-hide attributes).
The scroll FREEZES briefly at each card position — creating a "boom, boom, boom" effect where
each card pops up as you stop. Uses JS-based snap: detects when scroll progress enters a snap zone,
scrolls to the exact position, locks the body overflow for ~600ms, then releases.
The number of annotation cards is flexible — match it to the content the user provides.

**Navbar scroll-to-pill transform:**
The navbar starts full-width, then on scroll shrinks to a centered pill shape (max-width ~820px)
with rounded corners and glass-morphism background.

**Count-up animation:**
Spec numbers animate from 0 to target with easeOutExpo easing, staggered 200ms apart.
Numbers get an accent-color glow pulse while counting. Triggered by IntersectionObserver.

**Animated starscape:**
A fixed canvas behind everything with ~180 stars that slowly drift and twinkle. Each star has
random drift speed, twinkle speed/phase, and opacity. Creates a subtle living background.

### Step 5: Customize Content

All content comes from the interview (Step 0). Use the real brand name, real product details,
and real copy — never use placeholder "Lorem ipsum" text. If content came from a website URL,
use the actual text from that site. Adapt:

- Hero title and subtitle
- Annotation card labels, descriptions, and stats
- Spec numbers and labels
- Feature cards
- CTA text
- Testimonials (if included)

### Step 6: Serve & Test

```bash
cd "{OUTPUT_DIR}" && python3 -m http.server 8080
```

Open `http://localhost:8080` and test. Then open the browser URL for the user.

---

## Mobile Responsiveness

Key mobile adaptations:

- **Annotation cards**: Compact single-line design — hide paragraph text, stat numbers, and labels.
  Show only card number + title in a flex row. Position at bottom of viewport.
- **Scroll animation height**: Reduce from 350vh (desktop) to 300vh (tablet) to 250vh (phone)
- **Navbar**: Hide links on mobile, show only logo + pill shape
- **Testimonials** (if included): Touch-scrollable, snap to card edges
- **Feature cards**: Stack to single column
- **Specs**: 2x2 grid on mobile

---

## Best Practices

1. **`requestAnimationFrame` for drawing** — Never draw directly in scroll handler
2. **`{ passive: true }` on scroll listener** — Enables scroll optimizations
3. **Canvas with `devicePixelRatio`** — Crisp on Retina displays
4. **Preload all frames before showing** — No pop-in during scroll
5. **Frame deduplication** — Only calls `drawFrame` when frame index changes
6. **No `scroll-behavior: smooth`** — Would interfere with frame-accurate scroll mapping
7. **No heavy JS libraries** — Pure vanilla JS except Three.js for card scanner (if included)
8. **Sticky canvas** — `position: sticky` keeps canvas viewport-fixed while scroll container moves
9. **White first frame** — The video must start on a clean white background

---

## Error Recovery

| Issue | Solution |
| --- | --- |
| Frames don't load | Check file paths, ensure local server is running (can't load from `file://`) |
| Animation is choppy | Reduce frame count, ensure JPEG not PNG, check file sizes (<100KB each) |
| Canvas is blurry | Ensure `devicePixelRatio` scaling is applied |
| Scroll feels too fast/slow | Adjust `.scroll-animation` height (200vh=fast, 500vh=slow, 800vh=cinematic) |
| Mobile cards overlap content | Use compact single-line card design, position at `bottom: 1.5vh` |
| Snap-stop feels jarring | Reduce HOLD_DURATION to 400ms or increase SNAP_ZONE |
| Stars too bright/dim | Adjust starscape canvas opacity (default 0.6) |
| First frame isn't white | Ask user to re-export video with white opening frame |
