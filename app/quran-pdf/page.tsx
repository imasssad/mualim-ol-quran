'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

const ALL_SURAHS = [
  { num: 1, name: 'Al-Fatihah', arabic: 'الفاتحة', ayahs: 7, type: 'Meccan' },
  { num: 2, name: 'Al-Baqarah', arabic: 'البقرة', ayahs: 286, type: 'Medinan' },
  { num: 3, name: 'Aal-e-Imran', arabic: 'آل عمران', ayahs: 200, type: 'Medinan' },
  { num: 4, name: 'An-Nisa', arabic: 'النساء', ayahs: 176, type: 'Medinan' },
  { num: 5, name: "Al-Ma'idah", arabic: 'المائدة', ayahs: 120, type: 'Medinan' },
  { num: 6, name: "Al-An'am", arabic: 'الأنعام', ayahs: 165, type: 'Meccan' },
  { num: 7, name: "Al-A'raf", arabic: 'الأعراف', ayahs: 206, type: 'Meccan' },
  { num: 8, name: 'Al-Anfal', arabic: 'الأنفال', ayahs: 75, type: 'Medinan' },
  { num: 9, name: 'At-Tawbah', arabic: 'التوبة', ayahs: 129, type: 'Medinan' },
  { num: 10, name: 'Yunus', arabic: 'يونس', ayahs: 109, type: 'Meccan' },
  { num: 11, name: 'Hud', arabic: 'هود', ayahs: 123, type: 'Meccan' },
  { num: 12, name: 'Yusuf', arabic: 'يوسف', ayahs: 111, type: 'Meccan' },
  { num: 13, name: "Ar-Ra'd", arabic: 'الرعد', ayahs: 43, type: 'Medinan' },
  { num: 14, name: 'Ibrahim', arabic: 'ابراهيم', ayahs: 52, type: 'Meccan' },
  { num: 15, name: 'Al-Hijr', arabic: 'الحجر', ayahs: 99, type: 'Meccan' },
  { num: 16, name: 'An-Nahl', arabic: 'النحل', ayahs: 128, type: 'Meccan' },
  { num: 17, name: 'Al-Isra', arabic: 'الإسراء', ayahs: 111, type: 'Meccan' },
  { num: 18, name: 'Al-Kahf', arabic: 'الكهف', ayahs: 110, type: 'Meccan' },
  { num: 19, name: 'Maryam', arabic: 'مريم', ayahs: 98, type: 'Meccan' },
  { num: 20, name: 'Ta-Ha', arabic: 'طه', ayahs: 135, type: 'Meccan' },
  { num: 21, name: 'Al-Anbiya', arabic: 'الأنبياء', ayahs: 112, type: 'Meccan' },
  { num: 22, name: 'Al-Hajj', arabic: 'الحج', ayahs: 78, type: 'Medinan' },
  { num: 23, name: "Al-Mu'minun", arabic: 'المؤمنون', ayahs: 118, type: 'Meccan' },
  { num: 24, name: 'An-Nur', arabic: 'النور', ayahs: 64, type: 'Medinan' },
  { num: 25, name: 'Al-Furqan', arabic: 'الفرقان', ayahs: 77, type: 'Meccan' },
  { num: 26, name: "Ash-Shu'ara", arabic: 'الشعراء', ayahs: 227, type: 'Meccan' },
  { num: 27, name: 'An-Naml', arabic: 'النمل', ayahs: 93, type: 'Meccan' },
  { num: 28, name: 'Al-Qasas', arabic: 'القصص', ayahs: 88, type: 'Meccan' },
  { num: 29, name: 'Al-Ankabut', arabic: 'العنكبوت', ayahs: 69, type: 'Meccan' },
  { num: 30, name: 'Ar-Rum', arabic: 'الروم', ayahs: 60, type: 'Meccan' },
  { num: 31, name: 'Luqman', arabic: 'لقمان', ayahs: 34, type: 'Meccan' },
  { num: 32, name: 'As-Sajdah', arabic: 'السجدة', ayahs: 30, type: 'Meccan' },
  { num: 33, name: 'Al-Ahzab', arabic: 'الأحزاب', ayahs: 73, type: 'Medinan' },
  { num: 34, name: "Saba'", arabic: 'سبأ', ayahs: 54, type: 'Meccan' },
  { num: 35, name: 'Fatir', arabic: 'فاطر', ayahs: 45, type: 'Meccan' },
  { num: 36, name: 'Ya-Sin', arabic: 'يس', ayahs: 83, type: 'Meccan' },
  { num: 37, name: 'As-Saffat', arabic: 'الصافات', ayahs: 182, type: 'Meccan' },
  { num: 38, name: 'Sad', arabic: 'ص', ayahs: 88, type: 'Meccan' },
  { num: 39, name: 'Az-Zumar', arabic: 'الزمر', ayahs: 75, type: 'Meccan' },
  { num: 40, name: 'Ghafir', arabic: 'غافر', ayahs: 85, type: 'Meccan' },
  { num: 41, name: 'Fussilat', arabic: 'فصلت', ayahs: 54, type: 'Meccan' },
  { num: 42, name: 'Ash-Shura', arabic: 'الشورى', ayahs: 53, type: 'Meccan' },
  { num: 43, name: 'Az-Zukhruf', arabic: 'الزخرف', ayahs: 89, type: 'Meccan' },
  { num: 44, name: 'Ad-Dukhan', arabic: 'الدخان', ayahs: 59, type: 'Meccan' },
  { num: 45, name: 'Al-Jathiyah', arabic: 'الجاثية', ayahs: 37, type: 'Meccan' },
  { num: 46, name: 'Al-Ahqaf', arabic: 'الأحقاف', ayahs: 35, type: 'Meccan' },
  { num: 47, name: 'Muhammad', arabic: 'محمد', ayahs: 38, type: 'Medinan' },
  { num: 48, name: 'Al-Fath', arabic: 'الفتح', ayahs: 29, type: 'Medinan' },
  { num: 49, name: 'Al-Hujurat', arabic: 'الحجرات', ayahs: 18, type: 'Medinan' },
  { num: 50, name: 'Qaf', arabic: 'ق', ayahs: 45, type: 'Meccan' },
  { num: 51, name: 'Adh-Dhariyat', arabic: 'الذاريات', ayahs: 60, type: 'Meccan' },
  { num: 52, name: 'At-Tur', arabic: 'الطور', ayahs: 49, type: 'Meccan' },
  { num: 53, name: 'An-Najm', arabic: 'النجم', ayahs: 62, type: 'Meccan' },
  { num: 54, name: 'Al-Qamar', arabic: 'القمر', ayahs: 55, type: 'Meccan' },
  { num: 55, name: 'Ar-Rahman', arabic: 'الرحمن', ayahs: 78, type: 'Medinan' },
  { num: 56, name: "Al-Waqi'ah", arabic: 'الواقعة', ayahs: 96, type: 'Meccan' },
  { num: 57, name: 'Al-Hadid', arabic: 'الحديد', ayahs: 29, type: 'Medinan' },
  { num: 58, name: 'Al-Mujadila', arabic: 'المجادلة', ayahs: 22, type: 'Medinan' },
  { num: 59, name: 'Al-Hashr', arabic: 'الحشر', ayahs: 24, type: 'Medinan' },
  { num: 60, name: 'Al-Mumtahanah', arabic: 'الممتحنة', ayahs: 13, type: 'Medinan' },
  { num: 61, name: 'As-Saff', arabic: 'الصف', ayahs: 14, type: 'Medinan' },
  { num: 62, name: "Al-Jumu'ah", arabic: 'الجمعة', ayahs: 11, type: 'Medinan' },
  { num: 63, name: 'Al-Munafiqun', arabic: 'المنافقون', ayahs: 11, type: 'Medinan' },
  { num: 64, name: 'At-Taghabun', arabic: 'التغابن', ayahs: 18, type: 'Medinan' },
  { num: 65, name: 'At-Talaq', arabic: 'الطلاق', ayahs: 12, type: 'Medinan' },
  { num: 66, name: 'At-Tahrim', arabic: 'التحريم', ayahs: 12, type: 'Medinan' },
  { num: 67, name: 'Al-Mulk', arabic: 'الملك', ayahs: 30, type: 'Meccan' },
  { num: 68, name: 'Al-Qalam', arabic: 'القلم', ayahs: 52, type: 'Meccan' },
  { num: 69, name: 'Al-Haqqah', arabic: 'الحاقة', ayahs: 52, type: 'Meccan' },
  { num: 70, name: "Al-Ma'arij", arabic: 'المعارج', ayahs: 44, type: 'Meccan' },
  { num: 71, name: 'Nuh', arabic: 'نوح', ayahs: 28, type: 'Meccan' },
  { num: 72, name: 'Al-Jinn', arabic: 'الجن', ayahs: 28, type: 'Meccan' },
  { num: 73, name: 'Al-Muzzammil', arabic: 'المزمل', ayahs: 20, type: 'Meccan' },
  { num: 74, name: 'Al-Muddaththir', arabic: 'المدثر', ayahs: 56, type: 'Meccan' },
  { num: 75, name: 'Al-Qiyamah', arabic: 'القيامة', ayahs: 40, type: 'Meccan' },
  { num: 76, name: 'Al-Insan', arabic: 'الانسان', ayahs: 31, type: 'Medinan' },
  { num: 77, name: 'Al-Mursalat', arabic: 'المرسلات', ayahs: 50, type: 'Meccan' },
  { num: 78, name: 'An-Naba', arabic: 'النبأ', ayahs: 40, type: 'Meccan' },
  { num: 79, name: "An-Nazi'at", arabic: 'النازعات', ayahs: 46, type: 'Meccan' },
  { num: 80, name: 'Abasa', arabic: 'عبس', ayahs: 42, type: 'Meccan' },
  { num: 81, name: 'At-Takwir', arabic: 'التكوير', ayahs: 29, type: 'Meccan' },
  { num: 82, name: 'Al-Infitar', arabic: 'الإنفطار', ayahs: 19, type: 'Meccan' },
  { num: 83, name: 'Al-Mutaffifin', arabic: 'المطففين', ayahs: 36, type: 'Meccan' },
  { num: 84, name: 'Al-Inshiqaq', arabic: 'الإنشقاق', ayahs: 25, type: 'Meccan' },
  { num: 85, name: 'Al-Buruj', arabic: 'البروج', ayahs: 22, type: 'Meccan' },
  { num: 86, name: 'At-Tariq', arabic: 'الطارق', ayahs: 17, type: 'Meccan' },
  { num: 87, name: "Al-A'la", arabic: 'الأعلى', ayahs: 19, type: 'Meccan' },
  { num: 88, name: 'Al-Ghashiyah', arabic: 'الغاشية', ayahs: 26, type: 'Meccan' },
  { num: 89, name: 'Al-Fajr', arabic: 'الفجر', ayahs: 30, type: 'Meccan' },
  { num: 90, name: 'Al-Balad', arabic: 'البلد', ayahs: 20, type: 'Meccan' },
  { num: 91, name: 'Ash-Shams', arabic: 'الشمس', ayahs: 15, type: 'Meccan' },
  { num: 92, name: 'Al-Layl', arabic: 'الليل', ayahs: 21, type: 'Meccan' },
  { num: 93, name: 'Ad-Duha', arabic: 'الضحى', ayahs: 11, type: 'Meccan' },
  { num: 94, name: 'Ash-Sharh', arabic: 'الشرح', ayahs: 8, type: 'Meccan' },
  { num: 95, name: 'At-Tin', arabic: 'التين', ayahs: 8, type: 'Meccan' },
  { num: 96, name: 'Al-Alaq', arabic: 'العلق', ayahs: 19, type: 'Meccan' },
  { num: 97, name: 'Al-Qadr', arabic: 'القدر', ayahs: 5, type: 'Meccan' },
  { num: 98, name: 'Al-Bayyinah', arabic: 'البينة', ayahs: 8, type: 'Medinan' },
  { num: 99, name: 'Az-Zalzalah', arabic: 'الزلزلة', ayahs: 8, type: 'Medinan' },
  { num: 100, name: "Al-'Adiyat", arabic: 'العاديات', ayahs: 11, type: 'Meccan' },
  { num: 101, name: "Al-Qari'ah", arabic: 'القارعة', ayahs: 11, type: 'Meccan' },
  { num: 102, name: 'At-Takathur', arabic: 'التكاثر', ayahs: 8, type: 'Meccan' },
  { num: 103, name: 'Al-Asr', arabic: 'العصر', ayahs: 3, type: 'Meccan' },
  { num: 104, name: 'Al-Humazah', arabic: 'الهمزة', ayahs: 9, type: 'Meccan' },
  { num: 105, name: 'Al-Fil', arabic: 'الفيل', ayahs: 5, type: 'Meccan' },
  { num: 106, name: 'Quraysh', arabic: 'قريش', ayahs: 4, type: 'Meccan' },
  { num: 107, name: "Al-Ma'un", arabic: 'الماعون', ayahs: 7, type: 'Meccan' },
  { num: 108, name: 'Al-Kawthar', arabic: 'الكوثر', ayahs: 3, type: 'Meccan' },
  { num: 109, name: 'Al-Kafirun', arabic: 'الكافرون', ayahs: 6, type: 'Meccan' },
  { num: 110, name: 'An-Nasr', arabic: 'النصر', ayahs: 3, type: 'Medinan' },
  { num: 111, name: 'Al-Masad', arabic: 'المسد', ayahs: 5, type: 'Meccan' },
  { num: 112, name: 'Al-Ikhlas', arabic: 'الإخلاص', ayahs: 4, type: 'Meccan' },
  { num: 113, name: 'Al-Falaq', arabic: 'الفلق', ayahs: 5, type: 'Meccan' },
  { num: 114, name: 'An-Nas', arabic: 'الناس', ayahs: 6, type: 'Medinan' },
]

