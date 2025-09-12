"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Problem_1 = __importDefault(require("../models/Problem"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all problems (public)
router.get('/', async (req, res) => {
    try {
        const problems = await Problem_1.default.find()
            .select('title difficulty category createdAt')
            .sort('-createdAt');
        res.json(problems);
    }
    catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ message: 'Error fetching problems' });
    }
});
// Get single problem by ID
router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem_1.default.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        // Don't send hidden test cases or solutions to regular users
        const problemData = problem.toObject();
        problemData.testCases = problemData.testCases.filter(tc => !tc.isHidden);
        delete problemData.solution;
        res.json(problemData);
    }
    catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ message: 'Error fetching problem' });
    }
});
// Create new problem (protected - admin only in production)
router.post('/', auth_1.authenticateToken, [
    (0, express_validator_1.body)('title').notEmpty().trim(),
    (0, express_validator_1.body)('description').notEmpty(),
    (0, express_validator_1.body)('difficulty').isIn(['Easy', 'Medium', 'Hard']),
    (0, express_validator_1.body)('testCases').isArray({ min: 1 })
], async (req, res) => {
    try {
        // Validate request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const problem = new Problem_1.default(req.body);
        await problem.save();
        res.status(201).json({
            message: 'Problem created successfully',
            problem
        });
    }
    catch (error) {
        console.error('Error creating problem:', error);
        res.status(500).json({ message: 'Error creating problem' });
    }
});
// Update problem (protected)
router.put('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const problem = await Problem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json({
            message: 'Problem updated successfully',
            problem
        });
    }
    catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).json({ message: 'Error updating problem' });
    }
});
// Delete problem (protected)
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const problem = await Problem_1.default.findByIdAndDelete(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json({ message: 'Problem deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting problem:', error);
        res.status(500).json({ message: 'Error deleting problem' });
    }
});
exports.default = router;
