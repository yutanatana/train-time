import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// 土日判定用の関数
const isWeekend = () => {
  const today = dayjs();
  return today.day() === 0 || today.day() === 6;
};

// ハードコードされた時刻表（平日）
const weekdaySchedule = [
  { destination: '東京', time: '07:30' },
  { destination: '東京', time: '07:45' },
  { destination: '東京', time: '08:00' },
  { destination: '東京', time: '08:15' }
];

// ハードコードされた時刻表（土日）
const weekendSchedule = [
  { destination: '東京', time: '08:15' },
  { destination: '東京', time: '08:45' },
  { destination: '東京', time: '09:15' },
  { destination: '東京', time: '09:45' }
];

const TrainTimeApp = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [nextTrains, setNextTrains] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      setCurrentTime(now);
      
      // スケジュール選択（土日判定）
      const schedule = isWeekend() ? weekendSchedule : weekdaySchedule;
      
      // 次の2本の列車を検索
      const upcomingTrains = schedule
        .map(train => ({
          ...train,
          departureTime: dayjs(`${now.format('YYYY-MM-DD')} ${train.time}`)
        }))
        .filter(train => train.departureTime.isAfter(now))
        .slice(0, 2)
        .map(train => {
          const diff = train.departureTime.diff(now);
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          
          return {
            destination: train.destination,
            time: train.time, // Ensure the original time is preserved
            remainingTime: `あと${minutes}分${seconds}秒`
          };
        });

      setNextTrains(upcomingTrains);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">電車発車時刻</h1>
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          現在時刻: {currentTime.format('YYYY/MM/DD HH:mm:ss')}
        </p>
        {nextTrains.map((train, index) => (
          <div 
            key={index} 
            className="bg-blue-100 p-3 rounded-lg mb-2"
          >
            <p className="font-semibold">{train.destination}方面</p>
            <p>発車時刻: {train.time}</p>
            <p className="text-red-600">{train.remainingTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainTimeApp;