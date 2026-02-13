'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path ? 'active' : ''

  return (
    <header id="header">
      <div className="wpo-site-header">
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  <button type="button" className="navbar-toggler open-btn">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar first-angle"></span>
                    <span className="icon-bar middle-angle"></span>
                    <span className="icon-bar last-angle"></span>
                  </button>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <div className="navbar-header">
                  <Link className="navbar-brand" href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Book covers */}
                      <path d="M8 10C8 8.895 8.895 8 10 8H28C28 8 32 8 32 12V52C32 52 28 48 24 48H10C8.895 48 8 47.105 8 46V10Z" fill="#1a5f3c" />
                      <path d="M56 10C56 8.895 55.105 8 54 8H36C36 8 32 8 32 12V52C32 52 36 48 40 48H54C55.105 48 56 47.105 56 46V10Z" fill="#1a5f3c" />
                      {/* Inner pages */}
                      <path d="M12 14H28C28 14 32 14 32 16V48C32 48 28 46 26 46H12V14Z" fill="#f5f0e6" />
                      <path d="M52 14H36C36 14 32 14 32 16V48C32 48 36 46 38 46H52V14Z" fill="#f5f0e6" />
                      {/* Gold decorative lines */}
                      <path d="M16 20H26" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16 24H24" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16 28H25" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16 32H23" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M38 20H48" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M40 24H48" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M39 28H48" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M41 32H48" stroke="#DB9E30" strokeWidth="1.5" strokeLinecap="round" />
                      {/* Crescent & star */}
                      <path d="M32 22C30.5 22 29.2 23 28.8 24.4C29.6 23.8 30.7 23.5 31.8 23.8C33.6 24.3 34.7 26.1 34.2 27.9C33.9 29 33 29.8 31.9 30C33.5 30.3 35.1 29.3 35.5 27.6C36 25.8 34.9 23.9 33.1 23.3C32.7 23.1 32.4 23 32 22Z" fill="#DB9E30" />
                      <path d="M30.5 37L31 35.5L31.5 37L33 37.2L31.8 38.1L32.2 39.5L31 38.7L29.8 39.5L30.2 38.1L29 37.2L30.5 37Z" fill="#DB9E30" />
                      {/* Spine */}
                      <path d="M32 8V52" stroke="#14472a" strokeWidth="1.5" />
                    </svg>
                    <span style={{
                      fontFamily: '"Cinzel Decorative", "Cinzel", serif',
                      fontWeight: 700,
                      fontSize: '20px',
                      lineHeight: 1.2,
                      color: '#1a5f3c',
                    }}>
                      <span style={{ color: '#DB9E30' }}>Mualim</span>-ol-<span style={{ color: '#DB9E30' }}>Quran</span>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-8 col-md-1 col-1">
                <div id="navbar" className="navbar-collapse navigation-holder">
                  <button className="menu-close"><i className="ti-close"></i></button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li>
                      <Link className={isActive('/')} href="/">Home</Link>
                    </li>
                    <li>
                      <Link className={isActive('/courses')} href="/courses">Courses</Link>
                    </li>
                    <li>
                      <Link className={isActive('/about')} href="/about">About us</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#" className={pathname.startsWith('/noorani-qaida') || pathname.startsWith('/ahsanul-qawaid') || pathname.startsWith('/quran-pdf') ? 'active' : ''}>Read</a>
                      <ul className="sub-menu">
                        <li><Link href="/noorani-qaida">Noorani Qaida</Link></li>
                        <li><Link href="/ahsanul-qawaid">Ahsanul Qawaid</Link></li>
                        <li><Link href="/quran-pdf">Read Quran</Link></li>
                      </ul>
                    </li>
                    <li>
                      <Link className={isActive('/contact')} href="/contact">Contact us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <div className="header-right">
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
