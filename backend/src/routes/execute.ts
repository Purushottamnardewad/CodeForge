import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Problem from '../models/Problem';
import { executeCode } from '../utils/sandbox';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Execute code for a problem
router.post('/:problemId', authenticateToken, [
  body('code').notEmpty(),
  body('language').equals('javascript')
], async (req: AuthRequest, res: Response) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code } = req.body;
    const { problemId } = req.params;

    // Fetch problem with all test cases
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Execute code against test cases
    const results = await executeCode(code, problem.testCases);

    // Calculate summary
    const totalCases = results.length;
    const passed = results.filter(r => r.passed).length;

    res.json({
      problem: problem.title,
      totalCases,
      passed,
      results: results.map(r => ({
        input: r.input,
        expected: r.expected,
        got: r.got,
        passed: r.passed,
        error: r.error
      }))
    });
  } catch (error: any) {
    console.error('Code execution error:', error);
    res.status(500).json({ 
      message: 'Error executing code',
      error: error.message 
    });
  }
});

export default router;