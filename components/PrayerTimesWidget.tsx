'use client'

import { useEffect, useState } from 'react'
import { PrayerTimes, LocationData, getUserLocation, getPrayerTimes, formatTime, getNextPrayer, isRamadan } from '@/lib/prayerTimes'

export default function PrayerTimesWidget() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [loading, setLoading] = useState(true)
  const [nextPrayer, setNextPrayer] = useState<string>('')
  const [currentTime, setCurrentTime] = useState<string>('')
  const [ramadan, setRamadan] = useState(false)

  useEffect(() => {
    loadPrayerTimes()
    setRamadan(isRamadan())
    
    // Update current time every second
    const timeInterval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }))
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    if (prayerTimes) {
      setNextPrayer(getNextPrayer(prayerTimes))
    }
  }, [prayerTimes, currentTime])

  const loadPrayerTimes = async () => {
    setLoading(true)
    
    // Try to get user's location
    const userLocation = await getUserLocation()
    
    if (userLocation) {
      setLocation(userLocation)
      const times = await getPrayerTimes(userLocation.latitude, userLocation.longitude)
      setPrayerTimes(times)
    } else {
      // Fallback to default location (Faisalabad, Pakistan)
      const defaultLocation = {
        city: 'Faisalabad',
        country: 'Pakistan',
        latitude: 31.4504,
        longitude: 73.1350
      }
      setLocation(defaultLocation)
      const times = await getPrayerTimes(defaultLocation.latitude, defaultLocation.longitude)
      setPrayerTimes(times)
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <section className="prayertine-section-s2">
        <div className="container">
          <div className="prayertine-wrap">
            <div className="row g-0">
              <div className="col-12 text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading prayer times...</span>
                </div>
                <p className="mt-2">Loading prayer times...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!prayerTimes) {
    return null
  }

  const prayers = [
    { name: 'Fajr', time: prayerTimes.Fajr, icon: '🌅', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Sunrise', time: prayerTimes.Sunrise, icon: '☀️', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr, icon: '🕌', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Asr', time: prayerTimes.Asr, icon: '🌤️', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { name: 'Maghrib', time: prayerTimes.Maghrib, icon: '🌆', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { name: 'Isha', time: prayerTimes.Isha, icon: '🌙', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }
  ]

  const hijriDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section style={{ background: 'linear-gradient(135deg, #0c1220 0%, #1a2744 50%, #0f1923 100%)', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(219,158,48,0.08)' }}></div>
      <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(26,95,60,0.1)' }}></div>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(219,158,48,0.15)', padding: '6px 20px', borderRadius: '30px', marginBottom: '12px' }}>
            <i className="fa fa-map-marker" style={{ color: '#DB9E30' }}></i>
            <span style={{ color: '#DB9E30', fontWeight: 600, fontSize: '0.9rem' }}>{location?.city}, {location?.country}</span>
          </div>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>
            Prayer Times
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0 }}>
            {hijriDate} &nbsp;•&nbsp; <span style={{ color: '#DB9E30' }}>{currentTime}</span>
          </p>
          {ramadan && (
            <div style={{ marginTop: '10px' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #1a5f3c, #2d8a5e)', color: '#fff',
                padding: '6px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600
              }}>
                🌙 Ramadan Mubarak 🌙
              </span>
            </div>
          )}
        </div>

        {/* Prayer Cards Grid */}
        <div className="row g-3 justify-content-center">
          {prayers.map((prayer, index) => {
            const isNext = nextPrayer === prayer.name
            return (
              <div key={index} className="col-xl-2 col-lg-4 col-md-4 col-6">
                <div 
                  style={{
                    position: 'relative',
                    background: isNext 
                      ? 'linear-gradient(135deg, #1a5f3c 0%, #2d8a5e 100%)'
                      : 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '24px 16px',
                    textAlign: 'center',
                    cursor: 'default',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: isNext ? '2px solid rgba(219,158,48,0.6)' : '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    transform: isNext ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isNext ? '0 12px 35px rgba(26,95,60,0.4), 0 0 0 1px rgba(219,158,48,0.3)' : '0 4px 15px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => { if (!isNext) { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'rgba(219,158,48,0.3)' }}}
                  onMouseLeave={e => { if (!isNext) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}}
                >
                  {/* Glow effect for active */}
                  {isNext && (
                    <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(219,158,48,0.1) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
                  )}

                  {/* Icon with gradient circle */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: isNext ? 'rgba(255,255,255,0.2)' : prayer.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px', fontSize: '1.6rem',
                    boxShadow: isNext ? '0 4px 15px rgba(255,255,255,0.15)' : '0 4px 12px rgba(0,0,0,0.2)',
                  }}>
                    {prayer.icon}
                  </div>

                  {/* Prayer Name */}
                  <h4 style={{
                    color: isNext ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
                    fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '1.5px', marginBottom: '6px',
                  }}>
                    {prayer.name}
                  </h4>

                  {/* Time */}
                  <div style={{
                    color: isNext ? '#fff' : '#DB9E30',
                    fontSize: '1.35rem', fontWeight: 800,
                    fontFamily: '"Segoe UI", system-ui, sans-serif',
                    lineHeight: 1.2,
                  }}>
                    {formatTime(prayer.time)}
                  </div>

                  {/* Next badge */}
                  {isNext && (
                    <div style={{
                      marginTop: '10px',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      background: '#DB9E30', color: '#fff',
                      padding: '3px 14px', borderRadius: '12px',
                      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      animation: 'pulse 2s infinite',
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }}></span>
                      Next
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Ramadan Special Times */}
        {ramadan && prayerTimes.Sehri && prayerTimes.Iftar && (
          <div style={{ marginTop: '30px' }}>
            {/* Ramadan divider */}
            <div className="text-center mb-4">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(219,158,48,0.5))' }}></div>
                <span style={{ color: '#DB9E30', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>
                  🌙 Ramadan Timings 🌙
                </span>
                <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(219,158,48,0.5))' }}></div>
              </div>
            </div>

            <div className="row g-3 justify-content-center">
              {/* Sehri Card */}
              <div className="col-lg-5 col-md-6 col-12">
                <div 
                  style={{
                    position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(219,158,48,0.12) 0%, rgba(30,30,47,0.9) 100%)',
                    border: '1px solid rgba(219,158,48,0.2)', borderRadius: '20px',
                    padding: '28px 24px',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(219,158,48,0.2)'; e.currentTarget.style.borderColor = 'rgba(219,158,48,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(219,158,48,0.2)' }}
                >
                  {/* Background decoration */}
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(219,158,48,0.06)', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(219,158,48,0.04)', pointerEvents: 'none' }}></div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    {/* Icon */}
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '18px', flexShrink: 0,
                      background: 'linear-gradient(135deg, #DB9E30 0%, #c78520 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: '0 8px 25px rgba(219,158,48,0.35)',
                    }}>
                      🍽️
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                          Sehri / Sahoor
                        </span>
                        <span style={{
                          background: 'rgba(219,158,48,0.2)', color: '#DB9E30',
                          fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 700,
                        }}>ENDS AT</span>
                      </div>
                      <div style={{
                        color: '#DB9E30', fontSize: '2rem', fontWeight: 800,
                        fontFamily: '"Segoe UI", system-ui, sans-serif',
                        lineHeight: 1.1, marginBottom: '4px',
                      }}>
                        {formatTime(prayerTimes.Sehri)}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontWeight: 500 }}>
                        Last meal before Fajr prayer
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Iftar Card */}
              <div className="col-lg-5 col-md-6 col-12">
                <div 
                  style={{
                    position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(26,95,60,0.15) 0%, rgba(30,30,47,0.9) 100%)',
                    border: '1px solid rgba(74,222,128,0.15)', borderRadius: '20px',
                    padding: '28px 24px',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(26,95,60,0.25)'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.15)' }}
                >
                  {/* Background decoration */}
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(74,222,128,0.05)', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(74,222,128,0.03)', pointerEvents: 'none' }}></div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    {/* Icon */}
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '18px', flexShrink: 0,
                      background: 'linear-gradient(135deg, #1a5f3c 0%, #2d8a5e 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: '0 8px 25px rgba(26,95,60,0.4)',
                    }}>
                      🌅
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                          Iftar Time
                        </span>
                        <span style={{
                          background: 'rgba(74,222,128,0.15)', color: '#4ade80',
                          fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 700,
                        }}>BREAK FAST</span>
                      </div>
                      <div style={{
                        color: '#4ade80', fontSize: '2rem', fontWeight: 800,
                        fontFamily: '"Segoe UI", system-ui, sans-serif',
                        lineHeight: 1.1, marginBottom: '4px',
                      }}>
                        {formatTime(prayerTimes.Iftar)}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontWeight: 500 }}>
                        Break fast at Maghrib prayer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  )
}
