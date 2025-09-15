import { useState, useEffect, use } from "react";
import './../App.css';
import { DateTime, Duration } from 'luxon';
import liveData from './livedata.js';
import {ColorExtractor} from 'react-color-extractor';
import { createTheme, ThemeProvider } from '@mui/material/styles';  // 确保导入
import NotificationsIcon from '@mui/icons-material/Notifications';  // 添加图标导入
import WebLink from '@mui/icons-material/Link';
import { Tooltip } from '@mui/material';  // 添加Tooltip导入

export default function LivePage() {
  const [activeIndex, setActiveIndex] = useState(liveData.length - 1);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
  const [index, setIndex] = useState(0);
  const [isPhone, setIsPhone] = useState(false);
  const [colors, setColors] = useState([]);
  const [theme, setTheme] = useState(createTheme());
  const [isTouched, setTouched] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTouched) return; // 如果用户触摸过屏幕，则不自动切换
      setActiveIndex((activeIndex + 1) % liveData.length);

    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isTouched]);

  // 提取图片主色调并生成Material主题
  const getColors = (extractedColors) => {
    setColors(extractedColors);
    
    // 使用提取的颜色生成Material Design调色板
    const primaryColor = extractedColors[2] || '#1976d2';  // 默认蓝色
    const secondaryColor = extractedColors[3] || extractedColors[0] || '#dc004e';  // 默认粉色
    
    const newTheme = createTheme({
      palette: {
        primary: {
          main: primaryColor,
        },
        secondary: {
          main: secondaryColor,
        },
        background: {
          default: extractedColors[0] || '#f5f5f5',
          paper: extractedColors[1] || '#ffffff',
        },
        // 可添加更多，如 error, warning 等
      },
    });
    setTheme(newTheme);
  };

  // 监听窗口大小变化，判断是否为手机屏幕比例
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

  // 计算倒计时
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


  // 订阅相关链接生成
  const generateSubscriptionLink = (type) => {
    const baseUrl = window.location.origin;
    let icsUrl = '';
    
    if (type === 'current') {
      const currentLive = liveData[activeIndex];
      const filename = `${currentLive.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
      icsUrl = `${baseUrl}/ics/${filename}`;
    } else if (type === 'all') {
      icsUrl = `${baseUrl}/ics/all-miku-lives.ics`;
    }
    
    // 生成 webcal:// 链接用于日历订阅
    const webcalUrl = icsUrl.replace(/^https?:\/\//, 'webcal://');
    
    return { httpUrl: icsUrl, webcalUrl };
  };

    // 生成并显示订阅链接
  const handleGenerateLink = async (type) => {
  const { webcalUrl, httpUrl } = generateSubscriptionLink(type);

  // 尝试复制到剪贴板
  const copied = await copyToClipboard(httpUrl);
  if (copied) {
    alert("已成功复制到剪贴板！")
  } else {
    alert(httpUrl);
  }
};

  // 复制链接到剪贴板
const copyToClipboard = async (text) => {
  try {
    // 首先尝试使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard API 失败，尝试降级方案:', err);
  }

  // 降级方案：使用传统方法
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // ... 设置样式避免闪烁
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      return true;
    }
  } catch (err) {
    alert("复制到剪贴板失败")
  }

  return false;
};

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(liveData[activeIndex].time));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <ThemeProvider theme={theme}>  {/* 应用主题 */}
    <Tooltip title="订阅链接">
      <button 
        className="top-1 right-1 absolute z-101" 
        style={{
          backgroundColor: 'transparent',  // 透明背景
          border: 'none',  // 无边框
      }}
      onClick={() => { handleGenerateLink("all"); setTouched(true); }} >
        <NotificationsIcon style={{ marginRight: '8px' }}/>
      </button>
    </Tooltip>
    <div className="flex flex-col min-h-screen duration-500" style={{
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    }}>
      {/* 主要内容区域 */}
      <div className="h-[75vh] flex md:flex-row w-full">
        {/* 左侧图片区域 */}
          {isPhone ?
          <></>:
          (<div className="md:w-[70%] h-full flex items-center justify-center p-4 shadow-2xsm">
            <img
              src={liveData[activeIndex].src}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-500"
              alt={liveData[activeIndex].title}
              loading="eager"
            />
          </div>)}

        {/* 右侧文字区域 */}
        <div className={` ${isPhone ? 'w-full' : 'md:w-[30%] md:max-w-[30%]'} flex flex-col h-full p-4`}>
          <div className={"p-4 flex flex-col h-full w-full shadow-4xsm rounded-lg duration-500"} style={{background: theme.palette.background.paper}}>
            <h2 className="flex text-3xl font-bold mb-6 transition-all duration-500 text-center justify-center" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>
              {liveData[activeIndex].title}
            </h2>
            <p className="flex text-lg transition-all duration-500 max-h-full overflow-auto" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>
              演出信息:
            </p>
            <div className="flex flex-1 w-full mt-2 overflow-hidden p-4">
              <p className="flex text-lg w-full transition-all duration-500 max-h-full overflow-auto whitespace-pre-line" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>
                {liveData[activeIndex].description}
              </p>
            </div>
            {countdown.isPast ? (
              <p className="flex text-lg justify-center mt-4" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>已结束</p>
            ) : (
              <>
                <p className="flex text-lg mt-4" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>下一场倒计时：</p>
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="text-center">
                    <span className="block font-mono text-2xl font-bold" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>{liveData[activeIndex].time[index].position}</span>
                    {/* <span className="text-sm">天</span> */}
                  </div>
                  <div className="text-center">
                    <span className="block font-mono text-2xl font-bold" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>{countdown.days}天</span>
                    {/* <span className="text-sm">天</span> */}
                  </div>
                  <div className="text-center">
                    <span className="block font-mono text-2xl font-bold" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>{countdown.hours}时</span>
                    {/* <span className="text-sm">时</span> */}
                  </div>
                  <div className="text-center">
                    <span className="block font-mono text-2xl font-bold" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}}>{countdown.minutes}分</span>
                    {/* <span className="text-sm">分</span> */}
                  </div>
                  <div className="text-center">
                    <span className="block font-mono text-2xl font-bold" style={{color: theme.palette.getContrastText(theme.palette.background.paper)}} >{countdown.seconds}秒</span>
                    {/* <span className="text-sm">秒</span> */}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center py-4 space-x-8 mt-auto">
              {/* <button className="btn bottom rounded-lg hover:scale-105 z-10 duration-500" onClick={() => { handleGenerateLink(); setTouched(true); }} style={{backgroundColor: theme.palette.primary.main,color: theme.palette.getContrastText(theme.palette.primary.main),border:0}}>订阅链接</button> */}
              <Tooltip title="官方网址">
                <button className="btn bottom rounded-lg hover:scale-105 z-10 duration-500" onClick={() => { window.open(liveData[activeIndex].official, "_blank"); setTouched(true); }} style={{backgroundColor: theme.palette.primary.main,color: theme.palette.getContrastText(theme.palette.primary.main),border:0}}>
                  <WebLink />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部照片展示区域 */}
      <div className="flex h-[25vh] shadow-lg w-full">
        <div className="container mx-auto">
          <ColorExtractor getColors={getColors}>
            <img src={liveData[activeIndex].src} style={{ display: 'none' }} alt="hidden for color extraction" />
          </ColorExtractor>
          <div className="flex flex-nowrap overflow-x-auto space-x-6 py-2 px-4 w-full">
            {liveData.map((photo, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 flex-grow-0 cursor-pointer "
                style={{ width: '256px', flexBasis: '256px', aspectRatio: '16/10' }}
                onClick={() => { setActiveIndex(idx); setTouched(true); }}
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
    </ThemeProvider>
  );
}