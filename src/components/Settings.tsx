import React from 'react';
import { UserProfile } from '../../types';

interface SettingsProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const SettingsModule: React.FC<SettingsProps> = ({ profile, setProfile, isDarkMode, toggleTheme }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pengaturan</h2>
      
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Nama</label>
          <input 
            type="text" 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Berat Badan (kg)</label>
          <input 
            type="number" 
            value={profile.weight} 
            onChange={(e) => setProfile({...profile, weight: Number(e.target.value)})}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
        <span>Mode Gelap</span>
        <button 
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-slate-700'} relative`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'right-1' : 'left-1'}`} />
        </button>
      </div>
    </div>
  );
};