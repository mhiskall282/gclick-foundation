import React, { useState, useEffect } from 'react';
import { Terminal, Play, Folder, FileVideo, Activity, Sparkles, Monitor, Info } from 'lucide-react';

interface VideoNode {
  id: string | number;
  title: string;
  video_url: string;
  description: string;
}

const MediaConsole = () => {
  const [videos, setVideos] = useState<VideoNode[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoNode | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch('/api/labs')
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        if (data.length > 0) setSelectedVideo(data[0]);
      })
      .catch(err => console.error('Error fetching labs:', err));
  }, []);

  useEffect(() => {
    if (!selectedVideo) return;
    // Generate simulated terminal logs for video node mounting
    const newLogs = [
      `[CONSOLE] Fetching node resource: ${selectedVideo.title}...`,
      `[PEER] Connecting to global CDN cluster: active-02`,
      `[BUFFER] Initializing direct audio/video streaming buffer`,
      `[READY] Payload size checked. Stream status: ONLINE (1080p, 60fps)`,
      `[METRIC] RTT latency: ${Math.floor(Math.random() * 20) + 15}ms | Packets: 0% loss`
    ];
    setConsoleLogs(newLogs);
    setIsPlaying(false);
  }, [selectedVideo]);

  return (
    <section id="media-deck" className="py-24 bg-brand-dark-obsidian text-white border-b border-brand-dark-border/50 relative overflow-hidden supabase-grid">
      {/* Back glow */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-brand-pink/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 reveal-on-scroll">
          <span className="inline-flex items-center text-xs uppercase tracking-wider text-brand-pink font-bold bg-brand-pink/10 px-4 py-2 rounded-full border border-brand-pink/20">
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            Media Terminal
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            Interactive Live Labs
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Configure your focus stack and tune in to interactive developer workflows directly inside the G-Click sandbox console.
          </p>
        </div>

        {/* Console Container */}
        <div className="w-full bg-brand-dark-card border border-brand-dark-border rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 reveal-on-scroll hover-border-glow">
          
          {/* Left Column: Explorer Tree Sidebar */}
          <div className="lg:col-span-3 bg-brand-dark-obsidian/45 border-r border-brand-dark-border flex flex-col p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest flex items-center">
                <Monitor className="h-3.5 w-3.5 mr-2 text-brand-pink" />
                EXPLORER : STACK
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-xs font-semibold text-gray-400 gap-1.5">
                <Folder className="h-4 w-4 text-brand-purple" />
                <span>gclick-video-nodes</span>
              </div>

              <div className="pl-4 space-y-1.5 border-l border-brand-dark-border/60 ml-2">
                {videos.map((vid) => {
                  const isActive = selectedVideo && vid.id === selectedVideo.id;
                  return (
                    <button
                      key={vid.id}
                      onClick={() => setSelectedVideo(vid)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${
                        isActive
                          ? 'bg-brand-pink/10 text-brand-pink border border-brand-pink/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <FileVideo className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-brand-pink' : 'text-gray-500'}`} />
                      <span className="truncate">{vid.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected File Meta Card */}
            {selectedVideo && (
              <div className="mt-auto bg-brand-dark-obsidian border border-brand-dark-border p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-1.5 text-brand-pink font-bold text-[10px] uppercase tracking-wider">
                  <Info className="h-3.5 w-3.5" />
                  Description
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                  {selectedVideo.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Code Editor & Frame Player */}
          <div className="lg:col-span-9 flex flex-col min-h-[480px]">
            {/* Tab Header bar */}
            <div className="h-12 bg-brand-dark-obsidian border-b border-brand-dark-border flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
              </div>
              
              {/* Tab Node Title */}
              <div className="bg-brand-dark-card border-x border-t border-brand-dark-border rounded-t-xl px-4 py-2 text-xs font-mono font-bold text-white flex items-center gap-2 -mb-2 mt-2">
                <FileVideo className="h-3.5 w-3.5 text-brand-pink" />
                {selectedVideo?.title || 'Loading...'}
              </div>

              <div className="text-[10px] text-gray-500 font-mono font-bold">
                STREAMING_LIVE_IDE
              </div>
            </div>

            {/* Video Player Display */}
            <div className="flex-grow bg-black relative flex items-center justify-center group/player">
              {!isPlaying && selectedVideo ? (
                <div className="absolute inset-0 z-20 bg-brand-dark-obsidian/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white flex items-center justify-center shadow-lg shadow-brand-pink/30 hover:scale-110 transition-all duration-300 relative z-30"
                  >
                    <Play className="h-6 w-6 fill-white ml-1" />
                  </button>
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-white">{selectedVideo.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Click to boot virtual stream</p>
                  </div>
                </div>
              ) : null}

              {isPlaying && selectedVideo && (
                <iframe
                  className="w-full h-full absolute inset-0 z-10 border-0"
                  src={`${selectedVideo.video_url}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Footer Terminal Panel */}
            <div className="bg-brand-dark-obsidian border-t border-brand-dark-border p-5 font-mono text-[10px] sm:text-xs leading-relaxed text-gray-500 text-left space-y-2 select-none">
              <div className="flex items-center justify-between border-b border-brand-dark-border/40 pb-2 mb-2">
                <span className="text-gray-400 font-bold flex items-center">
                  <Terminal className="h-3.5 w-3.5 mr-1.5 text-brand-pink" />
                  PEER CONNECTION STREAM LOGS
                </span>
                <span className="text-brand-pink font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                  <Activity className="h-3.5 w-3.5 animate-pulse text-brand-pink" />
                  STATUS: SECURED
                </span>
              </div>
              <div className="space-y-1">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="text-gray-400">
                    <span className="text-brand-purple mr-1.5">›</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MediaConsole;
