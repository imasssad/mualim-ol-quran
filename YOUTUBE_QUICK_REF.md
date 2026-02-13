# YouTube Integration - Quick Reference

## 🚀 Quick Setup (Copy & Paste)

### 1. Create `.env.local` file
```bash
cp .env.example .env.local
```

### 2. Add your credentials
```env
NEXT_PUBLIC_YOUTUBE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=YOUR_CHANNEL_ID_HERE
```

### 3. Restart server
```bash
# Stop: Ctrl+C
npm run dev
```

---

## 🔑 Get API Key (2 minutes)

1. Go to: https://console.cloud.google.com/
2. Create project → "Mualim-ol-Quran YouTube"
3. Enable "YouTube Data API v3"
4. Create Credentials → API Key
5. Copy the key

---

## 📺 Get Channel ID (1 minute)

**Method 1:** https://commentpicker.com/youtube-channel-id.php
- Enter: `@qariarslanbuttpk`
- Click "Find"
- Copy ID

**Method 2:** YouTube page source
- Go to: https://www.youtube.com/@qariarslanbuttpk
- View source (Ctrl+U)
- Search: "channelId"
- Copy the ID

---

## 📂 File Structure

```
app/
├── quran-recitation/
│   └── page.tsx           # Video player page

components/
└── YouTubeChannelPreview.tsx  # Home page preview

lib/
└── youtube.ts             # API functions

.env.local                 # ← Your API keys (create this)
.env.example              # Template
```

---

## 🎯 Features

### Home Page
- ✅ Channel preview
- ✅ 3 featured playlists
- ✅ 3 recent videos
- ✅ Subscribe button

### Video Page (`/quran-recitation`)
- ✅ YouTube player
- ✅ Video list sidebar
- ✅ Playlist view
- ✅ All videos view
- ✅ Auto-play switching

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Mock data showing | Restart server |
| API errors | Check API key |
| Wrong channel | Verify channel ID |
| Won't load | Check console (F12) |

---

## ✅ Verification

Working correctly when:
- ✅ Real thumbnails load
- ✅ Actual video titles
- ✅ Videos play
- ✅ No console errors
- ✅ Playlists load

---

## 📖 Full Documentation

- **Setup Guide:** `YOUTUBE_SETUP.md`
- **Visual Guide:** `YOUTUBE_VISUAL_GUIDE.md`
- **README:** `README.md`

---

## 🔗 Useful Links

- API Console: https://console.cloud.google.com/
- Channel ID Finder: https://commentpicker.com/youtube-channel-id.php
- YouTube API Docs: https://developers.google.com/youtube/v3
- Channel: https://www.youtube.com/@qariarslanbuttpk

---

**Need help? See YOUTUBE_SETUP.md for detailed instructions!**
