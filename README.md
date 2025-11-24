# Multi-Tenant Beauty Center Booking System

A modern Next.js booking system MVP that allows clients to view beauty center services and schedule appointments online.

## Features

✨ **Core Functionality**
- Multi-tenant support with dynamic routing (`/[center]`)
- Browse available services with details
- Book appointments with form validation
- Confirmation page with booking summary
- LocalStorage persistence for bookings

🎨 **Design & UX**
- Professional TailwindCSS styling
- Responsive mobile-first design
- Loading states and error handling
- Smooth animations and transitions
- Color-coded feedback (success, errors)

⚙️ **Technical**
- Next.js 16 with App Router
- TypeScript for type safety
- Form validation with custom rules
- Simulated API with realistic delays
- Component-based architecture

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **State Management**: React Hooks
- **Data Persistence**: LocalStorage

## Installation & Setup

### Option 1: Using shadcn CLI (Recommended)
\`\`\`bash
npm install -g @shadcn-cli/auto
shadcn-cli@latest init -d

# Copy the code into your project
\`\`\`

### Option 2: Manual Setup
\`\`\`bash
git clone <repository-url>
cd beauty-booking-system
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` in your browser.

## Usage

1. **Home Page** (`/`)
   - Browse available beauty centers
   - Click on a center to view services

2. **Center Landing** (`/[center]`)
   - View all services offered by the center
   - See service details (duration, price, description)
   - Click "Book Now" to open booking form

3. **Booking Flow**
   - Fill in personal details (name, email)
   - Select date (must be tomorrow or later)
   - Select time (9 AM - 6 PM)
   - Submit booking for confirmation

4. **Confirmation** (`/[center]/confirmation`)
   - Review complete booking details
   - Book another service or return home

## Project Structure

\`\`\`
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── globals.css          # Global styles & design tokens
│   ├── page.tsx             # Home page with center list
│   └── [center]/
│       ├── page.tsx         # Dynamic center landing
│       └── confirmation/
│           └── page.tsx     # Booking confirmation
├── components/
│   ├── center-landing.tsx   # Main landing component
│   ├── service-card.tsx     # Service display card
│   ├── booking-modal.tsx    # Modal wrapper
│   ├── booking-form.tsx     # Form with validation
│   └── confirmation-content.tsx  # Confirmation details
└── lib/
    ├── types.ts            # TypeScript interfaces
    └── validation.ts       # Form validation logic
\`\`\`

## Technical Decisions & Assumptions

### Decisions
1. **Dynamic Routes**: Used `[center]` parameter for multi-tenant support instead of subdomain routing
2. **Client Components**: Booking flow uses client components for real-time validation feedback
3. **LocalStorage**: Chose LocalStorage over backend for MVP scope while keeping API patterns ready
4. **Async Params**: Used `Promise<params>` pattern from Next.js 16 best practices
5. **Design Tokens**: Implemented CSS variables for consistent theming and easy customization

### Assumptions
- Services are pre-defined per center (not user-customizable in MVP)
- Business hours are 9 AM - 6 PM
- Minimum booking notice is 1 day
- No user authentication required for MVP
- Bookings don't check for scheduling conflicts

## Unimplemented Features

- 🔐 User authentication & accounts
- 💾 Backend database integration
- 📧 Email confirmations
- 🗓️ Availability management
- 🚫 Booking cancellation/rescheduling
- 💳 Payment processing
- 📱 SMS notifications
- 🔍 Service search/filtering

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Push to GitHub first
git push origin main

# Deploy via Vercel Dashboard
# https://vercel.com/new
\`\`\`

Or use Vercel CLI:
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Environment Variables

No environment variables required for the MVP. Ready to add:
- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `DATABASE_URL` - Database connection
- `EMAIL_SERVICE_KEY` - Email provider API key

## Design System

### Colors
- **Primary**: Purple (#8b5cf6) - Main CTAs and branding
- **Primary Dark**: Deeper purple (#7c3aed) - Hover states
- **Secondary**: Cyan (#06b6d4) - Accent elements
- **Accent**: Amber (#f59e0b) - Highlights
- **Neutral**: Gray scale for text and borders

### Typography
- **Headings**: Geist (sans-serif)
- **Body**: Geist (sans-serif)
- **Monospace**: Geist Mono (for technical content)

## Performance Considerations

- Images are optimized with Next.js Image component when implemented
- API calls simulated with realistic 1.5s delay to mimic production
- Form validation is client-side only (instant feedback)
- Loading states prevent premature submissions

## Future Enhancements

1. **Backend Integration**: Connect to real database
2. **Authentication**: Add user accounts and admin panel
3. **Payment**: Integrate Stripe for deposits
4. **Notifications**: Email & SMS confirmations
5. **Analytics**: Track bookings and popular services
6. **Availability**: Real-time slot management
7. **Reviews**: Add ratings and testimonials
8. **Calendar Integration**: Sync with Google Calendar

## AI Tool Documentation

This project was generated with v0 (Vercel AI). The following features were AI-assisted:
- Architecture and component structure design
- Form validation logic
- TypeScript type definitions
- Responsive layout design
- Loading and error state patterns

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
