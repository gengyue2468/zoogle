# Zoogle

A Google-style search homepage with a **Zootopia** theme — search the animal kingdom.

## Features

- **Search bar** — Desktop dropdown with search history + trending searches; mobile full-screen dialog
- **ALL / IMAGES** — Mobile header tabs (like Google) to switch between web and image search
- **Search history** — Persisted in localStorage, clearable
- **Trending searches** — Zootopia-themed suggestions (Savanna Central, Tundratown, etc.)
- **Share** — Copy link, share via X (Twitter), email, or open the [GitHub repo](https://github.com/gengyue2468/zoogle)
- **i18n** — English & 简体中文 with language switcher
- **SEO** — Meta, Open Graph, Twitter Card, JSON-LD (WebSite + SearchAction) for better indexing
- **404** — Classic “That’s an error” style page with Zoogle branding

## Tech Stack

- [React](https://react.dev/) 19 + [React Router](https://reactrouter.com/) 7
- [Vite](https://vite.dev/) 7 + [Tailwind CSS](https://tailwindcss.com/) 4
- [Base UI](https://base-ui.com/) (Dialog, Tabs, Toast, Select, Tooltip, Popover)
- [Zustand](https://zustand-demo.pmnd.rs/) (search state, search history)
- [i18next](https://www.i18next.com/) (translations)

## Getting Started

```bash
# install
npm install

# dev
npm run dev

# build
npm run build

# run production server
npm start
```

Optional: set `VITE_SITE_ORIGIN` (e.g. `https://zoogle.example.com`) for canonical URLs and OG images.

## Project Structure

```
app/
  components/     # Header, Footer, Main, share/voice dialogs, search bar, etc.
  routes/        # home.tsx
  i18n/          # en & zh locales
  seo.ts         # Meta, JSON-LD, default title/description
  root.tsx       # Layout, ErrorBoundary
public/
  static/        # Images, 404 assets
```

## License

MIT
