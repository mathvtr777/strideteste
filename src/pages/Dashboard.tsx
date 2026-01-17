import React from 'react';
import { Link } from 'react-router-dom';
import { useRunStore } from '../store/useRunStore';
import { formatDuration, formatPace } from '../lib/utils';

export const Dashboard = () => {
  const { history, goals } = useRunStore();

  // Calculate Weekly Stats
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const thisWeekRuns = history.filter(run => new Date(run.startTime) >= startOfWeek);
  
  const weeklyDist = thisWeekRuns.reduce((acc, curr) => acc + curr.distance, 0);
  const weeklyTime = thisWeekRuns.reduce((acc, curr) => acc + curr.duration, 0);
  const progressPercent = Math.min((weeklyDist / goals.weeklyDistance) * 100, 100);

  return (
    <div className="flex flex-col gap-6 px-6 pb-32 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="size-10 rounded-full border-2 border-primary p-0.5">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Profile" 
                className="h-full w-full rounded-full bg-zinc-800"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background-dark bg-green-500"></div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/50">Welcome back</p>
            <h1 className="text-sm font-bold tracking-tight">Alex Rivera</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex size-10 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white/80">notifications</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">This Week</h2>
          <span className="text-[10px] text-primary font-bold">Goal: {goals.weeklyDistance}km</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Main Dist Card */}
          <div className="col-span-2 flex flex-col justify-between rounded-xl bg-card-dark border border-white/5 p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <div className="flex items-center justify-between relative z-10">
              <p className="text-sm text-white/60">Total Distance</p>
              <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
            </div>
            <div className="mt-4 flex items-baseline gap-2 relative z-10">
              <span className="text-4xl font-bold tracking-tighter drop-shadow-[0_0_10px_rgba(140,48,232,0.3)]">
                {weeklyDist.toFixed(1)}
              </span>
              <span className="text-lg text-white/40">km</span>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-white/5 overflow-hidden relative z-10">
              <div 
                className="h-full rounded-full bg-primary shadow-[0_0_8px_rgba(140,48,232,0.6)] transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-card-dark border border-white/5 p-4">
            <span className="material-symbols-outlined text-primary/80 text-lg">timer</span>
            <p className="text-xs text-white/40 mt-1">Time</p>
            <p className="text-xl font-bold">{formatDuration(weeklyTime)}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-card-dark border border-white/5 p-4">
            <span className="material-symbols-outlined text-primary/80 text-lg">elevation</span>
            <p className="text-xs text-white/40 mt-1">Elevation</p>
            <p className="text-xl font-bold">128m</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Link to="/run" className="group relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-neon opacity-90 transition-opacity group-hover:opacity-100"></div>
        <div className="relative flex w-full items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
              <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
            </div>
            <div className="text-left">
              <p className="text-lg font-bold tracking-tight text-white">START RUN</p>
              <p className="text-xs text-white/70">GPS Connected • Ready to go</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-white/50 group-hover:translate-x-1 transition-transform">chevron_right</span>
        </div>
      </Link>

      {/* Recent Activity */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Recent Activities</h2>
          <Link to="/history" className="text-xs text-primary font-medium hover:underline">View All</Link>
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl">
            <p className="text-white/40 text-sm">No runs yet. Start your journey!</p>
          </div>
        ) : (
          history.slice(0, 3).map((run) => (
            <div key={run.id} className="group flex flex-col rounded-2xl bg-card-dark border border-white/5 overflow-hidden transition-all hover:border-primary/30">
               {/* Visual placeholder for Map */}
               <div className="relative h-32 w-full bg-zinc-900 overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(#8c30e8_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                 {/* Simple SVG Line to mock route */}
                 <svg className="absolute inset-0 w-full h-full text-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M10,80 Q30,70 50,50 T90,20" fill="none" stroke="currentColor" strokeWidth="2" className="drop-shadow-[0_0_5px_rgba(140,48,232,0.8)]"/>
                 </svg>
                 <div className="absolute bottom-3 left-3">
                   <span className="inline-flex items-center rounded-md bg-primary/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase text-primary border border-primary/20">
                     {run.type}
                   </span>
                 </div>
               </div>
               
               <div className="p-4">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="text-base font-bold leading-tight">Evening Run</h3>
                     <p className="text-xs text-white/40 mt-1">{new Date(run.startTime).toLocaleDateString()} • {new Date(run.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                   </div>
                   <div className="flex -space-x-2">
                      {/* Fake Avatars for "friends" kudos mock */}
                      <div className="size-5 rounded-full bg-gray-600 border border-card-dark"></div>
                      <div className="size-5 rounded-full bg-gray-500 border border-card-dark"></div>
                   </div>
                 </div>
                 
                 <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/5 pt-3">
                    <div>
                      <p className="text-[10px] uppercase text-white/40 tracking-wider">Distance</p>
                      <p className="font-bold text-sm">{run.distance.toFixed(2)} <span className="text-[10px] text-white/40">km</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-white/40 tracking-wider">Time</p>
                      <p className="font-bold text-sm">{formatDuration(run.duration)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-white/40 tracking-wider">Pace</p>
                      <p className="font-bold text-sm">{formatPace(run.avgPace)} <span className="text-[10px] text-white/40">/km</span></p>
                    </div>
                 </div>
               </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};
