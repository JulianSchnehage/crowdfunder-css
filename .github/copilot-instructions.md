# Crowdfunder CSS Widget Stylist - AI Coding Agent Guide

## Project Overview
A React + TypeScript visual CSS customization tool for crowdfunding widgets. Users drag-and-drop to reorder elements and adjust styling properties (colors, fonts, sizing). The app generates optimized CSS that minimizes overwrites and respects Shopify's `.crowdfunder-widget` namespace.

**Key Purpose:** Enable non-technical users to customize crowdfunding widget appearance without writing CSS.

## Architecture & Data Flow

### Core State Pattern
- **Settings Store** (`App.tsx`): Single `WidgetSettings` object holds all element styles
- **Element Types** (`types.ts`): 8 main elements (container, backerCount, moneyTotal, meter, meterBar, meterLabel, infoText, daysRemaining)
- **Reorderable Elements**: Only elements excluding `container` and `meterBar` can be drag-reordered

### Three-Panel UI
1. **SettingsPanel** (`SettingsPanel.tsx`): Left sidebar with draggable element list + style controls
2. **PreviewArea** (`PreviewArea.tsx`): Center live preview (mock crowdfunding widget)
3. **CodeDisplay** (`CodeDisplay.tsx`): Right panel showing generated CSS output

### CSS Generation Logic (`App.tsx`, ~100 lines)
**Critical Optimization:** Only output CSS rules that differ from `INITIAL_SETTINGS`. Key algorithm:
- Detects if ANY element has reordered → includes flex layout on container
- Applies `!important` flags strategically for color overrides
- Shortens hex colors (#ff0000 → #f00) to minimize output
- Handles conditional visibility (display:none for hidden elements)
- Prevents moneyTotal CSS when goalMode is "Units sold"

**Example:** Changing backerCount font-size generates single rule: `.crowdfunder-widget p:nth-child(1){font-size:1.2rem !important}`

## Development Workflow

### Build & Run
```bash
npm install
npm run dev          # Vite dev server (port 5173)
npm run build        # Produces dist/
npm run preview      # Test build output
```

### Key Dependencies
- **@dnd-kit/***: Drag-and-drop (PointerSensor + KeyboardSensor for accessibility)
- **lucide-react**: Icons throughout UI
- **React 19**: Modern concurrent features safe to use
- **Vite**: Fast HMR rebuilds

## Critical Patterns & Conventions

### Element IDs & Selectors
- **Container Selector**: `.crowdfunder-widget` (applies font color globally)
- **Nth-child Selectors**: `p:nth-child(1)` for backerCount, `p:nth-child(2)` for moneyTotal, `p:last-child` for daysRemaining
- **Class-based**: `.cf-meter`, `.cf-percent-bar`, `.cf-meter-label`, `.cf-info-text`

**Why nth-child?** Widget HTML is dynamically rendered; class names aren't guaranteed. Selectors must be deterministic.

### Goal Mode Handling
- **Currency Mode** (default): Shows moneyTotal element
- **Units sold Mode**: Hides moneyTotal entirely (filters from CSS generation AND element reordering list)
- Changes toggle with `setGoalMode` state in App

### Drag Reordering
- Uses `useSortable` hook from @dnd-kit for each element
- Order persists in `ElementStyle.order` number
- Container always first, meterBar always stays nested inside meter (not reorderable)

### Style Control Components
Located in `SettingsPanel.tsx` (300+ lines):
- **StyleControls**: Renders color picker, visibility toggle, font-size/height/padding inputs
- **Temperature Themed**: Special feature for meter bar (gradient that changes based on funding percentage)
- **Visibility Toggle**: Eye icon toggles `visible` boolean

## Important Notes for Agent Work

### Common Tasks
1. **Adding new style properties**: Add to `ElementStyle` interface → update `INITIAL_SETTINGS` → add control in `StyleControls` → update CSS generation logic in `generatedCSS` useMemo
2. **Fixing CSS output**: Check `checkChange()` logic - ensure property exists in both `ElementStyle` and `INITIAL_SETTINGS`
3. **Selector issues**: Verify `.crowdfunder-widget` namespace and nth-child correctness in `constants.ts` `BASE_CSS`

### State Management Principles
- Use immutable updates: `setSettings(prev => ({ ...prev, [key]: { ...prev[key], ...updates } }))`
- No external libraries (no Redux/Zustand) - keep it minimal for embedding in Shopify

### TypeScript Strictness
- `SettingKey` type ensures type-safe settings updates
- All component props fully typed (`React.FC<PropsInterface>`)
- CSS generation uses exhaustive object iteration to catch missing cases

## File Map
- `App.tsx`: Root component + CSS generation engine (critical logic)
- `types.ts`: TypeScript interfaces (2 main: ElementStyle, WidgetSettings)
- `constants.ts`: INITIAL_SETTINGS (defaults) + BASE_CSS (fallback styles)
- `components/SettingsPanel.tsx`: Controls + drag UI (longest file)
- `components/PreviewArea.tsx`: Live preview rendering
- `components/CodeDisplay.tsx`: Syntax-highlighted CSS output
