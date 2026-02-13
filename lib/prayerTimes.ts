// lib/prayerTimes.ts

export interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
  Sehri?: string  // During Ramadan
  Iftar?: string  // During Ramadan
}

export interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
}

// Get user's location
export async function getUserLocation(): Promise<LocationData | null> {
  try {
    // Try to get location from IP
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    return {
      city: data.city || 'Unknown',
      country: data.country_name || 'Unknown',
      latitude: data.latitude || 0,
      longitude: data.longitude || 0
    }
  } catch (error) {
    console.error('Error getting location:', error)
    return null
  }
}

// Check if it's Ramadan
export function isRamadan(): boolean {
  const now = new Date()
  const hijriYear = Math.floor(((now.getFullYear() - 622) * 365.25) / 354.36667)
  
  // This is a simplified check - in production, use a proper Hijri calendar library
  // For now, we'll use approximate dates (Ramadan 2026 is expected around Feb 18 - Mar 19)
  const ramadanStart = new Date('2026-02-18')
  const ramadanEnd = new Date('2026-03-19')
  
  return now >= ramadanStart && now <= ramadanEnd
}

// Fetch prayer times from API
export async function getPrayerTimes(
  latitude: number,
  longitude: number,
  date?: Date
): Promise<PrayerTimes | null> {
  try {
    const targetDate = date || new Date()
    const timestamp = Math.floor(targetDate.getTime() / 1000)
    
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=2`
    )
    
    const data = await response.json()
    
    if (data.code === 200 && data.data) {
      const timings = data.data.timings
      const prayerTimes: PrayerTimes = {
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha
      }
      
      // Add Ramadan times if it's Ramadan
      if (isRamadan()) {
        prayerTimes.Sehri = timings.Fajr // Sehri ends at Fajr
        prayerTimes.Iftar = timings.Maghrib // Iftar starts at Maghrib
      }
      
      return prayerTimes
    }
    
    return null
  } catch (error) {
    console.error('Error fetching prayer times:', error)
    return null
  }
}

// Format time to 12-hour format
export function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

// Get next prayer
export function getNextPrayer(prayerTimes: PrayerTimes): string {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const prayers = [
    { name: 'Fajr', time: prayerTimes.Fajr },
    { name: 'Sunrise', time: prayerTimes.Sunrise },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr },
    { name: 'Asr', time: prayerTimes.Asr },
    { name: 'Maghrib', time: prayerTimes.Maghrib },
    { name: 'Isha', time: prayerTimes.Isha }
  ]
  
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':')
    const prayerMinutes = parseInt(hours) * 60 + parseInt(minutes)
    
    if (prayerMinutes > currentTime) {
      return prayer.name
    }
  }
  
  return 'Fajr' // Next day's Fajr
}
