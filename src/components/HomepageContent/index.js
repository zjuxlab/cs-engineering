import React from 'react';
import styles from './styles.module.css';

export default function HomepageContent() {
  return (
    <>
      {/* 第一个部分：特性介绍 */}
      <div className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>用工程化思维学习计算机科学</h3>
            <p className={styles.sectionDescription}>
              CS工程文档致力于提供系统化、结构化的学习路径，帮助你高效掌握编程知识
            </p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 20 20" fill="currentColor" className={styles.icon}>
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h4 className={styles.featureTitle}>系统化知识体系</h4>
                <p className={styles.featureDescription}>
                  从前端到后端，从基础到进阶，构建完整的开发技能树，避免碎片化学习
                </p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h4 className={styles.featureTitle}>实用技能导向</h4>
                <p className={styles.featureDescription}>
                  聚焦工程实践中最常用的技术栈和最佳实践，从实战出发理解理论知识
                </p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h4 className={styles.featureTitle}>持续更新迭代</h4>
                <p className={styles.featureDescription}>
                  跟随技术发展不断更新，确保内容与行业最新趋势和最佳实践保持同步
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 第二个部分：学习路径 */}
      <div className={styles.howItWorksSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>学习路径</h2>
            <p className={styles.sectionDescription}>
              按照下面的路径，系统地学习计算机科学与编程技能，从入门到精通
            </p>
          </div>
          
          <div className={styles.stepsContainer}>
            <div className={styles.stepItem}>
              <div className={styles.stepImageContainer}>
                <img 
                  className={styles.stepImage} 
                  src={require('@site/static/img/Homepage/1.png').default} 
                  width="190px" 
                  height="220px" 
                  alt="基础入门" 
                />
              </div>
              <div className={styles.stepContent}>
                <h5 className={styles.stepTitle}>1. 基础入门</h5>
                <p className={styles.stepDescription}>
                  掌握编程基础知识，包括HTML、CSS、JavaScript和版本控制等基本技能。
                </p>
              </div>
            </div>
            
            <div className={styles.stepItem}>
              <div className={styles.stepImageContainer}>
              <img 
                  className={styles.stepImage} 
                  src={require('@site/static/img/Homepage/2.png').default} 
                  width="190px" 
                  height="220px" 
                  alt="基础入门" 
                />
              </div>
              <div className={styles.stepContent}>
                <h5 className={styles.stepTitle}>2. 前端与后端开发</h5>
                <p className={styles.stepDescription}>
                  学习主流框架和库，掌握全栈开发技能，能够独立构建完整的Web应用。
                </p>
              </div>
            </div>
            
            <div className={styles.stepItem}>
              <div className={styles.stepImageContainer}>
              <img 
                  className={styles.stepImage} 
                  src={require('@site/static/img/Homepage/3.png').default} 
                  width="190px" 
                  height="220px" 
                  alt="基础入门" 
                />
              </div>
              <div className={styles.stepContent}>
                <h5 className={styles.stepTitle}>3. 进阶提升</h5>
                <p className={styles.stepDescription}>
                  深入学习高级主题，包括性能优化、系统设计、DevOps和云原生技术等。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}