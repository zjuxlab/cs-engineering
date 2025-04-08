import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// 默认图标，以备不时之需
import SpringIcon from '@site/static/img/subjects/spring.svg';

export default function TechCard({ title, description, icon, link }) {
  // 处理不同类型的图标输入
  const renderIcon = () => {
    try {
      // 如果提供了自定义图标
      if (icon) {
        // 处理字符串路径
        if (typeof icon === 'string') {
          // 对于 MDX 中的相对路径引用
          return <img src={icon} height="48" width="48" alt={title} className={styles.icon} />;
        }
        
        // 处理导入的 SVG 组件
        if (typeof icon === 'function' || React.isValidElement(icon)) {
          const IconComponent = typeof icon === 'function' ? icon : () => icon;
          return <IconComponent width="48" height="48" className={styles.icon} aria-label={title} />;
        }
        
        // 处理 require('@site/...').default 格式
        if (icon.default && (typeof icon.default === 'function' || React.isValidElement(icon.default))) {
          const IconComponent = typeof icon.default === 'function' ? icon.default : () => icon.default;
          return <IconComponent width="48" height="48" className={styles.icon} aria-label={title} />;
        }
      }
      
      // 默认返回 SpringIcon
      return <SpringIcon width="48" height="48" className={styles.icon} aria-label={title} />;
    } catch (error) {
      console.error('Error rendering icon:', error);
      // 出错时返回 SpringIcon
      return <SpringIcon width="48" height="48" className={styles.icon} aria-label={title} />;
    }
  };

  return (
    <Link to={link} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.icon} style={{ width: '48px', height: '48px' }}>
          {renderIcon()}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.details}>{description}</p>
        <div className={styles.linkText}>
          <p className={styles.linkTextValue}>
            more...
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.linkTextIcon}>
              <path d="M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z"></path>
            </svg>
          </p>
        </div>
      </article>
    </Link>
  );
}