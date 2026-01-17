import React, { useEffect, useRef, useState } from 'react';
import { useRunStore } from '../store/useRunStore';
import { formatDuration, formatPace } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export const RunTracker = () => {
  const navigate = useNavigate();
  const { 
    isTracking, 
    isPaused, 
    startRun, 
    pauseRun, 
    resumeRun, 
    stopRun, 
    addGPSPoint, 
    tickTimer, 
    currentStats 
  } = useRunStore();

  const [gpsError, setGpsError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);
  const timerId = useRef<number | null>(null);

  // Initialize tracking on mount if not already started
  useEffect(() => {
    if (!isTracking) {
      startRun();
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (isTracking && !isPaused) {
      timerId.current = window.setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [isTracking, isPaused, tickTimer]);

  // Geolocation Effect
  useEffect(() => {
    if (isTracking && !isPaused) {
      if (!navigator.geolocation) {
        setGpsError("Geolocation not supported");
        return;
      }

      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          setGpsError(null);
          addGPSPoint({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
            speed: position.coords.speed
          });
        },
        (error) => {
          console.error("GPS Error", error);
          setGpsError("Weak GPS Signal");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
        if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    }

    return () => {
        if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };
  }, [isTracking, isPaused, addGPSPoint]);

  const handleFinish = () => {
    stopRun();
    navigate('/history');
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-zinc-900 text-white flex flex-col">
      {/* Background Map Placeholder */}
      <div className="absolute inset-0 z-0">
         {/* In a real app, MapLibreGL component goes here */}
         <div 
           className="w-full h-full bg-cover bg-center grayscale opacity-60" 
           style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')",
             filter: "grayscale(100%) contrast(1.2) brightness(0.4)"
            }}
         ></div>
         
         {/* Simulated Route Line (Visual Feedback) */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
             <defs>
                 <filter id="glow">
                     <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                     <feMerge>
                         <feMergeNode in="coloredBlur"/>
                         <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                 </filter>
             </defs>
             {/* Mock visual line for MVP since we don't have map tiles to map lat/lng to pixels easily without a library */}
             <path 
                d="M 50 400 Q 150 350 200 250 T 350 150" 
                fill="none" 
                stroke="#8c30e8" 
                strokeWidth="4" 
                filter="url(#glow)"
                className="animate-pulse-slow"
             />
             <circle cx="350" cy="150" r="6" fill="white" className="animate-pulse" />
         </svg>
         
         {/* Gradient Overlay for Readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark/90 pointer-events-none"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 pt-8">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
          <div className="size-2.5 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Live Tracking</span>
        </div>
        {gpsError && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-500/20 text-red-200 text-xs px-3 py-1 rounded-full border border-red-500/50">
                {gpsError}
            </div>
        )}
      </header>

      {/* Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-3 px-6 mt-4">
        {/* Main Distance */}
        <div className="col-span-2 flex flex-col items-center justify-center py-8 bg-surface-dark/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-lg">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-1">Total Distance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                {currentStats.distance.toFixed(2)}
            </span>
            <span className="text-xl font-medium text-white/40">km</span>
          </div>
        </div>

        {/* Pace */}
        <div className="flex flex-col gap-1 p-5 bg-surface-dark/60 backdrop-blur-xl rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <span className="material-symbols-outlined text-sm">speed</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Pace</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold italic">{formatPace(currentStats.pace)}</span>
            <span className="text-[10px] font-medium text-white/40">/km</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1 p-5 bg-surface-dark/60 backdrop-blur-xl rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <span className="material-symbols-outlined text-sm">timer</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Duration</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tabular-nums">{formatDuration(currentStats.duration)}</span>
          </div>
        </div>
      </div>
      
      {/* Floating BPM (Mock) */}
      <div className="relative z-10 mt-6 px-6 flex justify-end">
        <div className="flex items-center gap-3 px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full animate-pulse-slow">
            <span className="material-symbols-outlined text-primary text-lg">favorite</span>
            <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold">164</span>
            <span className="text-[10px] opacity-60 font-bold uppercase">bpm</span>
            </div>
        </div>
      </div>

      <div className="flex-grow"></div>

      {/* Controls */}
      <div className="relative z-20 p-6 pb-12 flex flex-col gap-4">
         {!isPaused ? (
             <button 
                onClick={pauseRun}
                className="w-full h-20 bg-primary hover:bg-primary-dark rounded-2xl flex items-center justify-center gap-4 transition-all shadow-[0_0_30px_rgba(140,48,232,0.4)] active:scale-95"
            >
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>pause_circle</span>
                <span className="text-xl font-bold tracking-tight">PAUSE RUN</span>
            </button>
         ) : (
            <div className="flex gap-4">
                 <button 
                    onClick={resumeRun}
                    className="flex-1 h-20 bg-white text-black hover:bg-gray-200 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-3xl text-primary font-bold">play_arrow</span>
                    <span className="text-lg font-bold tracking-tight">RESUME</span>
                </button>
                <button 
                    onClick={handleFinish}
                    className="flex-1 h-20 bg-red-500/20 border border-red-500/50 hover:bg-red-500/30 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-3xl text-red-500">stop</span>
                    <span className="text-lg font-bold tracking-tight text-red-500">FINISH</span>
                </button>
            </div>
         )}
         
         <div className="flex items-center justify-center gap-2 py-2 opacity-40">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Hold to Lock Screen</span>
         </div>
      </div>
    </div>
  );
};
