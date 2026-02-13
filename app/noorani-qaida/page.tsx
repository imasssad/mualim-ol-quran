'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TOTAL_PAGES = 32

const PAGE_LABELS: Record<number, string> = {
  1: 'Cover Page',
  2: 'Mufrad Huroof (Single Letters)',
  3: 'Mufrad Huroof (Continued)',
  4: 'Murakkab Huroof (Compound)',
  5: 'Murakkab Huroof (Continued)',
  6: 'Harakat - Fatha / Zabar',
  7: 'Harakat - Kasra / Zer',
  8: 'Harakat - Damma / Pesh',
  9: 'Standing Harakat',
  10: 'Tanween',
  11: 'Tanween (Continued)',
  12: 'Huroof-e-Maddah',
  13: 'Huroof-e-Maddah (Continued)',
  14: 'Huroof-e-Leen',
  15: 'Sukoon / Jazm',
  16: 'Sukoon (Continued)',
  17: 'Tashdeed / Shaddah',
  18: 'Tashdeed (Continued)',
  19: 'Mixed Exercise',
  20: 'Noon Sakin & Tanween Rules',
  21: 'Noon Sakin Rules (Continued)',
  22: 'Meem Sakin Rules',
  23: 'Practice Reading',
  24: 'Practice Reading (Continued)',
  25: 'Practice Reading (Continued)',
  26: 'Practice Reading (Continued)',
  27: 'Surah Al-Fatihah',
  28: 'Short Surahs',
  29: 'Short Surahs (Continued)',
  30: 'Short Surahs (Continued)',
  31: 'Short Surahs (Continued)',
  32: 'Du\'a & Completion',
}

