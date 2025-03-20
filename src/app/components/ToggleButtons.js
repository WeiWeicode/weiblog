'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ToggleButtons.module.css';
import Link from 'next/link';
import { DownOutlined, SettingOutlined, BulbOutlined } from '@ant-design/icons';
import { Dropdown, Space, MenuProps } from 'antd';

const ToggleButtons = () => {
  const { language, translations, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
 // 语言子菜单项
 const languageItems = [
  {
    key: 'en',
    label: 'English',
    onClick: () => changeLanguage('en'),
    className: language === 'en' ? styles.menuActive : '',
  },
  {
    key: 'zh',
    label: '简体中文',
    onClick: () => changeLanguage('zh'),
    className: language === 'zh' ? styles.menuActive : '',
  },
  {
    key: 'zh-TW',
    label: '繁體中文',
    onClick: () => changeLanguage('zh-TW'),
    className: language === 'zh-TW' ? styles.menuActive : '',
  },
];

// 导航菜单项配置
const items = [
  {
    label: <Link href="/">{translations.home}</Link>,
    key: 'home',
  },
  {
    label: <Link href="/blog">{translations.blog}</Link>,
    key: 'blog',
  },
  { type: 'divider' },
  {
    key: 'theme',
    label: theme === 'dark' ? translations.lightTheme : translations.darkTheme,
    icon: <BulbOutlined />,
    onClick: toggleTheme,
  },
  
  {
    label: translations.language,
    key: 'language',
    
    children: languageItems,
  },
];

  return (
    <div className={styles.container}>
      {/* 整合后的导航菜单 */}
      <div className={styles.toggleGroup}>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          dropdownRender={(menu) => (
            <div className={theme === 'dark' ? styles.darkMenu : ''}>
              {menu}
            </div>
          )}
        >
          <a onClick={(e) => e.preventDefault()} className={styles.navTrigger}>
            <Space>
              {translations.navigate}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default ToggleButtons;