# New Features Guide - Prayer Times & Quran Learning

## 🕌 Live Prayer Times Feature

### Overview
The website now includes a fully functional prayer times widget that automatically detects the user's location and displays accurate prayer times.

### Features
1. **Automatic Location Detection**
   - Uses IP-based geolocation
   - Falls back to default location (Faisalabad, Pakistan) if detection fails
   - Displays city and country name

2. **Prayer Times Displayed**
   - Fajr (Dawn)
   - Sunrise (Shurooq)
   - Dhuhr (Noon)
   - Asr (Afternoon)
   - Maghrib (Sunset)
   - Isha (Night)

3. **Real-time Features**
   - Live clock showing current time
   - Next prayer automatically highlighted
   - Updates every second
   - Visual indicators for upcoming prayer

4. **Ramadan Special**
   - Automatic Ramadan detection
   - Sehri time (pre-dawn meal) - ends at Fajr
   - Iftar time (breaking fast) - starts at Maghrib
   - Special "Ramadan Mubarak" badge
   - Beautiful gold-themed styling for Ramadan times

### Technical Implementation

**API Used:** Aladhan Prayer Times API
- Endpoint: `https://api.aladhan.com/v1/timings`
- Method: 2 (Islamic Society of North America)
- Free and no authentication required

**Location Detection:** ipapi.co
- Free IP geolocation service
- Returns city, country, latitude, longitude

### Code Structure
```
lib/prayerTimes.ts           # Prayer times logic
components/PrayerTimesWidget.tsx  # UI component
```

### Customization

**Change Default Location:**
Edit `components/PrayerTimesWidget.tsx`:
```typescript
const defaultLocation = {
  city: 'Your City',
  country: 'Your Country',
  latitude: YOUR_LATITUDE,
  longitude: YOUR_LONGITUDE
}
```

**Change Calculation Method:**
Edit `lib/prayerTimes.ts` in the `getPrayerTimes` function:
```typescript
// method=2 is ISNA
// method=1 is University of Islamic Sciences, Karachi
// method=3 is Muslim World League
// method=4 is Umm Al-Qura University, Makkah
&method=2
```

**Ramadan Dates:**
Update the dates in `lib/prayerTimes.ts`:
```typescript
const ramadanStart = new Date('2026-02-18')
const ramadanEnd = new Date('2026-03-19')
```

---

## 📖 Quran & Qaida Learning Section

### Overview
A comprehensive learning resource section providing access to Quranic education and Islamic tools.

### Main Resources

1. **Online Quran Reading**
   - Arabic text display
   - English translation
   - Audio recitation
   - Verse-by-verse study

2. **Noorani Qaida**
   - Step-by-step Arabic learning
   - Audio lessons
   - Practice exercises
   - Suitable for all ages

3. **Tajweed Rules**
   - Makharij (articulation points)
   - Sifaat (characteristics)
   - Rules of Noon and Meem
   - Proper pronunciation guide

4. **Quran Memorization**
   - Structured Hifz program
   - Daily revision system
   - Memory techniques
   - Progress tracking

### Quick Access Tools

1. **Tasbih Counter** 🔢
   - Digital Dhikr counter
   - Track your daily remembrance

2. **Qibla Finder** 🧭
   - Find prayer direction
   - GPS-based location

3. **Daily Duas** 🤲
   - Essential Islamic prayers
   - Morning and evening Adhkar
   - Various occasions

4. **Islamic Calendar** 📅
   - Hijri date converter
   - Important Islamic dates
   - Event reminders

### Styling
- Clean, modern card-based design
- Gradient headers
- Hover animations
- Fully responsive
- Accessible icons

### Code Structure
```
components/QuranQaidaSection.tsx  # Main section component
```

### Adding More Resources

To add a new resource card, edit `QuranQaidaSection.tsx`:

```typescript
const resources = [
  // ... existing resources
  {
    title: 'Your New Resource',
    description: 'Description here',
    icon: '📚',
    image: '/path/to/image.jpg',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    color: 'primary',  // primary, success, warning, info
    link: '#your-link'
  }
]
```

---

## 🎨 Styling & Colors

### Prayer Times Colors
- **Primary Green:** `#1a5f3c`
- **Active Highlight:** Gradient from `#1a5f3c` to `#2d8a5e`
- **Ramadan Gold:** `#d4af37`
- **Background:** `#f8f9fa`

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

---

## 🔧 Troubleshooting

### Prayer Times Not Loading
1. Check internet connection
2. Verify API is accessible: `https://api.aladhan.com/v1/timings/[timestamp]?latitude=0&longitude=0&method=2`
3. Check browser console for errors
4. Ensure ipapi.co is not blocked

### Wrong Location Detected
- The system uses IP-based location which may not be 100% accurate
- Users behind VPNs will see incorrect location
- Solution: Add manual location selection feature

### Ramadan Times Not Showing
- Verify Ramadan dates in `lib/prayerTimes.ts`
- Check `isRamadan()` function logic
- Update dates yearly

### Performance Issues
- Prayer times are cached for the day
- Location is detected once per session
- Consider implementing localStorage for caching

---

## 🚀 Future Enhancements

### Planned Features
1. **Manual Location Selection**
   - City search
   - GPS location
   - Favorite locations

2. **Prayer Notifications**
   - Browser notifications
   - Adhan audio
   - Customizable alerts

3. **Prayer Time Adjustments**
   - Manual time adjustments
   - Different calculation methods
   - Juristic methods for Asr

4. **Interactive Quran Reader**
   - Full Quran text
   - Click to play audio
   - Bookmarking
   - Search functionality

5. **Tasbih Counter Implementation**
   - Track multiple Dhikr
   - Save counts
   - Daily goals
   - Statistics

6. **Qibla Compass**
   - Device orientation
   - Compass view
   - Distance to Kaaba

---

## 📱 Mobile Considerations

- Prayer times are touch-friendly
- Large tap targets
- Readable fonts
- Optimized for all screen sizes
- Fast loading even on slow connections

---

## 🌐 API Credits

**Prayer Times:** [Aladhan API](https://aladhan.com/prayer-times-api)
- Free and open source
- No authentication required
- Worldwide coverage

**Geolocation:** [ipapi.co](https://ipapi.co)
- Free tier: 1000 requests/day
- Automatic and accurate
- No API key needed for basic use

---

## ⚙️ Configuration

### Environment Variables (Optional)
Create `.env.local` for API keys if needed:

```env
# If you upgrade to paid ipapi.co plan
NEXT_PUBLIC_IPAPI_KEY=your_key_here

# If you want to use a different prayer time API
NEXT_PUBLIC_PRAYER_API_URL=https://api.example.com
```

---

## 📞 Support

For issues or questions about these features:
- Email: info@deenequran.com
- Phone: +(92) 3181725067

---

**May Allah accept our efforts and make this a means of benefit for the Ummah. Ameen.**
