import React from 'react';
import { Dumbbell } from 'lucide-react';
import { FitnessState } from '../../types';

export const FitnessModule: React.FC<{data: FitnessState, onUpdate: (f: FitnessState) => void}> = ({ data, onUpdate }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold flex items-center gap-2"><Dumbbell className="text-orange-500" /> Olahraga</h2>
    <div 
      onClick={() => onUpdate({...data, completed: !data.completed})}
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${data.completed ? 'bg-orange-500/10 border-orange-500' : 'bg-slate-900 border-slate-800'}`}
    >
      <h3 className="text-xl font-bold">{data.activityType}</h3>
      <p className="text-slate-400">{data.duration} Menit • {data.scheduledTime}</p>
      <div className="mt-4 font-bold">{data.completed ? '✅ Selesai' : '⏳ Belum Selesai'}</div>
    </div>
  </div>
);