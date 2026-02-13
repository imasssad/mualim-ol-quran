import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Mualim-ol-Quran',
  description: 'The Quran Academy offers a warm, friendly space for students to explore the Quran and gain an understanding of its wisdom and beauty.',
  icons: {
    icon: '/assets/images/preloader.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="/assets/css/themify-icons.css" rel="stylesheet" />
        <link href="/assets/css/flaticon.css" rel="stylesheet" />
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/animate.css" rel="stylesheet" />
        <link href="/assets/css/owl.carousel.css" rel="stylesheet" />
        <link href="/assets/css/owl.theme.css" rel="stylesheet" />
        <link href="/assets/css/slick.css" rel="stylesheet" />
        <link href="/assets/css/slick-theme.css" rel="stylesheet" />
        <link href="/assets/css/swiper.min.css" rel="stylesheet" />
        <link href="/assets/css/owl.transitions.css" rel="stylesheet" />
        <link href="/assets/css/jquery.fancybox.css" rel="stylesheet" />
        <link href="/assets/css/odometer-theme-default.css" rel="stylesheet" />
        <link href="/assets/css/style.css" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/modernizr.custom.js" strategy="beforeInteractive" />
        <Script src="/assets/js/jquery-plugin-collection.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/script.js" strategy="afterInteractive" />
        <Script src="https://kit.fontawesome.com/bb09e336cf.js" crossOrigin="anonymous" strategy="afterInteractive" />
      </body>
    </html>
  )
}
