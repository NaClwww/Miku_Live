import fs from 'fs';
import path from 'path';
import { createEvents } from 'ics';
import { DateTime } from 'luxon';
import liveData from './livedata.js';

/**
 * 将日期时间字符串转换为ICS需要的格式
 */
const formatDateForICS = (dateTimeStr, timezone) => {
  const dt = DateTime.fromISO(dateTimeStr, { zone: timezone });
  return [
    dt.year,
    dt.month,
    dt.day,
    dt.hour,
    dt.minute
  ];
};

/**
 * 从liveData创建ICS事件数组
 */
const createICSEvents = (lives) => {
  const events = [];

  lives.forEach(live => {
    // 为每场演出创建事件
    live.time.forEach(timeSlot => {
      const startTime = formatDateForICS(timeSlot.localstarttime, timeSlot.timezone);
      
      // 假设每场演出持续2小时
      const endTime = DateTime.fromISO(timeSlot.localstarttime, { zone: timeSlot.timezone })
        .plus({ hours: 2 });
      
      const endTimeArr = [
        endTime.year,
        endTime.month,
        endTime.day,
        endTime.hour,
        endTime.minute
      ];

      events.push({
        start: startTime,
        end: endTimeArr,
        title: `${live.title} - ${timeSlot.position}`,
        description: live.description || '初音未来演唱会',
        location: timeSlot.position,
        url: live.official || '',
        // 可以添加提醒，例如提前一天提醒
        alarms: [
          {
            action: 'display',
            description: 'Reminder',
            trigger: { days: 1, before: true }
          }
        ]
      });
    });
  });

  return events;
};

/**
 * 生成并保存ICS文件
 */
const generateAndSaveICS = async () => {
  console.log('🚀 开始生成 ICS 文件...');
  
  // 修正 public 目录路径 - 你已经在 miku-live 目录下了
  const publicDir = path.join(process.cwd(), 'public');
  const icsDir = path.join(publicDir, 'ics');
  
  // 确保目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('📁 创建 public 目录');
  }
  
  if (!fs.existsSync(icsDir)) {
    fs.mkdirSync(icsDir, { recursive: true });
    console.log('📁 创建 ics 子目录');
  }

  try {
    // 生成所有演唱会日历
    console.log('📅 生成所有演唱会日历...');
    const allEvents = createICSEvents(liveData);
    
    createEvents(allEvents, (error, value) => {
      if (error) {
        console.error('❌ 生成所有演唱会日历失败:', error);
        return;
      }

      const allEventsPath = path.join(icsDir, 'all-miku-lives.ics');
      fs.writeFileSync(allEventsPath, value);
      console.log('✅ 生成 all-miku-lives.ics');
    });

    // 生成单个演唱会日历
    console.log('📅 生成单个演唱会日历...');
    for (let i = 0; i < liveData.length; i++) {
      const singleEvents = createICSEvents([liveData[i]]);
      
      createEvents(singleEvents, (error, value) => {
        if (error) {
          console.error(`❌ 生成 ${liveData[i].title} 日历失败:`, error);
          return;
        }
        
        const filename = `${liveData[i].title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
        const filePath = path.join(icsDir, filename);
        fs.writeFileSync(filePath, value);
        console.log(`✅ 生成 ${filename}`);
      });
    }

    console.log('🎉 所有 ICS 文件生成完成！');
    console.log(`📂 文件保存在: ${icsDir}`);
    
  } catch (error) {
    console.error('❌ 生成 ICS 文件时出错:', error);
    process.exit(1);
  }
};

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAndSaveICS();
}

export { generateAndSaveICS, createICSEvents };