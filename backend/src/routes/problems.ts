import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Problem from '../models/Problem';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all problems (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const problems = await Problem.find()
      .select('title difficulty category createdAt')
      .sort('-createdAt');
    
    res.json(problems);
  } catch (error: any) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ message: 'Error fetching problems' });
  }
});

// Get single problem by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Don't send hidden test cases or solutions to regular users
    const problemData = problem.toObject();
    problemData.testCases = problemData.testCases.filter(tc => !tc.isHidden);
    delete problemData.solution;

    res.json(problemData);
  } catch (error: any) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ message: 'Error fetching problem' });
  }
});

// Create new problem (protected - admin only in production)
router.post('/', authenticateToken, [
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('difficulty').isIn(['Easy', 'Medium', 'Hard']),
  body('testCases').isArray({ min: 1 })
], async (req: AuthRequest, res: Response) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const problem = new Problem(req.body);
    await problem.save();

    res.status(201).json({
      message: 'Problem created successfully',
      problem
    });
  } catch (error: any) {
    console.error('Error creating problem:', error);
    res.status(500).json({ message: 'Error creating problem' });
  }
});

// Update problem (protected)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json({
      message: 'Problem updated successfully',
      problem
    });
  } catch (error: any) {
    console.error('Error updating problem:', error);
    res.status(500).json({ message: 'Error updating problem' });
  }
});

// Delete problem (protected)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json({ message: 'Problem deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting problem:', error);
    res.status(500).json({ message: 'Error deleting problem' });
  }
});

export default router;