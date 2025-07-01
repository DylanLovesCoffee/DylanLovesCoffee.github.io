# Dylan Yang - Portfolio

A modern React-based portfolio website with a retro Windows PowerShell terminal aesthetic.

## Development

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
This starts the Vite development server. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Production Build
```bash
npm run build
```
Builds the app for production to the `dist` folder.

### Local Production Testing
```bash
npm run build
node server.cjs
```
Serves the production build locally at [http://localhost:8888](http://localhost:8888).

### Other Commands
```bash
# Preview production build (alternative to server.cjs)
npm run preview

# Lint code
npm run lint
```

## Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: React Router for SPA navigation
- **Styling**: Tailwind CSS with custom Windows PowerShell theme
- **Build Tool**: Vite
- **Theme**: Retro 90s Windows terminal aesthetic

## Deployment

Ready for deployment to Vercel, GitHub Pages, or any static hosting service.