import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import livesZh from './locales/zh/lives.json';
import naviZh from './locales/zh/navi.json';
import livesEn from './locales/en/lives.json';
import naviEn from './locales/en/navi.json';

const resources = {
  zh: {
    lives: livesZh,
    navi: naviZh
  },
  en: {
    lives: livesEn,
    navi: naviEn
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    // ns: ['lives', 'navi'], // 默认命名空间
    // defaultNS: 'lives',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;