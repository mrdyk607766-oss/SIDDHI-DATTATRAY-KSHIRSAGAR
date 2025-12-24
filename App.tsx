
import React, { useState, useEffect } from 'react';
import { Category, Problem, User, Solution } from './types';
import Layout from './components/Layout';
import ProblemCard from './components/ProblemCard';
import PostProblemModal from './components/PostProblemModal';
import ProblemDetail from './components/ProblemDetail';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  expertise: [Category.TECH, Category.BUSINESS],
  bio: 'Senior Infrastructure Engineer with 10 years of experience in distributed systems.',
  location: 'San Francisco, CA'
};

const INITIAL_PROBLEMS: Problem[] = [
  {
    id: 'p1',
    title: 'Migrating from Legacy Oracle to Cloud-Native PostgreSQL',
    description: 'Our enterprise is struggling with a 15-year-old monolithic Oracle database. We need to migrate 40TB of data with minimal downtime. Looking for experts who have managed zero-downtime cutovers at this scale.',
    category: Category.TECH,
    authorId: 'u2',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://picsum.photos/seed/sarah/100/100',
    timestamp: Date.now() - 3600000 * 5,
    solutions: [
      {
        id: 's1',
        authorId: 'u3',
        authorName: 'David Wong',
        authorAvatar: 'https://picsum.photos/seed/david/100/100',
        content: 'I recommend using AWS DMS with CDC enabled. We did a similar migration for a fintech app last year.',
        timestamp: Date.now() - 3600000 * 2,
        upvotes: 12,
        isExpertSolution: true
      }
    ],
    genuinenessScore: 98,
    tags: ['database', 'migration', 'cloud-native']
  },
  {
    id: 'p2',
    title: 'Legal implications of EU AI Act on small SaaS startups',
    description: 'We are a small startup based in Toronto but serving EU customers. How does the new AI act affect our low-risk LLM-powered chatbot? Are we required to undergo a full compliance audit immediately?',
    category: Category.LAW,
    authorId: 'u4',
    authorName: 'Marcus T.',
    authorAvatar: 'https://picsum.photos/seed/marcus/100/100',
    timestamp: Date.now() - 3600000 * 24,
    solutions: [],
    genuinenessScore: 85,
    tags: ['compliance', 'ai-act', 'legal']
  }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USER);
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);

  const handlePostProblem = (newProblem: Problem) => {
    setProblems([newProblem, ...problems]);
  };

  const handleAddSolution = (problemId: string, solution: Solution) => {
    setProblems(prev => prev.map(p => 
      p.id === problemId 
        ? { ...p, solutions: [...p.solutions, solution] }
        : p
    ));
  };

  const selectedProblem = problems.find(p => p.id === selectedProblemId);

  return (
    <Layout 
      user={currentUser} 
      onLogout={() => setCurrentUser(null)} 
      onOpenPostModal={() => setIsPostModalOpen(true)}
    >
      {selectedProblem ? (
        <ProblemDetail 
          problem={selectedProblem} 
          user={currentUser!} 
          onClose={() => setSelectedProblemId(null)}
          onAddSolution={handleAddSolution}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Recent Challenges</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="bg-white border border-gray-200 rounded-md text-sm px-2 py-1 outline-none">
                <option>Newest</option>
                <option>Highest Verified</option>
                <option>Most Solutions</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map(problem => (
              <ProblemCard 
                key={problem.id} 
                problem={problem} 
                onClick={(p) => setSelectedProblemId(p.id)}
              />
            ))}
          </div>

          {problems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <i className="fa-solid fa-cloud-sun text-4xl text-gray-200 mb-4"></i>
              <p className="text-gray-400">No problems found. Start a new discussion!</p>
            </div>
          )}
        </div>
      )}

      {currentUser && (
        <PostProblemModal 
          isOpen={isPostModalOpen} 
          onClose={() => setIsPostModalOpen(false)} 
          user={currentUser}
          onPost={handlePostProblem}
        />
      )}
    </Layout>
  );
};

export default App;
