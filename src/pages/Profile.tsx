import React from 'react';
import { useRunStore } from '../store/useRunStore';

export const Profile = () => {
    const { history, achievements } = useRunStore();
    const totalDist = history.reduce((acc, r) => acc + r.distance, 0);

    return (
        <div className="pb-24 bg-background-dark min-h-screen">
            <header className="flex justify-between items-center p-6 pb-2 sticky top-0 z-40 backdrop-blur-md">
                <span className="material-symbols-outlined text-white p-2 rounded-full bg-white/5">settings</span>
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Elite Profile</span>
                <span className="material-symbols-outlined text-white p-2 rounded-full bg-white/5">ios_share</span>
            </header>

            <div className="flex flex-col items-center pt-8 px-4">
                <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-primary rounded-full blur opacity-40"></div>
                    <div className="relative size-32 rounded-full border-2 border-primary p-1 bg-background-dark">
                        <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                            alt="Alex" 
                            className="w-full h-full rounded-full bg-zinc-800"
                        />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-primary p-1 rounded-full border-2 border-black">
                        <span className="material-symbols-outlined text-[14px] text-white">verified</span>
                    </div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Alex Rivera</h1>
                <div className="flex items-center gap-1 mt-1 text-white/60">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span className="text-xs font-medium">Los Angeles, CA</span>
                </div>
                <div className="mt-4 px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider">
                    Premium Member
                </div>
            </div>

            {/* Trophies */}
            <div className="mt-8 px-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Trophy Vault</h3>
                    <span className="text-xs font-bold text-primary uppercase">View All</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {achievements.map(ach => (
                         <div key={ach.id} className="min-w-[140px] bg-card-dark border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center">
                            <div className={`size-16 rounded-full bg-gradient-to-br mb-3 flex items-center justify-center text-3xl shadow-lg
                                ${ach.color === 'gold' ? 'from-yellow-300 to-yellow-600 shadow-yellow-500/20' : 
                                  ach.color === 'bronze' ? 'from-orange-300 to-orange-700 shadow-orange-500/20' :
                                  'from-zinc-300 to-zinc-500 shadow-zinc-500/20'}`}>
                                <span className="material-symbols-outlined text-white text-[32px]">{ach.icon}</span>
                            </div>
                            <p className="text-sm font-bold">{ach.title}</p>
                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold">Unlocked</p>
                        </div>
                    ))}
                    {/* Locked Placeholder */}
                    <div className="min-w-[140px] bg-card-dark border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center opacity-50 grayscale">
                        <div className="size-16 rounded-full bg-zinc-800 mb-3 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white/40 text-[32px]">lock</span>
                        </div>
                        <p className="text-sm font-bold">Marathon</p>
                        <p className="text-[10px] text-white/40 mt-1 uppercase font-bold">Locked</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="mt-4 px-6">
                 <h3 className="font-bold text-lg mb-4">Yearly Overview</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card-dark border border-white/5 rounded-2xl p-5 border-l-2 border-l-primary">
                        <span className="text-[10px] uppercase font-bold text-white/50 block mb-1">Distance</span>
                        <span className="text-2xl font-bold">{totalDist.toFixed(1)}</span>
                        <span className="text-[10px] ml-1 text-white/40">KM</span>
                    </div>
                    <div className="bg-card-dark border border-white/5 rounded-2xl p-5">
                        <span className="text-[10px] uppercase font-bold text-white/50 block mb-1">Activities</span>
                        <span className="text-2xl font-bold">{history.length}</span>
                        <span className="text-[10px] ml-1 text-white/40">Runs</span>
                    </div>
                 </div>
            </div>
        </div>
    );
};
