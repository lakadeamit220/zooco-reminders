# ZOOCO Daily Reminders

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

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Next.js App Router layout and main pages.
- `/components`: Reusable UI elements, grouped by domain (`layout`, `ui`, `reminders`).
- `/data`: Initial mock data for the application state.
- `/hooks`: Custom React hooks, including the central `useReminders` hook for state logic.
- `/store`: Zustand global state management setup with persistence.
- `/lib`: Helper functions for date formatting and time-block math.

## Design Decisions

- **Professional Tone**: Eliminated emojis in favor of high-quality SVG icons from Lucide React to ensure the UI feels native and professional.
- **Mobile First**: Built exclusively with mobile web in mind, utilizing safe area padding (`pb-safe`) for modern iOS devices and a Bottom Navigation bar.
- **Framer Motion**: Integrated to provide high-end, tactile feedback on button presses and modal slides, a critical requirement for modern, delightful PWAs.
