import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export const BottomNav = () => {
  const navItems = [
    { name: 'Dash', icon: 'grid_view', path: '/' },
    { name: 'History', icon: 'history', path: '/history' },
    { name: 'Run', icon: 'directions_run', path: '/run', isFab: true },
    { name: 'Community', icon: 'groups', path: '/community' },
    { name: 'Profile', icon: 'person', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-xl border-t border-white/5 pb-8 pt-2">
      <div className="mx-auto flex max-w-md items-end justify-between px-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 transition-colors relative",
              item.isFab ? "-top-5" : "",
              isActive && !item.isFab ? "text-primary" : "text-white/40 hover:text-white/80"
            )}
          >
            {({ isActive }) => (
              <>
                {item.isFab ? (
                  <div className={cn(
                    "size-14 rounded-full flex items-center justify-center shadow-lg border-4 border-background-dark transition-transform active:scale-95",
                    isActive ? "bg-white text-primary" : "bg-primary text-white shadow-[0_0_20px_rgba(140,48,232,0.5)]"
                  )}>
                    <span className="material-symbols-outlined text-3xl font-bold">play_arrow</span>
                  </div>
                ) : (
                  <>
                    <span className={cn("material-symbols-outlined text-[26px]", isActive && "filled")}>
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-bold">{item.name}</span>
                    {isActive && <div className="absolute -bottom-2 size-1 bg-primary rounded-full" />}
                  </>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
