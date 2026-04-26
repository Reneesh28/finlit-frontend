# FinLit AI Platform 🚀

A highly engaging, gamified financial literacy and AI coaching platform. Designed with an institutional-grade aesthetic, it leverages a sophisticated "Midnight" dark mode, Duolingo-inspired interactive learning pathways, and intelligent context-aware dashboards.

## ✨ Core Features

### 🎮 Gamified Learning & Progression
* **Interactive Pathways:** Duolingo-style learning maps with dynamic SVG path connectors, completed/locked nodes, and floating XP indicators.
* **Achievement System:** Earnable badges, global rank tracking, and daily financial quests.
* **Financial Personality:** AI-driven classification of your spending habits (e.g., "The Cautious Planner").
* **Experience Points (XP):** Persistent progress bars and sticky header tracking across the platform.

### 🌙 Premium "Midnight" Dark Mode
* **Deep Space Aesthetics:** Built on a foundation of `#0f172a` (Primary Background) and `#111827` (Card Background) to reduce eye strain while maintaining a premium feel.
* **Vibrant Brand Accents:** Uses high-contrast neon highlights (Growth Green, Trust Blue, AI Purple) that pop flawlessly on dark surfaces.
* **System-Wide Integration:** Custom configured Tailwind v4 dark mode (`@custom-variant dark`) enables instantaneous, hardware-accelerated transitions via the `ThemeToggle` interface.

### 🧠 Intelligent Modules
* **AI Coach Chat:** A modern, mobile-first messaging interface featuring quick-action chips and context-aware financial advice.
* **Smart Dashboard:** At-a-glance financial health score gauges, goal tracking, and daily tip generation.
* **Deep Insights:** Detailed analytics comparing "Spending vs Income" and category breakdowns with interactive progress bars.
* **Transaction History:** Clean, searchable, and filterable ledger with high-level spending summary widgets.

### 📱 Responsive Architecture
* **Mobile-First Design:** Features a dedicated `MobileNav` bottom bar for seamless smartphone navigation.
* **Desktop Sidebar:** Persistent, smooth-transitioning `Sidebar` layout for wider screens.

### ⚙️ Multi-Session AI Coach
* **Contextual History:** Manage multiple coaching threads via a persistent sidebar.
* **Smart Redirects:** Trigger deep-analysis sessions directly from Insights cards.

---

## 🛠️ Technology Stack

* **Framework:** [React 19](https://react.dev/) powered by [Vite](https://vitejs.dev/) for lightning-fast HMR and building.
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utilizing the latest CSS-first configuration and raw CSS variables.
* **Animations:** [Framer Motion](https://www.framer.com/motion/) - Delivering buttery-smooth micro-interactions, page transitions, and SVG path drawing.
* **Iconography:** [Lucide React](https://lucide.dev/) - Consistent, lightweight, and customizable SVG icons.

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── gamification/   # Path nodes, SVG connectors, XP bars, and Badges
│   ├── layout/         # Sidebar, MobileNav, and MainLayout wrappers
│   └── ui/             # Core Design System (Buttons, Cards, Badges, Inputs)
├── hooks/
│   └── useTheme.js     # Global light/dark mode state manager
├── pages/
│   ├── Auth/           # Login & Register flows
│   ├── Chat/           # AI Coach messaging interface
│   ├── Dashboard/      # Main financial overview
│   ├── Insights/       # Spending analytics and charts
│   ├── Learn/          # The gamified Duolingo-style pathway
│   ├── Profile/        # User stats, achievements, and personality
│   └── Transactions/   # Ledger and history
├── utils/
│   └── cn.js           # Tailwind class merging utility (clsx + tailwind-merge)
└── index.css           # Global CSS variables, custom variants, and base layers
```

---

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🎨 Design System Tokens (index.css)

* **Primary:** `#58cc02` (Growth/Savings)
* **Secondary:** `#2b70c9` (Trust/Finance)
* **Accent:** `#a855f7` (AI Intelligence)
* **Warning:** `#ff4b4b` (Danger/Overspending)
* **Highlight:** `#ffc800` (Rewards/XP)
