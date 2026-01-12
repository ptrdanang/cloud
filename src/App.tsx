import React, { useState, useEffect } from 'react';
// Perhatikan perubahan path di bawah ini (menghapus /src/)
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Hydration } from './components/Hydration';
import { TaskModule } from './components/Tasks';
import { PrayerModule } from './components/Prayer';
import { SettingsModule } from './components/Settings';
import { SleepModule } from './components/Sleep';
import { FitnessModule } from './components/Fitness';
import { AppState, StorageKeys, UserProfile, Task, WaterLog, PrayerTime, SleepConfig, FitnessState } from '../types';
import { calculatePrayerTimes } from './services/timeService';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Pengguna',
  weight: 70,
  isOnboarded: false,
};

const DEFAULT_WATER: WaterLog = {
  current: 0,
  goal: 2100,
  history: [],
  lastUpdated: new Date().toDateString(),
};

const DEFAULT_SLEEP: SleepConfig = {
  bedTime: "22:00",
  wakeTime: "05:00",
  durationGoal: 7
};

const DEFAULT_FITNESS: FitnessState = {
  activityType: 'Lari',
  duration: 30,
  scheduledTime: '06:30',
  completed: false,
  lastUpdated: new Date().toDateString(),
};

const App: React.FC = () => {
  const [view, setView] = useState<AppState['view']>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [water, setWater] = useState<WaterLog>(DEFAULT_WATER);
  const [sleep, setSleep] = useState<SleepConfig>(DEFAULT_SLEEP);
  const [fitness, setFitness] = useState<FitnessState>(DEFAULT_FITNESS);
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<{lat: number, long: number}>({ lat: 0, long: 0 });
  const [city, setCity] = useState<string>("Mencari lokasi...");
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(StorageKeys.THEME);
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(StorageKeys.THEME, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const savedProfile = localStorage.getItem(StorageKeys.PROFILE);
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedTasks = localStorage.getItem(StorageKeys.TASKS);
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedSleep = localStorage.getItem(StorageKeys.SLEEP);
    if (savedSleep) setSleep(JSON.parse(savedSleep));

    const savedFitness = localStorage.getItem(StorageKeys.FITNESS);
    if (savedFitness) {
        const parsedFitness: FitnessState = JSON.parse(savedFitness);
        if (parsedFitness.lastUpdated !== new Date().toDateString()) {
            setFitness({ ...parsedFitness, completed: false, lastUpdated: new Date().toDateString() });
        } else {
            setFitness(parsedFitness);
        }
    }

    const savedWater = localStorage.getItem(StorageKeys.WATER);
    if (savedWater) {
      const parsedWater: WaterLog = JSON.parse(savedWater);
      if (parsedWater.lastUpdated !== new Date().toDateString()) {
        setWater({ ...parsedWater, current: 0, lastUpdated: new Date().toDateString() });
      } else {
        setWater(parsedWater);
      }
    }

    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, long: position.coords.longitude });
          setCity("Lokasi Anda"); 
        },
        () => setCity("Waktu Lokal (Estimasi)")
       );
    }
  }, []);

  useEffect(() => {
     setWater(prev => ({ ...prev, goal: profile.weight * 30 }));
  }, [profile.weight]);

  useEffect(() => {
    const updatePrayers = () => setPrayers(calculatePrayerTimes(location.lat, location.long));
    updatePrayers();
    const interval = setInterval(updatePrayers, 60000);
    return () => clearInterval(interval);
  }, [location]);

  const handleTaskUpdate = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem(StorageKeys.TASKS, JSON.stringify(newTasks));
  };

  const handleWaterUpdate = (amount: number) => {
    const newWater = { ...water, current: amount };
    setWater(newWater);
    localStorage.setItem(StorageKeys.WATER, JSON.stringify(newWater));
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard': return <Dashboard profile={profile} tasks={tasks} water={water} prayers={prayers} sleep={sleep} fitness={fitness} setView={setView} />;
      case 'hydration': return <Hydration data={water} onUpdate={handleWaterUpdate} />;
      case 'tasks': return <TaskModule tasks={tasks} setTasks={handleTaskUpdate} />;
      case 'prayer': return <PrayerModule prayers={prayers} city={city} />;
      case 'sleep': return <SleepModule config={sleep} onUpdate={(c) => setSleep(c)} />;
      case 'fitness': return <FitnessModule data={fitness} onUpdate={(f) => setFitness(f)} />;
      case 'settings': return <SettingsModule profile={profile} setProfile={setProfile} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      default: return <Dashboard profile={profile} tasks={tasks} water={water} prayers={prayers} sleep={sleep} fitness={fitness} setView={setView} />;
    }
  };

  return (
    <Layout currentView={view} setView={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;