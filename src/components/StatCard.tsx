import React from 'react';
import { cn } from '../lib/utils';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit, className, iconColor = "text-primary" }) => {
  return (
    <div className={cn("flex flex-col gap-1 rounded-xl bg-card-dark border border-white/5 p-4", className)}>
      <span className={cn("material-symbols-outlined text-lg", iconColor)}>{icon}</span>
      <p className="text-xs text-white/40 mt-1 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold">
        {value} {unit && <span className="text-xs font-normal text-white/40 ml-0.5">{unit}</span>}
      </p>
    </div>
  );
};
