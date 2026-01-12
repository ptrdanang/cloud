import { PrayerTime } from '../../types';

export const calculatePrayerTimes = (lat: number, long: number): PrayerTime[] => {
  // Simulasi waktu salat statis untuk fungsionalitas UI
  const times = [
    { name: 'Subuh', time: '04:32', isNext: false },
    { name: 'Dzuhur', time: '12:05', isNext: false },
    { name: 'Ashar', time: '15:15', isNext: false },
    { name: 'Maghrib', time: '18:12', isNext: false },
    { name: 'Isya', time: '19:25', isNext: false },
  ];

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let nextSet = false;
  return times.map(p => {
    const [h, m] = p.time.split(':').map(Number);
    const pMinutes = h * 60 + m;
    if (!nextSet && pMinutes > currentMinutes) {
      nextSet = true;
      return { ...p, isNext: true };
    }
    return p;
  });
};