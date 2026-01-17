import React from 'react';
import { useRunStore } from '../store/useRunStore';
import { formatDuration, formatPace } from '../lib/utils';
import { Link } from 'react-router-dom';

export const History = () => {
  const { history } = useRunStore();
  const totalKm = history.reduce((acc, curr) => acc + curr.distance, 0);

  return (
    <div className="px-6 py-6 pb-24">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">History</h1>
        <p className="text-white/40 text-sm">Your running journey so far</p>
      </header>

      {/* Monthly Summary */}
      <div className="mb-8 p-6 bg-card-dark rounded-2xl border border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full -mr-10 -mt-10"></div>
         <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-1">All Time Distance</p>
         <div className="flex items-baseline gap-2">
           <span className="text-5xl font-bold tracking-tighter text-white italic">{totalKm.toFixed(1)}</span>
           <span className="text-primary text-xl font-bold">km</span>
         </div>
         <div className="mt-4 flex gap-2">
            <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold border border-white/5">{history.length} Runs</span>
            <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold border border-white/5">Best: 10k</span>
         </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Activity Log</h2>
        <button className="text-primary text-xs font-bold flex items-center gap-1">FILTER <span className="material-symbols-outlined text-sm">tune</span></button>
      </div>

      <div className="flex flex-col gap-4">
        {history.length === 0 && <p className="text-center text-white/30 py-10">No activities found.</p>}
        
        {history.map((run) => (
            <div key={run.id} className="bg-card-dark rounded-2xl border border-white/5 p-4 flex gap-4 hover:border-primary/30 transition-colors cursor-pointer group">
                <div className="size-20 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <span className="material-symbols-outlined text-white/20 text-3xl">map</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wide">{new Date(run.startTime).toLocaleDateString()}</p>
                            <h3 className="font-bold text-lg leading-none mt-1">{run.type}</h3>
                        </div>
                        <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                    <div className="flex items-center gap-4 border-t border-white/5 pt-2 mt-1">
                        <div>
                            <span className="text-[9px] text-white/30 uppercase block">Dist</span>
                            <span className="text-sm font-bold">{run.distance.toFixed(1)} km</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div>
                            <span className="text-[9px] text-white/30 uppercase block">Time</span>
                            <span className="text-sm font-bold">{formatDuration(run.duration)}</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div>
                            <span className="text-[9px] text-white/30 uppercase block">Pace</span>
                            <span className="text-sm font-bold text-primary italic">{formatPace(run.avgPace)}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
