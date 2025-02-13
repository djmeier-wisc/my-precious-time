import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainNav from '../_components/nav/navbar';
import Script from 'next/script'
import Link from 'next/link';

export const metadata = {
  title: 'My Precious Time',
  description: 'See how delayed your bus route is.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <MainNav />
        {children}
      </body>
    </html>
  )
}
