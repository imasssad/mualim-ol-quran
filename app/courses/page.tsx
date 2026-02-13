'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  getChannelPlaylists, 
  YOUTUBE_CHANNEL_ID, 
  YOUTUBE_CHANNEL_HANDLE,
  YouTubePlaylist 
} from '@/lib/youtube'

export default function CoursesPage() {
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement
    if (preloader) preloader.style.display = 'none'
    loadPlaylists()
  }, [])

  const loadPlaylists = async () => {
    setLoading(true)
    const data = await getChannelPlaylists(YOUTUBE_CHANNEL_ID)
    setPlaylists(data)
    setLoading(false)
  }

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <div className="wpo-breadcumb-area" style={{ background: 'url(/assets/images/page-title.jpg) no-repeat center top/cover' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Courses & Playlists</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><span>Courses</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses / Pricing Section */}
      <section className="section-padding" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="wpo-section-title text-center mb-5">
            <span>Our Programs</span>
            <h2>Course Pricing</h2>
          </div>
          <div className="row justify-content-center">
            {/* Nazra Quran */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff', borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)', height: '100%',
                transition: 'transform 0.3s', border: '2px solid transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = '#1a5f3c' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent' }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img src="/assets/images/service/1.jpg" alt="Nazra Quran" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,95,60,0.9))' }}></div>
                  <h3 style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Nazra Quran</h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 600 }}>12 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$70</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$55</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 600 }}>16 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$80</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$65</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                    <span style={{ fontWeight: 600 }}>20 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$100</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$80</span></div>
                  </div>
                  <Link href="/contact" className="btn w-100 mt-3" style={{ background: '#1a5f3c', color: '#fff', fontWeight: 600, borderRadius: '8px', padding: '10px' }}>
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Quran Memorization */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff', borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)', height: '100%',
                transition: 'transform 0.3s', border: '2px solid #DB9E30',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#DB9E30', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, zIndex: 2 }}>POPULAR</div>
                  <img src="/assets/images/service/Quran-Memorization.jpg" alt="Quran Memorization" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,95,60,0.9))' }}></div>
                  <h3 style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Quran Memorization</h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 600 }}>12 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$70</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$60</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 600 }}>16 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$80</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$80</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                    <span style={{ fontWeight: 600 }}>20 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$120</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$100</span></div>
                  </div>
                  <Link href="/contact" className="btn w-100 mt-3" style={{ background: '#DB9E30', color: '#fff', fontWeight: 600, borderRadius: '8px', padding: '10px' }}>
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Tajweed e Quran */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div style={{
                background: '#fff', borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)', height: '100%',
                transition: 'transform 0.3s', border: '2px solid transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = '#1a5f3c' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent' }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img src="/assets/images/service/Tajweed-e-Quran-Courses.jpg" alt="Tajweed e Quran" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,95,60,0.9))' }}></div>
                  <h3 style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Tajweed e Quran</h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 600 }}>12 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$50</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$40</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 600 }}>16 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$70</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$60</span></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                    <span style={{ fontWeight: 600 }}>20 Days/Month</span>
                    <div><del style={{ color: '#999', marginRight: '8px' }}>$90</del><span style={{ color: '#1a5f3c', fontWeight: 700, fontSize: '1.2rem' }}>$75</span></div>
                  </div>
                  <Link href="/contact" className="btn w-100 mt-3" style={{ background: '#1a5f3c', color: '#fff', fontWeight: 600, borderRadius: '8px', padding: '10px' }}>
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Playlists Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ color: '#DB9E30', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
              YouTube Channel
            </span>
            <h2 className="text-white mt-2" style={{ fontSize: '2.2rem', fontWeight: 700 }}>
              <i className="fa fa-youtube-play text-danger me-3"></i>
              All Playlists
            </h2>
            <p className="text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
              Explore our complete collection of Quranic recitations, Tajweed lessons, and Islamic education playlists
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-white-50 mt-3">Loading playlists...</p>
            </div>
          ) : playlists.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-youtube-play text-danger" style={{ fontSize: '4rem', opacity: 0.5 }}></i>
              <p className="text-white-50 mt-3">No playlists found. Check back later!</p>
            </div>
          ) : (
            <div className="row">
              {playlists.map((playlist, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <Link href={`/quran-recitation?playlist=${playlist.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: '#1e1e2f', borderRadius: '14px', overflow: 'hidden',
                      transition: 'all 0.3s ease', cursor: 'pointer', height: '100%',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(220,38,38,0.25)'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
                    >
                      <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <Image 
                          src={playlist.thumbnail} 
                          alt={playlist.title}
                          width={480}
                          height={270}
                          style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }}
                          onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.08)' }}
                          onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)' }}
                        />
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))', pointerEvents: 'none' }}></div>
                        <div style={{
                          position: 'absolute', bottom: '12px', right: '12px',
                          background: 'rgba(220,38,38,0.9)', color: '#fff',
                          padding: '5px 12px', borderRadius: '20px',
                          fontSize: '0.8rem', fontWeight: 700,
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}>
                          <i className="fa fa-play-circle"></i>
                          {playlist.itemCount} videos
                        </div>
                        <div style={{
                          position: 'absolute', top: '12px', left: '12px',
                          background: 'rgba(0,0,0,0.7)', color: '#DB9E30',
                          width: '32px', height: '32px', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.85rem', fontWeight: 700,
                        }}>
                          {index + 1}
                        </div>
                      </div>
                      <div style={{ padding: '1.2rem 1.5rem' }}>
                        <h5 style={{
                          color: '#fff', fontSize: '1.05rem', fontWeight: 600,
                          marginBottom: '0.5rem', lineHeight: 1.4,
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                          overflow: 'hidden',
                        }}>
                          {playlist.title}
                        </h5>
                        {playlist.description && (
                          <p style={{
                            color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem',
                            marginBottom: 0, lineHeight: 1.5,
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                            overflow: 'hidden',
                          }}>
                            {playlist.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <a 
              href={`https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger btn-lg"
              style={{ borderRadius: '30px', padding: '12px 35px', fontWeight: 600 }}
            >
              <i className="fa fa-youtube-play me-2"></i>
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
