"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCodeSandboxed = exports.executeCode = void 0;
const vm2_1 = require("vm2");
const executeCode = async (code, testCases) => {
    const results = [];
    for (const testCase of testCases) {
        try {
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
        
        // First try common function names
        const commonNames = ['solution', 'solve', 'main', 'twoSum', 'singleNumber'];
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
            const passed = outputStr.trim() === testCase.expectedOutput.trim();
            results.push({
                input: testCase.input,
                expected: testCase.expectedOutput,
                got: outputStr,
                passed
            });
        }
        catch (error) {
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
exports.executeCode = executeCode;
// Alternative implementation using child_process (more secure but requires setup)
const executeCodeSandboxed = async (code, testCases) => {
    // This would use child_process with temporary files
    // Implementation would be similar but spawn a separate Node process
    // with restricted permissions and resource limits
    // For MVP, we're using VM2 above which provides reasonable sandboxing
    return (0, exports.executeCode)(code, testCases);
};
exports.executeCodeSandboxed = executeCodeSandboxed;
