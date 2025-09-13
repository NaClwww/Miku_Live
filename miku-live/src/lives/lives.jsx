import { useState, useEffect } from "react";
import './../App.css';
import { DateTime, Duration } from 'luxon';
import liveData from './livedata.jsx';


export default function LivePage() {
  const [activeIndex, setActiveIndex] = useState(liveData.length - 1);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
  const [index, setIndex] = useState(0);
  const [isPhone, setIsPhone] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < window.innerHeight*1.1);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化时检查一次
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateCountdown = (timeData) => {
    if (!timeData || timeData.length === 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };

    let diff = null; // 初始化为 null，避免数字错误
    for (let i = 0; i < timeData.length; i++) {
      const { localstarttime: lst, timezone: tz } = timeData[i];
      // 修复日期格式，确保月份和日期为两位数
      const lstFixed = lst.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, (match, year, month, day) => `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      const eventTime = DateTime.fromISO(lstFixed, { zone: tz });
      const now = DateTime.now().setZone(tz); // 为每个事件设置一致时区
      diff = eventTime.diff(now);
      if (diff.milliseconds > 0) {
        setIndex(i);
        break; // 找到第一个未来事件
      }
    }

    if (!diff || diff.milliseconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

    const duration = Duration.fromMillis(diff.milliseconds);
    return {
      days: Math.floor(duration.as('days')),
      hours: Math.floor(duration.as('hours') % 24),
      minutes: Math.floor(duration.as('minutes') % 60),
      seconds: Math.floor(duration.as('seconds') % 60),
      isPast: false,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(liveData[activeIndex].time));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="flex flex-col min-h-screen bg-grey-100">
      {/* 主要内容区域 */}
      <div className="h-[75vh] flex md:flex-row w-full">
        {/* 左侧图片区域 */}
          {isPhone ?
          <></>:
          (<div className="md:w-[70%] h-full flex items-center justify-center p-4">
            <img
              src={liveData[activeIndex].src}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-500"
              alt={liveData[activeIndex].title}
              loading="eager"
            />
          </div>)}

        {/* 右侧文字区域 */}
        <div className={` ${isPhone ? 'w-full' : 'md:w-[30%] md:max-w-[30%]'} flex flex-col p-4 h-full`}>
          <h2 className="flex text-3xl font-bold mb-6 transition-all duration-500 text-center justify-center">
            {liveData[activeIndex].title}
          </h2>
          <p className="flex text-lg transition-all duration-500 max-h-full overflow-auto">
              Live information:
          </p>
          <div className="flex flex-1 w-full mt-2 overflow-hidden p-4">
            <p className="flex text-lg w-full transition-all duration-500 max-h-full overflow-auto whitespace-pre-line">
              {liveData[activeIndex].description}
            </p>
          </div>
          {countdown.isPast ? (
            <p className="flex text-lg justify-center mt-4 text-red-500">已结束</p>
          ) : (
            <>
              <p className="flex text-lg mt-4">下一站：</p>
              <div className="flex justify-center space-x-2 mt-4">
                <div className="text-center">
                  <span className="block font-mono text-2xl font-bold">{liveData[activeIndex].time[index].position}</span>
                  {/* <span className="text-sm">天</span> */}
                </div>
                <div className="text-center">
                  <span className="block font-mono text-2xl font-bold">{countdown.days}天</span>
                  {/* <span className="text-sm">天</span> */}
                </div>
                <div className="text-center">
                  <span className="block font-mono text-2xl font-bold">{countdown.hours}时</span>
                  {/* <span className="text-sm">时</span> */}
                </div>
                <div className="text-center">
                  <span className="block font-mono text-2xl font-bold">{countdown.minutes}分</span>
                  {/* <span className="text-sm">分</span> */}
                </div>
                <div className="text-center">
                  <span className="block font-mono text-2xl font-bold">{countdown.seconds}秒</span>
                  {/* <span className="text-sm">秒</span> */}
                </div>
              </div>
            </>
          )}


          <div className="flex justify-center py-4 mt-auto">
            <button className="btn bottom" onClick={() => window.open(liveData[activeIndex].official, "_blank")}>官方网站</button>
          </div>
        </div>
      </div>
      
      {/* 底部照片展示区域 */}
      <div className="flex h-[25vh] shadow-lg w-full">
        <div className="container mx-auto">
          <div className="flex flex-nowrap overflow-x-auto space-x-6 py-2 px-4 w-full">
            {liveData.map((photo, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 flex-grow-0 cursor-pointer "
                style={{ width: '256px', flexBasis: '256px', aspectRatio: '16/10' }}
                onClick={() => setActiveIndex(idx)}
              >
                <img
                  src={photo.src}
                  className={`w-full h-full object-cover rounded-lg transition-all duration-300
                    ${activeIndex === idx ? "scale-110 z-10" : "opacity-50 hover:opacity-90"}
                  `}
                  alt={photo.title}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}