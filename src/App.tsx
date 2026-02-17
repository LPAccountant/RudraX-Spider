import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import RouteConfig from './routes/config';
import zh from 'antd/es/locale/zh_CN';
import en from 'antd/es/locale/en_US';
import ja from 'antd/es/locale/ja_JP';
import ko from 'antd/es/locale/ko_KR';
import { langType, useLanguage } from './utils/useLanguage';
import { ErrorBoundary } from './components/ErrorBoundary';
import type { Locale } from 'antd/es/locale';
import dayjs from 'dayjs';
import { CNUserModal } from './components/CNUserModal';
import { DocSearch } from './components/DocSearch';
import { DropFile } from './components/DropFile';
import { AuthProvider } from './utils/AuthContext';

const localeConfig: Record<langType, Locale> = {
  zh,
  en,
  ja,
  ko,
};

export const App = () => {
  const [lang] = useLanguage();

  useEffect(() => {
    dayjs.locale(localeConfig[lang].locale);
  }, [lang]);

  return (
    <React.StrictMode>
      <HashRouter>
        <ErrorBoundary>
          <ConfigProvider
            locale={localeConfig[lang]}
            theme={{
              token: {
                colorLink: '#00D4AA',
                colorPrimary: '#7B2CBF',
                colorPrimaryBg: 'rgba(123, 44, 191, 0.08)',
                colorSuccess: '#00D4AA',
                colorWarning: '#FF6B35',
                colorError: '#E63946',
                colorInfo: '#4361EE',
                borderRadius: 8,
              },
            }}
          >
            <AuthProvider>
              <CNUserModal />
              <RouteConfig />
              <DocSearch />
              <DropFile />
            </AuthProvider>
          </ConfigProvider>
        </ErrorBoundary>
      </HashRouter>
    </React.StrictMode>
  );
};
