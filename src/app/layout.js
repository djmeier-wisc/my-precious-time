import { Inter } from 'next/font/google'
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Precious Time',
  description: 'See how delayed your bus route is.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='grid h-full'>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <div className="bg-orange-300 text-slate-800">
          <p className="text-center py-1">🚧 Please excuse our mess, this site is under active development 🚧</p>
        </div>
        {children}
      </body>
    </html>
  )
}
