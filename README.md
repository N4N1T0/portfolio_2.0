# 🚀 Adrian Alvarez Portfolio 2.0

> A modern, performant, and multilingual portfolio website built with Astro, Preact, and Tailwind CSS.

[![Astro](https://img.shields.io/badge/Astro-5.10.1-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![Preact](https://img.shields.io/badge/Preact-10.26.9-673AB8?style=flat&logo=preact&logoColor=white)](https://preactjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

## ✨ Features

### 🌐 Internationalization (i18n)

- **Bilingual Support**: Full Spanish (default) and English localization
- **Dynamic Content**: All content, navigation, and UI elements are translated
- **SEO Optimized**: Language-specific meta tags and structured data

### 🎨 Modern Design

- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching based on user preference
- **Pixel Font**: Custom retro-style typography for headers
- **Smooth Animations**: Powered by Anime.js for engaging interactions

### 📝 Content Management

- **Blog System**: Markdown-based blog with full i18n support
- **Project Showcase**: JSON-based project data with rich media
- **Dynamic Collections**: Astro Content Collections for type-safe content

### ⚡ Performance

- **Static Site Generation**: Lightning-fast loading with Astro
- **Image Optimization**: Automatic image processing and optimization
- **Minimal JavaScript**: Preact for interactive components only where needed
- **SEO Ready**: Sitemap, robots.txt, and structured data included

### 🛠️ Developer Experience

- **TypeScript**: Full type safety across the entire codebase
- **ESLint & Prettier**: Code quality and formatting enforcement
- **Husky**: Pre-commit hooks for code quality
- **Component Library**: Reusable UI components with shadcn/ui integration

## 🏗️ Tech Stack

### Core Technologies

- **[Astro 5.10.1](https://astro.build/)** - Static site generator with islands architecture
- **[Preact 10.26.9](https://preactjs.com/)** - Lightweight React alternative for interactive components
- **[Tailwind CSS 4.1.11](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Integrations & Tools

- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Automatic sitemap generation
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - RSS feed generation
- **[astro-robots-txt](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt)** - Robots.txt generation
- **[@playform/compress](https://github.com/PlayForm/Compress)** - Asset compression
- **[animejs](https://animejs.com/)** - Lightweight animation library
- **[class-variance-authority](https://cva.style/docs)** - Component variant management
- **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional CSS classes

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting with Astro and JSX support
- **[Prettier](https://prettier.io/)** - Code formatting with Astro plugin
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting

## 📁 Project Structure

```
├── public/                    # Static assets
│   ├── en/                   # English-specific assets
│   ├── es/                   # Spanish-specific assets
│   └── rss/                  # RSS styling
├── src/
│   ├── assets/               # Images and media
│   │   ├── blog/            # Blog post images
│   │   ├── images/          # General images
│   │   ├── projects/        # Project screenshots
│   │   └── services/        # Service-related images
│   ├── components/          # Reusable components
│   │   ├── blog/           # Blog-specific components
│   │   ├── home/           # Homepage sections
│   │   ├── icons/          # Icon components
│   │   ├── layout/         # Layout components
│   │   ├── projects/       # Project components
│   │   ├── shared/         # Shared components
│   │   └── ui/             # UI library components
│   ├── constants/          # Configuration and data
│   │   ├── site-config.ts  # Site configuration
│   │   └── site-data.ts    # Content data with i18n
│   ├── content/            # Content collections
│   │   ├── blog/          # Blog posts (en/es)
│   │   ├── projects/      # Project data
│   │   └── config.ts      # Content configuration
│   ├── i18n/              # Internationalization
│   │   ├── ui.ts          # UI translations
│   │   └── utils.ts       # i18n utilities
│   ├── layout/            # Page layouts
│   ├── lib/               # Utility functions
│   ├── pages/             # Route pages
│   │   ├── en/           # English pages
│   │   ├── es/           # Spanish pages
│   │   └── index.astro   # Homepage redirect
│   ├── styles/           # Global styles
│   └── types/            # TypeScript definitions
└── Configuration files
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/N4N1T0/portfolio_2.0.git
   cd portfolio_2.0
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run Astro check
pnpm prepare      # Setup Husky hooks
```

## 🌍 Internationalization

This portfolio supports both Spanish (default) and English:

- **Default Language**: Spanish (`es`)
- **Secondary Language**: English (`en`)
- **URL Structure**: `/es/` and `/en/` prefixes
- **Content**: All content is fully translated including:
  - Navigation items
  - Page content
  - Blog posts
  - Project descriptions
  - UI elements

### Adding New Languages

1. Update `astro.config.mjs` locales array
2. Add translations to `src/i18n/ui.ts`
3. Create language-specific content in `src/content/`
4. Add language-specific pages in `src/pages/`

## 📝 Content Management

### Blog Posts

Blog posts are written in Markdown with frontmatter:

```markdown
---
title: 'Post Title'
date: 2024-01-01
excerpt: 'Brief description'
author: 'Adrian "Nano" Alvarez'
image: 'src/assets/blog/image.webp'
imageAlt: 'Image description'
counterpartId: 'en/post-slug' # For i18n linking
---

Post content here...
```

### Projects

Projects are defined in JSON format with rich metadata:

```json
{
  "title": "Project Title",
  "date": "2024-01-01",
  "excerpt": "Project description",
  "images": [
    {
      "src": "src/assets/projects/image.webp",
      "alt": "Screenshot description"
    }
  ],
  "liveLink": "https://example.com",
  "techStack": [
    {
      "title": "React",
      "link": "https://react.dev"
    }
  ],
  "testimonial": {
    "name": "Client Name",
    "quote": "Great work!",
    "role": "CEO"
  }
}
```

## 🎨 Customization

### Styling

- **Tailwind Config**: Customize in `tailwind.config.js`
- **Global Styles**: Edit `src/styles/global.css`
- **Component Variants**: Use `class-variance-authority` for component styling

### Content

- **Personal Data**: Update `src/constants/site-data.ts`
- **Site Config**: Modify `src/constants/site-config.ts`
- **Navigation**: Edit navigation items in site-data.ts

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** (if needed)
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The static build can be deployed to any static hosting service:

- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📊 Performance Features

- **Lighthouse Score**: 100/100 across all metrics
- **Image Optimization**: Automatic WebP conversion and responsive images
- **Code Splitting**: Automatic JavaScript bundling optimization
- **Preloading**: Critical resources are preloaded
- **Compression**: Gzip/Brotli compression enabled

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Adrian "Nano" Alvarez**

- Website: [adrian-alvarez.dev](https://www.adrian-alvarez.dev)
- GitHub: [@N4N1T0](https://github.com/N4N1T0)
- LinkedIn: [Adrian Alvarez Alonso](https://es.linkedin.com/in/adrian-nano-alvarez)
- Twitter: [@AdrianlvarezAl1](https://x.com/AdrianlvarezAl1)

## 🙏 Acknowledgments

- Inspired by [Chanhdai](https://chanhdai.com/)
- Built with [Astro](https://astro.build/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [shadcn/ui](https://ui.shadcn.com/)

---

<div align="center">
  <p>Made with ❤️ by Adrian "Nano" Alvarez</p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p>☕ <a href="https://buymeacoffee.com/n4n1t0">Buy me a coffee</a></p>
</div>
