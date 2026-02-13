'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AboutPage() {
  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement
    if (preloader) preloader.style.display = 'none'
  }, [])

  const services = [
    {
      num: '01',
      icon: '1.svg',
      title: 'Quran Memorization',
      text: 'The memorized Quran is a source of devotion in the Islamic world, fostering a deep connection with Allah. The rhythmic Arabic verses become a constant companion, providing solace and strength. Each verse becomes a treasure, offering refuge in the quiet corners of life. Fit Quran study into your busy life with our convenient online classes.',
    },
    {
      num: '02',
      icon: '3.svg',
      title: 'Nazra Quran',
      text: 'The Holy Quran and Nazra Quran are essential parts of a beautiful journey, fostering wisdom and understanding through their recitation, paving the way for lifelong spiritual pursuits and profound spiritual connection with Allah. Fit Quran study into your busy life with our convenient online classes.',
    },
    {
      num: '03',
      icon: '6.svg',
      title: 'Tajweed e Quran',
      text: 'Mualim-ol-Quran invites you on a transformative journey to master Tajweed al-Quran! Our qualified teachers, passionate about Tajweed, will guide you step-by-step. We tailor our program to your pace and background, ensuring a successful learning experience. Our engaging online platform makes learning Tajweed fun and effective.',
    },
    {
      num: '04',
      icon: '2.svg',
      title: 'Special Child Care',
      text: "Allah (SWT) and Prophet Muhammad (PBUH) both underlined the importance of nurturing children, particularly those with exceptional requirements. By heeding their direction, we can establish nurturing conditions that assist these children with arriving at their full potential.",
    },
    {
      num: '05',
      icon: '4.svg',
      title: 'Charity & Donation',
      text: "Ibn Abbas narrated that the Prophet (PBUH) believed that charity, like water, extinguishes sin, reflecting gratitude for Allah's blessings. This act of charity, despite its small size, is a seed for a bountiful harvest in the Hereafter.",
    },
    {
      num: '06',
      icon: '5.svg',
      title: 'Salah Memorization',
      text: "Namaz, a prayer based on memorizing the Quran, fosters a deeper connection with Allah's words, enhancing focus and promoting inner peace. This practice, without relying on a prayer book, promotes spiritual humility and self-reliance.",
    },
  ]

  return (
    <div className="page-wrapper">
      {/* Preloader */}
      <div className="preloader">
        <div className="vertical-centered-box">
          <div className="content">
            <div className="loader-circle"></div>
            <div className="loader-line-mask">
              <div className="loader-line"></div>
            </div>
            <img src="/assets/images/preloader.png" alt="" />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="wpo-breadcumb-area" style={{ background: 'url(/assets/images/page-title.jpg) no-repeat center top/cover' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>About Us</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><span>About</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section-s2">
        <div className="container">
          <div className="wrap">
            <div className="row align-items-center">
              <div className="col-lg-6 col-12">
                <div className="image">
                  <img src="/assets/images/about-3.jpg" alt="image" />
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="content">
                  <div className="section-title">
                    <h2>About Us</h2>
                    <h3>Memorizing and Reciting Quran Verses with Mualim-ol-Quran</h3>
                    <p style={{ textAlign: 'justify' }}>The Quran Academy offers a warm, friendly space for students to explore the Quran and gain an understanding of its wisdom and beauty. The Quran is open, paying little mind to earlier knowledge, with different courses custom-made to various age gatherings and learning styles. Our devoted educators are committed to conferring Islamic knowledge and fostering a lifelong love for the Quran. Join us on a transformative journey of Quran awareness. Join our journey of Quran awareness and find the ideal fit for your needs.</p>
                  </div>
                  <div className="about-bottom">
                    <Link href="/about" className="theme-btn">Discover More</Link>
                    <div className="call">
                      <div className="icon">
                        <img src="/assets/images/phone-call.svg" alt="" />
                      </div>
                      <div className="text">
                        <span>Call Us:</span>
                        <a href="tel:+923077841147">+92 3077841147</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-padding" style={{ background: 'url(/assets/images/slider/bg.png) no-repeat center/cover' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="section-title">
                <h2>Islam Pillars</h2>
                <h3>Five Pillars Of Islam</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              { img: '1.jpg', name: 'Shahadah', desc: 'Declaration of Faith' },
              { img: '2.jpg', name: 'Salah', desc: 'Five Daily Prayers' },
              { img: '3.jpg', name: 'Sawm', desc: 'Fasting in Ramadan' },
              { img: '4.jpg', name: 'Zakah', desc: 'Obligatory Charity' },
              { img: '5.jpg', name: 'Hajj', desc: 'Pilgrimage to Makkah' },
            ].map((pillar, i) => (
              <div key={i} className="col-lg col-md-4 col-6" style={{ marginBottom: '24px' }}>
                <div style={{
                  background: '#fff', borderRadius: '16px', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center',
                  transition: 'transform 0.3s', height: '100%',
                }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={`/assets/images/pillars/${pillar.img}`}
                      alt={pillar.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                      padding: '20px 10px 10px',
                    }}>
                      <span style={{ color: '#DB9E30', fontFamily: '"Cinzel", serif', fontSize: '18px', fontWeight: 700 }}>
                        {pillar.name}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '14px 12px' }}>
                    <p style={{ color: '#687693', fontSize: '13px', margin: 0 }}>{pillar.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (no image flip on about page per PHP) */}
      <section className="service-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-12">
              <div className="section-title">
                <h2>Our Services</h2>
                <h3>Our Services For Humanity</h3>
              </div>
            </div>
          </div>
          <div className="service-wrap">
            <div className="row">
              {services.map((service, i) => (
                <div key={i} className="col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="service-card">
                    <div className="top-number">
                      <span>{service.num}</span>
                    </div>
                    <div className="icon">
                      <img src={`/assets/images/service/${service.icon}`} alt="image" />
                    </div>
                    <div className="text">
                      <h2>{service.title}</h2>
                      <p>{service.text}</p>
                      <a href="#">Read More...</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
