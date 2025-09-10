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
  testCases: ITestCase[]
): Promise<ExecutionResult[]> => {
  const results: ExecutionResult[] = [];

  for (const testCase of testCases) {
    try {
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
        const input = ${JSON.stringify(testCase.input)};
        let result;
        
        // Try to find and call the main function
        if (typeof solution === 'function') {
          result = solution(input);
        } else if (typeof twoSum === 'function') {
          result = twoSum(input);
        } else if (typeof main === 'function') {
          result = main(input);
        } else {
          // If no function found, try to execute the code directly
          result = eval(input);
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
      const passed = outputStr.trim() === testCase.expectedOutput.trim();

      results.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        got: outputStr,
        passed
      });
    } catch (error: any) {
      // Handle execution errors
      results.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        got: '',
        passed: false,
        error: error.message || 'Runtime error'
      });
    }
  }

  return results;
};

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