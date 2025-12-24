
import React from 'react';
import { Problem } from '../types';

interface ProblemCardProps {
  problem: Problem;
  onClick: (problem: Problem) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onClick }) => {
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div 
      onClick={() => onClick(problem)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer group"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getScoreColor(problem.genuinenessScore)}`}>
              Verified {problem.genuinenessScore}%
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-medium text-indigo-600">{problem.category}</span>
          </div>
          <div className="flex -space-x-1">
            {problem.solutions.slice(0, 3).map((s, idx) => (
              <img key={idx} className="h-6 w-6 rounded-full border-2 border-white" src={s.authorAvatar} alt="" />
            ))}
            {problem.solutions.length > 3 && (
              <div className="h-6 w-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
                +{problem.solutions.length - 3}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">{problem.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {problem.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {problem.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md font-medium">#{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center space-x-3">
            <img className="h-8 w-8 rounded-full border border-gray-200" src={problem.authorAvatar} alt="" />
            <div>
              <p className="text-xs font-bold text-gray-900">{problem.authorName}</p>
              <p className="text-[10px] text-gray-500">{timeAgo(problem.timestamp)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center text-xs">
              <i className="fa-regular fa-comment mr-1"></i>
              {problem.solutions.length}
            </div>
            <div className="flex items-center text-xs">
              <i className="fa-regular fa-heart mr-1"></i>
              {Math.floor(Math.random() * 20)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
