'use client';
import { useEffect } from 'react';
import styles from '../page.module.css';

const ClientAnimation = () => {
  useEffect(() => {
    // 使用更高效的节流函数来控制观察器的触发频率
    const throttle = (fn, delay) => {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    };

    // 优化滚动动画效果的Intersection Observer选项
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 只有元素进入视口时添加show类，提高性能
          entry.target.classList.add(styles.show);
          // 一旦元素显示，停止观察以减少不必要的处理
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      // 添加rootMargin以提前加载，减少用户感知的延迟
      rootMargin: '50px'
    });
    
    // 优化DOM选择器查询，缓存结果
    const hiddenElements = document.querySelectorAll(`.${styles.hidden}`);
    
    // 减少DOM读写操作，批量处理
    if (hiddenElements.length) {
      // 使用requestAnimationFrame确保样式计算在下一帧进行
      requestAnimationFrame(() => {
        // 添加过渡延迟效果
        const expertiseCards = document.querySelectorAll(`.${styles.expertiseCard}`);
        if (expertiseCards.length) {
          expertiseCards.forEach((card, index) => {
            card.style.setProperty('--index', index);
          });
        }
        
        const postCards = document.querySelectorAll(`.${styles.postCard}`);
        if (postCards.length) {
          postCards.forEach((card, index) => {
            card.style.setProperty('--index', index);
          });
        }
        
        // 分批观察元素，减轻单一帧的负担
        let delay = 0;
        hiddenElements.forEach((el, index) => {
          if (index % 5 === 0) {
            delay += 10; // 每5个元素增加10ms延迟
            setTimeout(() => observer.observe(el), delay);
          } else {
            observer.observe(el);
          }
        });
      });
    }

    return () => {
      // 清理时取消所有观察
      if (hiddenElements.length) {
        hiddenElements.forEach((el) => observer.unobserve(el));
      }
      observer.disconnect();
    };
  }, []);
  
  return null; // 此组件不渲染任何内容
};

export default ClientAnimation;