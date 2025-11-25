# Multi-Tenant Beauty Center Booking System

A modern Next.js booking system MVP that allows clients to view beauty center services and schedule appointments online.

**🚀 Deploy:** https://arionkoder-challenge.vercel.app/

**📂 Repo:** https://github.com/GuidoMantegna/arionkoder-challenge

**⏱️ Total time invested:** 24hrs

## Features

✨ **Core Functionality**

- Multi-tenant support with dynamic routing (`/[center]`)
- Browse available services with details stored in Google Sheets https://docs.google.com/spreadsheets/d/1Rng09IuXdiUJtMICbaKuHLplk30JiJWfQvzCZfStRQc/edit?usp=sharing
- Book appointments with form validation
- Confirmation page with booking summary
- LocalStorage persistence for bookings

🎨 **Design & UX**

- Professional TailwindCSS styling
- Responsive mobile-first design
- Loading states and error handling

⚙️ **Technical**

- Next.js 16 with App Router
- TypeScript for type safety
- Form validation with custom rules
- Data fetching from Google Sheets
- Component-based architecture

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **State Management**: React Hooks
- **Data Persistence**: LocalStorage
- **Data storage**: Google Sheets

## Installation & Setup

### Option 1: Manual Setup

```bash
git clone https://github.com/GuidoMantegna/arionkoder-challenge.git
cd arionkoder-challenge
npm install
npm run dev
```

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

``` bash
src/
├── **tests**/
│ ├── components/ # end to end tests with React Testing Lib.
│ └── lib/ # unit tests with Jest
├── app/
│ ├── layout.tsx # Root layout with metadata
| ├── loading.tsx # Root loading component
| ├── error.tsx # Root error component
│ ├── globals.css # Global styles & design tokens
│ ├── page.tsx # Home page with center list
│ └── [center]/
│ ├── page.tsx # Dynamic center landing
│ └── confirmation/
│ └── page.tsx # Booking confirmation
├── components/
| ├── center-action.tsx # Main container for center services/booking
│ ├── center-landing.tsx # Main landing component
| ├── center-card.tsx # Center card to be displayed in main landing
│ ├── service-card.tsx # Service display card
│ ├── booking-modal.tsx # Modal wrapper
│ ├── booking-form.tsx # Form with validation
│ └── confirmation-content.tsx # Confirmation details
└── lib/
├── api.ts # API methods to fetch data from Google Sheets
├── constants.ts # Project shared constants
├── types.ts # TypeScript interfaces
├── utils.ts # AProject shared utils
└── validation.ts # Form validation logic
```

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

- 📆 Booked services list
- 🔐 User authentication & accounts
- 💾 Backend database integration
- 📧 Email confirmations
- 🗓️ Availability management
- 🚫 Booking cancellation/rescheduling
- 🔍 Service search/filtering

## Deployment

### Deploy to Vercel (Recommended)

```bash

# Push to GitHub first

git push origin main

# Deploy via Vercel Dashboard

# https://vercel.com/new

```

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

## Environment Variables

No environment variables required for the MVP. Ready to add:

- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `DATABASE_URL` - Database connection
- `EMAIL_SERVICE_KEY` - Email provider API key

## Tests

The test coverage focuses on critical business logic that directly impacts user experience and data integrity, ensuring the booking system remains reliable as you develop further features.

**To run the tests**, use:

```bash
# Run tests once
npm run test
# Run tests in watch mode during development
npm run test:watch
```

## Design System

### Colors Palette

- **--color-custom-1 | Primary**: (#706d54) - Main CTAs and branding
- **--color-custom-2 | Secondary**: (#a08963) - Accent elements
- **--color-custom-3**: (#c9b194) - Highlights
- **--color-custom-4**: (#dbdbdb) - Gray scale for text and borders

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Playfair Display (serif)

## Performance Considerations

- API calls simulated with realistic 1.5s delay to mimic production
- Form validation is client-side only (instant feedback)
- Loading states prevent premature submissions

## Future Enhancements

1. **Backend Integration**: Connect to real database
2. **Authentication**: Add user accounts and admin panel
3. **Reviews**: Add ratings and testimonials
4. **Calendar Integration**: Sync with Google Calendar

## AI Tool Documentation

This project incorporates the support of several AI tools to improve productivity, exploration, and creative processes. Their usage was limited to ideation, troubleshooting, and content generation — all final decisions, implementations, and refactors were performed manually.

### 🧠 AI Tools Used

**v0.dev** – Used to generate an initial draft version of the project and run early tests. I selectively integrated useful outputs and refactored any generated code that required adjustments.

**Gemini Banana Pro** – Used exclusively for generating project-related images.

**Gemini / ChatGPT** – Used to clarify doubts, validate ideas, and obtain guidance during the development process.

**Windsurf (Code Assistant)** – Used as an AI-powered coding assistant for suggestions and productivity boosts throughout development.

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
