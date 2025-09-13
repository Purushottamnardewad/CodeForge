import { VM } from 'vm2';
import { ITestCase } from '../models/Problem';

interface ExecutionResult {
  input: string;
  expected: string;
  got: string;
  passed: boolean;
  error?: string;
}

export const executeCode = async (
  code: string, 
  testCases: any[], // Database test cases (not used, we'll generate our own)
  problemTitle?: string
): Promise<ExecutionResult[]> => {
  const results: ExecutionResult[] = [];
  
  // Get problem-specific test cases
  const actualTestCases = getProblemTestCases(problemTitle || '');
  
  if (actualTestCases.length === 0) {
    // Fallback for unknown problems
    results.push({
      input: 'Unknown problem',
      expected: 'N/A',
      got: '',
      passed: false,
      error: 'No test cases available for this problem'
    });
    return results;
  }

  for (let i = 0; i < actualTestCases.length; i++) {
    const testCase = actualTestCases[i];
    try {
      // Create isolated VM with timeout
      const vm = new VM({
        timeout: 3000, // 3 second timeout
        sandbox: {
          console: {
            log: () => {}, // Disable console.log in sandbox
          }
        }
      });

      // Wrap user code to handle input/output
      const wrappedCode = `
        ${code}
        
        // Parse input and call solution function
        const input = ${JSON.stringify(testCase.input)};
        let result;
        
        // Get all function names from the user code
        const functionNames = [];
        const codeStr = \`${code}\`;
        const functionRegex = /function\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
        let match;
        while ((match = functionRegex.exec(codeStr)) !== null) {
          functionNames.push(match[1]);
        }
        
        // Try to find and call any available function
        let executed = false;
        
        // Special handling for different problem types
        ${getSpecialHandlingCode(problemTitle || '')}
        
        // If no special handling worked, try common function names
        if (!executed) {
          const commonNames = [
            'solution', 'solve', 'main', 
            'twoSum', 'maxArea', 'trap', 'merge',
            'lengthOfLongestSubstring', 'isPalindrome', 'isAnagram', 'groupAnagrams',
            'inorderTraversal', 'maxDepth',
            'reverse', 'countPrimes', 'fizzBuzz', 'isPalindromeNumber',
            'isValid', 'validParentheses', 'dailyTemperatures',
            'singleNumber', 'hammingWeight',
            'rob', 'climbStairs',
            'numIslands',
            'search', 'searchInsert', 'findMedianSortedArrays'
          ];
          
          for (const name of commonNames) {
            if (typeof eval('typeof ' + name) === 'function') {
              try {
                result = eval(name + '(input)');
                executed = true;
                break;
              } catch (e) {
                // Continue to next function
              }
            }
          }
        }
        
        // If no common function worked, try discovered function names
        if (!executed && functionNames.length > 0) {
          for (const funcName of functionNames) {
            try {
              result = eval(funcName + '(input)');
              executed = true;
              break;
            } catch (e) {
              // Continue to next function
            }
          }
        }
        
        // Convert result to string for comparison
        if (typeof result === 'object') {
          result = JSON.stringify(result);
        } else {
          result = String(result);
        }
        
        result;
      `;

      // Execute code
      const output = vm.run(wrappedCode);
      const outputStr = String(output);
      
      // Compare with expected output
      const expectedStr = String(testCase.expected);
      const passed = outputStr.trim() === expectedStr.trim();

      results.push({
        input: typeof testCase.input === 'object' ? JSON.stringify(testCase.input) : String(testCase.input),
        expected: expectedStr,
        got: outputStr,
        passed
      });
    } catch (error: any) {
      // Handle execution errors
      results.push({
        input: typeof testCase.input === 'object' ? JSON.stringify(testCase.input) : String(testCase.input),
        expected: String(testCase.expected),
        got: '',
        passed: false,
        error: error.message || 'Runtime error'
      });
    }
  }

  return results;
};

