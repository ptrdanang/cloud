import React from 'react';
import { Home, Droplet, CheckSquare, Clock, Moon, Dumbbell, Settings } from 'lucide-react';
import { AppState } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppState['view'];
  setView: (view: AppState['view']) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', icon: Home },
    { id: 'tasks', icon: CheckSquare },
    { id: 'hydration', icon: Droplet },
    { id: 'prayer', icon: Clock },
    { id: 'sleep', icon: Moon },
    { id: 'fitness', icon: Dumbbell },
    { id: 'settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <main className="max-w-md mx-auto p-4">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 p-4 flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppState['view'])}
            className={`p-2 rounded-xl transition-all ${currentView === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500'}`}
          >
            <item.icon size={24} />
          </button>
        ))}
      </nav>
    </div>
  );
};