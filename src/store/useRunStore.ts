import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { calculateDistance, generateId } from '../lib/utils';

export interface GeoPoint {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy: number;
  speed: number | null;
}

export interface Run {
  id: string;
  type: 'Outdoor Run' | 'Treadmill' | 'Trail Run';
  startTime: number;
  endTime?: number;
  duration: number; // in seconds
  distance: number; // in km
  avgPace: number; // seconds per km
  calories: number;
  route: GeoPoint[]; // Full GPS trace
  status: 'completed' | 'discarded';
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number;
  color: 'gold' | 'silver' | 'bronze' | 'primary';
}

interface RunState {
  // Data
  history: Run[];
  achievements: Achievement[];
  goals: {
    weeklyDistance: number;
    weeklyRuns: number;
  };
  
  // Live Tracking State
  isTracking: boolean;
  isPaused: boolean;
  currentRunId: string | null;
  currentStats: {
    duration: number;
    distance: number;
    pace: number;
    lastLocation: GeoPoint | null;
    route: GeoPoint[];
  };

  // Actions
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  stopRun: () => void;
  addGPSPoint: (point: GeoPoint) => void;
  tickTimer: () => void;
  deleteRun: (id: string) => void;
  checkAchievements: () => void;
}

export const useRunStore = create<RunState>()(
  persist(
    (set, get) => ({
      history: [],
      achievements: [
        { id: '1', title: 'First Steps', description: 'Complete your first run', icon: 'directions_run', unlockedAt: Date.now(), color: 'bronze' }
      ],
      goals: {
        weeklyDistance: 40,
        weeklyRuns: 4
      },
      
      isTracking: false,
      isPaused: false,
      currentRunId: null,
      currentStats: {
        duration: 0,
        distance: 0,
        pace: 0,
        lastLocation: null,
        route: []
      },

      startRun: () => {
        set({
          isTracking: true,
          isPaused: false,
          currentRunId: generateId(),
          currentStats: {
            duration: 0,
            distance: 0,
            pace: 0,
            lastLocation: null,
            route: []
          }
        });
      },

      pauseRun: () => set({ isPaused: true }),
      resumeRun: () => set({ isPaused: false }),

      stopRun: () => {
        const { currentRunId, currentStats } = get();
        if (!currentRunId) return;

        const newRun: Run = {
          id: currentRunId,
          type: 'Outdoor Run',
          startTime: Date.now() - (currentStats.duration * 1000), // Approx
          endTime: Date.now(),
          duration: currentStats.duration,
          distance: currentStats.distance,
          avgPace: currentStats.pace,
          calories: Math.floor(currentStats.distance * 60), // Mock calc
          route: currentStats.route,
          status: 'completed'
        };

        set((state) => ({
          isTracking: false,
          isPaused: false,
          currentRunId: null,
          history: [newRun, ...state.history],
          currentStats: { duration: 0, distance: 0, pace: 0, lastLocation: null, route: [] }
        }));
        
        get().checkAchievements();
      },

      addGPSPoint: (point) => {
        const state = get();
        if (!state.isTracking || state.isPaused) return;

        // Filter accuracy noise > 25m
        if (point.accuracy > 25) return;

        const lastLoc = state.currentStats.lastLocation;
        let distDelta = 0;

        if (lastLoc) {
          distDelta = calculateDistance(lastLoc.lat, lastLoc.lng, point.lat, point.lng);
          
          // Filter tiny movements (standing still jitter) < 5 meters
          if (distDelta < 0.005) return; 
        }

        const newDistance = state.currentStats.distance + distDelta;
        
        // Calculate instantaneous pace (min/km) based on speed if available, or delta
        // Speed is m/s. Pace is s/km.
        let currentPace = state.currentStats.pace;
        if (point.speed && point.speed > 0) {
            currentPace = 1000 / point.speed; // s/km
        } else if (distDelta > 0) {
            // fallback calc if speed is null
             // (not implemented for simplicity, relying on average usually)
        }

        set((state) => ({
          currentStats: {
            ...state.currentStats,
            distance: newDistance,
            lastLocation: point,
            route: [...state.currentStats.route, point],
            // Update pace logic simplified: just keeping average for now or raw GPS speed
            pace: currentPace 
          }
        }));
      },

      tickTimer: () => {
        const { isTracking, isPaused, currentStats } = get();
        if (isTracking && !isPaused) {
          const newDuration = currentStats.duration + 1;
          // Recalculate Average Pace: duration (s) / distance (km)
          const avgPace = currentStats.distance > 0 ? newDuration / currentStats.distance : 0;
          
          set({
            currentStats: {
              ...currentStats,
              duration: newDuration,
              pace: avgPace
            }
          });
        }
      },

      deleteRun: (id) => set((state) => ({
        history: state.history.filter(r => r.id !== id)
      })),

      checkAchievements: () => {
        // Simple logic stub
        const history = get().history;
        const totalDist = history.reduce((acc, curr) => acc + curr.distance, 0);
        
        if (history.length >= 5) {
           // unlock 5 runs logic
        }
        if (totalDist > 10) {
            // unlock 10km logic
        }
      }
    }),
    {
      name: 'stride-storage',
      storage: createJSONStorage(() => localStorage), // MVP persistence
      partialize: (state) => ({ 
        history: state.history, 
        achievements: state.achievements,
        goals: state.goals 
      }), // Don't persist live run state if app crashes/reloads for now
    }
  )
);