// Get problem-specific test cases
function getProblemTestCases(title: string): Array<{input: any, expected: any}> {
  const titleLower = title.toLowerCase();
  
  // Two Sum
  if (titleLower.includes('two sum')) {
    return [
      { input: [[2, 7, 11, 15], 9], expected: '[0,1]' },
      { input: [[3, 2, 4], 6], expected: '[1,2]' },
      { input: [[3, 3], 6], expected: '[0,1]' }
    ];
  }
  
  // Valid Parentheses
  if (titleLower.includes('valid parentheses')) {
    return [
      { input: "()", expected: 'true' },
      { input: "()[]{}",  expected: 'true' },
      { input: "(]", expected: 'false' },
      { input: "([)]", expected: 'false' }
    ];
  }
  
  // Single Number
  if (titleLower.includes('single number')) {
    return [
      { input: [2, 2, 1], expected: '1' },
      { input: [4, 1, 2, 1, 2], expected: '4' },
      { input: [1], expected: '1' }
    ];
  }
  
  // House Robber
  if (titleLower.includes('house robber')) {
    return [
      { input: [1, 2, 3, 1], expected: '4' },
      { input: [2, 7, 9, 3, 1], expected: '12' },
      { input: [2, 1, 1, 2], expected: '4' }
    ];
  }
  
  // Binary Tree Inorder Traversal
  if (titleLower.includes('binary tree inorder traversal')) {
    return [
      { input: [1, null, 2, 3], expected: '[1,3,2]' },
      { input: [], expected: '[]' },
      { input: [1], expected: '[1]' }
    ];
  }
  
  // Daily Temperatures
  if (titleLower.includes('daily temperatures')) {
    return [
      { input: [73,74,75,71,69,72,76,73], expected: '[1,1,4,2,1,1,0,0]' },
      { input: [30,40,50,60], expected: '[1,1,1,0]' },
      { input: [30,60,90], expected: '[1,1,0]' }
    ];
  }
  
  // Number of Islands
  if (titleLower.includes('number of islands')) {
    return [
      { 
        input: [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]], 
        expected: '1' 
      },
      { 
        input: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]], 
        expected: '3' 
      }
    ];
  }
  
  // Climbing Stairs
  if (titleLower.includes('climbing stairs')) {
    return [
      { input: 2, expected: '2' },
      { input: 3, expected: '3' },
      { input: 4, expected: '5' }
    ];
  }
  
  // Maximum Depth of Binary Tree
  if (titleLower.includes('maximum depth') && titleLower.includes('binary tree')) {
    return [
      { input: [3,9,20,null,null,15,7], expected: '3' },
      { input: [1,null,2], expected: '2' },
      { input: [], expected: '0' }
    ];
  }
  
  // Number of 1 Bits
  if (titleLower.includes('number of 1 bits') || titleLower.includes('hamming weight')) {
    return [
      { input: 11, expected: '3' },
      { input: 128, expected: '1' },
      { input: 4294967293, expected: '31' }
    ];
  }
  
  // Search Insert Position
  if (titleLower.includes('search insert position')) {
    return [
      { input: [[1,3,5,6], 5], expected: '2' },
      { input: [[1,3,5,6], 2], expected: '1' },
      { input: [[1,3,5,6], 7], expected: '4' }
    ];
  }
  
  // Longest Substring Without Repeating Characters
  if (titleLower.includes('longest substring') && titleLower.includes('repeating')) {
    return [
      { input: "abcabcbb", expected: '3' },
      { input: "bbbbb", expected: '1' },
      { input: "pwwkew", expected: '3' }
    ];
  }
  
  // Reverse Integer
  if (titleLower.includes('reverse integer')) {
    return [
      { input: 123, expected: '321' },
      { input: -123, expected: '-321' },
      { input: 120, expected: '21' }
    ];
  }
  
  // Count Primes
  if (titleLower.includes('count primes')) {
    return [
      { input: 10, expected: '4' },
      { input: 0, expected: '0' },
      { input: 1, expected: '0' }
    ];
  }
  
  // Median of Two Sorted Arrays
  if (titleLower.includes('median') && titleLower.includes('sorted arrays')) {
    return [
      { input: [[1,3], [2]], expected: '2' },
      { input: [[1,2], [3,4]], expected: '2.5' },
      { input: [[0,0], [0,0]], expected: '0' }
    ];
  }
  
  // Group Anagrams
  if (titleLower.includes('group anagrams')) {
    return [
      { input: ["eat","tea","tan","ate","nat","bat"], expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: [""], expected: '[[""]]' },
      { input: ["a"], expected: '[["a"]]' }
    ];
  }
  
  // Binary Search
  if (titleLower === 'binary search') {
    return [
      { input: [[-1,0,3,5,9,12], 9], expected: '4' },
      { input: [[-1,0,3,5,9,12], 2], expected: '-1' },
      { input: [[5], 5], expected: '0' }
    ];
  }
  
  // Valid Anagram
  if (titleLower.includes('valid anagram')) {
    return [
      { input: ["anagram", "nagaram"], expected: 'true' },
      { input: ["rat", "car"], expected: 'false' },
      { input: ["listen", "silent"], expected: 'true' }
    ];
  }
  
  // FizzBuzz
  if (titleLower.includes('fizzbuzz')) {
    return [
      { input: 3, expected: '["1","2","Fizz"]' },
      { input: 5, expected: '["1","2","Fizz","4","Buzz"]' },
      { input: 15, expected: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
    ];
  }
  
  // Valid Palindrome
  if (titleLower.includes('valid palindrome')) {
    return [
      { input: "A man, a plan, a canal: Panama", expected: 'true' },
      { input: "race a car", expected: 'false' },
      { input: " ", expected: 'true' }
    ];
  }
  
  // Merge Sorted Array
  if (titleLower.includes('merge sorted array')) {
    return [
      { input: [[1,2,3,0,0,0], 3, [2,5,6], 3], expected: '[1,2,2,3,5,6]' },
      { input: [[1], 1, [], 0], expected: '[1]' },
      { input: [[0], 0, [1], 1], expected: '[1]' }
    ];
  }
  
  // Trapping Rain Water
  if (titleLower.includes('trapping rain water')) {
    return [
      { input: [0,1,0,2,1,0,1,3,2,1,2,1], expected: '6' },
      { input: [4,2,0,3,2,5], expected: '9' },
      { input: [3,0,2,0,4], expected: '7' }
    ];
  }
  
  // Palindrome Number
  if (titleLower.includes('palindrome number')) {
    return [
      { input: 121, expected: 'true' },
      { input: -121, expected: 'false' },
      { input: 10, expected: 'false' }
    ];
  }
  
  // Container With Most Water
  if (titleLower.includes('container') && titleLower.includes('water')) {
    return [
      { input: [1,8,6,2,5,4,8,3,7], expected: '49' },
      { input: [1,1], expected: '1' },
      { input: [4,3,2,1,4], expected: '16' }
    ];
  }
  
  // Default fallback
  return [
    { input: 'test', expected: 'test' }
  ];
}

