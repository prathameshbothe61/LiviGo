# LiviGo - Property Management System

A modern web application for managing Paying Guest (PG) accommodations. LiviGo helps property owners efficiently manage their properties, tenants, rent collection, electricity bills, maintenance issues, and more.

## Features

- 🏠 **PG Management**: Add, view, and manage multiple properties
- 👥 **Tenant Management**: Track tenants, room occupancy, and tenant details
- 💰 **Rent Management**: Monitor rent collection, track pending payments, and send reminders
- ⚡ **Electricity Management**: Configure bill splitting rules and track electricity payments
- 🔧 **Issues Tracking**: Manage maintenance issues with status tracking
- 📢 **Announcements**: Broadcast important messages to all tenants
- 📊 **Reports & Analytics**: View income, expenses, and profit reports
- ⚙️ **Settings**: Manage profile, password, and application preferences

## Technologies

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React 18** - Modern UI library
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <YOUR_REPO_URL>
cd LiviGo/Frontend
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── cards/     # Card components (PG, Room, Tenant, etc.)
│   ├── layout/    # Layout components (Navigation, Headers)
│   └── ui/        # shadcn/ui components
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── pages/         # Application pages/routes
```

## Building for Production

To create a production build:

```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

You can deploy this application to any static hosting service:

- **Vercel**: Connect your GitHub repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **AWS S3 + CloudFront**: Upload to S3 and serve via CloudFront

## License

This project is private and proprietary.

## Support

For issues, questions, or contributions, please contact the development team.
