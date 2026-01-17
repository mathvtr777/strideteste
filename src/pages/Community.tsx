import React from 'react';

export const Community = () => {
  return (
    <div className="pb-24 pt-4">
      <nav className="sticky top-0 z-50 bg-background-dark/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight">COMMUNITY</h1>
        <div className="size-9 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
            <span className="text-xs font-bold">AR</span>
        </div>
      </nav>

      {/* Stories */}
      <div className="w-full py-6 px-4 overflow-x-auto no-scrollbar border-b border-white/5">
        <div className="flex items-center gap-5 min-w-max">
            <div className="flex flex-col items-center gap-2">
                <div className="size-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/40">add</span>
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase">You</span>
            </div>
            
            {['Sarah', 'Mike', 'Elena'].map((name, i) => (
                <div key={name} className="flex flex-col items-center gap-2">
                    <div className={`size-16 rounded-full p-0.5 ${i < 2 ? 'bg-primary animate-pulse' : 'bg-white/10'}`}>
                        <div className="w-full h-full rounded-full bg-zinc-800 border-2 border-black overflow-hidden relative">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} className="w-full h-full object-cover" />
                             {i < 2 && <div className="absolute bottom-0 inset-x-0 bg-primary text-[8px] font-bold text-center uppercase py-0.5">Live</div>}
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase">{name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-6 p-4 mt-2">
        {[1, 2].map((post) => (
            <div key={post} className="bg-card-dark rounded-xl overflow-hidden border border-white/5">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-zinc-700 overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${post}`} alt="User" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Runner {post}</h3>
                            <p className="text-[10px] text-white/40 font-bold uppercase">2 Hours Ago</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-white/40">more_horiz</span>
                </div>
                
                <div className="h-48 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(140,48,232,0.2)_1px,transparent_1px)] [background-size:20px_20px]"></div>
                    <svg className="w-3/4 h-3/4 text-primary drop-shadow-[0_0_8px_rgba(140,48,232,0.8)]" viewBox="0 0 100 50">
                        <path d={`M10,40 Q30,${post * 10} 50,25 T90,10`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="grid grid-cols-3 divide-x divide-white/5 bg-white/5 py-4">
                    <div className="text-center">
                        <span className="text-[10px] uppercase text-white/40 font-bold block">Dist</span>
                        <span className="font-bold">5.2 km</span>
                    </div>
                    <div className="text-center">
                        <span className="text-[10px] uppercase text-white/40 font-bold block">Pace</span>
                        <span className="font-bold">5:30</span>
                    </div>
                    <div className="text-center">
                        <span className="text-[10px] uppercase text-white/40 font-bold block">Time</span>
                        <span className="font-bold">28:10</span>
                    </div>
                </div>

                <div className="p-4">
                    <p className="text-sm italic text-white/80 mb-4">"Great morning for a quick sprint session!"</p>
                    <div className="flex gap-6 border-t border-white/5 pt-3">
                        <button className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-lg">favorite</span>
                            <span className="text-xs font-bold">24</span>
                        </button>
                        <button className="flex items-center gap-2 text-white/40">
                            <span className="material-symbols-outlined text-lg">chat_bubble</span>
                            <span className="text-xs font-bold">2</span>
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
