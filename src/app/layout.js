import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainNav from './nav/navbar';
import Script from 'next/script'

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
      <body className='h-screen'>
      <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon=' {"token": "42e216b9090ru59384ygu891dce9eecde", "spa": false} '
        />
        <MainNav />
        {children}
      </body>
    </html>
  )
}
