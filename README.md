# Portfolio Website

Personal portfolio assignment built with React Router.

## What It Includes

- Home page with About Me, Research Interests, Personal Details, Skills, and Profile Picture
- Projects page with at least two GitHub repository links
- React Router navigation using `NavLink`
- `HashRouter` for GitHub Pages deployment
- CSS styling with a custom visual design

## Edit Your Details

Open `src/data/profile.js` and replace the placeholder values:

- `name`
- `phone`
- `emails.personal`
- `emails.college`
- `github`
- `skills`
- `projects`

Replace `src/assets/portfolio-portrait.png` with your own profile picture if your teacher requires an actual photo.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy To GitHub Pages

1. Create a public GitHub repository named `portfolio`.
2. Update `homepage` in `package.json`:

```json
"homepage": "https://your-username.github.io/portfolio"
```

3. Push the project:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/your-username/portfolio.git
git push -u origin main
```

4. Deploy:

```bash
npm run deploy
```

5. In GitHub, go to Repository Settings, then Pages, and select the `gh-pages` branch.
