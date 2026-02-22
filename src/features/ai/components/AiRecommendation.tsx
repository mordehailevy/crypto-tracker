import React from 'react';
import type { AiRecommendation as AiRec } from '../../../types';
import './AiRecommendation.css';

interface Props {
  recommendation: AiRec;
}

export const AiRecommendation: React.FC<Props> = ({ recommendation }) => {
  const isBuy = recommendation.recommendation === 'BUY';

  return (
    <div className={`ai-rec ${isBuy ? 'ai-rec--buy' : 'ai-rec--sell'}`}>
      <div className="ai-rec__header">
        <span className="ai-rec__badge">{isBuy ? '▲ BUY' : '▼ DO NOT BUY'}</span>
        <span className="ai-rec__label">AI Recommendation</span>
      </div>
      <p className="ai-rec__reasoning">{recommendation.reasoning}</p>
    </div>
  );
};
