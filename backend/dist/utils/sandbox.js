"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCodeSandboxed = exports.executeCode = void 0;
const vm2_1 = require("vm2");
const executeCode = async (code, testCases, // Using any[] to handle current database format
problemTitle) => {
    const results = [];
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
            const vm = new vm2_1.VM({
                timeout: 2000, // 2 second timeout
                sandbox: {
                    console: {
                        log: () => { }, // Disable console.log in sandbox
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
        
        // First try common function names
        const commonNames = ['solution', 'solve', 'main', 'twoSum', 'singleNumber', 'isValid', 'validParentheses'];
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
        }
        catch (error) {
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
exports.executeCode = executeCode;
// Generate test input based on problem title and expected output
function generateTestInput(title, testIndex, expectedOutput) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('single number')) {
        // For Single Number problem, generate arrays based on expected output
        switch (testIndex) {
            case 0: return [2, 2, 1]; // Expected: 1
            case 1: return [4, 1, 2, 1, 2]; // Expected: 4  
            case 2: return [1]; // Expected: 1
            default: return [expectedOutput, 3, 3]; // Simple fallback
        }
    }
    else if (titleLower.includes('valid parentheses')) {
        // For Valid Parentheses problem
        switch (testIndex) {
            case 0: return "()"; // Expected: true
            case 1: return "()[]{}"; // Expected: true
            case 2: return "(]"; // Expected: false
            case 3: return "([)]"; // Expected: false
            default: return expectedOutput ? "()" : "(]"; // Simple fallback
        }
    }
    else if (titleLower.includes('two sum')) {
        // For Two Sum problem
        switch (testIndex) {
            case 0: return [[2, 7, 11, 15], 9]; // Expected: [0,1]
            case 1: return [[3, 2, 4], 6]; // Expected: [1,2]
            default: return [[3, 3], 6]; // Expected: [0,1]
        }
    }
    else if (titleLower.includes('house robber')) {
        // For House Robber problem
        switch (testIndex) {
            case 0: return [1, 2, 3, 1]; // Expected: 4
            case 1: return [2, 7, 9, 3, 1]; // Expected: 12
            default: return [2, 1, 1, 2]; // Expected: 4
        }
    }
    else {
        // Generic fallback based on expected output
        return expectedOutput;
    }
}
// Alternative implementation using child_process (more secure but requires setup)
const executeCodeSandboxed = async (code, testCases) => {
    // This would use child_process with temporary files
    // Implementation would be similar but spawn a separate Node process
    // with restricted permissions and resource limits
    // For MVP, we're using VM2 above which provides reasonable sandboxing
    return (0, exports.executeCode)(code, testCases);
};
exports.executeCodeSandboxed = executeCodeSandboxed;
