import React from 'react';
import clsx from 'clsx';

const TestResults = ({ results }) => {
  if (!results) return null;

  const { totalCases, passed, results: testCases } = results;
  const allPassed = totalCases === passed;

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Test Results</h3>
        <div className={clsx(
          'text-sm font-medium',
          allPassed ? 'text-green-600' : 'text-red-600'
        )}>
          {passed} / {totalCases} test cases passed
        </div>
      </div>

      <div className="space-y-3">
        {testCases.map((testCase, index) => (
          <div 
            key={index}
            className={clsx(
              'border rounded-lg p-3',
              testCase.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Test Case {index + 1}
              </span>
              <span className={clsx(
                'text-xs font-semibold px-2 py-1 rounded',
                testCase.passed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              )}>
                {testCase.passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
            
            <div className="space-y-1 text-sm">
              <div>
                <span className="font-medium text-gray-600">Input:</span>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                  {testCase.input}
                </pre>
              </div>
              
              <div>
                <span className="font-medium text-gray-600">Expected:</span>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                  {testCase.expected}
                </pre>
              </div>
              
              <div>
                <span className="font-medium text-gray-600">Got:</span>
                <pre className={clsx(
                  'mt-1 p-2 rounded text-xs overflow-x-auto',
                  testCase.passed ? 'bg-gray-100' : 'bg-red-100'
                )}>
                  {testCase.got || testCase.error || 'No output'}
                </pre>
              </div>
              
              {testCase.error && (
                <div className="mt-2 text-red-600 text-xs">
                  Error: {testCase.error}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;