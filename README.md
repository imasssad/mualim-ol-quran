# Mualim-ol-Quran - Next.js Website

This is a Next.js conversion of the Mualim-ol-Quran PHP website. The website is built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✅ Fully responsive design
- ✅ Modern Next.js 14 App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS integration
- ✅ Optimized images with Next.js Image component
- ✅ SEO-friendly structure
- ✅ Component-based architecture
- ✅ Fast page loads and navigation
- ✅ **Live Prayer Times** - Automatic location detection with prayer times
- ✅ **Ramadan Support** - Sehri and Iftar times during Ramadan
- ✅ **Quran & Qaida Section** - Online learning resources
- ✅ **Islamic Tools** - Tasbih counter, Qibla finder, Daily Duas
- ✅ **YouTube Channel Integration** - Full video player with playlists
- ✅ **Video Library** - Browse and watch Quranic recitations

## Pages Included

1. **Home** (`/`) - Main landing page with hero slider, about section, pillars of Islam, courses, and YouTube preview
2. **About** (`/about`) - About us page with mission and vision
3. **Courses** (`/courses`) - Course listings with pricing
5. **Contact** (`/contact`) - Contact form and location map
6. **Quran Recitation** (`/quran-recitation`) - Full YouTube video player with playlists

## Project Structure

```
nextjs-project/
├── app/
│   ├── layout.tsx          # Root layout with header & footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── courses/
│   │   └── page.tsx        # Courses page
│   └── contact/
│       └── page.tsx        # Contact page
├── components/
│   ├── Navbar.tsx          # Navigation component
│   └── Footer.tsx          # Footer component
├── public/
│   ├── assets/             # Images, CSS, JS from original site
│   ├── *.png               # Logo and icons
│   └── style.css           # Original CSS file
└── package.json
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure YouTube Integration (Optional but Recommended)**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your YouTube API credentials:
   ```env
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
   NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id_here
   ```
   
   **See YOUTUBE_SETUP.md for detailed instructions**

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Start Production Server**
   ```bash
   npm start
   ```

## Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI component library
- **Swiper** - Touch slider library
- **Aladhan API** - Islamic prayer times API
- **IP Geolocation** - Automatic location detection
- **YouTube Data API v3** - Video and playlist integration

## New Features Added

### 🕌 Live Prayer Times
- Automatic location detection using IP geolocation
- Real-time prayer times for Fajr, Dhuhr, Asr, Maghrib, Isha
- Sunrise time included
- Next prayer highlighted automatically
- Updates in real-time with live clock

### 🌙 Ramadan Special Features
- Automatic Ramadan detection
- Sehri (pre-dawn meal) time display
- Iftar (breaking fast) time display
- Special Ramadan badge and styling
- Works for any location worldwide

### 📖 Quran & Qaida Learning Center
- Online Quran reading resources
- Noorani Qaida learning
- Tajweed rules and guidance
- Quran memorization program
- Quick access Islamic tools:
  - Digital Tasbih counter
  - Qibla direction finder
  - Daily Duas collection
  - Islamic calendar converter

### 📺 YouTube Channel Integration
- **Channel Preview on Home Page**
  - Featured playlists showcase
  - Recent video uploads
  - Channel statistics
  - Direct YouTube link

- **Dedicated Video Player Page** (`/quran-recitation`)
  - Professional embedded video player
  - Full-screen playback
  - Video details and descriptions
  - Upload dates and information

- **Playlist Management**
  - Browse all channel playlists
  - View playlist contents
  - Organized video collections
  - Easy playlist navigation

- **Smart Video Sidebar**
  - Scrollable video list
  - Thumbnail previews
  - One-click video switching
  - Currently playing highlight

- **Dual View Modes**
  - "All Videos" - Browse entire channel
  - "Playlists" - Organized collections
  - Quick toggle between modes

- **Powered by YouTube Data API v3**
  - Real-time channel data
  - Automatic updates
  - High-quality thumbnails
  - Accurate video information

## Original Assets

All original assets from the PHP website have been preserved:
- Images in `/public/assets/images/`
- CSS files in `/public/assets/css/`
- JavaScript in `/public/assets/js/`
- Original `style.css` maintained

## Features Already Implemented ✅

1. ✅ Live Prayer times API integration with location detection
2. ✅ Ramadan Sehri/Iftar times automatic display
3. ✅ Quran & Qaida learning resource section
4. ✅ Quick access Islamic tools section

## Additional Features to Implement

The following features can be added in future updates:
1. Interactive Quran reader with audio recitation
2. Functional Tasbih counter tool
3. Qibla direction compass with device orientation
4. Form submission backend for contact page
5. Newsletter subscription backend
6. Blog/Articles section with Islamic content
7. User authentication and profiles
8. Course enrollment system with payment
9. Live classes scheduling
10. Student progress tracking dashboard
11. Multi-language support (Arabic/English/Urdu)
12. Push notifications for prayer times
13. Offline mode support

## Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#1a5f3c',    // Main green color
      secondary: '#d4af37',  // Gold color
    },
  },
}
```

### Updating Contact Information
Edit contact details in:
- `app/contact/page.tsx` - Contact page
- `components/Footer.tsx` - Footer component
- `components/Navbar.tsx` - Header phone number

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2024 Mualim-ol-Quran by TAM Pakistan. All Rights Reserved.

## Support

For issues or questions, contact: info@deenequran.com
Phone: +(92) 3181725067
