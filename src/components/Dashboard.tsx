import React from 'react';
import { Droplet, CheckCircle2, Clock } from 'lucide-react';
import { UserProfile, Task, WaterLog, PrayerTime, SleepConfig, FitnessState, AppState } from '../../types';

interface DashboardProps {
  profile: UserProfile;
  tasks: Task[];
  water: WaterLog;
  prayers: PrayerTime[];
  sleep: SleepConfig;
  fitness: FitnessState;
  setView: (view: AppState['view']) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, tasks, water, prayers, setView }) => {
  const nextPrayer = prayers.find(p => p.isNext) || prayers[0];
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      <header className="py-4">
        <h1 className="text-2xl font-bold">Halo, {profile.name}! 👋</h1>
        <p className="text-slate-400 text-sm">Berikut ringkasan hari ini.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => setView('hydration')} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 cursor-pointer">
          <Droplet className="text-blue-400 mb-2" />
          <div className="text-2xl font-bold">{water.current} <span className="text-xs text-slate-500">ml</span></div>
          <div className="text-xs text-slate-400">Target: {water.goal}ml</div>
        </div>

        <div onClick={() => setView('tasks')} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 cursor-pointer">
          <CheckCircle2 className="text-green-400 mb-2" />
          <div className="text-2xl font-bold">{completedTasks}/{tasks.length}</div>
          <div className="text-xs text-slate-400">Tugas Selesai</div>
        </div>
      </div>

      <div onClick={() => setView('prayer')} className="bg-blue-900/20 p-4 rounded-2xl border border-blue-800/50 cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-blue-400 text-sm font-medium">Jadwal Berikutnya</div>
            <div className="text-xl font-bold">{nextPrayer?.name}</div>
          </div>
          <div className="text-2xl font-mono font-bold text-blue-400">{nextPrayer?.time}</div>
        </div>
      </div>
    </div>
  );
};