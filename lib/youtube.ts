// lib/youtube.ts

// YouTube Channel Handle for @qariarslanbuttpk
export const YOUTUBE_CHANNEL_HANDLE = '@qariarslanbuttpk'
export const YOUTUBE_CHANNEL_USERNAME = 'qariarslanbuttpk'

// This will be fetched dynamically or you can set it manually
// For Qari Arslan Butt: UCxKvhJL8JOwi0u3DJp5Uq8g (example - needs verification)
export const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || ''

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration?: string
  viewCount?: string
}

export interface YouTubePlaylist {
  id: string
  title: string
  description: string
  thumbnail: string
  itemCount: number
  videos?: YouTubeVideo[]
}

// YouTube Data API v3 Key
// Get it from: https://console.cloud.google.com/
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''

// Helper to check if API is configured
export function isYouTubeConfigured(): boolean {
  return !!(YOUTUBE_API_KEY && YOUTUBE_CHANNEL_ID)
}

// Get channel ID from username/handle
export async function getChannelIdByHandle(handle: string): Promise<string | null> {
  try {
    // Try with @ handle
    const searchHandle = handle.startsWith('@') ? handle.substring(1) : handle
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchHandle}&type=channel&maxResults=1&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      console.error('YouTube API error:', response.statusText)
      return null
    }
    
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.channelId
    }
    
    return null
  } catch (error) {
    console.error('Error fetching channel ID:', error)
    return null
  }
}

export async function getChannelPlaylists(channelId?: string): Promise<YouTubePlaylist[]> {
  try {
    const targetChannelId = channelId || YOUTUBE_CHANNEL_ID
    
    if (!targetChannelId || !YOUTUBE_API_KEY) {
      console.warn('YouTube API not configured, using mock data')
      return getMockPlaylists()
    }
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${targetChannelId}&maxResults=50&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      console.error('YouTube API error:', response.statusText)
      return getMockPlaylists()
    }
    
    const data = await response.json()
    
    return data.items?.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      itemCount: item.contentDetails.itemCount
    })) || []
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return getMockPlaylists()
  }
}

export async function getPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
  try {
    let allVideos: YouTubeVideo[] = []
    let nextPageToken = ''
    
    // Paginate to get ALL videos in the playlist
    do {
      const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : ''
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50${pageParam}&key=${YOUTUBE_API_KEY}`
      )
      
      if (!response.ok) {
        if (allVideos.length > 0) return allVideos
        return getMockVideos()
      }
      
      const data = await response.json()
      
      const videos = data.items?.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url || '',
        publishedAt: item.snippet.publishedAt
      })).filter((v: YouTubeVideo) => v.title !== 'Private video' && v.title !== 'Deleted video') || []
      
      allVideos = [...allVideos, ...videos]
      nextPageToken = data.nextPageToken || ''
    } while (nextPageToken)
    
    return allVideos
  } catch (error) {
    console.error('Error fetching playlist videos:', error)
    return getMockVideos()
  }
}

export async function getChannelVideos(channelId?: string): Promise<YouTubeVideo[]> {
  try {
    const targetChannelId = channelId || YOUTUBE_CHANNEL_ID
    
    if (!targetChannelId || !YOUTUBE_API_KEY) {
      console.warn('YouTube API not configured, using mock data')
      return getMockVideos()
    }
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${targetChannelId}&maxResults=20&order=date&type=video&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      return getMockVideos()
    }
    
    const data = await response.json()
    
    return data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt
    })) || []
  } catch (error) {
    console.error('Error fetching channel videos:', error)
    return getMockVideos()
  }
}

// Mock data for development/demo (when API key is not available)
function getMockPlaylists(): YouTubePlaylist[] {
  return [
    {
      id: 'playlist1',
      title: 'Quran Recitation - Juz 1-10',
      description: 'Beautiful recitation of the first 10 Juz of the Holy Quran',
      thumbnail: '/assets/images/service/1.jpg',
      itemCount: 10
    },
    {
      id: 'playlist2',
      title: 'Quran Recitation - Juz 11-20',
      description: 'Beautiful recitation of Juz 11-20 of the Holy Quran',
      thumbnail: '/assets/images/service/3.jpg',
      itemCount: 10
    },
    {
      id: 'playlist3',
      title: 'Quran Recitation - Juz 21-30',
      description: 'Beautiful recitation of the last 10 Juz of the Holy Quran',
      thumbnail: '/assets/images/service/6.jpg',
      itemCount: 10
    },
    {
      id: 'playlist4',
      title: 'Tajweed Lessons',
      description: 'Learn proper Quranic recitation with Tajweed rules',
      thumbnail: '/assets/images/service/Tajweed-e-Quran-Courses.jpg',
      itemCount: 15
    }
  ]
}

function getMockVideos(): YouTubeVideo[] {
  return [
    {
      id: 'video1',
      title: 'Surah Al-Fatiha - Beautiful Recitation',
      description: 'Recitation of Surah Al-Fatiha with translation',
      thumbnail: '/assets/images/service/1.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'video2',
      title: 'Surah Al-Baqarah - Part 1',
      description: 'Beautiful recitation of Surah Al-Baqarah',
      thumbnail: '/assets/images/service/3.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'video3',
      title: 'Ayatul Kursi - Full Recitation',
      description: 'The greatest verse of the Quran - Ayatul Kursi',
      thumbnail: '/assets/images/service/6.jpg',
      publishedAt: new Date().toISOString()
    }
  ]
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export function formatViewCount(count: string): string {
  const num = parseInt(count)
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return count
}
