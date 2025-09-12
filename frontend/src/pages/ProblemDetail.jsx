import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/api.js';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import CodeEditor from '../components/CodeEditor';
import TestResults from '../components/TestResults';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const generateDefaultStarterCode = (title) => {
    // Generate function name from title
    const funcName = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(' ')
      .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    // Generate starter template based on problem type
    if (title.includes('Two Sum') || title.includes('Array')) {
      return `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function ${funcName}(nums, target) {
    // Your code here
    return [];
}`;
    } else if (title.includes('Tree')) {
      return `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
function ${funcName}(root) {
    // Your code here
    return 0;
}`;
    } else if (title.includes('String') || title.includes('Palindrome') || title.includes('Valid')) {
      return `/**
 * @param {string} s
 * @return {boolean}
 */
function ${funcName}(s) {
    // Your code here
    return false;
}`;
    } else if (title.includes('Number') || title.includes('Integer')) {
      return `/**
 * @param {number} x
 * @return {number}
 */
function ${funcName}(x) {
    // Your code here
    return 0;
}`;
    } else {
      return `/**
 * Write your solution here
 */
function ${funcName}(input) {
    // Your code here
    return result;
}`;
    }
  };

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const response = await axios.get(`/problems/${id}`);
      const problemData = response.data;
      setProblem(problemData);
      
      // Set initial starter code
      const starterCode = problemData.starterCode?.javascript || generateDefaultStarterCode(problemData.title);
      setCode(starterCode);
    } catch (error) {
      console.error('Error fetching problem:', error);
      toast.error('Failed to load problem');
    } finally {
      setLoading(false);
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    setRunning(true);
    setTestResults(null);

    try {
      const response = await axios.post(`/execute/${id}`, {
        code,
        language
      });      setTestResults(response.data);
      
      if (response.data.passed === response.data.totalCases) {
        toast.success('All test cases passed! 🎉');
      } else {
        toast.error(`${response.data.passed}/${response.data.totalCases} test cases passed`);
      }
    } catch (error) {
      console.error('Error running code:', error);
      toast.error(error.response?.data?.message || 'Failed to execute code');
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    if (problem) {
      const starterCode = problem.starterCode?.javascript || generateDefaultStarterCode(problem.title);
      setCode(starterCode);
      setTestResults(null);
      toast.success('Code reset to starter template');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Problem not found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Problem Description */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('description')}
              className={clsx(
                'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'description'
                  ? 'bg-white text-primary-600 border-b-2 border-primary-600'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              )}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={clsx(
                'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'examples'
                  ? 'bg-white text-primary-600 border-b-2 border-primary-600'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              )}
            >
              Examples
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {activeTab === 'description' ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className={clsx(
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  problem.difficulty === 'Easy' && 'bg-green-100 text-green-800',
                  problem.difficulty === 'Medium' && 'bg-yellow-100 text-yellow-800',
                  problem.difficulty === 'Hard' && 'bg-red-100 text-red-800'
                )}>
                  {problem.difficulty}
                </span>
                <span className="text-sm text-gray-600">
                  Category: {problem.category}
                </span>
              </div>

              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">
                  {problem.description}
                </div>
                
                {problem.constraints && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900">Constraints:</h3>
                    <div className="mt-2 whitespace-pre-wrap text-gray-700">
                      {problem.constraints}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Examples</h2>
              <div className="space-y-4">
                {problem.examples.map((example, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Example {index + 1}:
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Input:</span>
                        <pre className="mt-1 p-2 bg-white rounded border text-sm">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Output:</span>
                        <pre className="mt-1 p-2 bg-white rounded border text-sm">
                          {example.output}
                        </pre>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Explanation:</span>
                          <p className="mt-1 text-sm text-gray-700">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor and Results */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Solution</h2>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="btn-secondary text-sm"
              >
                Reset
              </button>
              <button
                onClick={handleRunCode}
                disabled={running}
                className="btn-primary text-sm"
              >
                {running ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
          
          <CodeEditor
            code={code}
            onChange={setCode}
            language="javascript"
          />
        </div>

        {testResults && (
          <TestResults results={testResults} />
        )}
      </div>
    </div>
  );
};

export default ProblemDetail;