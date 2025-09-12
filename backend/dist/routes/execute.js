"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Problem_1 = __importDefault(require("../models/Problem"));
const sandbox_1 = require("../utils/sandbox");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Execute code for a problem
router.post('/:problemId', auth_1.authenticateToken, [
    (0, express_validator_1.body)('code').notEmpty(),
    (0, express_validator_1.body)('language').equals('javascript')
], async (req, res) => {
    try {
        // Validate request
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { code } = req.body;
        const { problemId } = req.params;
        // Fetch problem with all test cases
        const problem = await Problem_1.default.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        // Execute code against test cases
        const results = await (0, sandbox_1.executeCode)(code, problem.testCases);
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
    }
    catch (error) {
        console.error('Code execution error:', error);
        res.status(500).json({
            message: 'Error executing code',
            error: error.message
        });
    }
});
exports.default = router;
