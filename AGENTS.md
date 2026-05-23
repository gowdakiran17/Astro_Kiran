## Comprehensive Project Structure Overview

I've explored the Modelence application codebase. Here's a detailed breakdown of what's available:

### 1. PROJECT STRUCTURE

```
/user-app/
├── src/
│   ├── client/                      # React frontend
│   │   ├── assets/                  # Images/logos (favicon.svg, modelence.svg)
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable UI components (shadcn-style)
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Label.tsx
│   │   │   │   └── Card.tsx
│   │   │   ├── LoadingSpinner.tsx    # Custom loading component
│   │   │   └── Page.tsx              # Page wrapper with header
│   │   ├── pages/                    # Route pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   ├── ExamplePage.tsx
│   │   │   ├── PrivateExamplePage.tsx
│   │   │   ├── LogoutPage.tsx
│   │   │   ├── TermsPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── lib/
│   │   │   └── utils.ts              # Utility functions (cn helper)
│   │   ├── router.tsx                # React Router configuration
│   │   ├── index.tsx                 # App entry point
│   │   ├── types.d.ts
│   │   └── index.css
│   │
│   └── server/                       # Node.js backend
│       ├── app.ts                    # Server entry point
│       └── example/
│           ├── index.ts              # Module definition with queries/mutations
│           ├── db.ts                 # Database schemas
│           └── cron.ts               # Scheduled jobs
│
├── Configuration Files
│   ├── tsconfig.json                 # TypeScript config with @/* path alias
│   ├── tailwind.config.js            # Tailwind CSS setup
│   ├── vite.config.ts                # Vite bundler config
│   ├── postcss.config.js
│   └── modelence.config.ts           # Modelence framework config
│
└── package.json                      # Dependencies & scripts
```

### 2. AVAILABLE UI COMPONENTS (SHADCN-STYLE)

All components are custom implementations located in `/user-app/src/client/components/ui/`:

#### Button Component (`/user-app/src/client/components/ui/Button.tsx`)
- **Variants**: default, destructive, outline, secondary, ghost, link
- **Sizes**: default, sm, lg, icon
- **Features**: Forward ref, fully styled with Tailwind, hover/active states
- **Props**: `ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`

#### Input Component (`/user-app/src/client/components/ui/Input.tsx`)
- **Features**: Forward ref, styled with Tailwind
- **Supports**: All standard HTML input attributes
- **Styling**: Border, focus ring, dark mode, placeholder colors

#### Label Component (`/user-app/src/client/components/ui/Label.tsx`)
- **Features**: Semantic label element with peer-disabled states
- **Props**: `LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>`

#### Card Component (`/user-app/src/client/components/ui/Card.tsx`)
- **Subcomponents**: 
  - `Card` - Main container
  - `CardHeader` - Header section with padding
  - `CardTitle` - Title text styling
  - `CardDescription` - Description text styling
  - `CardContent` - Content wrapper
  - `CardFooter` - Footer section

All components use the `cn()` utility function for class merging.

### 3. UTILITY FUNCTIONS

**File**: `/user-app/src/client/lib/utils.ts`

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- Uses `clsx` for conditional classes
- Uses `tailwind-merge` to prevent class conflicts
- Perfect for merging component classes with custom overrides

### 4. EXISTING FORM PATTERNS

The app already has two working form examples you can reference:

#### LoginForm (`/user-app/src/client/pages/LoginPage.tsx`)
- Email and password fields
- `FormData` API for form submission
- Card-based layout with headers and footers
- Validation and error handling
- Links to signup

#### SignupForm (`/user-app/src/client/pages/SignupPage.tsx`)
- Email, password, confirm password
- Checkbox for terms acceptance
- Success state handling
- Client-side password validation
- Toast error notifications
- `useCallback` hook for form submission
- State management for success state

### 5. APP STRUCTURE & ARCHITECTURE

#### Client Setup (`/user-app/src/client/index.tsx`)
```typescript
- React Query (TanStack) integration
- React Router DOM
- React Hot Toast for notifications
- Suspense boundaries with loading state
- Global error handler
```

#### Router Configuration (`/user-app/src/client/router.tsx`)
- **Public Routes**: Home, Example, Terms, Logout, 404
- **Guest Routes**: Login, Signup (redirects to home if authenticated)
- **Private Routes**: PrivateExamplePage (redirects to login if not authenticated)
- **Route Protection**: 
  - `GuestRoute` component for auth-only pages
  - `PrivateRoute` component for protected pages
  - Redirect with `_redirect` query param to return after login

#### Page Wrapper (`/user-app/src/client/components/Page.tsx`)
- Header with logo, user info, logout button
- Responsive layout with max-width
- Body section with optional loading state
- Built-in navigation

### 6. MODULE SYSTEM (Backend)

**File**: `/user-app/src/server/example/index.ts`

Example shows Module pattern with:

```typescript
new Module('example', {
  configSchema: { /* configuration */ },
  stores: [ /* database stores */ ],
  queries: {
    getItem: async (args, { user }) => { /* query logic */ },
    getItems: async (args, { user }) => { /* query logic */ }
  },
  mutations: {
    createItem: async (args, { user }) => { /* mutation logic */ },
    updateItem: async (args, { user }) => { /* mutation logic */ }
  },
  cronJobs: {
    dailyTest: dailyTestCron
  }
})
```

#### Database Pattern (`/user-app/src/server/example/db.ts`)
```typescript
export const dbExampleItems = new Store('exampleItems', {
  schema: {
    title: schema.string(),
    createdAt: schema.date(),
    userId: schema.userId(),
  },
  indexes: []
});
```

### 7. KEY DEPENDENCIES

From `package.json`:
```json
{
  "@modelence/react-query": "^1.0.2",      // Modelence + React Query integration
  "@tanstack/react-query": "^5.90.12",     // Server state management
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.0",           // Client routing
  "react-hot-toast": "^2.4.1",             // Toast notifications
  "zod": "^4.1.13",                        // Schema validation
  "tailwindcss": "^3.4.1",                 // Styling
  "clsx": "^2.1.1",                        // Class utilities
  "tailwind-merge": "^3.4.0"               // Class merging
}
```

### 8. BUILD & DEVELOPMENT

**Scripts** (from package.json):
```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Start production server
npm test             # Run tests (not configured)
```

**Vite Configuration**:
- Root: `src/client`
- Path alias: `@/` → `./src/`
- Dev server: `0.0.0.0:5173` (allows external access)
- React plugin enabled

### 9. STYLING SETUP

- **Tailwind CSS**: Configured with `src/client/**/*.{js,jsx,ts,tsx}` content paths
- **PostCSS**: Enabled with autoprefixer
- **Color Scheme**: Gray, black, white primary colors; blue, red accents

### 10. AVAILABLE PATTERNS FOR TODO LIST FORM

You can reuse:

