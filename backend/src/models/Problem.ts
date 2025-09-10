import mongoose, { Document, Schema } from 'mongoose';

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  constraints?: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  testCases: ITestCase[];
  starterCode: {
    javascript: string;
  };
  solution?: string;
  createdAt: Date;
}

const problemSchema = new Schema<IProblem>({
  title: {
    type: String,
    required: [true, 'Problem title is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Problem description is required']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Difficulty level is required']
  },
  category: {
    type: String,
    default: 'General'
  },
  constraints: String,
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  testCases: [{
    input: {
      type: String,
      required: true
    },
    expectedOutput: {
      type: String,
      required: true
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  }],
  starterCode: {
    javascript: {
      type: String,
      default: '// Write your solution here\nfunction solution(input) {\n  // Your code here\n  return result;\n}'
    }
  },
  solution: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IProblem>('Problem', problemSchema);