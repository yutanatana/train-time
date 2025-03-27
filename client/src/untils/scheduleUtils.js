import dayjs from 'dayjs';

export const isWeekend = () => {
  const today = dayjs();
  return today.day() === 0 || today.day() === 6;
};

export const getSchedule = () => {
  const weekdaySchedule = [
    { destination: '東京', time: '07:30' },
    { destination: '東京', time: '07:45' },
    // 他の平日スケジュール
  ];

  const weekendSchedule = [
    { destination: '東京', time: '08:15' },
    { destination: '東京', time: '08:45' },
    // 他の週末スケジュール
  ];

  return isWeekend() ? weekendSchedule : weekdaySchedule;
};