1. **Form Structure**: FormData API like in LoginPage/SignupPage
2. **Validation**: Zod on backend, client-side checks in form
3. **UI Components**: Button, Input, Label, Card for form container
4. **Page Layout**: Use Page wrapper component
5. **Toast Notifications**: `react-hot-toast` for feedback
6. **State Management**: React Query for server state
7. **Hooks**: `useCallback`, `useState`, `useMutation`, `useQuery`
8. **Styling**: Use `cn()` utility to combine classes

### Summary

This is a full-stack Modelence framework application with:
- Clean component structure ready for a todo list feature
- All necessary UI building blocks already available
- Form handling patterns established
- Database and backend module patterns ready to follow
- Authentication system in place
- TypeScript support throughout
- No external shadcn/ui dependency needed - custom components are already implemented

---

## Recent Features

### Hit Theory Analysis (Added March 2026)

**Location**: `/user-app/src/server/astrology/astrovastu.ts` (end of file)

Added Hit Theory calculations to the AstroVastu feature based on KP Astrology aspects:

**Key Components:**
- `HIT_THEORY_ASPECTS` - Defines positive (+VE: 60°, 120°, 150°) and negative (-VE: 45°, 90°, 135°, 180°) aspects
- `HOUSE_ATTRIBUTES` - 12 houses with keywords, descriptions, body parts
- `RASHI_BODY_PARTS` - Body part mapping for each zodiac sign
- `RASHI_CHARACTERISTICS` - Zodiac characteristics and environment remedies
- `PLANET_ITEMS` - Remedies: metals, fabrics, groceries, colors, gemstones per planet
- `calculateHitTheoryAnalysis()` - Main calculation function

**Interfaces:**
- `HitTheoryAspect` - Individual aspect data
- `HouseHitAnalysis` - Per-house analysis with hits and remedies
- `HitTheoryAnalysis` - Complete analysis result

**UI**: Added "Hit Theory" tab in AstroVastuPage.tsx showing:
- Summary of strong/weak/priority houses
- 12-house analysis with +VE/-VE hits
- Body part color remedies
- Environment remedies
- Aspect legend

**Key Principle**: To resolve issues in a house, activate the PREVIOUS house and apply Rashi Lord colors/items on the corresponding body part.

### AI AstroVastu Predictions (Added March 2026)

**Location**: `/user-app/src/server/astrology/aiAstroVastu.ts`

Added AI-powered Vastu predictions using Gemini AI:

**Features:**
- Integrates with Hit Theory analysis data
- Uses MahaVastu zones and Abundance Blueprint
- Generates personalized Vastu insights
- Falls back to static predictions if no API key

**AI Output Includes:**
- Overall Assessment
- Priority Actions (immediate steps)
- Zone Recommendations (by direction)
- Room-by-Room Guidance (bedroom, kitchen, office, living room, entrance)
- Color Therapy (favorable/avoid colors)
- Body Part Remedies
- Timing Advice
- Spiritual Remedies
- Prosperity Tips

**Query**: `astrology.getAIAstroVastuPrediction({ chartId })`

**UI**: New "AI Insights" tab in AstroVastuPage with lazy loading (only fetches when tab is clicked)

### Detailed AstroVastu Page (March 2026) - CURRENT VERSION

**Previous Issue**: Original simplified version was "too basic" - users wanted more depth while remaining user-friendly.

**Solution**: Comprehensive detailed analysis with organized tabs - keeping it accessible while providing depth.

**New Architecture**:

1. **Backend** (`/user-app/src/server/astrology/detailedVastu.ts` - NEW FILE):
   - `calculateDetailedVastuAnalysis()` - Main analysis function
   - **Vastu Types**: Dynamic (Fire), Grounded (Earth), Flow (Air), Calm (Water) based on Ascendant element
   - **Life Area Analysis**: 6 areas (Wealth, Career, Relationships, Health, Family, Spiritual) with personalized insights
   - **Room-by-Room Guide**: 7 rooms with do/don't lists, colors, remedies
   - **Prioritized Remedies**: High/Medium/Low priority with step-by-step instructions
   - **Vastu Calendar**: Lucky days, golden hours, weekly rituals, monthly focus

2. **Query**: `astrology.getDetailedVastuAnalysis({ chartId })`
   - Returns complete profile, life areas, rooms, remedies, calendar

3. **Frontend** (`/user-app/src/client/pages/AstroVastuPage.tsx`):
   - **4 Organized Tabs**: Overview, Rooms, Remedies, Calendar
   - **Overview Tab**:
     - Vastu Type card with traits and power planet
     - Score breakdown bar chart
     - 6 expandable Life Area cards (tap to reveal details)
   - **Rooms Tab**: 7 expandable room cards with Do/Don't lists, colors, elements
   - **Remedies Tab**: Priority-sorted remedies with how-to steps
   - **Calendar Tab**: Lucky days, golden hours, weekly rituals

**Key Features**:
- User-friendly language (no technical jargon)
- Personalized insights based on actual planetary positions
- Color-coded scores and statuses
- Expandable sections to avoid overwhelming users
- Mobile-first responsive design

**Files**:
- `/user-app/src/server/astrology/detailedVastu.ts` - NEW: Detailed analysis calculations
- `/user-app/src/server/astrology/index.ts` - Added getDetailedVastuAnalysis query
- `/user-app/src/client/pages/AstroVastuPage.tsx` - Complete redesign with tabs

### AI Tab in AstroVastu (March 2026)

Added a 5th "AI" tab to the AstroVastu page that provides AI-powered personalized Vastu insights.

**Features**:
- **Lazy Loading**: AI prediction only fetches when user clicks the AI tab (saves API calls)
- **Overall Assessment**: Comprehensive personalized analysis
- **Priority Actions**: Numbered list of immediate actions to take
- **Zone Recommendations**: Direction-wise guidance with status (strong/weak/neutral), colors, and items
- **Room Guidance**: AI-generated tips for Entrance, Bedroom, Kitchen, Living Room, Office
- **Color Therapy**: Favorable and avoid colors with reasoning
- **Body Part Remedies**: Color healing based on house analysis
- **Timing Advice**: When to make Vastu changes
- **Spiritual Remedies**: Rituals for positive energy
- **Prosperity Tips**: Wealth and abundance tips

**Query Used**: `astrology.getAIAstroVastuPrediction({ chartId })`
- Uses Gemini AI (if API key configured)
- Falls back to static predictions based on chart data if no API key

**UI Design**:
- Purple/pink gradient header card with AI branding
- Clean card-based sections for each insight type
- Loading state with animated brain icon
- Error handling with user-friendly message

### Detailed House Remedies Tab (March 2026)

Added a 6th "Detailed" tab to the AstroVastu page with comprehensive house-specific remedies based on intensity levels.

