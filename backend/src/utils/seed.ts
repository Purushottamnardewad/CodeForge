import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from '../models/Problem';
import { connectDB } from '../config/db';

dotenv.config();

const sampleProblems = [
  // Existing problems
  {
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy' as const,
    category: 'Array',
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
    examples: [
      {
        input: '[2,7,11,15], 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: '[3,2,4], 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    testCases: [
      {
        input: '[[2,7,11,15], 9]',
        expectedOutput: '[0,1]'
      },
      {
        input: '[[3,2,4], 6]',
        expectedOutput: '[1,2]'
      },
      {
        input: '[[3,3], 6]',
        expectedOutput: '[0,1]'
      }
    ],
    starterCode: {
      javascript: `function twoSum(args) {
  const [nums, target] = args;
  // Your code here
  
  return result;
}`
    }
  },
  {
    title: 'Palindrome Number',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.`,
    difficulty: 'Easy' as const,
    category: 'Math',
    constraints: '-2^31 <= x <= 2^31 - 1',
    examples: [
      {
        input: '121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: '-121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-.'
      }
    ],
    testCases: [
      {
        input: '121',
        expectedOutput: 'true'
      },
      {
        input: '-121',
        expectedOutput: 'false'
      },
      {
        input: '10',
        expectedOutput: 'false'
      }
    ],
    starterCode: {
      javascript: `function solution(x) {
  // Your code here
  
  return result;
}`
    }
  },
  {
    title: 'FizzBuzz',
    description: `Given an integer n, return a string array answer (1-indexed) where:

- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.`,
    difficulty: 'Easy' as const,
    category: 'Math',
    constraints: '1 <= n <= 10^4',
    examples: [
      {
        input: '3',
        output: '["1","2","Fizz"]'
      },
      {
        input: '5',
        output: '["1","2","Fizz","4","Buzz"]'
      }
    ],
    testCases: [
      {
        input: '3',
        expectedOutput: '["1","2","Fizz"]'
      },
      {
        input: '5',
        expectedOutput: '["1","2","Fizz","4","Buzz"]'
      },
      {
        input: '15',
        expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]'
      }
    ],
    starterCode: {
      javascript: `function solution(n) {
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 ARRAYS & STRINGS - Two Pointers
  {
    title: 'Valid Palindrome',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    difficulty: 'Easy' as const,
    category: 'String',
    constraints: '1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.',
    examples: [
      {
        input: '"A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: '"race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      }
    ],
    testCases: [
      {
        input: '"A man, a plan, a canal: Panama"',
        expectedOutput: 'true'
      },
      {
        input: '"race a car"',
        expectedOutput: 'false'
      },
      {
        input: '" "',
        expectedOutput: 'true'
      }
    ],
    starterCode: {
      javascript: `function solution(s) {
  // Use two pointers approach
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Container With Most Water',
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container that contains the most water.

Return the maximum amount of water a container can store.`,
    difficulty: 'Medium' as const,
    category: 'Array',
    constraints: 'n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4',
    examples: [
      {
        input: '[1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The vertical lines at index 1 and 8 form a container with area 49.'
      }
    ],
    testCases: [
      {
        input: '[1,8,6,2,5,4,8,3,7]',
        expectedOutput: '49'
      },
      {
        input: '[1,1]',
        expectedOutput: '1'
      },
      {
        input: '[4,3,2,1,4]',
        expectedOutput: '16'
      }
    ],
    starterCode: {
      javascript: `function solution(height) {
  // Two pointers approach
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 ARRAYS & STRINGS - Sliding Window
  {
    title: 'Longest Substring Without Repeating Characters',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: 'Medium' as const,
    category: 'String',
    constraints: '0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.',
    examples: [
      {
        input: '"abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: '"bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    testCases: [
      {
        input: '"abcabcbb"',
        expectedOutput: '3'
      },
      {
        input: '"bbbbb"',
        expectedOutput: '1'
      },
      {
        input: '"pwwkew"',
        expectedOutput: '3'
      }
    ],
    starterCode: {
      javascript: `function solution(s) {
  // Sliding window approach
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Maximum Average Subarray I',
    description: `You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.`,
    difficulty: 'Easy' as const,
    category: 'Array',
    constraints: 'n == nums.length\n1 <= k <= n <= 10^5\n-10^4 <= nums[i] <= 10^4',
    examples: [
      {
        input: '[1,12,-5,-6,50,3], 4',
        output: '12.75000',
        explanation: 'Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75'
      }
    ],
    testCases: [
      {
        input: '[[1,12,-5,-6,50,3], 4]',
        expectedOutput: '12.75'
      },
      {
        input: '[[5], 1]',
        expectedOutput: '5'
      },
      {
        input: '[[0,1,1,3,3], 4]',
        expectedOutput: '2'
      }
    ],
    starterCode: {
      javascript: `function solution(args) {
  const [nums, k] = args;
  // Sliding window approach
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 HASH TABLES - Frequency Counting
  {
    title: 'Valid Anagram',
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: 'Easy' as const,
    category: 'Hash Table',
    constraints: '1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.',
    examples: [
      {
        input: '"anagram", "nagaram"',
        output: 'true'
      },
      {
        input: '"rat", "car"',
        output: 'false'
      }
    ],
    testCases: [
      {
        input: '["anagram", "nagaram"]',
        expectedOutput: 'true'
      },
      {
        input: '["rat", "car"]',
        expectedOutput: 'false'
      },
      {
        input: '["a", "ab"]',
        expectedOutput: 'false'
      }
    ],
    starterCode: {
      javascript: `function solution(args) {
  const [s, t] = args;
  // Use hash map to count frequencies
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Group Anagrams',
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: 'Medium' as const,
    category: 'Hash Table',
    constraints: '1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.',
    examples: [
      {
        input: '["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      }
    ],
    testCases: [
      {
        input: '["eat","tea","tan","ate","nat","bat"]',
        expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: '[""]',
        expectedOutput: '[[""]]'
      },
      {
        input: '["a"]',
        expectedOutput: '[["a"]]'
      }
    ],
    starterCode: {
      javascript: `function solution(strs) {
  // Group strings by their sorted characters
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 STACKS & QUEUES
  {
    title: 'Valid Parentheses',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: 'Easy' as const,
    category: 'Stack',
    constraints: '1 <= s.length <= 10^4\ns consists of parentheses only \'()[]{}\'.', 
    examples: [
      {
        input: '"()"',
        output: 'true'
      },
      {
        input: '"()[]{}"',
        output: 'true'
      },
      {
        input: '"(]"',
        output: 'false'
      }
    ],
    testCases: [
      {
        input: '"()"',
        expectedOutput: 'true'
      },
      {
        input: '"()[]{}"',
        expectedOutput: 'true'
      },
      {
        input: '"(]"',
        expectedOutput: 'false'
      },
      {
        input: '"([)]"',
        expectedOutput: 'false'
      },
      {
        input: '"{[]}"',
        expectedOutput: 'true'
      }
    ],
    starterCode: {
      javascript: `function solution(s) {
  // Use stack to track opening brackets
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Daily Temperatures',
    description: `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.`,
    difficulty: 'Medium' as const,
    category: 'Stack',
    constraints: '1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100',
    examples: [
      {
        input: '[73,74,75,71,69,72,76,73]',
        output: '[1,1,4,2,1,1,0,0]'
      }
    ],
    testCases: [
      {
        input: '[73,74,75,71,69,72,76,73]',
        expectedOutput: '[1,1,4,2,1,1,0,0]'
      },
      {
        input: '[30,40,50,60]',
        expectedOutput: '[1,1,1,0]'
      },
      {
        input: '[30,60,90]',
        expectedOutput: '[1,1,0]'
      }
    ],
    starterCode: {
      javascript: `function solution(temperatures) {
  // Use stack to find next greater element
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 TREES - Binary Trees
  {
    title: 'Maximum Depth of Binary Tree',
    description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

For this problem, represent the tree as an array where null represents missing nodes.`,
    difficulty: 'Easy' as const,
    category: 'Tree',
    constraints: 'The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100',
    examples: [
      {
        input: '[3,9,20,null,null,15,7]',
        output: '3'
      },
      {
        input: '[1,null,2]',
        output: '2'
      }
    ],
    testCases: [
      {
        input: '[3,9,20,null,null,15,7]',
        expectedOutput: '3'
      },
      {
        input: '[1,null,2]',
        expectedOutput: '2'
      },
      {
        input: '[]',
        expectedOutput: '0'
      }
    ],
    starterCode: {
      javascript: `function solution(root) {
  // Convert array to tree structure
  function arrayToTree(arr, i = 0) {
    if (i >= arr.length || arr[i] === null) return null;
    return {
      val: arr[i],
      left: arrayToTree(arr, 2 * i + 1),
      right: arrayToTree(arr, 2 * i + 2)
    };
  }
  
  const tree = arrayToTree(root);
  // Calculate max depth using DFS
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Binary Tree Inorder Traversal',
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

For this problem, represent the binary tree as an array where null represents missing nodes.

Inorder traversal visits nodes in: Left -> Root -> Right order.`,
    difficulty: 'Easy' as const,
    category: 'Tree',
    constraints: 'The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100',
    examples: [
      {
        input: '[1,null,2,3]',
        output: '[1,3,2]'
      },
      {
        input: '[]',
        output: '[]'
      },
      {
        input: '[1]',
        output: '[1]'
      }
    ],
    testCases: [
      {
        input: '[1,null,2,3]',
        expectedOutput: '[1,3,2]'
      },
      {
        input: '[]',
        expectedOutput: '[]'
      },
      {
        input: '[1]',
        expectedOutput: '[1]'
      },
      {
        input: '[1,2,3,4,5]',
        expectedOutput: '[4,2,5,1,3]'
      }
    ],
    starterCode: {
      javascript: `function solution(root) {
  // Convert array to tree
  function arrayToTree(arr, i = 0) {
    if (i >= arr.length || arr[i] === null) return null;
    return {
      val: arr[i],
      left: arrayToTree(arr, 2 * i + 1),
      right: arrayToTree(arr, 2 * i + 2)
    };
  }
  
  const tree = arrayToTree(root);
  const result = [];
  
  // Inorder traversal: left -> root -> right
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 SEARCHING - Binary Search
  {
    title: 'Binary Search',
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    difficulty: 'Easy' as const,
    category: 'Binary Search',
    constraints: '1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.',
    examples: [
      {
        input: '[-1,0,3,5,9,12], 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: '[-1,0,3,5,9,12], 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    testCases: [
      {
        input: '[[-1,0,3,5,9,12], 9]',
        expectedOutput: '4'
      },
      {
        input: '[[-1,0,3,5,9,12], 2]',
        expectedOutput: '-1'
      },
      {
        input: '[[5], 5]',
        expectedOutput: '0'
      }
    ],
    starterCode: {
      javascript: `function solution(args) {
  const [nums, target] = args;
  // Implement binary search
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Search Insert Position',
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.`,
    difficulty: 'Easy' as const,
    category: 'Binary Search',
    constraints: '1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums contains distinct values sorted in ascending order.\n-10^4 <= target <= 10^4',
    examples: [
      {
        input: '[1,3,5,6], 5',
        output: '2'
      },
      {
        input: '[1,3,5,6], 2',
        output: '1'
      },
      {
        input: '[1,3,5,6], 7',
        output: '4'
      }
    ],
    testCases: [
      {
        input: '[[1,3,5,6], 5]',
        expectedOutput: '2'
      },
      {
        input: '[[1,3,5,6], 2]',
        expectedOutput: '1'
      },
      {
        input: '[[1,3,5,6], 7]',
        expectedOutput: '4'
      },
      {
        input: '[[1,3,5,6], 0]',
        expectedOutput: '0'
      }
    ],
    starterCode: {
      javascript: `function solution(args) {
  const [nums, target] = args;
  // Binary search for insert position
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 DYNAMIC PROGRAMMING
  {
    title: 'Climbing Stairs',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    difficulty: 'Easy' as const,
    category: 'Dynamic Programming',
    constraints: '1 <= n <= 45',
    examples: [
      {
        input: '2',
        output: '2',
        explanation: 'There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps'
      },
      {
        input: '3',
        output: '3',
        explanation: 'There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step'
      }
    ],
    testCases: [
      {
        input: '2',
        expectedOutput: '2'
      },
      {
        input: '3',
        expectedOutput: '3'
      },
      {
        input: '4',
        expectedOutput: '5'
      },
      {
        input: '5',
        expectedOutput: '8'
      }
    ],
    starterCode: {
      javascript: `function solution(n) {
  // Use dynamic programming (Fibonacci pattern)
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'House Robber',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    difficulty: 'Medium' as const,
    category: 'Dynamic Programming',
    constraints: '1 <= nums.length <= 100\n0 <= nums[i] <= 400',
    examples: [
      {
        input: '[1,2,3,1]',
        output: '4',
        explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount = 1 + 3 = 4.'
      },
      {
        input: '[2,7,9,3,1]',
        output: '12',
        explanation: 'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount = 2 + 9 + 1 = 12.'
      }
    ],
    testCases: [
      {
        input: '[1,2,3,1]',
        expectedOutput: '4'
      },
      {
        input: '[2,7,9,3,1]',
        expectedOutput: '12'
      },
      {
        input: '[5,1,3,9]',
        expectedOutput: '14'
      }
    ],
    starterCode: {
      javascript: `function solution(nums) {
  // Dynamic programming: rob or not rob each house
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 MATH & LOGIC - Prime Numbers
  {
    title: 'Count Primes',
    description: `Given an integer n, return the number of prime numbers that are less than n.`,
    difficulty: 'Medium' as const,
    category: 'Math',
    constraints: '0 <= n <= 5 * 10^6',
    examples: [
      {
        input: '10',
        output: '4',
        explanation: 'There are 4 prime numbers less than 10, they are 2, 3, 5, 7.'
      },
      {
        input: '0',
        output: '0'
      },
      {
        input: '1',
        output: '0'
      }
    ],
    testCases: [
      {
        input: '10',
        expectedOutput: '4'
      },
      {
        input: '0',
        expectedOutput: '0'
      },
      {
        input: '1',
        expectedOutput: '0'
      },
      {
        input: '2',
        expectedOutput: '0'
      },
      {
        input: '3',
        expectedOutput: '1'
      }
    ],
    starterCode: {
      javascript: `function solution(n) {
  // Use Sieve of Eratosthenes algorithm
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 MATH & LOGIC - Bit Manipulation
  {
    title: 'Single Number',
    description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    difficulty: 'Easy' as const,
    category: 'Bit Manipulation',
    constraints: '1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEach element in the array appears twice except for one element which appears only once.',
    examples: [
      {
        input: '[2,2,1]',
        output: '1'
      },
      {
        input: '[4,1,2,1,2]',
        output: '4'
      },
      {
        input: '[1]',
        output: '1'
      }
    ],
    testCases: [
      {
        input: '[2,2,1]',
        expectedOutput: '1'
      },
      {
        input: '[4,1,2,1,2]',
        expectedOutput: '4'
      },
      {
        input: '[1]',
        expectedOutput: '1'
      }
    ],
    starterCode: {
      javascript: `function solution(nums) {
  // Use XOR bit manipulation
  // XOR properties: a ^ a = 0, a ^ 0 = a
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Number of 1 Bits',
    description: `Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).`,
    difficulty: 'Easy' as const,
    category: 'Bit Manipulation',
    constraints: 'The input must be a binary string of length 32.',
    examples: [
      {
        input: '00000000000000000000000000001011',
        output: '3',
        explanation: 'The input binary string has a total of three 1\'s.'
      },
      {
        input: '00000000000000000000000010000000',
        output: '1',
        explanation: 'The input binary string has a total of one 1\'s.'
      }
    ],
    testCases: [
      {
        input: '"00000000000000000000000000001011"',
        expectedOutput: '3'
      },
      {
        input: '"00000000000000000000000010000000"',
        expectedOutput: '1'
      },
      {
        input: '"11111111111111111111111111111101"',
        expectedOutput: '31'
      }
    ],
    starterCode: {
      javascript: `function solution(n) {
  // Count 1 bits using bit manipulation
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 GRAPHS - BFS
  {
    title: 'Number of Islands',
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    difficulty: 'Medium' as const,
    category: 'Graph',
    constraints: 'm == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is \'0\' or \'1\'.',
    examples: [
      {
        input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1'
      },
      {
        input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3'
      }
    ],
    testCases: [
      {
        input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        expectedOutput: '1'
      },
      {
        input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        expectedOutput: '3'
      },
      {
        input: '[["1"]]',
        expectedOutput: '1'
      },
      {
        input: '[["0"]]',
        expectedOutput: '0'
      }
    ],
    starterCode: {
      javascript: `function solution(grid) {
  // Use DFS or BFS to mark connected components
  // Your code here
  
  return result;
}`
    }
  },

  // 🆕 SORTING
  {
    title: 'Merge Sorted Array',
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.`,
    difficulty: 'Easy' as const,
    category: 'Sorting',
    constraints: 'nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n1 <= m + n <= 200\n-10^9 <= nums1[i], nums2[j] <= 10^9',
    examples: [
      {
        input: '[1,2,3,0,0,0], 3, [2,5,6], 3',
        output: '[1,2,2,3,5,6]',
        explanation: 'The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6].'
      }
    ],
    testCases: [
      {
        input: '[[1,2,3,0,0,0], 3, [2,5,6], 3]',
        expectedOutput: '[1,2,2,3,5,6]'
      },
      {
        input: '[[1], 1, [], 0]',
        expectedOutput: '[1]'
      },
      {
        input: '[[0], 0, [1], 1]',
        expectedOutput: '[1]'
      }
    ],
    starterCode: {
      javascript: `function solution(args) {
  const [nums1, m, nums2, n] = args;
  // Merge in-place from the end
  // Your code here
  
  return nums1;
}`
    }
  },

  // 🆕 HARD PROBLEMS
  {
    title: 'Median of Two Sorted Arrays',
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

The median is the middle value in an ordered, integer list. If the size of the list is even, the median is the average of the two middle elements.`,
    difficulty: 'Hard' as const,
    category: 'Binary Search',
    constraints: 'nums1.length == m\nnums2.length == n\n0 <= m <= 1000\n0 <= n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6',
    examples: [
      {
        input: '[1,3], [2]',
        output: '2.00000',
        explanation: 'The merged array is [1,2,3] and the median is 2.'
      },
      {
        input: '[1,2], [3,4]',
        output: '2.50000',
        explanation: 'The merged array is [1,2,3,4] and the median is (2 + 3) / 2 = 2.5.'
      }
    ],
    testCases: [
      {
        input: '[[1,3], [2]]',
        expectedOutput: '2'
      },
      {
        input: '[[1,2], [3,4]]',
        expectedOutput: '2.5'
      },
      {
        input: '[[0,0], [0,0]]',
        expectedOutput: '0'
      },
      {
        input: '[], [1]',
        expectedOutput: '1'
      },
      {
        input: '[2], []',
        expectedOutput: '2'
      }
    ],
    starterCode: {
      javascript: `function solution(args) {
  const [nums1, nums2] = args;
  // Find median using binary search approach
  // Time complexity must be O(log(min(m,n)))
  // Your code here
  
  return result;
}`
    }
  },

  {
    title: 'Trapping Rain Water',
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

The elevation map is represented by an array where each element represents the height of the bar at that position.`,
    difficulty: 'Hard' as const,
    category: 'Array',
    constraints: 'n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 3 * 10^4',
    examples: [
      {
        input: '[0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The elevation map is [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      },
      {
        input: '[4,2,0,3,2,5]',
        output: '9',
        explanation: 'The elevation map is [4,2,0,3,2,5]. In this case, 9 units of rain water are being trapped.'
      }
    ],
    testCases: [
      {
        input: '[0,1,0,2,1,0,1,3,2,1,2,1]',
        expectedOutput: '6'
      },
      {
        input: '[4,2,0,3,2,5]',
        expectedOutput: '9'
      },
      {
        input: '[3,0,2,0,4]',
        expectedOutput: '7'
      },
      {
        input: '[0,1,0]',
        expectedOutput: '0'
      },
      {
        input: '[1]',
        expectedOutput: '0'
      }
    ],
    starterCode: {
      javascript: `function solution(height) {
  // Calculate trapped rainwater
  // Multiple approaches: two pointers, stack, or dynamic programming
  // Your code here
  
  return result;
}`
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing problems
    await Problem.deleteMany({});
    console.log('🗑️  Cleared existing problems');
    
    // Insert sample problems
    await Problem.insertMany(sampleProblems);
    console.log(`✅ Database seeded with ${sampleProblems.length} problems!`);
    
    console.log('📊 Problems by category:');
    const categories = sampleProblems.reduce((acc, problem) => {
      acc[problem.category] = (acc[problem.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} problems`);
    });
    
    console.log('📈 Problems by difficulty:');
    const difficulties = sampleProblems.reduce((acc, problem) => {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(difficulties).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count} problems`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();