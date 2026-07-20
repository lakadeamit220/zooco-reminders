import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'ZOOCO Daily Reminders',
  description: 'Stay on top of your pet care routines',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ZOOCO',
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    title: 'ZOOCO Daily Reminders',
    description: 'Daily pet care reminders for pet parents',
  },
};

export const viewport = {
  themeColor: '#4CAF50',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icons/zooco-logo.svg" />
        <link rel="apple-touch-icon" href="/icons/zooco-logo.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: '12px',
              background: '#212121',
              color: '#fff',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