**Backend** (`/user-app/src/server/astrology/detailedRemedies.ts` - NEW):
- `generateDetailedHouseRemedies()` - Main function generating personalized remedies for all 12 houses
- **Intensity Levels**: Critical (≤30%), Weak (≤50%), Maintenance (≤75%), Enhancement (>75%)
- **Remedy Categories**: vastu_placement, color_therapy, mantra_chanting, plant_remedy, metal_remedy, crystal_healing, lifestyle, body_remedy
- **Data Maps**: PLANET_CRYSTALS, PLANET_PLANTS, PLANET_MANTRAS, BODY_PART_REMEDIES, DIRECTION_REMEDIES, HOUSE_SPECIFIC_REMEDIES

**Key Interfaces**:
- `DetailedRemedy` - Full remedy info with howToImplement steps, materials, timing, benefits, precautions
- `HouseRemedyPack` - Per-house package with all remedy categories, quick fixes, monthly routine
- `RemedyIntensity` - 'critical' | 'weak' | 'maintenance' | 'enhancement'

**Query**: `astrology.getDetailedHouseRemedies({ chartId })`
- Returns all 12 houses with personalized remedies based on Hit Theory analysis

**Frontend UI**:
- **House Grid**: 4x3 grid showing all 12 houses with color-coded status (red=critical, amber=weak, blue=maintenance, green=excellent)
- **House Details Panel**: Expands when house is selected showing:
  - Quick fixes with impact and time needed
  - Critical remedies (if any) with step-by-step instructions
  - Expandable remedy category accordion (8 categories)
  - Monthly routine plan (4-week focus areas)
- **Lazy Loading**: Only fetches when Detailed tab is selected

### Yearly Predictions Feature (March 2026)

Comprehensive yearly predictions system with monthly breakdown, transit tracking, and personalized remedies.

**Backend Files**:

1. **`/user-app/src/server/astrology/yearlyPredictions.ts`** (~900 lines)
   - Core yearly prediction engine
   - `generateYearlyPrediction()` - Main function generating complete yearly forecast
   - Monthly predictions for all 12 months with themes, focus areas, opportunities, challenges
   - Life area assessments (8 areas): Career, Finance, Relationships, Health, Family, Education, Travel, Spirituality
   - Dasha year map calculation showing Mahadasha/Antardasha periods active during the year
   - Important dates generation based on planetary transits and dashas

2. **`/user-app/src/server/astrology/yearlyTransits.ts`** (~380 lines)
   - Transit calendar generation for the year
   - `generateYearlyTransitCalendar()` - Tracks major planetary movements
   - Jupiter, Saturn, Rahu/Ketu transit tracking with effects
   - Retrograde periods with dates for 2024-2027 (Mercury, Venus, Mars, Jupiter, Saturn)
   - Monthly transit summary for each month

3. **`/user-app/src/server/astrology/yearlyRemedies.ts`** (~540 lines)
   - Personalized remedy calendar based on weak planets
   - `generateYearlyRemedyCalendar()` - Main function
   - Gemstone recommendations with wearing instructions
   - Mantra recommendations with counts and optimal timing
   - Charity calendar with monthly suggestions
   - Fasting recommendations linked to weak planets
   - Ritual calendar with monthly rituals (cost, timing, benefits)
   - Monthly focus areas for spiritual practice
   - Daily routine suggestions for health and well-being

4. **`/user-app/src/server/astrology/aiYearlyPredictions.ts`** (~350 lines)
   - AI narrative generation using Gemini API
   - `generateAIYearlyPrediction()` - Creates personalized narrative
   - Fallback predictions if no API key configured
   - Executive summary of the year
   - Career, finance, relationship, and health outlooks
   - Lucky elements (colors, numbers, days)
   - Overall advice

**Query**: `astrology.getYearlyPrediction({ chartId, year })`
- Parameters: chartId (string), year (number 2020-2050)
- Returns: Complete yearly prediction with base prediction, transits, remedies, and AI narrative

**Frontend** (`/user-app/src/client/pages/YearlyPredictionsPage.tsx` ~750 lines):
- **Year Navigation**: Arrow buttons to navigate between years, current year highlighted
- **Chart Selector**: Dropdown to switch between saved charts
- **5 Tabs**:
  1. **Overview**: Year rating, theme, dasha periods, AI insights summary
  2. **Months**: 12 expandable month cards with themes, focus areas, opportunities, challenges
  3. **Life Areas**: 8 life area cards showing trends (improving/stable/challenging), opportunities, obstacles
  4. **Transits**: Major planet transits (Jupiter, Saturn, Rahu/Ketu) with timing and effects, retrograde calendar
  5. **Remedies**: Gemstones, mantras, daily routine suggestions, fasting recommendations

**Route**: `/yearly-predictions` (private route, requires authentication)

**Dashboard Integration**:
- Added prominent "Yearly Predictions" featured card on Dashboard
- Full-width gradient card (indigo-purple-pink) with "NEW" badge
- Shows current year dynamically
- Highlights: AI Insights, 12 Months, Life Areas, Remedies

**Key Features**:
- AI-powered personalized narratives with Gemini integration
- Complete Vimshottari Dasha integration for the year
- Transit effects based on natal chart positions
- Personalized remedies based on weak/afflicted planets
- Lazy loading pattern for expensive calculations
- Mobile-responsive design with expandable sections

### Bug Fix: Muhurtha Today's Star from Panchanga (April 2026)

**Issue**: The Muhurtha finder was not correctly getting today's star (nakshatra) from Panchanga data.

**Root Cause**: In `/user-app/src/server/astrology/index.ts`, the `getMuhurtha` and `getMuhurthaDateScores` queries were incorrectly accessing panchang data:
```javascript
// WRONG - panchang.tithi and panchang.nakshatra are objects, not numbers
tithi: typeof panchang.tithi === 'number' ? panchang.tithi : 0,
nakshatra: typeof panchang.nakshatra === 'number' ? panchang.nakshatra : 0,
```

Since `panchang.tithi` and `panchang.nakshatra` are objects (with `index`, `name`, etc. properties), the condition always evaluated to false, defaulting to `0` (Ashwini nakshatra and Pratipada tithi) regardless of the actual day.

**Fix**: Changed to correctly access the `.index` property from the panchang objects:
```javascript
// CORRECT - access the index property from the object
tithi: typeof panchang.tithi === 'object' && panchang.tithi !== null ? panchang.tithi.index : 0,
nakshatra: typeof panchang.nakshatra === 'object' && panchang.nakshatra !== null ? panchang.nakshatra.index : 0,
```

**Impact**: Now the Muhurtha finder correctly uses the actual day's nakshatra and tithi for:
- Tara Bala (star compatibility) calculations
- Activity-specific favorable/unfavorable nakshatra checks
- Tithi favorability checks
- Personalized analysis showing correct "Today's Star"

### Muhurtha Remedies Feature (April 2026)

Added comprehensive remedies system for when the Muhurtha is not favorable but the user must proceed with the activity.

