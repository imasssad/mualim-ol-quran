'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import PrayerTimesWidget from '@/components/PrayerTimesWidget'
import YouTubeChannelPreview from '@/components/YouTubeChannelPreview'

export default function Home() {
  useEffect(() => {
    // Hide preloader
    const preloader = document.querySelector('.preloader') as HTMLElement
    if (preloader) {
      preloader.style.display = 'none'
    }

    // Initialize Swiper for hero slider
    if (typeof window !== 'undefined' && (window as any).Swiper) {
      new (window as any).Swiper('.swiper-container', {
        loop: true,
        speed: 1800,
        parallax: true,
        autoplay: {
          delay: 6000,
        },
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    }

    // Set data-background images
    document.querySelectorAll('[data-background]').forEach((el) => {
      const bg = el.getAttribute('data-background')
      if (bg) {
        ;(el as HTMLElement).style.backgroundImage = `url(/${bg})`
      }
    })
  }, [])

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

      {/* Hero Slider */}
      <section className="hero-slider">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="slide-inner slide-bg-image" data-background="assets/images/slider/slide-1.jpg">
                <div className="container-fluid">
                  <div className="slide-content">
                    <div data-swiper-parallax="300" className="slide-title">
                      <h5 className="text-white">Dua After Wudu</h5>
                      <h2>أشهد أن لا إله إلا الله وأشهد أن محمدا رسول الله</h2>
                    </div>
                    <div data-swiper-parallax="400" className="slide-text">
                      <p>&quot;I bear witness that there is no god but God and I bear witness that Muhammad is the Messenger of God&quot;</p>
                    </div>
                    <div className="clearfix"></div>
                    <div data-swiper-parallax="500" className="slide-btns">
                      <Link href="/about" className="theme-btn">Discover More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="slide-inner slide-bg-image" data-background="assets/images/slider/slide-2.jpg">
                <div className="container-fluid">
                  <div className="slide-content">
                    <div data-swiper-parallax="300" className="slide-title">
                      <h5 className="text-white">Al-Baqara</h5>
                      <h2>وَمَا كَانَ اللَّهُ مُعَذِّبَهُمْ وَهُمْ يَسْتَغْفِرُونَ</h2>
                    </div>
                    <div data-swiper-parallax="400" className="slide-text">
                      <p>&quot;And Allah would not punish them while they seek forgiveness&quot;</p>
                    </div>
                    <div className="clearfix"></div>
                    <div data-swiper-parallax="500" className="slide-btns">
                      <Link href="/about" className="theme-btn">Discover More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Times - Next.js Dynamic Widget */}
      <PrayerTimesWidget />

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

      {/* Read & Learn Section */}
      <section className="section-padding" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-12">
              <div className="section-title">
                <h2>Read &amp; Learn</h2>
                <h3>Start Your Quranic Journey</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '30px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                height: '100%',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1a5f3c 0%, #29395b 100%)',
                  padding: '40px 20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: '"Amiri", serif', fontSize: '48px', color: '#DB9E30', fontWeight: 700 }}>
                    نورانی قاعدہ
                  </div>
                </div>
                <div style={{ padding: '25px', textAlign: 'center' }}>
                  <h4 style={{ fontFamily: '"Cinzel", serif', color: '#29395b', marginBottom: '12px', fontWeight: 700 }}>Noorani Qaida</h4>
                  <p style={{ color: '#687693', fontSize: '14px', marginBottom: '20px' }}>Original Pakistani Noorani Qaida book. Learn letters, harakat, tanween, madd, sukoon and more.</p>
                  <span style={{ display: 'inline-block', background: '#e8f5e9', color: '#1a5f3c', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '15px' }}>32 Pages</span>
                  <br />
                  <a href="/noorani-qaida" className="theme-btn" style={{ display: 'inline-block', marginTop: '5px' }}>Start Learning</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '30px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                height: '100%',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #29395b 0%, #1a5f3c 100%)',
                  padding: '40px 20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: '"Amiri", serif', fontSize: '48px', color: '#DB9E30', fontWeight: 700 }}>
                    احسن القواعد
                  </div>
                </div>
                <div style={{ padding: '25px', textAlign: 'center' }}>
                  <h4 style={{ fontFamily: '"Cinzel", serif', color: '#29395b', marginBottom: '12px', fontWeight: 700 }}>Ahsanul Qawaid</h4>
                  <p style={{ color: '#687693', fontSize: '14px', marginBottom: '20px' }}>Complete Ahsanul Qawaid book with Makhaarij, Tajweed rules, Waqf signs, and Surah practice.</p>
                  <span style={{ display: 'inline-block', background: '#fff3e0', color: '#e65100', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '15px' }}>61 Pages</span>
                  <br />
                  <a href="/ahsanul-qawaid" className="theme-btn" style={{ display: 'inline-block', marginTop: '5px' }}>Start Learning</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '30px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                height: '100%',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1a5f3c 0%, #0d3320 100%)',
                  padding: '40px 20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: '"Amiri", serif', fontSize: '48px', color: '#DB9E30', fontWeight: 700 }}>
                    القرآن الکریم
                  </div>
                </div>
                <div style={{ padding: '25px', textAlign: 'center' }}>
                  <h4 style={{ fontFamily: '"Cinzel", serif', color: '#29395b', marginBottom: '12px', fontWeight: 700 }}>Read Quran</h4>
                  <p style={{ color: '#687693', fontSize: '14px', marginBottom: '20px' }}>Read the complete Holy Quran online with Uthmani script. All 114 Surahs with adjustable font.</p>
                  <span style={{ display: 'inline-block', background: '#e8f5e9', color: '#1a5f3c', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '15px' }}>114 Surahs</span>
                  <br />
                  <a href="/quran-pdf" className="theme-btn" style={{ display: 'inline-block', marginTop: '5px' }}>Read Quran</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Channel Preview - Next.js Dynamic Feature */}
      <YouTubeChannelPreview />

      {/* Services Section */}
      <section className="service-section-s2 section-padding">
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
              {[
                {
                  num: '01',
                  icon: '1.svg',
                  title: 'Quran Memorization',
                  text: 'Mualim-ol-Quran Academy offers a supportive environment for a transformative journey in memorizing the Holy Quran. Our qualified teachers, passionate about Tajweed, will guide you step-by-step. Our engaging online platform makes learning Tajweed fun and effective.',
                  img: '1.jpg',
                },
                {
                  num: '02',
                  icon: '3.svg',
                  title: 'Nazara Quran',
                  text: 'The Holy Quran and Nazra Quran are essential parts of a beautiful journey, fostering wisdom and understanding through their recitation, paving the way for lifelong spiritual pursuits and profound spiritual connection with Allah. Fit Quran study into your busy life with our convenient online classes.',
                  img: '3.jpg',
                },
                {
                  num: '03',
                  icon: '6.svg',
                  title: 'Tajweed e Quran',
                  text: 'Mualim-ol-Quran invites you on a transformative journey to master Tajweed al-Quran! Our qualified teachers, passionate about Tajweed, will guide you step-by-step. We tailor our program to your pace and background, ensuring a successful learning experience. Our engaging online platform makes learning Tajweed fun and effective.',
                  img: '1.jpg',
                },
                {
                  num: '04',
                  icon: '2.svg',
                  title: 'Special Child Care',
                  text: 'Allah (SWT) and Prophet Muhammad (PBUH) both underlined the importance of nurturing children, particularly those with exceptional requirements. We can establish nurturing conditions that assist these children with arriving at their full potential.',
                  img: '2.jpg',
                },
                {
                  num: '05',
                  icon: '4.svg',
                  title: 'Charity & Donation',
                  text: 'Ibn Abbas narrated that the Prophet (PBUH) believed that charity, like water, extinguishes sin, reflecting gratitude for Allah\'s blessings. This act of charity, despite its small size, is a seed for a bountiful harvest in the Hereafter.',
                  img: '4.jpg',
                },
                {
                  num: '06',
                  icon: '2.svg',
                  title: 'Salah Memorization',
                  text: 'Namaz, a prayer based on memorizing the Quran, fosters a deeper connection with Allah\'s words, enhancing focus and promoting inner peace. This practice, without relying on a prayer book, promotes spiritual humility and self-reliance.',
                  img: '5.jpg',
                },
              ].map((service, i) => (
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
                    <div className="image">
                      <img src={`/assets/images/service/${service.img}`} alt="image" />
                      <h2 className="img-title">{service.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-12">
              <div className="section-title">
                <h2>Testimonial</h2>
                <h3>What Our Students</h3>
              </div>
            </div>
          </div>
          <div className="testimonial-slider">
            {[
              {
                img: '1.jpg',
                name: 'Ali Zameem',
                role: 'Father of student',
                text: '"Mualim-ol-Quran has been an amazing learning experience for our child, who is enthusiastically expecting his classes and has already memorized short Surahs."',
              },
              {
                img: '2.jpg',
                name: 'Umer',
                role: 'Father of student',
                text: '"Mualim-ol-Quran has been a valuable resource for families, providing web-based classes that have significantly improved their daughter\'s Arabic reading skills."',
              },
              {
                img: '22.jpg',
                name: 'Umama',
                role: 'Mother of student',
                text: '"Mualim-ol-Quran has been an amazing learning experience for our child, who is enthusiastically expecting his classes and has already memorized short Surahs."',
              },
              {
                img: '24.jpg',
                name: 'Amna',
                role: 'Sister of student',
                text: '"Mualim-ol-Quran has been an amazing learning experience for our child, who is enthusiastically expecting his classes and has already memorized short Surahs."',
              },
            ].map((testimonial, i) => (
              <div key={i} className="testimonial-card">
                <div className="top-content">
                  <div className="image">
                    <img src={`/assets/images/testimonial/${testimonial.img}`} alt="image" />
                  </div>
                  <div className="title">
                    <h2>{testimonial.name}</h2>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
                <p className="text">{testimonial.text}</p>
                <div className="icon">
                  <img src="/assets/images/testimonial/quote.svg" alt="icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
