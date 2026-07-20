# ZOOCO Daily Reminders

**Live Demo**: [https://zooco-reminders-two.vercel.app/](https://zooco-reminders-two.vercel.app/)

A modern, responsive Progressive Web Application (PWA) built for pet parents to track and manage their daily pet care routines.

## Features

- **Core CRUD**: Create, Read, Update, and Delete daily reminders.
- **Smart Grouping**: Reminders automatically group into Morning, Afternoon, Evening, and Night blocks based on their scheduled time.
- **Dynamic Calendar Strip**: A horizontally scrollable 14-day calendar to quickly switch between dates.
- **Filter States**: Effortlessly toggle between All, Pending, and Completed tasks.
- **Streak Tracking**: Built-in state management tracks completed routines to build a persistent streak.
- **PWA Ready**: Can be installed on mobile devices for a native app-like experience.
- **Responsive UI**: Carefully crafted mobile-first layout based on Figma designs, styled with Tailwind CSS v4.
- **Smooth Animations**: High-quality micro-interactions and transitions powered by Framer Motion.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (with LocalStorage Persistence)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Utilities**: Date-fns
- **Notifications**: React Hot Toast

---

## How to Run Locally

If you'd like to evaluate the project on your local machine, follow these steps:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. We recommend Node v18 or newer.

### 2. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/lakadeamit220/zooco-reminders.git
cd zooco-reminders
```

### 3. Install Dependencies
Run the following command in the project root to install all required packages:
```bash
npm install
```

### 4. Start the Development Server
Next, start the local Next.js development server:
```bash
npm run dev
```

### 5. View the App
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

*Note: For the best experience, open the Chrome Developer Tools, toggle the Device Toolbar (Ctrl+Shift+M / Cmd+Shift+M), and view the app in a mobile viewport (e.g., iPhone 14 Pro max).*

---

## Project Structure

- `/app`: Next.js App Router layout and main pages.
- `/components`: Reusable UI elements, grouped by domain (`layout`, `ui`, `reminders`).
- `/data`: Initial mock data for the application state (Localized for Pune, MH).
- `/hooks`: Custom React hooks, including the central `useReminders` hook for state logic.
- `/store`: Zustand global state management setup with persistence.
- `/lib`: Helper functions for date formatting and time-block math.

## Design Decisions

- **Professional Tone**: Eliminated emojis in favor of high-quality SVG icons from Lucide React to ensure the UI feels native and professional.
- **Mobile First**: Built exclusively with mobile web in mind, utilizing safe area padding (`pb-safe`) for modern iOS devices and a Bottom Navigation bar.
- **Framer Motion**: Integrated to provide high-end, tactile feedback on button presses and modal slides, a critical requirement for modern, delightful PWAs.
