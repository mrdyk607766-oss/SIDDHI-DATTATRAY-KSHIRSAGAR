
import React, { useState, useEffect } from 'react';
import { Problem, User, Solution } from '../types';
import { getExpertAIAssistance } from '../services/geminiService';

interface ProblemDetailProps {
  problem: Problem;
  user: User;
  onClose: () => void;
  onAddSolution: (problemId: string, solution: Solution) => void;
}

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem, user, onClose, onAddSolution }) => {
  const [newSolution, setNewSolution] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      setIsAiLoading(true);
      const res = await getExpertAIAssistance(problem.title, problem.description);
      setAiResponse(res);
      setIsAiLoading(false);
    };
    fetchAI();
  }, [problem.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSolution.trim()) return;

    const solution: Solution = {
      id: Math.random().toString(36).substr(2, 9),
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      content: newSolution,
      timestamp: Date.now(),
      upvotes: 0,
      isExpertSolution: user.expertise.length > 0
    };

    onAddSolution(problem.id, solution);
    setNewSolution('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Feed
        </button>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition">
            <i className="fa-regular fa-share-from-square"></i>
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 transition">
            <i className="fa-regular fa-flag"></i>
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[10px] font-bold uppercase tracking-wider">
            {problem.category}
          </span>
          {problem.genuinenessScore > 80 && (
            <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-wider">
              <i className="fa-solid fa-check-double mr-1"></i> Verified Authentic
            </span>
          )}
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{problem.title}</h1>
        
        <div className="flex items-center space-x-4 mb-8">
          <img className="h-12 w-12 rounded-full ring-2 ring-indigo-50" src={problem.authorAvatar} alt="" />
          <div>
            <p className="text-sm font-bold text-gray-900">{problem.authorName}</p>
            <p className="text-xs text-gray-500">Posted on {new Date(problem.timestamp).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="prose max-w-none text-gray-700 text-lg leading-relaxed mb-10">
          {problem.description.split('\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>

        {/* AI Insight Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-10 border border-indigo-100">
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
              <i className="fa-solid fa-sparkles text-white text-sm"></i>
            </div>
            <h3 className="text-indigo-900 font-bold">AI Preliminary Analysis</h3>
          </div>
          {isAiLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
              <div className="h-4 bg-indigo-200 rounded w-1/2"></div>
            </div>
          ) : (
            <div className="text-indigo-800 text-sm whitespace-pre-wrap leading-relaxed">
              {aiResponse}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Expert Solutions ({problem.solutions.length})</h2>
          
          <div className="space-y-6 mb-10">
            {problem.solutions.map((sol) => (
              <div key={sol.id} className={`p-6 rounded-xl border ${sol.isExpertSolution ? 'border-amber-100 bg-amber-50/30' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img className="h-10 w-10 rounded-full" src={sol.authorAvatar} alt="" />
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-bold text-gray-900">{sol.authorName}</p>
                        {sol.isExpertSolution && (
                          <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black uppercase rounded">Top Expert</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{new Date(sol.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-indigo-600">
                      <i className="fa-regular fa-thumbs-up"></i>
                      <span className="text-xs">{sol.upvotes}</span>
                    </button>
                  </div>
                </div>
                <div className="text-gray-700 text-sm whitespace-pre-wrap">
                  {sol.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">Share your solution</label>
            <textarea
              className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
              rows={4}
              placeholder="Provide actionable advice, code snippets, or resources..."
              value={newSolution}
              onChange={(e) => setNewSolution(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Post Solution
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
