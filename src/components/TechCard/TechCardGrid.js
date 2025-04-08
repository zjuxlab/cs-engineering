import React from 'react';
import TechCard from './TechCard';
import styles from '../TechCard/styles.module.css';

export default function TechCardGrid({ cards }) {
  return (
    <div className={styles.cardGrid}>
      {cards.map((card, idx) => (
        <TechCard 
          key={idx}
          title={card.title}
          description={card.description}
          icon={card.icon}
          link={card.link}
        />
      ))}
    </div>
  );
}