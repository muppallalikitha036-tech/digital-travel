# TRAVEL REIMAGINED — Innovative Digital Travel Experiences

A production-grade, immersive travel web application featuring living 4K cinematic video and canvas backgrounds for every page, regional 6-second Web Audio synthesizer soundscapes on thumbnail interactions, Veo generative AI image-to-video animation studio, interactive trip builders, and personalized expedition dashboards.

---

## 🚀 Deploying to GitHub Pages

This project is pre-configured and 100% production-ready for GitHub Pages static deployment:

- **Relative Asset Resolution**: `base: './'` is configured in `vite.config.ts`, ensuring all scripts, styles, fonts, and images load seamlessly regardless of whether the site is hosted on a custom domain or a repository subpath (e.g., `https://<username>.github.io/<repo-name>/`).
- **Static SPA Routing**: Supports hash routing (`#/destinations`, `#/planner`, `#/quiz`, etc.) with a `public/404.html` redirect fallback and `.nojekyll` bypass to prevent 404s on page reloads.
- **Automated GitHub Actions Workflow**: A pre-built `.github/workflows/deploy.yml` workflow automatically builds and publishes the `dist/` folder whenever changes are pushed to `main` or `master`.

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

1. Push your repository to GitHub.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push a commit or trigger the workflow under the **Actions** tab. Your website will be live in minutes!

### Option 2: Deploying via `gh-pages` or Static Branch

1. Run the build command locally:
   ```bash
   npm install
   npm run build
   ```
2. Deploy the contents of the generated `dist/` directory to your `gh-pages` branch:
   ```bash
   npx gh-pages -d dist
   ```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript linter
npm run lint

# Build production bundle
npm run build
```

---

## 🌟 Features Included

- **Living 4K Video Backgrounds**: Interactive atmospheric motion simulation across all pages (Sakura Walkway, Alpine Stream, Tropical Ocean Waves, Cascading Waterfall, Temple Dawn, Alpine Wildflower Meadow).
- **Interactive 6-Second Regional Soundscapes**: Synthesizes authentic Web Audio soundscapes for places around the world when interacting with destination or country thumbnails.
- **Veo Video Studio**: Animate photos into videos with smooth interactive preview generation.
- **WanderAI Travel Intelligence**: Context-aware travel recommendations with self-contained offline reasoning fallback.
- **Expedition Builder**: Generative multi-day travel planner with checklist milestones and local storage persistence.
