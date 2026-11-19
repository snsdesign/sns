# Repository Guidelines

## Project Structure

This is a static snsdesign portfolio built with HTML, CSS, and browser JavaScript. The homepage is `index.html`. Site and category pages live in `pages/`, and individual case studies live in `pages/Projects/`. Shared styles and design tokens are in `css/style.css`. Feature stylesheets and scripts, such as `css/ant-gallery.css` and `ant-gallery.js`, support individual projects. The shared `scroll-fade.js` also contains the site search index. Most media lives in `images/`. Make changes in the active site files and leave the `backup-before-*/` snapshots and AppleDouble `._*` files alone.

## Local Development

- Run `python3 -m http.server 5502` from the project root and open `http://localhost:5502/`. VS Code Live Server is also configured to use port 5502. The site requires no build step.
- Run `python3 tools/update-search-index.py` after adding, moving, or editing searchable pages. It reads `index.html` and `pages/**/*.html` and rewrites the marked index in `scroll-fade.js`. Update the script’s `META` entries when a page needs a custom search title, category, or aliases.

## Coding Style and Naming

Use four spaces for new HTML, CSS, and JavaScript blocks and follow the surrounding style when editing existing code. Reuse shared CSS custom properties and use kebab-case for new CSS classes and feature files. Match existing filename case and spacing in links, especially for paths under `pages/Projects/`. Resolve asset paths relative to the HTML file that uses them.

## Verification

Use the browser for manual checks. Open each changed page at desktop and mobile widths, check navigation and media, and look for console errors or failed requests. For search changes, query an affected project title or alias and open the result. For motion changes, also check the browser’s reduced-motion setting.

## Commits and Pull Requests

Git history was unavailable in this checkout. Use a short, descriptive commit subject. In pull requests, list affected pages and manual checks, link the relevant issue when available, and include desktop and mobile screenshots for visible changes.