interface Ayah {
  number: number
  numberInSurah: number
  text: string
  juz: number
  page: number
}

interface SurahData {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
  ayahs: Ayah[]
}

export default function QuranPdfPage() {
  const [selectedSurah, setSelectedSurah] = useState(1)
  const [surahData, setSurahData] = useState<SurahData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [fontSize, setFontSize] = useState(32)

  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement
    if (preloader) preloader.style.display = 'none'
  }, [])

  const fetchSurah = useCallback(async (num: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/quran-uthmani`)
      const data = await res.json()
      if (data.code === 200) {
        setSurahData(data.data)
      } else {
        setError('Failed to load surah. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchSurah(selectedSurah)
  }, [selectedSurah, fetchSurah])

  const filteredSurahs = ALL_SURAHS.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.arabic.includes(searchTerm) ||
    s.num.toString() === searchTerm
  )

  const currentSurah = ALL_SURAHS.find(s => s.num === selectedSurah)

  const toArabicNum = (n: number) => {
    return n.toString().replace(/\d/g, (d) => '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'[parseInt(d)])
  }

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <div className="wpo-breadcumb-area" style={{ background: 'url(/assets/images/page-title.jpg) no-repeat center top/cover' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Read Quran</h2>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><span>Read Quran</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quran Reader Section */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container-fluid" style={{ maxWidth: '1400px', padding: '0 20px' }}>
          {/* Top Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '20px',
            padding: '15px 20px',
            background: '#29395b',
            borderRadius: '12px',
            color: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: '#DB9E30',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <i className="fa fa-bars"></i> {sidebarOpen ? 'Hide Index' : 'Surah Index'}
              </button>
              <h3 style={{
                margin: 0,
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: '20px',
                color: '#DB9E30',
              }}>
                القرآن الكريم
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>Font:</span>
                <button onClick={() => setFontSize(f => Math.max(20, f - 2))} style={{ background: '#1e2d47', border: '1px solid #DB9E30', color: '#fff', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>-</button>
                <span style={{ fontSize: '13px', minWidth: '30px', textAlign: 'center' }}>{fontSize}</span>
                <button onClick={() => setFontSize(f => Math.min(50, f + 2))} style={{ background: '#1e2d47', border: '1px solid #DB9E30', color: '#fff', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>+</button>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => setSelectedSurah(s => Math.max(1, s - 1))}
                  disabled={selectedSurah <= 1}
                  style={{
                    background: selectedSurah <= 1 ? '#555' : '#1a5f3c',
                    border: 'none',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    cursor: selectedSurah <= 1 ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setSelectedSurah(s => Math.min(114, s + 1))}
                  disabled={selectedSurah >= 114}
                  style={{
                    background: selectedSurah >= 114 ? '#555' : '#1a5f3c',
                    border: 'none',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    cursor: selectedSurah >= 114 ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
            {/* Sidebar - Surah Index */}
            {sidebarOpen && (
              <div style={{
                width: '320px',
                minWidth: '320px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ padding: '12px', borderBottom: '1px solid #eee', background: '#1a5f3c', color: '#fff', textAlign: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>All 114 Surahs</h4>
                </div>
                <div style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
                  <input
                    type="text"
                    placeholder="Search surah name or number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div style={{ overflowY: 'auto', flex: 1 }}>
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.num}
                      onClick={() => { setSelectedSurah(surah.num); if (window.innerWidth < 768) setSidebarOpen(false) }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 14px',
                        width: '100%',
                        textAlign: 'left',
                        background: selectedSurah === surah.num ? '#f0faf4' : 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #f5f5f5',
                        borderLeft: selectedSurah === surah.num ? '4px solid #1a5f3c' : '4px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        gap: '12px',
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        background: selectedSurah === surah.num ? '#1a5f3c' : '#e9ecef',
                        color: selectedSurah === surah.num ? '#fff' : '#29395b',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '13px',
                        flexShrink: 0,
                      }}>
                        {surah.num}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#29395b' }}>{surah.name}</div>
                        <div style={{ fontSize: '11px', color: '#888' }}>{surah.ayahs} Ayahs &middot; {surah.type}</div>
                      </div>
                      <div style={{
                        fontFamily: '"Amiri", "Traditional Arabic", serif',
                        fontSize: '18px',
                        color: '#DB9E30',
                        fontWeight: 700,
                      }}>
                        {surah.arabic}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quran Text */}
            <div style={{
              flex: 1,
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              minHeight: '80vh',
            }}>
              {/* Surah Header */}
              {currentSurah && (
                <div style={{
                  background: 'linear-gradient(135deg, #1a5f3c 0%, #29395b 100%)',
                  padding: '30px',
                  textAlign: 'center',
                  color: '#fff',
                }}>
                  <div style={{
                    fontFamily: '"Amiri", "Traditional Arabic", serif',
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#DB9E30',
                    marginBottom: '5px',
                  }}>
                    {currentSurah.arabic}
                  </div>
                  <h2 style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '22px',
                    margin: '5px 0',
                    color: '#fff',
                    fontWeight: 700,
                  }}>
                    {currentSurah.name}
                  </h2>
                  <div style={{ fontSize: '13px', opacity: 0.8 }}>
                    Surah {currentSurah.num} &middot; {currentSurah.ayahs} Ayahs &middot; {currentSurah.type}
                  </div>
                </div>
              )}

              {/* Bismillah */}
              {selectedSurah !== 1 && selectedSurah !== 9 && (
                <div style={{
                  textAlign: 'center',
                  padding: '25px 20px 10px',
                  fontFamily: '"Amiri", "Traditional Arabic", "Scheherazade New", serif',
                  fontSize: '28px',
                  color: '#1a5f3c',
                  direction: 'rtl',
                }}>
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid #f0f0f0',
                    borderTop: '4px solid #1a5f3c',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 15px',
                  }} />
                  <p style={{ color: '#687693' }}>Loading Surah...</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <i className="fa fa-exclamation-triangle" style={{ fontSize: '40px', color: '#dc3545', marginBottom: '15px', display: 'block' }}></i>
                  <p style={{ color: '#dc3545' }}>{error}</p>
                  <button onClick={() => fetchSurah(selectedSurah)} style={{ background: '#1a5f3c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    Try Again
                  </button>
                </div>
              )}

              {/* Ayahs */}
              {!loading && !error && surahData && (
                <div style={{
                  padding: '20px 30px 40px',
                  direction: 'rtl',
                  textAlign: 'right',
                  lineHeight: 2.2,
                }}>
                  {surahData.ayahs.map((ayah) => (
                    <span key={ayah.number} style={{
                      fontFamily: '"Amiri", "Traditional Arabic", "Scheherazade New", serif',
                      fontSize: `${fontSize}px`,
                      color: '#1a1a1a',
                      wordSpacing: '4px',
                    }}>
                      {ayah.text}{' '}
                      <span style={{
                        fontFamily: '"Amiri", serif',
                        fontSize: `${Math.round(fontSize * 0.6)}px`,
                        color: '#DB9E30',
                        fontWeight: 700,
                        padding: '0 4px',
                        verticalAlign: 'super',
                      }}>
                        &#xFD3F;{toArabicNum(ayah.numberInSurah)}&#xFD3E;
                      </span>
                      {' '}
                    </span>
                  ))}
                </div>
              )}

              {/* Navigation Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px 30px',
                borderTop: '1px solid #eee',
                background: '#f8f9fa',
              }}>
                <button
                  onClick={() => { setSelectedSurah(s => Math.max(1, s - 1)); window.scrollTo(0, 0) }}
                  disabled={selectedSurah <= 1}
                  style={{
                    background: selectedSurah <= 1 ? '#ccc' : '#1a5f3c',
                    border: 'none',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    cursor: selectedSurah <= 1 ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                  }}
                >
                  &larr; Previous Surah
                </button>
                <button
                  onClick={() => { setSelectedSurah(s => Math.min(114, s + 1)); window.scrollTo(0, 0) }}
                  disabled={selectedSurah >= 114}
                  style={{
                    background: selectedSurah >= 114 ? '#ccc' : '#1a5f3c',
                    border: 'none',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    cursor: selectedSurah >= 114 ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Next Surah &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="row" style={{ marginTop: '40px' }}>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '20px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                textAlign: 'center',
                borderTop: '4px solid #1a5f3c',
              }}>
                <i className="fa fa-book" style={{ fontSize: '40px', color: '#1a5f3c', marginBottom: '15px', display: 'block' }}></i>
                <h4 style={{ color: '#29395b', marginBottom: '10px', fontFamily: '"Cinzel", serif' }}>Read Online</h4>
                <p style={{ color: '#687693', fontSize: '14px' }}>Read the Holy Quran with Uthmani script directly in your browser. All 114 Surahs available.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '20px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                textAlign: 'center',
                borderTop: '4px solid #DB9E30',
              }}>
                <i className="fa fa-text-height" style={{ fontSize: '40px', color: '#DB9E30', marginBottom: '15px', display: 'block' }}></i>
                <h4 style={{ color: '#29395b', marginBottom: '10px', fontFamily: '"Cinzel", serif' }}>Adjustable Font</h4>
                <p style={{ color: '#687693', fontSize: '14px' }}>Increase or decrease the Arabic text size for comfortable reading on any device.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12" style={{ marginBottom: '20px' }}>
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                textAlign: 'center',
                borderTop: '4px solid #1a5f3c',
              }}>
                <i className="fa fa-search" style={{ fontSize: '40px', color: '#1a5f3c', marginBottom: '15px', display: 'block' }}></i>
                <h4 style={{ color: '#29395b', marginBottom: '10px', fontFamily: '"Cinzel", serif' }}>Quick Navigation</h4>
                <p style={{ color: '#687693', fontSize: '14px' }}>Navigate to any Surah quickly using the sidebar index. Search by name or number.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .container-fluid {
            padding: 0 10px !important;
          }
        }
      `}</style>
    </div>
  )
}
