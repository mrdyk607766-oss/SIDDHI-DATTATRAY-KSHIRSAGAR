
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onOpenPostModal: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onOpenPostModal }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i className="fa-solid fa-earth-americas text-indigo-600 text-3xl mr-2"></i>
                <span className="text-xl font-bold text-gray-900 tracking-tight">GlobalSolve</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Feed
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Experts
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Map
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={onOpenPostModal}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Post Problem
                  </button>
                  <div className="flex items-center space-x-3 ml-4">
                    <img className="h-8 w-8 rounded-full object-cover" src={user.avatar} alt={user.name} />
                    <span className="hidden md:block text-sm font-medium text-gray-700">{user.name}</span>
                    <button onClick={onLogout} className="text-gray-400 hover:text-gray-500">
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                  </div>
                </>
              ) : (
                <button className="text-indigo-600 font-semibold">Sign In</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Sidebar - Left */}
        <aside className="hidden lg:block w-64 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
            <nav className="space-y-1">
              {['All Problems', 'Technology', 'Business', 'Law', 'Science', 'Design'].map((cat) => (
                <a key={cat} href="#" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                  <span className="truncate">{cat}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="bg-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Become an Expert</h3>
            <p className="text-indigo-100 text-sm mb-4">Share your knowledge and help others solve real-world problems.</p>
            <button className="w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition">Apply Now</button>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

        {/* Sidebar - Right */}
        <aside className="hidden xl:block w-80 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Active Experts</h3>
            <div className="space-y-4">
              {[
                { name: 'Dr. Sarah Chen', role: 'Medical Science', avatar: 'https://picsum.photos/seed/sarah/100/100' },
                { name: 'James Miller', role: 'Business Law', avatar: 'https://picsum.photos/seed/james/100/100' },
                { name: 'Elena Rodriguez', role: 'UX Architecture', avatar: 'https://picsum.photos/seed/elena/100/100' }
              ].map((expert) => (
                <div key={expert.name} className="flex items-center space-x-3">
                  <img className="h-10 w-10 rounded-full" src={expert.avatar} alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{expert.name}</p>
                    <p className="text-xs text-gray-500 truncate">{expert.role}</p>
                  </div>
                  <button className="text-indigo-600 text-xs font-semibold hover:underline">Follow</button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Server Activity</h3>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Online Now</span>
              <span className="text-green-500 font-bold">● 1,248</span>
            </div>
            <div className="mt-4 h-32 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
              <span className="text-gray-400 text-xs text-center px-4">Live World Activity Map placeholder</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
