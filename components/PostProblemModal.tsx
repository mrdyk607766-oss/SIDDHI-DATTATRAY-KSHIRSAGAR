
import React, { useState } from 'react';
import { Category, Problem, User } from '../types';
import { analyzeProblem } from '../services/geminiService';

interface PostProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onPost: (problem: Problem) => void;
}

const PostProblemModal: React.FC<PostProblemModalProps> = ({ isOpen, onClose, user, onPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsAnalyzing(true);
    const analysis = await analyzeProblem(title, description);
    
    const newProblem: Problem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      category: analysis.category || Category.OTHER,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      timestamp: Date.now(),
      solutions: [],
      genuinenessScore: analysis.genuinenessScore || 0,
      tags: analysis.tags || [],
    };

    onPost(newProblem);
    setIsAnalyzing(false);
    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
              <i className="fa-solid fa-circle-question text-indigo-600"></i>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-bold text-gray-900">Post a Problem</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Provide as much detail as possible. Our AI will analyze your post to ensure it reaches the right experts.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Headline</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Scaling Node.js architecture for 1M+ concurrent users"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Context & Details</label>
              <textarea
                id="description"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe the problem, what you have tried, and specific constraints..."
                required
              />
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                disabled={isAnalyzing}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAnalyzing ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    AI Analysis...
                  </>
                ) : 'Post to Community'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProblemModal;