export default function NooraniQaidaPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement
    if (preloader) preloader.style.display = 'none'
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrentPage(p => Math.max(1, p - 1))
      } else if (e.key === 'Home') {
        setCurrentPage(1)
      } else if (e.key === 'End') {
        setCurrentPage(TOTAL_PAGES)
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isFullscreen])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(TOTAL_PAGES, page)))
  }, [])

  const pageLabel = PAGE_LABELS[currentPage] || `Page ${currentPage}`
  const pageSrc = `/assets/images/noorani-qaida/page_${String(currentPage).padStart(2, '0')}.png`

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <div className="wpo-breadcumb-area" style={{ background: 'url(/assets/images/page-title.jpg) no-repeat center top/cover' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Noorani Qaida</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><span>Noorani Qaida</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Section */}
      <section style={{ padding: '30px 0 80px', background: '#f4f6f8' }}>
        <div className="container-fluid" style={{ maxWidth: '1400px', padding: '0 15px' }}>

          {/* Top Toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '12px', marginBottom: '16px', padding: '12px 20px',
            background: '#29395b', borderRadius: '12px', color: '#fff',
          }}>
            {/* Left: Sidebar toggle + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: '#DB9E30', border: 'none', color: '#fff',
                  padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
                  fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <i className="fa fa-bars"></i>
                <span className="d-none d-sm-inline">{sidebarOpen ? 'Hide' : 'Pages'}</span>
              </button>
              <div>
                <h3 style={{ margin: 0, fontFamily: '"Amiri", serif', fontSize: '20px', color: '#DB9E30' }}>
                  نورانی قاعدہ
                </h3>
                <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>Noorani Qaida — 32 Pages</div>
              </div>
            </div>

            {/* Center: Page navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage <= 1}
                title="First Page"
                style={{
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                  width: '32px', height: '32px', borderRadius: '6px', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage <= 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <i className="fa fa-angle-double-left"></i>
              </button>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                title="Previous Page"
                style={{
                  background: '#1a5f3c', border: 'none', color: '#fff',
                  padding: '6px 14px', borderRadius: '6px', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 600, fontSize: '13px', opacity: currentPage <= 1 ? 0.4 : 1,
                }}
              >
                ← Prev
              </button>
              <div style={{
                background: '#1e2d47', padding: '4px 14px', borderRadius: '8px',
                fontSize: '14px', fontWeight: 600, minWidth: '100px', textAlign: 'center',
              }}>
                {currentPage} / {TOTAL_PAGES}
              </div>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= TOTAL_PAGES}
                title="Next Page"
                style={{
                  background: '#1a5f3c', border: 'none', color: '#fff',
                  padding: '6px 14px', borderRadius: '6px', cursor: currentPage >= TOTAL_PAGES ? 'not-allowed' : 'pointer',
                  fontWeight: 600, fontSize: '13px', opacity: currentPage >= TOTAL_PAGES ? 0.4 : 1,
                }}
              >
                Next →
              </button>
              <button
                onClick={() => goToPage(TOTAL_PAGES)}
                disabled={currentPage >= TOTAL_PAGES}
                title="Last Page"
                style={{
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                  width: '32px', height: '32px', borderRadius: '6px', cursor: currentPage >= TOTAL_PAGES ? 'not-allowed' : 'pointer',
                  opacity: currentPage >= TOTAL_PAGES ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <i className="fa fa-angle-double-right"></i>
              </button>
            </div>

            {/* Right: Zoom + Fullscreen */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  onClick={() => setZoom(z => Math.max(50, z - 10))}
                  style={{
                    background: '#1e2d47', border: '1px solid #DB9E30', color: '#fff',
                    width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px',
                  }}
                >−</button>
                <span style={{ fontSize: '13px', minWidth: '38px', textAlign: 'center' }}>{zoom}%</span>
                <button
                  onClick={() => setZoom(z => Math.min(200, z + 10))}
                  style={{
                    background: '#1e2d47', border: '1px solid #DB9E30', color: '#fff',
                    width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px',
                  }}
                >+</button>
                <button
                  onClick={() => setZoom(100)}
                  title="Reset zoom"
                  style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                    padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px',
                  }}
                >Reset</button>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                style={{
                  background: '#1e2d47', border: '1px solid #DB9E30', color: '#fff',
                  width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <i className={`fa fa-${isFullscreen ? 'compress' : 'expand'}`}></i>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{
            display: 'flex', gap: '16px', position: 'relative',
            ...(isFullscreen ? {
              position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999, background: '#f4f6f8', padding: '16px', gap: '16px',
            } : {}),
          }}>

            {/* Sidebar - Page List */}
            {sidebarOpen && (
              <div style={{
                width: '260px', minWidth: '260px', background: '#fff', borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                maxHeight: isFullscreen ? 'calc(100vh - 32px)' : '100vh',
              }}>
                <div style={{
                  padding: '14px', background: '#1a5f3c', color: '#fff', textAlign: 'center',
                  flexShrink: 0,
                }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                    📖 Pages ({TOTAL_PAGES})
                  </h4>
                </div>
                <div style={{ overflowY: 'auto', flex: 1 }}>
                  {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page)
                        if (window.innerWidth < 768) setSidebarOpen(false)
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', padding: '10px 14px', width: '100%',
                        textAlign: 'left',
                        background: currentPage === page ? '#f0faf4' : 'transparent',
                        border: 'none', borderBottom: '1px solid #f5f5f5',
                        borderLeft: currentPage === page ? '4px solid #1a5f3c' : '4px solid transparent',
                        cursor: 'pointer', transition: 'all 0.15s', gap: '10px',
                      }}
                    >
                      <div style={{
                        width: '30px', height: '30px', flexShrink: 0,
                        background: currentPage === page ? '#1a5f3c' : '#e9ecef',
                        color: currentPage === page ? '#fff' : '#29395b',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '12px',
                      }}>
                        {page}
                      </div>
                      <div style={{
                        fontSize: '12px', fontWeight: currentPage === page ? 700 : 500,
                        color: currentPage === page ? '#1a5f3c' : '#555',
                        lineHeight: 1.3,
                      }}>
                        {PAGE_LABELS[page] || `Page ${page}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Page Display */}
            <div style={{
              flex: 1, background: '#fff', borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              height: isFullscreen ? 'calc(100vh - 32px)' : '100vh',
              maxHeight: isFullscreen ? 'calc(100vh - 32px)' : '100vh',
            }}>
              {/* Page Label */}
              <div style={{
                background: 'linear-gradient(135deg, #29395b 0%, #1a5f3c 100%)',
                padding: '10px 20px', textAlign: 'center', color: '#fff', flexShrink: 0,
              }}>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>Page {currentPage} of {TOTAL_PAGES}</span>
                <h3 style={{
                  fontFamily: '"Cinzel", serif', fontSize: '16px', margin: '2px 0 0', fontWeight: 700, color: '#DB9E30',
                }}>
                  {pageLabel}
                </h3>
              </div>

              {/* Image Container */}
              <div style={{
                flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center',
                alignItems: 'flex-start', padding: '10px', background: '#e8eaed',
                minHeight: 0,
              }}>
                <div style={{
                  width: `${zoom}%`, maxWidth: zoom <= 100 ? '1200px' : 'none', flexShrink: 0,
                  transition: 'width 0.3s ease',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)', borderRadius: '4px', overflow: 'hidden',
                  background: '#fff',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pageSrc}
                    alt={`Noorani Qaida - ${pageLabel}`}
                    style={{ width: '100%', display: 'block', height: 'auto', imageRendering: '-webkit-optimize-contrast' as never }}
                  />
                </div>
              </div>

              {/* Bottom Navigation */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 20px', borderTop: '1px solid #eee', background: '#f8f9fa', flexShrink: 0,
              }}>
                <button
                  onClick={() => { goToPage(currentPage - 1); window.scrollTo(0, 0) }}
                  disabled={currentPage <= 1}
                  style={{
                    background: currentPage <= 1 ? '#ccc' : '#1a5f3c',
                    border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px',
                    cursor: currentPage <= 1 ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '14px',
                  }}
                >
                  ← Previous Page
                </button>
                <div style={{ fontSize: '13px', color: '#687693', fontWeight: 600 }}>
                  Page {currentPage} of {TOTAL_PAGES}
                </div>
                <button
                  onClick={() => { goToPage(currentPage + 1); window.scrollTo(0, 0) }}
                  disabled={currentPage >= TOTAL_PAGES}
                  style={{
                    background: currentPage >= TOTAL_PAGES ? '#ccc' : '#1a5f3c',
                    border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px',
                    cursor: currentPage >= TOTAL_PAGES ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '14px',
                  }}
                >
                  Next Page →
                </button>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcut Hint */}
          <div style={{
            marginTop: '20px', textAlign: 'center', color: '#687693', fontSize: '13px',
          }}>
            <i className="fa fa-keyboard-o" style={{ marginRight: '6px' }}></i>
            Use <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid #ccc' }}>←</kbd> <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid #ccc' }}>→</kbd> arrow keys to navigate pages
            &nbsp;|&nbsp;
            <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid #ccc' }}>Home</kbd> <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid #ccc' }}>End</kbd> to jump to first/last page
          </div>

          {/* Info Cards */}
          <div className="row" style={{ marginTop: '40px' }}>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '20px' }}>
              <div style={{
                background: '#fff', borderRadius: '12px', padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center', borderTop: '4px solid #1a5f3c',
              }}>
                <i className="fa fa-book" style={{ fontSize: '40px', color: '#1a5f3c', marginBottom: '15px', display: 'block' }}></i>
                <h4 style={{ color: '#29395b', marginBottom: '10px', fontFamily: '"Cinzel", serif' }}>Original Noorani Qaida</h4>
                <p style={{ color: '#687693', fontSize: '14px' }}>Complete 32-page Pakistani Noorani Qaida with authentic layout and typography.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '20px' }}>
              <div style={{
                background: '#fff', borderRadius: '12px', padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center', borderTop: '4px solid #DB9E30',
              }}>
                <i className="fa fa-list-ol" style={{ fontSize: '40px', color: '#DB9E30', marginBottom: '15px', display: 'block' }}></i>
                <h4 style={{ color: '#29395b', marginBottom: '10px', fontFamily: '"Cinzel", serif' }}>Step by Step Lessons</h4>
                <p style={{ color: '#687693', fontSize: '14px' }}>From basic alphabets to compound letters, harakat, tajweed rules and short surahs.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '20px' }}>
              <div style={{
                background: '#fff', borderRadius: '12px', padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center', borderTop: '4px solid #1a5f3c',
              }}>
                <i className="fa fa-search-plus" style={{ fontSize: '40px', color: '#1a5f3c', marginBottom: '15px', display: 'block' }}></i>
                <h4 style={{ color: '#29395b', marginBottom: '10px', fontFamily: '"Cinzel", serif' }}>Zoom & Navigate</h4>
                <p style={{ color: '#687693', fontSize: '14px' }}>Zoom in/out, keyboard navigation, fullscreen mode for comfortable reading.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
