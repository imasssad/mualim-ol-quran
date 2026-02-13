'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="upper-footer s2">
        <div className="container">
          <div className="row">
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Book covers */}
                      <path d="M8 10C8 8.895 8.895 8 10 8H28C28 8 32 8 32 12V52C32 52 28 48 24 48H10C8.895 48 8 47.105 8 46V10Z" fill="#DB9E30" />
                      <path d="M56 10C56 8.895 55.105 8 54 8H36C36 8 32 8 32 12V52C32 52 36 48 40 48H54C55.105 48 56 47.105 56 46V10Z" fill="#DB9E30" />
                      {/* Inner pages */}
                      <path d="M12 14H28C28 14 32 14 32 16V48C32 48 28 46 26 46H12V14Z" fill="#f5f0e6" />
                      <path d="M52 14H36C36 14 32 14 32 16V48C32 48 36 46 38 46H52V14Z" fill="#f5f0e6" />
                      {/* Decorative lines */}
                      <path d="M16 20H26" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16 24H24" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16 28H25" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16 32H23" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M38 20H48" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M40 24H48" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M39 28H48" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M41 32H48" stroke="#1a5f3c" strokeWidth="1.5" strokeLinecap="round" />
                      {/* Crescent & star */}
                      <path d="M32 22C30.5 22 29.2 23 28.8 24.4C29.6 23.8 30.7 23.5 31.8 23.8C33.6 24.3 34.7 26.1 34.2 27.9C33.9 29 33 29.8 31.9 30C33.5 30.3 35.1 29.3 35.5 27.6C36 25.8 34.9 23.9 33.1 23.3C32.7 23.1 32.4 23 32 22Z" fill="#fff" />
                      <path d="M30.5 37L31 35.5L31.5 37L33 37.2L31.8 38.1L32.2 39.5L31 38.7L29.8 39.5L30.2 38.1L29 37.2L30.5 37Z" fill="#fff" />
                      {/* Spine */}
                      <path d="M32 8V52" stroke="#b8860b" strokeWidth="1.5" />
                    </svg>
                    <span style={{
                      fontFamily: '"Cinzel Decorative", "Cinzel", serif',
                      fontWeight: 700,
                      fontSize: '20px',
                      lineHeight: 1.2,
                      color: '#fff',
                    }}>
                      <span style={{ color: '#DB9E30' }}>Mualim</span>-ol-<span style={{ color: '#DB9E30' }}>Quran</span>
                    </span>
                  </Link>
                </div>
                <p>The Quran Academy offers a warm, friendly space for students to explore the Quran and gain an understanding of its wisdom and beauty.</p>
                <div className="social-widget">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Courses</h3>
                </div>
                <ul>
                  <li><Link href="/courses">Quran Memorization</Link></li>
                  <li><Link href="/courses">Nazra Quran</Link></li>
                  <li><Link href="/courses">Tajweed-e-Quran</Link></li>
                  <li><Link href="/noorani-qaida">Noorani Qaida</Link></li>
                  <li><Link href="/ahsanul-qawaid">Ahsanul Qawaid</Link></li>
                  <li><Link href="/quran-pdf">Read Quran</Link></li>
                  <li><Link href="/courses">Special child care</Link></li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget s2">
                <div className="widget-title">
                  <h3>Quick Links</h3>
                </div>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/courses">Courses</Link></li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget newsletter-widget">
                <div className="widget-title">
                  <h3>Newsletter</h3>
                </div>
                <form>
                  <input type="email" className="form-control" name="mail" id="mail" placeholder="Your Email..." />
                  <input className="theme-btn" type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lower-footer">
        <div className="container">
          <div className="row g-0">
            <div className="col col-lg-6 col-12">
              <p className="copyright">Copyright &copy; 2024 Mualim-ol-Quran by <a href="https://tampakistan.com">TAM Pakistan</a>. All Rights Reserved.</p>
            </div>
            <div className="col col-lg-6 col-12">
              <ul>
                <li><Link href="/privacy">Privacy &amp; Policy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/about">About us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        id="whatsapp-button"
        href="https://wa.me/923077841147"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          zIndex: 9999,
        }}
      >
        <Image src="/WhatsApp_icon.png" alt="WhatsApp" width={50} height={50} />
      </a>
    </footer>
  )
}
