import React from 'react';
import { Moon, Zzz } from 'lucide-react';
import { SleepConfig } from './types';

interface SleepModuleProps {
  config: SleepConfig;
  onUpdate: (c: SleepConfig) => void;
}

export const SleepModule: React.FC<SleepModuleProps> = ({ config }) => {
  // Antisipasi jika data config belum tersedia agar tidak error saat render
  if (!config) return <div className="text-white p-4 text-center">Memuat data tidur...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Moon className="text-indigo-400" /> Tidur
      </h2>
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
        <div className="flex justify-center mb-4">
          <Zzz className="text-indigo-500" size={48} />
        </div>
        <p className="text-slate-400">Target Tidur: {config.durationGoal} Jam</p>
        <div className="mt-4 text-3xl font-bold text-white">
          {config.bedTime} - {config.wakeTime}
        </div>
      </div>
    </div>
  );
};