**Backend** (`/user-app/src/server/astrology/muhurtha.ts`):

**New Interfaces:**
- `MuhurthaRemedy` - Individual remedy with category, title, description, howTo, priority
- `MuhurthaRemedies` - Complete remedies package with guidance, remedies array, mantras, auspicious actions

**Remedy Categories:**
- `mantra` - Sacred chants for protection
- `puja` - Worship rituals
- `donation` - Charitable acts
- `color` - Color therapy recommendations
- `direction` - Directional guidance
- `timing` - Timing recommendations
- `general` - General spiritual practices

**Data Added:**
- `PLANET_MANTRAS` - Mantras for each planetary lord
- `TARA_REMEDIES` - Specific remedies for inauspicious Taras (1-Janma, 3-Vipat, 5-Pratyak, 7-Naidhana)
- `WEEKDAY_REMEDIES` - Remedies for unfavorable weekdays (Tuesday, Saturday)
- `ACTIVITY_REMEDIES` - Activity-specific remedies for all 10 activity types
- `UNIVERSAL_MANTRAS` - Ganesh, Maha Mrityunjaya, Gayatri mantras

**Logic:**
- `generateMuhurthaRemedies()` - Main function that generates personalized remedies based on:
  - Overall muhurtha score (< 70 triggers remedies)
  - Tara Bala nature (inauspicious triggers Tara-specific remedies)
  - Weekday (unfavorable weekdays trigger weekday remedies)
  - Activity type (always includes activity-specific remedies)
  - Tithi/Nakshatra favorability

**Frontend** (`/user-app/src/client/pages/MuhurthaPage.tsx`):

**New Component: `RemediesCard`**
- Shows green "Auspicious Time" card when score >= 70
- Shows amber "Remedies to Proceed Successfully" card when score < 70
- **Protective Mantras Section**: Expandable mantra cards with Sanskrit text, repetitions, benefits
- **Recommended Actions**: Priority-sorted remedies with category icons and badges (Essential/Recommended/Optional)
- **Auspicious Actions**: Simple checklist of positive actions
- Show More/Less toggle for long remedy lists

**Visual Design:**
- Category-specific colors and icons (mantra=purple, puja=orange, donation=green, etc.)
- Priority badges (Essential=red, Recommended=amber, Optional=gray)
- Expandable mantra sections with full text and benefits

### All Vastu Remedies Page (April 2026)

Complete encyclopedia of Vastu remedies covering all aspects of Vastu Shastra.

**Backend** (`/user-app/src/server/astrology/allVastuRemedies.ts`):

**Data Structures:**
- `ZONE_REMEDIES` - All 16 MahaVastu zones with:
  - Direction, element, ruling planet, ruling deity
  - Life aspects governed by each zone
  - Beneficial and avoid colors/items
  - Symbols, plants, metals, crystals
  - Activation remedies with step-by-step howTo
  - Dosha remedies (toilet/kitchen in wrong zone, missing corners)

