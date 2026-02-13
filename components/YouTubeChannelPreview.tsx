'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getChannelPlaylists, getChannelVideos, YOUTUBE_CHANNEL_ID, YOUTUBE_CHANNEL_HANDLE, YouTubePlaylist, YouTubeVideo } from '@/lib/youtube'

export default function YouTubeChannelPreview() {
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([])
  const [recentVideos, setRecentVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChannelData()
  }, [])

  const loadChannelData = async () => {
    setLoading(true)
    const playlistsData = await getChannelPlaylists(YOUTUBE_CHANNEL_ID)
    const videosData = await getChannelVideos(YOUTUBE_CHANNEL_ID)
    
    setPlaylists(playlistsData.slice(0, 3)) // Show first 3 playlists
    setRecentVideos(videosData.slice(0, 3)) // Show 3 recent videos
    setLoading(false)
  }

  if (loading) {
    return (
      <section className="youtube-preview-section section-padding" style={{ background: '#000' }}>
        <div className="container">
          <div className="text-center text-white">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading Quranic recitations...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="youtube-preview-section section-padding" style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)' }}>
      <div className="container">
        {/* Channel Header */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <div className="youtube-channel-header">
              <div className="channel-badge mb-3">
                <i className="fa fa-youtube-play" style={{ fontSize: '3rem', color: '#FF0000' }}></i>
              </div>
              <h2 className="text-white mb-2">Quranic Recitations</h2>
              <h3 className="text-white-50 mb-3">by Qari Arslan Butt</h3>
              <p className="text-white-50 mb-4">
                Experience the beauty of Quranic recitation with proper Tajweed. 
                Listen to complete Juz recitations, Surah explanations, and Tajweed lessons.
              </p>
              <div className="channel-stats d-flex justify-content-center gap-4 mb-4">
                <div className="stat-item">
                  <i className="fa fa-video-camera text-danger me-2"></i>
                  <span className="text-white">100+ Videos</span>
                </div>
                <div className="stat-item">
                  <i className="fa fa-list text-danger me-2"></i>
                  <span className="text-white">Multiple Playlists</span>
                </div>
                <div className="stat-item">
                  <i className="fa fa-users text-danger me-2"></i>
                  <span className="text-white">Growing Community</span>
                </div>
              </div>
              <a 
                href={`https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger btn-lg me-3"
              >
                <i className="fa fa-youtube-play me-2"></i>
                Visit Channel
              </a>
              <Link href="/quran-recitation" className="btn btn-outline-light btn-lg">
                <i className="fa fa-play-circle me-2"></i>
                Browse All Videos
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Playlists */}
        <div className="playlists-preview mb-5">
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-white mb-0">
              <i className="fa fa-list-ul me-2 text-danger"></i>
              Featured Playlists
            </h4>
            <Link href="/quran-recitation#playlists" className="text-danger">
              View All <i className="fa fa-arrow-right ms-1"></i>
            </Link>
          </div>
          <div className="row">
            {playlists.map((playlist, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <Link href={`/quran-recitation?playlist=${playlist.id}`}>
                  <div className="playlist-card">
                    <div className="playlist-thumbnail">
                      <Image 
                        src={playlist.thumbnail} 
                        alt={playlist.title}
                        width={400}
                        height={225}
                        className="w-100"
                      />
                      <div className="playlist-overlay">
                        <div className="video-count">
                          <i className="fa fa-play-circle"></i>
                          <span>{playlist.itemCount} videos</span>
                        </div>
                      </div>
                    </div>
                    <div className="playlist-info">
                      <h5 className="text-white">{playlist.title}</h5>
                      <p className="text-white-50 small">{playlist.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Videos */}
        <div className="recent-videos">
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-white mb-0">
              <i className="fa fa-video-camera me-2 text-danger"></i>
              Recent Uploads
            </h4>
            <Link href="/quran-recitation" className="text-danger">
              View All <i className="fa fa-arrow-right ms-1"></i>
            </Link>
          </div>
          <div className="row">
            {recentVideos.map((video, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <Link href={`/quran-recitation?video=${video.id}`}>
                  <div className="video-card">
                    <div className="video-thumbnail">
                      <Image 
                        src={video.thumbnail} 
                        alt={video.title}
                        width={400}
                        height={225}
                        className="w-100"
                      />
                      <div className="play-button">
                        <i className="fa fa-play-circle"></i>
                      </div>
                    </div>
                    <div className="video-info">
                      <h5 className="text-white">{video.title}</h5>
                      <p className="text-white-50 small mb-0">
                        <i className="fa fa-clock-o me-1"></i>
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-padding {
          padding: 80px 0;
        }

        .youtube-channel-header {
          padding: 2rem;
        }

        .channel-badge {
          display: inline-block;
        }

        .channel-stats {
          flex-wrap: wrap;
        }

        .stat-item {
          padding: 0.5rem 1rem;
        }

        .playlist-card,
        .video-card {
          background: #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .playlist-card:hover,
        .video-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3);
        }

        .playlist-thumbnail,
        .video-thumbnail {
          position: relative;
          overflow: hidden;
        }

        .playlist-thumbnail img,
        .video-thumbnail img {
          transition: transform 0.3s ease;
        }

        .playlist-card:hover .playlist-thumbnail img,
        .video-card:hover .video-thumbnail img {
          transform: scale(1.1);
        }

        .playlist-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }

        .video-count {
          background: rgba(255, 0, 0, 0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
        }

        .video-count i {
          margin-right: 0.5rem;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
        }

        .video-card:hover .play-button {
          color: #FF0000;
          transform: translate(-50%, -50%) scale(1.2);
        }

        .playlist-info,
        .video-info {
          padding: 1.5rem;
        }

        .playlist-info h5,
        .video-info h5 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .section-padding {
            padding: 40px 0;
          }

          .channel-stats {
            font-size: 0.9rem;
          }

          .stat-item {
            padding: 0.3rem 0.5rem;
          }
        }
      `}</style>
    </section>
  )
}
