'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { 
  getChannelPlaylists, 
  getChannelVideos, 
  getPlaylistVideos,
  YOUTUBE_CHANNEL_ID, 
  YOUTUBE_CHANNEL_HANDLE,
  YouTubePlaylist, 
  YouTubeVideo 
} from '@/lib/youtube'

export default function QuranRecitationPage() {
  const searchParams = useSearchParams()
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([])
  const [allVideos, setAllVideos] = useState<YouTubeVideo[]>([])
  const [currentPlaylist, setCurrentPlaylist] = useState<YouTubePlaylist | null>(null)
  const [playlistVideos, setPlaylistVideos] = useState<YouTubeVideo[]>([])
  const [currentVideo, setCurrentVideo] = useState<YouTubeVideo | null>(null)
  const [view, setView] = useState<'all' | 'playlists'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const videoId = searchParams.get('video')
    const playlistId = searchParams.get('playlist')
    
    if (videoId && allVideos.length > 0) {
      const video = allVideos.find(v => v.id === videoId)
      if (video) setCurrentVideo(video)
    }
    
    if (playlistId && playlists.length > 0) {
      const playlist = playlists.find(p => p.id === playlistId)
      if (playlist) {
        setCurrentPlaylist(playlist)
        setView('playlists')
        loadPlaylistVideos(playlistId)
      }
    }
  }, [searchParams, allVideos, playlists])

  const loadData = async () => {
    setLoading(true)
    const playlistsData = await getChannelPlaylists(YOUTUBE_CHANNEL_ID)
    const videosData = await getChannelVideos(YOUTUBE_CHANNEL_ID)
    
    setPlaylists(playlistsData)
    setAllVideos(videosData)
    
    // Set first video as current if none selected
    if (videosData.length > 0 && !currentVideo) {
      setCurrentVideo(videosData[0])
    }
    
    setLoading(false)
  }

  const loadPlaylistVideos = async (playlistId: string) => {
    const videos = await getPlaylistVideos(playlistId)
    setPlaylistVideos(videos)
    if (videos.length > 0) {
      setCurrentVideo(videos[0])
    }
  }

  const handlePlaylistClick = async (playlist: YouTubePlaylist) => {
    setCurrentPlaylist(playlist)
    setView('playlists')
    await loadPlaylistVideos(playlist.id)
  }

  const handleVideoClick = (video: YouTubeVideo) => {
    setCurrentVideo(video)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading Quranic recitations...</p>
        </div>
      </div>
    )
  }

  const videosToShow = view === 'playlists' ? playlistVideos : allVideos

  return (
    <>
      {/* Page Header */}
      <div className="page-header" style={{ 
        background: 'linear-gradient(135deg, #1a5f3c 0%, #2d8a5e 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="text-white mb-2">
                <i className="fa fa-youtube-play text-danger me-3"></i>
                Quranic Recitations
              </h1>
              <p className="text-white-50 mb-0">by Qari Arslan Butt</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <a 
                href={`https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger"
              >
                <i className="fa fa-youtube me-2"></i>
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="quran-recitation-page py-5">
        <div className="container-fluid">
          <div className="row">
            {/* Video Player Section */}
            <div className="col-lg-8 mb-4">
              <div className="video-player-container">
                {currentVideo && (
                  <>
                    <div className="player-wrapper">
                      <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=0&rel=0`}
                        title={currentVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="video-details">
                      <h2 className="video-title">{currentVideo.title}</h2>
                      <div className="video-meta mb-3">
                        <span className="text-muted">
                          <i className="fa fa-calendar me-2"></i>
                          {new Date(currentVideo.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {currentVideo.description && (
                        <div className="video-description">
                          <p className="text-muted">{currentVideo.description}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* View Toggle */}
              <div className="view-toggle-section mt-4">
                <div className="btn-group w-100" role="group">
                  <button
                    type="button"
                    className={`btn ${view === 'all' ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => setView('all')}
                  >
                    <i className="fa fa-video-camera me-2"></i>
                    All Videos ({allVideos.length})
                  </button>
                  <button
                    type="button"
                    className={`btn ${view === 'playlists' ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => setView('playlists')}
                  >
                    <i className="fa fa-list-ul me-2"></i>
                    Playlists ({playlists.length})
                  </button>
                </div>
              </div>

              {/* Playlists Grid (when in playlist view) */}
              {view === 'playlists' && !currentPlaylist && (
                <div className="playlists-grid mt-4">
                  <h3 className="mb-4">Choose a Playlist</h3>
                  <div className="row">
                    {playlists.map((playlist, index) => (
                      <div key={index} className="col-md-6 mb-4">
                        <div 
                          className="playlist-card cursor-pointer"
                          onClick={() => handlePlaylistClick(playlist)}
                        >
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
                                <i className="fa fa-play-circle me-2"></i>
                                {playlist.itemCount} videos
                              </div>
                            </div>
                          </div>
                          <div className="playlist-info">
                            <h5>{playlist.title}</h5>
                            <p className="text-muted small mb-0">{playlist.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Playlist Header + Videos Grid */}
              {view === 'playlists' && currentPlaylist && (
                <div className="mt-4">
                  <div className="current-playlist-header p-3 bg-light rounded mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-1">{currentPlaylist.title}</h4>
                        <p className="text-muted small mb-0">
                          {playlistVideos.length} videos • {currentPlaylist.description}
                        </p>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setCurrentPlaylist(null)
                          setPlaylistVideos([])
                        }}
                      >
                        <i className="fa fa-arrow-left me-2"></i>
                        Back to Playlists
                      </button>
                    </div>
                  </div>

                  {/* All Playlist Videos Grid */}
                  <div className="row">
                    {playlistVideos.map((video, index) => (
                      <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                        <div 
                          className={`playlist-video-card ${currentVideo?.id === video.id ? 'active-card' : ''}`}
                          onClick={() => handleVideoClick(video)}
                        >
                          <div className="pv-thumbnail position-relative">
                            <Image 
                              src={video.thumbnail} 
                              alt={video.title}
                              width={400}
                              height={225}
                              className="w-100"
                            />
                            <div className="pv-play-btn">
                              <i className="fa fa-play-circle"></i>
                            </div>
                            <div className="pv-number">{index + 1}</div>
                            {currentVideo?.id === video.id && (
                              <div className="pv-now-playing">
                                <i className="fa fa-volume-up me-1"></i> Now Playing
                              </div>
                            )}
                          </div>
                          <div className="pv-info">
                            <h6>{video.title}</h6>
                            <small className="text-muted">
                              <i className="fa fa-calendar me-1"></i>
                              {new Date(video.publishedAt).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Video List */}
            <div className="col-lg-4">
              <div className="video-list-sidebar">
                <div className="sidebar-header sticky-top bg-white p-3 border-bottom">
                  <h5 className="mb-0">
                    {view === 'playlists' && currentPlaylist 
                      ? currentPlaylist.title 
                      : 'All Videos'}
                  </h5>
                  <small className="text-muted">
                    {videosToShow.length} video{videosToShow.length !== 1 ? 's' : ''}
                  </small>
                </div>
                <div className="videos-scroll">
                  {videosToShow.map((video, index) => (
                    <div
                      key={index}
                      className={`video-list-item ${currentVideo?.id === video.id ? 'active' : ''}`}
                      onClick={() => handleVideoClick(video)}
                    >
                      <div className="d-flex gap-3">
                        <div className="video-thumbnail-small position-relative">
                          <Image 
                            src={video.thumbnail} 
                            alt={video.title}
                            width={120}
                            height={68}
                            className="rounded"
                          />
                          <div className="play-overlay">
                            <i className="fa fa-play-circle"></i>
                          </div>
                        </div>
                        <div className="video-info-small flex-grow-1">
                          <h6 className="mb-1 video-title-small">{video.title}</h6>
                          <small className="text-muted d-block">
                            {new Date(video.publishedAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          margin-bottom: 0;
        }

        .video-player-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .player-wrapper {
          position: relative;
          width: 100%;
          background: #000;
        }

        .player-wrapper iframe {
          border-radius: 12px 12px 0 0;
        }

        .video-details {
          padding: 2rem;
        }

        .video-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .video-meta {
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .video-description {
          margin-top: 1rem;
        }

        .playlist-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .playlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .playlist-thumbnail {
          position: relative;
          overflow: hidden;
        }

        .playlist-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 1rem;
        }

        .video-count {
          background: rgba(220, 38, 38, 0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: inline-block;
          font-weight: bold;
        }

        .playlist-info {
          padding: 1rem;
        }

        .playlist-info h5 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .video-list-sidebar {
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          max-height: 800px;
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          border-radius: 12px 12px 0 0;
        }

        .videos-scroll {
          overflow-y: auto;
          max-height: 700px;
        }

        .video-list-item {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .video-list-item:hover {
          background: #f8f9fa;
        }

        .video-list-item.active {
          background: #fee;
          border-left: 4px solid #dc2626;
        }

        .video-thumbnail-small {
          flex-shrink: 0;
        }

        .play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 2rem;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .video-list-item:hover .play-overlay {
          opacity: 1;
        }

        .video-title-small {
          font-size: 0.9rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .playlist-video-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }

        .playlist-video-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .playlist-video-card.active-card {
          border: 2px solid #dc2626;
          box-shadow: 0 5px 20px rgba(220,38,38,0.25);
        }

        .pv-thumbnail {
          overflow: hidden;
        }

        .pv-thumbnail img {
          transition: transform 0.3s ease;
        }

        .playlist-video-card:hover .pv-thumbnail img {
          transform: scale(1.05);
        }

        .pv-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          color: rgba(255,255,255,0.9);
          opacity: 0;
          transition: opacity 0.3s ease;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        .playlist-video-card:hover .pv-play-btn {
          opacity: 1;
        }

        .pv-number {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0,0,0,0.75);
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .pv-now-playing {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: #dc2626;
          color: white;
          font-size: 0.7rem;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .pv-info {
          padding: 0.75rem 1rem;
        }

        .pv-info h6 {
          font-size: 0.85rem;
          margin-bottom: 0.3rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 991px) {
          .player-wrapper iframe {
            height: 300px;
          }

          .video-list-sidebar {
            max-height: 500px;
          }

          .videos-scroll {
            max-height: 400px;
          }
        }
      `}</style>
    </>
  )
}