// Get special handling code for specific problems
function getSpecialHandlingCode(title: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('two sum')) {
    return `
      // Special handling for Two Sum with two parameters
      if (typeof eval('typeof twoSum') === 'function' && Array.isArray(input) && input.length === 2) {
        try {
          result = eval('twoSum(input[0], input[1])');
          executed = true;
        } catch (e) {
          // Continue to other attempts
        }
      }
    `;
  }
  
  if (titleLower.includes('merge sorted array')) {
    return `
      // Special handling for merge function with 4 parameters
      if (typeof eval('typeof merge') === 'function' && Array.isArray(input) && input.length === 4) {
        try {
          result = eval('merge(input[0], input[1], input[2], input[3])');
          executed = true;
        } catch (e) {
          // Continue to other attempts  
        }
      }
    `;
  }
  
  if (titleLower.includes('valid anagram')) {
    return `
      // Special handling for isAnagram with two parameters
      if (typeof eval('typeof isAnagram') === 'function' && Array.isArray(input) && input.length === 2) {
        try {
          result = eval('isAnagram(input[0], input[1])');
          executed = true;
        } catch (e) {
          // Continue to other attempts
        }
      }
    `;
  }
  
  if (titleLower.includes('binary search') || titleLower.includes('search insert')) {
    return `
      // Special handling for search functions with two parameters  
      if ((typeof eval('typeof search') === 'function' || typeof eval('typeof searchInsert') === 'function') && Array.isArray(input) && input.length === 2) {
        try {
          if (typeof eval('typeof search') === 'function') {
            result = eval('search(input[0], input[1])');
          } else {
            result = eval('searchInsert(input[0], input[1])');
          }
          executed = true;
        } catch (e) {
          // Continue to other attempts
        }
      }
    `;
  }
  
  if (titleLower.includes('median') && titleLower.includes('sorted arrays')) {
    return `
      // Special handling for findMedianSortedArrays with two parameters
      if (typeof eval('typeof findMedianSortedArrays') === 'function' && Array.isArray(input) && input.length === 2) {
        try {
          result = eval('findMedianSortedArrays(input[0], input[1])');
          executed = true;
        } catch (e) {
          // Continue to other attempts
        }
      }
    `;
  }
  
  return '// No special handling needed';
}

// Alternative implementation using child_process (more secure but requires setup)
export const executeCodeSandboxed = async (
  code: string,
  testCases: ITestCase[]
): Promise<ExecutionResult[]> => {
  // This would use child_process with temporary files
  // Implementation would be similar but spawn a separate Node process
  // with restricted permissions and resource limits
  
  // For MVP, we're using VM2 above which provides reasonable sandboxing
  return executeCode(code, testCases);
};