import type { Metadata } from 'next'
import { Poppins } from "next/font/google";
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Providers } from '@/providers'

const MyPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mypoppins',
})

export const metadata: Metadata = {
  title: 'MedPlus',
  description: 'Healthcare Manager',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#116b29' },
      }}
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn('font-mypoppins antialiased', MyPoppins.variable)}>
        <Providers>
          {children}
        </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}