- `ROOM_REMEDIES` - 11 rooms (Entrance, Living Room, Master Bedroom, Kitchen, Pooja Room, Bathroom, Study, Children's Room, Home Office, Dining, Staircase):
  - Ideal, alternative, and avoid zones
  - Color schemes (best, good, avoid)
  - Furniture placement guidelines
  - Do's and Don'ts lists
  - Problem-solution pairs
  - Energy enhancers

- `LIFE_AREA_REMEDIES` - 8 life areas (Wealth, Career, Relationships, Health, Education, Fame, Children, Spiritual):
  - Associated zones and houses
  - Colors, elements, symbols
  - Remedies with placement and timing
  - Mantras with counts and benefits
  - Yantras and gemstones

- `ELEMENT_REMEDIES` - 6 elements (Water, Fire, Earth, Metal, Air/Wood, Space/Ether):
  - Associated directions and zones
  - Colors, shapes, materials
  - Balancing items
  - Excess and deficiency symptoms
  - Balancing remedies

- `DOSHA_REMEDIES` - 7 common doshas (Toilet in NE, Kitchen in NE, SW Cut, Bedroom in NE, South-facing door, Brahmasthan obstruction, Stairs in NE):
  - Description, symptoms, causes
  - Multiple remedy types (Primary, Pyramid, Salt, Copper, Crystal)
  - Step-by-step howTo instructions
  - Preventive measures

- `UNIVERSAL_REMEDIES` - 7 categories (Pyramids, Crystals, Yantras, Plants, Symbols & Statues, Salt Remedies, Lighting & Lamps):
  - Individual items with descriptions
  - Placement guidelines
  - Benefits and howToUse

**Query**: `astrology.getAllVastuRemedies` - Returns all remedies data

**Frontend** (`/user-app/src/client/pages/VastuRemediesPage.tsx`):

**6 Organized Tabs:**
1. **16 Zones** - All MahaVastu zones with element icons, colors, items, activation & dosha remedies
2. **Rooms** - Room-by-room guide with zones, colors, furniture, do's/don'ts, enhancers
3. **Life Areas** - Goal-based remedies (wealth, career, relationships, etc.) with mantras & yantras
4. **Elements** - Five elements balancing with symptoms and remedies
5. **Doshas** - Common Vastu defects with comprehensive non-demolition remedies
6. **Universal** - General Vastu tools (pyramids, crystals, yantras, plants, etc.)

**Features:**
- Search functionality across all categories
- Expandable cards for detailed information
- Color-coded beneficial/avoid items
- Element-specific icons and colors
- Step-by-step remedy instructions
- Symptom identification for doshas

**Route**: `/vastu-remedies` (private route)

**Dashboard Integration**:
- Featured card with teal-emerald-green gradient
- Added to "Life Decisions" feature category

### All Vastu Remedies - Major Expansion (April 2026)

Massively expanded the All Vastu Remedies encyclopedia with comprehensive coverage:

**New Rooms Added (6):**
- Balcony/Terrace - North-East ideal, plants, wind chimes, garden tips
- Store Room/Utility - South-West ideal, organization, grain storage
- Garage/Parking - North-West ideal, vehicle direction, safety
- Swimming Pool - North-East only, critical SW warnings
- Garden/Lawn - Plant placement, tree positions, water features

**New Doshas Added (10):**
- Kitchen in North-East - Fire-water clash remedies
- Overhead Beam in Bedroom/Living - False ceiling, bamboo flutes, crystal hanging
- Cut or Extended Corners - Mirror extension, light activation, pyramid grid
- Brahmasthan Blocked/Heavy - Center clearing, chandelier remedy
- Water Body in South/South-West - Earth element, fire activation
- Mirror Facing Bed - Repositioning, covering techniques
- Clutter and Junk Accumulation - Decluttering rituals, space clearing
- Sharp Corners (Sha Chi/Poison Arrows) - Plants, crystals, fabric covers
- Geopathic Stress Zones - L-rod detection, copper wire grid, crystal neutralization
- Temple/Pooja Room in Bedroom - Separation, relocation, minimal representation

**New Universal Remedy Categories (9):**
1. **Metal Strips (Space Surgery)** - Copper, Brass, Stainless Steel, Aluminum, Iron, Lead strips for zone correction
2. **Color Tapes & Therapy** - Blue, Red, Yellow, Green, White, Orange tapes for elemental balance
3. **Mirrors & Reflectors** - Convex (Bagua), Concave, Flat, Framed mirrors with proper placement
4. **Water Features** - Indoor fountain, Aquarium (8 goldfish + 1 black), Water bowl/Urli, Copper Kalash
5. **Direction-Specific Entrance Remedies** - North, East, South, West, NE, SW entrance enhancers/correctors
6. **Aroma & Sound Therapy** - Incense, Essential oils, Singing bowl, Brass bell, Conch shell (Shankh)
7. **Paintings & Art** - Rising Sun, Waterfall, Mountain, Seven Horses, Love Birds, Bamboo paintings
8. **Planetary Yantras** - Complete Navagraha set (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu)
9. **Vastu Tools & Instruments** - Vastu compass, L-Rod divining rods, Pendulum, Floor plan grid

**Total Coverage Now:**
- 16 MahaVastu Zones (comprehensive)
- 17 Rooms (expanded from 11)
- 8 Life Areas
- 6 Elements
- 17 Doshas (expanded from 7)
- 16 Universal Remedy Categories (expanded from 7)

### MahaVastu Concern-Based Remedies - Integration (April 2026)

Added comprehensive concern-based remedies system based on MahaVastu website (mahavasturemedies.com).

**New Data Structures Added:**

1. **`ConcernRemedy` Interface** - Problem-based remedies with:
   - Concern name and category (residential/commercial/other)
   - Icon, description
   - Affected zones
   - Symptoms list
   - Remedies with type, placement, howTo steps
   - Recommended products with purpose and placement
   - Preventive measures

2. **`CONCERN_REMEDIES` Array** - 17 comprehensive concerns:

   **Residential Concerns (10):**
   - Wealth Accumulation - Kuber activation, Yellow Vase, Camel figurine
   - Marriage & Relationships - Love Birds, Rose Quartz, Kamdhenu Cow
   - Progeny & Kids - Santana Gopala, Elephant pairs, Metal enhancement
   - Family Harmony - Brahmasthan activation, Ganesha, Family photos
   - Health & Vitality - Dhanvantari, Tulsi plant, Morning sun
   - Education - Saraswati, Crystal Globe, Education Tower
   - Mental Peace & Clarity - WNW zone, Meditation corner, Amethyst
   - Debt Freedom - Fire element, Flame symbol, SSW disposal
   - Job Promotion - Seven Horses, South activation, Mountain backing
   - Detox & Habits - SSW zone, Space clearing, Black Tourmaline

   **Commercial Concerns (7):**
   - Business Success & Growth - Indra Dev, Rising Sun, Fire element
   - Money Flow - SE activation, Flame symbol, Kuber Yantra
   - Social Connections - East zone, Wind Chime, Meeting area
   - Fame & Recognition - South zone, Red Horses, Lighting
   - Staff Support - NW zone, Wind Chime, SW leadership
   - Global Business - NW travel, Globe, Air element
   - Government Relations - Surya, Legal documents, Surya Yantra

   **Other Concerns (4):**
   - Real Estate Buying - Village Scene, SW earth, Ganesha
   - Real Estate Selling - Space clearing, NW movement, Brightness
   - Legal Matters - Hanuman, South fire, Mars Yantra
   - Protection from Rivals - Entrance protection, Hanuman, Black Tourmaline grid

3. **`MahavastuProduct` Interface** - Categorized MahaVastu products

4. **`MAHAVASTU_PRODUCTS` Array** - 6 product categories:

   **Devta DIVs (Deity Invocation Devices) - 11 items:**
   - Bhudhar, Indra, Rudra, Surya, Yama, Kuber, Vayu, Varuna, Agni, Isha/Ishana, Brahma
   - Each with zone placement, activation instructions, benefits

   **MahaVastu Idols & Statues - 5 items:**
   - Kuber (Yakshraj Kubera) - Makes You Rich
   - Indra Dev - Creates organized system to build Empire
   - Nandi Bull - Secures your Business
   - Surya/Sun - Grants Powerful Connections
   - Kamdhenu Cow - Fulfils Your Desires

   **MahaVastu Figurines - 5 items:**
   - Camel - Multiply Profits & Gains
   - Love Birds/White Pigeons - Experience True Love
   - Elephant Pair (trunk down) - Fertility and wisdom
   - Horse (Running) - Success and career progress
   - Tortoise - Career stability and longevity

   **MahaVastu Paintings - 6 items:**
   - Village Scene - Manifest your own Property
   - Seven Running Horses - Success and progress
   - Waterfall/River - Career and wealth flow
   - Rising Sun - New beginnings and growth
   - Mountain - Career backing and support
   - Bamboo - Growth and flexibility

   **MahaVastu Space Surgery Tools - 4 items:**
   - Metal Studs (Copper) - Strengthen zones and devtas
   - Metal Springs - Changes energy polarity
   - Virtual Entry Rods - Open positive entrance virtually
   - Precious Stone Dust - Strengthen planetary energies

   **MahaVastu Pyramids - 4 items:**
   - Plastic Pyramid (15cm) - Amplify energies
   - Wooden Pyramid (32.5cm) - Major energy balancing
   - Copper Pyramid - Neutralize negative energy
   - Crystal Pyramid - Amplify intentions and clarity

**New Helper Functions:**
- `getRemediesForConcern(concernName)` - Find remedies by concern
- `getConcernsByCategory(category)` - Filter by residential/commercial/other
- `getMahavastuProductsByCategory(categoryName)` - Find products by category

**Updated `getAllRemediesData()`:**
- Now returns `concerns` and `mahavastuProducts` in addition to existing data

**Source Reference:**
- Based on https://mahavasturemedies.com/pages/vastu-concern
- Product details from https://mahavasturemedies.com/collections/remedies

### Home Vastu Analysis Feature (April 2026)

Interactive home analysis tool where users input their home's direction, entrance, and room placements to receive personalized Vastu scores, dosha detection, and remedies.

**Backend** (`/user-app/src/server/astrology/homeVastu.ts` - NEW FILE ~900 lines):

**Core Data Structures:**

1. **`ZONE_DEFINITIONS`** - All 16 MahaVastu zones (N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW, CENTER):
   - Element association (Water, Fire, Earth, Metal, Air, Space)
   - Ruling deity and planet
   - Life aspects governed
   - Colors (primary, secondary, accent)
   - Ideal and avoid room types

2. **`ROOM_DEFINITIONS`** - 16 room types (Master Bedroom, Kitchen, Living Room, Pooja Room, Bathroom, Study, Children's Room, Guest Bedroom, Dining, Store Room, Home Office, Garage, Balcony, Staircase, Drawing Room, Utility Room):
   - Ideal zones (score 100)
   - Acceptable zones (score 75)
   - Avoid zones (score 25)
   - Affects areas (wealth, health, relationships, etc.)

3. **`ENTRANCE_EFFECTS`** - Entrance scoring by direction:
   - East/North (100 - highly auspicious)
   - NE/NW (90 - auspicious)
   - West (70 - neutral)
   - SE (60 - mixed)
   - South/SW (40 - inauspicious, needs remedies)

**Key Interfaces:**
- `HomeVastuInput` - User input (name, type, facing, entrance, rooms, special features)
- `RoomAnalysis` - Per-room score, zone info, issues, remedies
- `DohaDetection` - Vastu dosha with severity (critical/major/minor), effects, remedies
- `ZoneAnalysis` - Zone status (balanced/blocked/misused), room conflicts
- `HomeVastuAnalysis` - Complete analysis result

**Main Function: `analyzeHomeVastu(input: HomeVastuInput)`**
Returns:
- Overall score (0-100) weighted: 20% entrance + 60% rooms + 20% doshas
- Entrance analysis with direction score and remedies
- Room-by-room analysis with scores and recommendations
- Dosha detection (toilet in NE, kitchen in NE, SW entrance, etc.)
- Zone analysis showing balanced/blocked/misused zones
- Priority remedies sorted by severity

**Critical Dosha Detection:**
- Toilet in NE (most severe - blocks prosperity)
- Kitchen in NE (fire-water conflict)
- Master Bedroom in NE (disturbs peace)
- SW Entrance (leads to instability)
- Staircase in NE/Brahmasthan (blocks growth)
- Cut corners (missing energy)

**Helper Functions:**
- `getRoomTypes()` - Returns all room type options
- `getZoneOptions()` - Returns all 16+1 zone options with descriptions
- `getDirectionOptions()` - Returns 8 cardinal directions

**Database** (`/user-app/src/server/astrology/db.ts`):

```typescript
export const dbHomeVastu = new Store('homeVastu', {
  schema: {
    userId: schema.userId(),
    name: schema.string(),
    type: schema.string(), // apartment, house, villa, office, shop, factory
    facingDirection: schema.string(), // N, NE, E, SE, S, SW, W, NW
    entranceZone: schema.string(),
    plotShape: schema.string().optional(),
    floors: schema.number().optional(),
    rooms: schema.array(schema.object({
      roomType: schema.string(),
      zone: schema.string(),
      label: schema.string().optional(),
      issues: schema.array(schema.string()).optional(),
    })),
    specialFeatures: schema.object({...}).optional(),
    overallScore: schema.number().optional(),
    doshas: schema.array(...).optional(),
    createdAt: schema.date(),
    updatedAt: schema.date(),
  },
  indexes: [{ key: { userId: 1 } }, { key: { userId: 1, createdAt: -1 } }],
});
```

**Queries** (in `/user-app/src/server/astrology/index.ts`):
- `getHomeVastuOptions` - Returns room types, zone options, direction options
- `getSavedHomes` - Lists user's saved home analyses
- `getHomeVastuAnalysis({ homeId })` - Gets full analysis for saved home
- `analyzeHomeQuick(input)` - Analyzes without saving (preview mode)

**Mutations:**
- `saveHome(input)` - Saves new home with analysis
- `updateHome({ homeId, input })` - Updates existing home
- `deleteHome({ homeId })` - Removes saved home

**Frontend** (`/user-app/src/client/pages/HomeVastuPage.tsx` ~700 lines):

**Three View States:**
1. **List View** - Shows saved homes with scores, quick add button
2. **Form View** - Multi-step home input form
3. **Analysis View** - Comprehensive results display

**Form Sections:**
- Basic Info (name, type, floors)
- Entrance (direction dropdown, zone selector with visual grid)
- Room Placement (add rooms with zone selection, visual zone picker)
- Additional Features (staircase zone, cut corners checkboxes)

**Analysis Results Display:**
- Score circle with color (green ≥70, amber ≥50, red <50)
- Entrance analysis card with direction effects
- Room-by-room accordion with individual scores
- Doshas section with severity badges (Critical/Major/Minor)
- Priority remedies list with step-by-step instructions
- Zone summary showing balanced/issues

**Visual Features:**
- 16-zone compass grid for zone selection
- Color-coded scores throughout
- Expandable sections to manage information density
- Mobile-responsive design

**Route**: `/home-vastu` (private route, requires authentication)

**Dashboard Integration**:
- Added "Home Vastu" feature card with Home icon
- Description: "Analyze your home"

### Vedic Numerology Feature (April 2026) - MAJOR UPDATE

Comprehensive **Vedic Numerology** (Ank Shastra) feature based on the Chaldean/Cheiro system with ancient Indian traditions. Complete rewrite from basic numerology to professional-grade Vedic numerology.

**Backend Files:**

1. **`/user-app/src/server/numerology/db.ts`** - Simplified schema for Vedic numerology:
   - Core Vedic numbers: Moolank, Bhagyank, Namank, Kua Number
   - Lo Shu Grid data (grid counts, missing/present/repeating numbers)
   - User profile data (name, birthDate, gender)

2. **`/user-app/src/server/numerology/calculations.ts`** (~1220 lines) - Complete Vedic calculation engine:

   **Letter Systems:**
   - `CHALDEAN_CHART` - Vibration-based letter values (traditional Cheiro)
   - `PYTHAGOREAN_CHART` - Sequential 1-9 assignment

   **Planetary Data (`NUMBER_PLANETS`):**
   - All 9 numbers with Vedic planetary associations (Navagraha)
   - Sanskrit names, deities, elements, gemstones (with Sanskrit names)
   - Colors, directions, mantras, beej mantras, yantras
   - Body parts, metals, alternate gems

   **Number Meanings (`NUMBER_MEANINGS`):**
   - Comprehensive traits for numbers 1-9
   - Positive/negative traits, careers, health areas
   - Friendly/enemy/neutral number relationships
   - Lucky years (turning point ages)

   **Cheiro Compound Numbers (`COMPOUND_NUMBERS` 10-52):**
   - All 43 compound number interpretations from Cheiro's Book of Numbers
   - Names ("Wheel of Fortune", "The Royal Star of the Lion", etc.)
   - Symbols, nature (fortunate/unfortunate/mixed), interpretations, advice

   **81 Moolank-Bhagyank Combinations (`COMBINATIONS_81`):**
   - All 81 possible Moolank-Bhagyank pairings (1-1 to 9-9)
   - Rating (excellent/good/average/challenging/difficult)
   - Score (0-100%)
   - Career, finance, relationship, health predictions
   - Key advice for each combination

   **Personal Year Predictions (`PERSONAL_YEAR_PREDICTIONS`):**
   - 9-year cycle predictions with themes and keywords
   - Monthly focus for all 12 months per year
   - Do's and Don'ts lists
   - Career, finance, relationship, health advice
   - Lucky and challenging months

   **Lo Shu Grid Data:**
   - `LO_SHU_ARROWS` - 15 strength/weakness arrows
   - `LO_SHU_PLANES` - 8 planes (Mind, Emotional, Practical, Thought, Will, Action, Spirituality, Prosperity)

   **Core Functions:**
   - `calculateMoolank(birthDate)` - Driver/Root number from birth day
   - `calculateBhagyank(birthDate)` - Destiny number from full date
   - `calculateNamank(name, system)` - Name number with compound
   - `calculateKuaNumber(birthDate, gender)` - Feng Shui/Vedic direction number
   - `calculatePersonalYear/Month/Day()` - Current cycle calculations
   - `calculateLoShuGrid(birthDate)` - Grid with arrows and planes
   - `calculateLuckyDates(moolank, bhagyank, month, year)` - Lucky/avoid dates
   - `generateWeeklyPrediction()` - 7-day forecast with daily predictions
   - `calculateVedicProfile()` - Complete profile calculation (main export)

3. **`/user-app/src/server/numerology/index.ts`** (~450 lines):

   **Queries:**
   - `getProfiles` - List all user profiles
   - `getProfile` - Full Vedic analysis with fresh predictions
   - `quickAnalysis` - Analysis without saving
   - `getPersonalCycles` - Year/month/day for specific dates
   - `getWeeklyPrediction` - Weekly forecast for any week
   - `getLuckyDates` - Lucky dates for any month
   - `getNumberMeaning` - Single number interpretation
   - `getCompoundMeaning` - Cheiro compound lookup
   - `getCombinationReading` - 81 combination lookup
   - `getCombinationsForMoolank` - All 9 combinations for a moolank
   - `getYearPredictions` - Personal year predictions

   **Mutations:**
   - `createProfile` - Create with Vedic calculations
   - `updateProfile` - Update with name recalculation
   - `deleteProfile` - Remove profile
   - `toggleFavorite` - Star/unstar profile

**Frontend** (`/user-app/src/client/pages/NumerologyPage.tsx` ~1350 lines):

**Views:**
1. **List View**: Purple gradient header, saved profiles with Moolank/Bhagyank badges
2. **Create View**: Form for name, birth date, gender selection (for Kua Number)
3. **Detail View**: 4-tab comprehensive Vedic results

**Detail View Header:**
- Profile name and birth date
- Three core number badges (Moolank/Bhagyank/Namank)
- Combination rating badge (excellent/good/average/challenging)

**4 Tabs:**

1. **Overview Tab:**
   - 81 Combination Reading card with career/finance/relationship/health
   - Moolank Details (expandable) - traits, keywords, friendly/enemy numbers
   - Bhagyank Details (expandable) - destiny traits, best careers
   - Compound Number meaning (if 10-52)
   - Kua Number display

2. **Predictions Tab:**
   - Personal Year card with theme, keywords, do/don't lists
   - Career/Finance/Relationship/Health yearly advice
   - Lucky and challenging months
   - Current Cycles (Year/Month/Day numbers)
   - Weekly Prediction with 7 daily forecasts
   - Lucky Dates calendar for current month

3. **Lo Shu Grid Tab:**
   - Visual 3x3 grid with count indicators
   - Missing/Strong number highlighting
   - Active Arrows (strength/weakness) with meanings
   - Planes Analysis with percentage bars
   - Missing and Repeating number summary cards

4. **Remedies Tab:**
   - Moolank Remedies - gemstone, colors, mantras, yantra, metal, direction, day
   - Bhagyank Remedies - gemstone, colors, mantra
   - Health Areas to Watch
   - Lucky Years (turning point ages)

**Helper Components:**
- `NumberBadge` - Colored circular number display
- `RatingBadge` - Combination rating with score
- `ExpandableSection` - Collapsible card sections
- `LoShuGridDisplay` - Complete grid visualization with arrows/planes

**Route**: `/numerology` (private route, requires authentication)

**Key Features:**
- Professional Vedic/Cheiro numerology system
- All 81 Moolank-Bhagyank combination readings
- Cheiro compound numbers (10-52) with occult meanings
- Complete planetary remedies (gemstones, mantras, colors, yantras)
- Weekly predictions with daily forecasts
- Lucky/avoid dates calendar
- Lo Shu Grid with arrows and planes analysis
- Personal Year/Month/Day cycle tracking
- Beautiful gradient UI with expandable sections
- Mobile-responsive design

### Master Numerology Feature (April 2026)

Comprehensive extended numerology calculators for all aspects of life - mobile numbers, vehicle numbers, house numbers, business names, name correction, and compatibility.

**Backend Files:**

1. **`/user-app/src/server/numerology/masterCalculations.ts`** (~1050 lines):

   **Mobile Number Numerology:**
   - `MOBILE_NUMBER_MEANINGS` - Interpretations for numbers 1-9 with lucky/unlucky status
   - Strengths, weaknesses, bestFor, avoidFor lists
   - `analyzeMobileNumber()` - Analyzes 10-digit mobile against user's Moolank

   **Vehicle Number Numerology:**
   - `VEHICLE_NUMBER_MEANINGS` - Safety ratings (excellent/good/average/caution/risky)
   - Best/avoid colors for each number
   - `analyzeVehicleNumber()` - Analyzes registration numbers

   **House/Address Number:**
   - `HOUSE_NUMBER_MEANINGS` - Energy types, suitable occupants
   - Recommended colors and elements
   - `analyzeHouseNumber()` - Analyzes flat/house numbers (supports letters like 12A)

   **Business Name Numerology:**
   - `BUSINESS_NUMBER_FIT` - Industry fit for each number
   - Success score calculation based on owner compatibility
   - `analyzeBusinessName()` - Analyzes company/brand names

   **Name Correction:**
   - Letter value charts (Chaldean system)
   - Spelling change suggestions
   - `generateNameCorrection()` - Suggests additions, removals, spelling changes

   **Partnership Compatibility:**
   - `COMPATIBILITY_MATRIX` - All 81 number pair combinations (1-1 to 9-9)
   - Moolank, Bhagyank, and Namank compatibility
   - `calculateCompatibility()` - Full compatibility analysis

2. **`/user-app/src/server/numerology/index.ts`** - Updated with new queries:
   - `analyzeMobileNumber` - Mobile number analysis
   - `analyzeVehicleNumber` - Vehicle registration analysis
   - `analyzeHouseNumber` - House/flat number analysis
   - `analyzeBusinessName` - Business name analysis
   - `getNameCorrection` - Name spelling suggestions
   - `calculateCompatibility` - Marriage/partnership compatibility

**Frontend** (`/user-app/src/client/pages/MasterNumerologyPage.tsx` ~1100 lines):

**Main Menu:**
- 6 calculator cards with gradient icons
- Profile notice if no numerology profiles exist

**Calculators:**
1. **Mobile Number** - 10-digit input, compatibility score, lucky/unlucky digits, remedies
2. **Vehicle Number** - Registration input, safety rating badge, best/avoid colors, lucky days
3. **House Number** - Flat/house input, energy type, suitable occupants, remedies
4. **Business Name** - Company name input, success score, industry fit, suggestions
5. **Name Correction** - Name input, letter values display, suggested corrections with scores
6. **Compatibility** - Two-person input, overall score with heart animation, detailed breakdown

**Helper Components:**
- `NumberBadge` - Colored circular number display
- `ScoreBadge` - Compatibility/success score with color coding
- `SafetyBadge` - Vehicle safety rating
- `ExpandableCard` - Collapsible detail sections
- `TagList` - Colored tag display for strengths/challenges

**Route**: `/master-numerology` (private route, requires authentication)

**Dashboard Integration:**
- Added to "Life Decisions" category
- Icon: Hash, Description: "Mobile, vehicle, house & more"

### Tantric Remedies Feature (April 2026)

Complete encyclopedia of authentic Tantric remedies covering mantras, mahavidyas, yantras, rituals, and problem-specific solutions.

**Backend** (`/user-app/src/server/astrology/tantricRemedies.ts` ~2700 lines):

**Data Structures:**

1. **`TANTRIC_MANTRAS`** - 25+ comprehensive mantras including:
   - Protection mantras (Maha Mrityunjaya, Durga Kavach, Kali Beej, Baglamukhi)
   - Wealth mantras (Lakshmi Beej, Kubera, Green Tara)
   - Love mantras (Kamdev, Rati)
   - Knowledge mantras (Saraswati Beej, Hayagriva)
   - Health mantras (Dhanvantari, Sudarshana)
   - Obstacle removal (Ganesh Beej, Vakratunda)
   - Power mantras (Hanuman Beej, Hanuman Tantric)
   - Tantric Gayatri mantras (Shiva, Durga, Lakshmi)
   - Each with Sanskrit, transliteration, meaning, deity, purpose, japaCount, mala, direction, timing, restrictions, benefits, level (beginner/intermediate/advanced)

2. **`MAHAVIDYAS`** - All 10 Das Mahavidyas:
   - Kali, Tara, Tripura Sundari, Bhuvaneshwari, Bhairavi, Chhinnamasta, Dhumavati, Baglamukhi, Matangi, Kamala
   - Each with description, form, color, attributes, beejMantra, moolMantra, gayatriMantra, yantra, worship methods, benefits, bestDay, offerings, gemstone, direction, precautions

3. **`PLANETARY_TANTRIC_REMEDIES`** - All 9 planets:
   - Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu
   - Each with deity, beejMantra, tantricMantra, yantra, tantra, kavach, stotra, offerings, worship methods, gemstone, rudraksha, metal, direction, timing, japaCount, benefits, specialRituals with procedures

4. **`TANTRIC_YANTRAS`** - 8 sacred yantras:
   - Sri Yantra, Kali Yantra, Baglamukhi Yantra, Maha Mrityunjaya Yantra, Kuber Yantra, Sudarshana Yantra, Navagraha Yantra, Gayatri Yantra
   - Each with deity, description, geometry, materials, placement, worship methods, benefits, mantra, energization steps, precautions

5. **`TANTRIC_RITUALS`** - 8 rituals:
   - Panchamakara Puja (Symbolic), Chandi Homa, Navavarana Puja, Shiva Abhishekam, Lakshmi Kubera Puja, Kali Puja, Baglamukhi Sadhana, Surya Arghya Vidhi
   - Each with category, deity, purpose, description, requirements, procedure steps, timing, duration, benefits, precautions, level

6. **`PROTECTION_REMEDIES`** - 8 protection methods:
   - Sudarshana Chakra Protection, Hanuman Raksha Kavach, Durga Kavach, Kali Protection, Salt Circle, Nazar Dosh Nivaran, Maha Mrityunjaya Protection, Bhairava Protection
   - Each with category, description, mantra, yantra, procedure, materials, timing, benefits, precautions

7. **`PROBLEM_SPECIFIC_REMEDIES`** - 10 life problems:
   - Financial Crisis, Court Cases, Black Magic, Marriage Delay, Chronic Illness, Business Failure, Children Problems, Depression, Enemy Troubles, Addiction Recovery
   - Each with category, description, mantras (name, text, count), yantras, rituals, offerings, deities, timing, duration, additionalRemedies

**Helper Functions:**
- `getTantricMantrasByPurpose(purpose)` - Filter mantras by purpose
- `getMahavidyaByName(name)` - Find specific Mahavidya
- `getPlanetaryTantricRemedy(planet)` - Get planet-specific remedies
- `getYantraByDeity(deity)` - Find yantra by deity
- `getRitualsByCategory(category)` - Filter rituals
- `getProtectionRemedyByCategory(category)` - Filter protection methods
- `getProblemRemedy(problem)` - Find problem-specific remedy
- `getAllTantricRemediesData()` - Returns all data

**Query**: `astrology.getAllTantricRemedies` - Returns all tantric remedies data

**Frontend** (`/user-app/src/client/pages/TantricRemediesPage.tsx` ~1300 lines):

**7 Organized Tabs:**
1. **Mantras** - Searchable list with category filtering (protection/wealth/love/knowledge/health/obstacle/power), level badges, Sanskrit text, meaning, practice details
2. **Mahavidyas** - All 10 goddesses with gradient color headers, forms, attributes, mantras, worship methods, benefits, offerings, precautions
3. **Planets** - 9 planetary remedies with beej/tantric mantras, yantras, gemstones, rudrakshas, metals, worship practices, special rituals
4. **Yantras** - Sacred geometry descriptions, materials, placement, worship, energization steps, benefits
5. **Rituals** - Tantric ceremonies with requirements, step-by-step procedures, timing, duration, level indicators
6. **Protection** - Shield methods with mantras, procedures, materials, timing, benefits
7. **Problems** - Problem-specific solutions with mantras, yantras, deities, offerings, additional remedies

**Features:**
- Global search across all categories
- Expandable cards with detailed information
- Level indicators (beginner/intermediate/advanced) with color coding
- Sanskrit text with transliteration
- Step-by-step procedures
- Material and timing requirements
- Precaution warnings
- Mobile-responsive design

**Route**: `/tantric-remedies` (private route, requires authentication)

**Dashboard Integration:**
- Featured gradient card (purple-pink-red) with POWERFUL badge
- Added to "Life Decisions" feature category with Flame icon
- Description: "Mantras, yantras & rituals"
