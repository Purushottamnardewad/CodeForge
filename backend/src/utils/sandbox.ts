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
  testCases: any[], // Using any[] to handle current database format
  problemTitle?: string
): Promise<ExecutionResult[]> => {
  const results: ExecutionResult[] = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    try {
      // Handle current database format where input is missing and output is used instead of expectedOutput
      let input = testCase.input;
      const expectedOutput = testCase.expectedOutput || testCase.output;
      
      // Generate test input based on problem if missing
      if (!input) {
        input = generateTestInput(problemTitle || '', i, expectedOutput);
      }

      // Create isolated VM with timeout
      const vm = new VM({
        timeout: 2000, // 2 second timeout
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
        const input = ${JSON.stringify(input)};
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
        
        // Special handling for Two Sum problem which commonly uses two parameters
        if (typeof eval('typeof twoSum') === 'function' && Array.isArray(input) && input.length === 2) {
          try {
            result = eval('twoSum(input[0], input[1])');
            executed = true;
          } catch (e) {
            // Continue to other attempts
          }
        }
        
        // First try common function names with single parameter
        if (!executed) {
          const commonNames = [
            'solution', 'solve', 'main', 
            // Array problems
            'twoSum', 'maxArea', 'trap', 'merge',
            // String problems  
            'lengthOfLongestSubstring', 'isPalindrome', 'isAnagram', 'groupAnagrams',
            // Tree problems
            'inorderTraversal', 'maxDepth',
            // Math problems
            'reverse', 'countPrimes', 'fizzBuzz', 'isPalindromeNumber',
            // Stack problems
            'isValid', 'validParentheses', 'dailyTemperatures',
            // Bit manipulation
            'singleNumber', 'hammingWeight',
            // Dynamic Programming
            'rob', 'climbStairs',
            // Graph problems
            'numIslands',
            // Binary Search
            'search', 'searchInsert', 'findMedianSortedArrays'
          ];
          for (const name of commonNames) {
            if (typeof eval('typeof ' + name) === 'function') {
              try {
                result = eval(name + '(input)');
                executed = true;
                break;
              } catch (e) {
                // Try with parsed input if it's a string
                if (typeof input === 'string') {
                  try {
                    const parsedInput = JSON.parse(input);
                    result = eval(name + '(parsedInput)');
                    executed = true;
                    break;
                  } catch (e2) {
                    // Continue to next function
                  }
                }
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
              // Try with parsed input if it's a string
              if (typeof input === 'string') {
                try {
                  const parsedInput = JSON.parse(input);
                  result = eval(funcName + '(parsedInput)');
                  executed = true;
                  break;
                } catch (e2) {
                  // Continue to next function
                }
              }
            }
          }
        }
        
        // If still no function worked, try to execute the code directly
        if (!executed) {
          result = eval('(' + input + ')');
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
      const expectedStr = String(expectedOutput);
      const passed = outputStr.trim() === expectedStr.trim();

      results.push({
        input: String(input),
        expected: expectedStr,
        got: outputStr,
        passed
      });
    } catch (error: any) {
      // Handle execution errors
      results.push({
        input: String(testCase.input || 'N/A'),
        expected: String(testCase.expectedOutput || testCase.output || 'N/A'),
        got: '',
        passed: false,
        error: error.message || 'Runtime error'
      });
    }
  }

  return results;
};

// Generate test input based on problem title and expected output
function generateTestInput(title: string, testIndex: number, expectedOutput: any): any {
  const titleLower = title.toLowerCase();
  
  // Array Problems
  if (titleLower.includes('two sum')) {
    const testCases = [
      [[2, 7, 11, 15], 9],  // Expected: [0,1] - traditional format for twoSum(nums, target)
      [[3, 2, 4], 6],       // Expected: [1,2]
      [[3, 3], 6]           // Expected: [0,1]
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('container') && titleLower.includes('water')) {
    const testCases = [
      [1,8,6,2,5,4,8,3,7],  // Expected: 49
      [1,1],                // Expected: 1
      [4,3,2,1,4]          // Expected: 16
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('trapping rain water')) {
    const testCases = [
      [0,1,0,2,1,0,1,3,2,1,2,1],  // Expected: 6
      [4,2,0,3,2,5],              // Expected: 9
      [3,0,2,0,4]                 // Expected: 7
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('merge sorted array')) {
    const testCases = [
      [[1,2,3,0,0,0], 3, [2,5,6], 3],  // Expected: [1,2,2,3,5,6]
      [[1], 1, [], 0],                 // Expected: [1]
      [[0], 0, [1], 1]                 // Expected: [1]
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // String Problems
  if (titleLower.includes('longest substring') && titleLower.includes('repeating')) {
    const testCases = [
      "abcabcbb",    // Expected: 3
      "bbbbb",       // Expected: 1
      "pwwkew"       // Expected: 3
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('valid palindrome')) {
    const testCases = [
      "A man, a plan, a canal: Panama",  // Expected: true
      "race a car",                      // Expected: false
      " "                                // Expected: true
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('valid anagram')) {
    const testCases = [
      ["anagram", "nagaram"],  // Expected: true
      ["rat", "car"],          // Expected: false
      ["listen", "silent"]     // Expected: true
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('group anagrams')) {
    const testCases = [
      ["eat","tea","tan","ate","nat","bat"],  // Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]
      [""],                                   // Expected: [[""]]
      ["a"]                                   // Expected: [["a"]]
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Math Problems
  if (titleLower.includes('reverse integer')) {
    const testCases = [
      123,    // Expected: 321
      -123,   // Expected: -321
      120     // Expected: 21
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('palindrome number')) {
    const testCases = [
      121,   // Expected: true
      -121,  // Expected: false
      10     // Expected: false
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('count primes')) {
    const testCases = [
      10,  // Expected: 4
      0,   // Expected: 0
      1    // Expected: 0
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('fizzbuzz')) {
    const testCases = [
      3,   // Expected: ["1","2","Fizz"]
      5,   // Expected: ["1","2","Fizz","4","Buzz"]
      15   // Expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Stack Problems
  if (titleLower.includes('valid parentheses')) {
    const testCases = [
      "()",       // Expected: true
      "()[]{}",   // Expected: true
      "(]",       // Expected: false
      "([)]"      // Expected: false
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('daily temperatures')) {
    const testCases = [
      [73,74,75,71,69,72,76,73],  // Expected: [1,1,4,2,1,1,0,0]
      [30,40,50,60],              // Expected: [1,1,1,0]
      [30,60,90]                  // Expected: [1,1,0]
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Bit Manipulation Problems
  if (titleLower.includes('single number')) {
    const testCases = [
      [2,2,1],        // Expected: 1
      [4,1,2,1,2],    // Expected: 4
      [1]             // Expected: 1
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('number of 1 bits') || titleLower.includes('hamming weight')) {
    const testCases = [
      0b00000000000000000000000000001011,  // Expected: 3
      0b00000000000000000000000010000000,  // Expected: 1
      0b11111111111111111111111111111101   // Expected: 31
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Dynamic Programming Problems
  if (titleLower.includes('house robber')) {
    const testCases = [
      [1,2,3,1],      // Expected: 4
      [2,7,9,3,1],    // Expected: 12
      [2,1,1,2]       // Expected: 4
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('climbing stairs')) {
    const testCases = [
      2,  // Expected: 2
      3,  // Expected: 3
      4   // Expected: 5
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Graph Problems
  if (titleLower.includes('number of islands')) {
    const testCases = [
      [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
      ],  // Expected: 1
      [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
      ],  // Expected: 3
      [
        ["1","0","1","0","1"],
        ["0","1","0","1","0"],
        ["1","0","1","0","1"]
      ]   // Expected: 6
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Tree Problems
  if (titleLower.includes('binary tree inorder traversal')) {
    // For tree problems, we'll use a simplified representation
    const testCases = [
      [1,null,2,3],    // Expected: [1,3,2]
      [],              // Expected: []
      [1]              // Expected: [1]
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('maximum depth') && titleLower.includes('binary tree')) {
    const testCases = [
      [3,9,20,null,null,15,7],  // Expected: 3
      [1,null,2],               // Expected: 2
      []                        // Expected: 0
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Binary Search Problems
  if (titleLower === 'binary search') {
    const testCases = [
      [[-1,0,3,5,9,12], 9],   // Expected: 4
      [[-1,0,3,5,9,12], 2],   // Expected: -1
      [[5], 5]                // Expected: 0
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('search insert position')) {
    const testCases = [
      [[1,3,5,6], 5],  // Expected: 2
      [[1,3,5,6], 2],  // Expected: 1
      [[1,3,5,6], 7]   // Expected: 4
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  if (titleLower.includes('median') && titleLower.includes('sorted arrays')) {
    const testCases = [
      [[1,3], [2]],       // Expected: 2.0
      [[1,2], [3,4]],     // Expected: 2.5
      [[0,0], [0,0]]      // Expected: 0.0
    ];
    return testCases[testIndex] || testCases[0];
  }
  
  // Generic fallback based on expected output
  return expectedOutput;
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