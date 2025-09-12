import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/api.js';
import clsx from 'clsx';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('/problems');
      setProblems(response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = filter === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty === filter);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Coding Problems</h1>
        <p className="mt-2 text-gray-600">
          Practice your coding skills with our curated problems
        </p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Easy')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === 'Easy' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            Easy
          </button>
          <button
            onClick={() => setFilter('Medium')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === 'Medium' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('Hard')}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === 'Hard' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            Hard
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredProblems.map((problem) => (
            <li key={problem._id}>
              <Link
                to={`/problems/${problem._id}`}
                className="block hover:bg-gray-50 transition-colors"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-primary-600 truncate">
                        {problem.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Category: {problem.category}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className={clsx(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getDifficultyColor(problem.difficulty)
                      )}>
                        {problem.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No problems found</p>
        </div>
      )}
    </div>
  );
};

export default Problems;