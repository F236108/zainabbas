# Zain Abbas — Portfolio Website

A sleek, premium, and interactive personal portfolio website designed for an **Electrical & Electronics Engineer** specializing in Embedded Systems, IoT, Circuit Design, and Software Development.

## 🚀 Live Preview
The website is fully responsive, supporting both desktop and mobile screens, and can be viewed locally or deployed to platforms like GitHub Pages, Vercel, or Netlify.

## ✨ Core Features

*   **Premium Interactive Design**: Clean modern layout featuring custom smooth transitions, dynamic particle backgrounds, theme-switching capabilities (Dark/Light mode), and subtle hover micro-animations.
*   **Performance-Optimized Horizontal Experience Slider**: 
    *   A custom 100vh full-screen timeline layout mimicking premium typography-heavy slide designs.
    *   Uses **vertical-to-horizontal scrolling transition** (vertical scroll progress translates the container horizontally).
    *   Optimized with `requestAnimationFrame` throttling and `translate3d` GPU acceleration to prevent layout thrashing and scroll lag.
    *   Includes giant background typography representing years, high-resolution focused image containers, vibrant red index numbers, and automatic slide pagination tracking (`01 / 05`).
*   **Interactive "Signal Lab"**:
    *   A fully interactive, real-time visualizer representing an oscilloscope.
    *   Enables users to adjust visual knobs and inputs to simulate electrical waveforms, altering frequencies, amplitudes, and offsets dynamically in real-time.
*   **Projects Filter Hub**: An elegant projects showcase allowing visitors to filter and inspect projects by category dynamically.
*   **Modern CSS System**: Styled completely with vanilla CSS, utilizing custom properties (CSS variables) for variables management (colors, transitions, radius, borders, spacing), enabling easy adaptation and thematic styling.
*   **Interactive Contact Form**: A fully validated contact interface featuring responsive inputs and custom error/success visual feedback.

## 📁 File Structure

```text
├── CV/
│   └── Resume.pdf         # Downloadable professional CV
├── Images/                # Site assets, graphics, favicons, and project images
│   ├── favicon.png
│   └── Profile.jpg        # Professional profile image
├── index.html             # Core semantic HTML5 document structure
├── styles.css             # Stylesheet containing CSS variables, animations, and typography rules
├── script.js             # Performance-tuned vanilla JS logic (oscilloscope visualizer, scroll animations, etc.)
└── README.md              # Project documentation
```

## 🛠️ Tech Stack

*   **Frontend Core**: HTML5, Vanilla CSS3 (Custom Variables & Keyframe Animations), Vanilla JavaScript (ES6+).
*   **Icons**: Font Awesome (v6.5.0) via CDN.
*   **Fonts**: Custom premium typography pairings.
*   **Graphics & Visualization**: HTML5 Canvas rendering for the real-time signal visualizer.

## 🚀 How to Run Locally

You do not need any compilation, transpilation, or server environment to run this portfolio. However, a local server is recommended for the best experience.

### Option 1: Live Server (VS Code)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension if you haven't already.
3. Click the **Go Live** button at the bottom-right corner of the editor, or right-click `index.html` and select **Open with Live Server**.

### Option 2: Python HTTP Server (Terminal)
If you have Python installed, open your terminal (PowerShell, Command Prompt, or Bash) in the project directory and run:

```bash
# For Python 3.x
python -m http.server 8000
```

Then, open your web browser and navigate to `http://localhost:8000`.

### Option 3: Double-click index.html
You can also open `index.html` directly in any web browser by double-clicking the file in your file explorer. *Note: Some modern browser security configurations may restrict local loading of certain dynamic assets (like local PDFs or Web Workers) when served directly from a `file://` protocol.*

## 🎨 Theme & Variable Customization

All style rules are derived from CSS custom properties at the top of `styles.css`. You can change the global accent color, background theme hues, border-radius, or animations globally by modifying these values in the `:root` pseudo-class:

```css
:root {
  --font: 'Outfit', sans-serif;
  --accent: #ff3131;          /* Global red accent color */
  --bg: #fafafa;              /* Light theme background */
  --bg-secondary: #f0f0f0;    /* Light theme secondary */
  --fg: #121212;              /* Text color */
  /* ... */
}
```

---
*Created and maintained by Zain Abbas.*
