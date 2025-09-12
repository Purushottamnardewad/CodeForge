// Seed script to add sample problems to the database
const mongoose = require('mongoose');
require('dotenv').config();

// Define Problem schema directly (since we're using JS, not importing TS model)
const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  category: { type: String, required: true },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  constraints: [String],
  testCases: [{
    input: mongoose.Schema.Types.Mixed,
    output: mongoose.Schema.Types.Mixed
  }]
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

const sampleProblems = [
  // ===== ARRAY PROBLEMS (4) =====
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "easy",
    category: "Array",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, output: [0, 1] }
    ]
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container that holds the most water.\n\nReturn the maximum amount of water a container can store.",
    difficulty: "medium",
    category: "Array",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    testCases: [
      { input: { height: [1,8,6,2,5,4,8,3,7] }, output: 49 },
      { input: { height: [1,1] }, output: 1 }
    ]
  },
  {
    title: "Trapping Rain Water",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    difficulty: "hard",
    category: "Array",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped."
      }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 3 * 10^4"
    ],
    testCases: [
      { input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] }, output: 6 },
      { input: { height: [4,2,0,3,2,5] }, output: 9 }
    ]
  },
  {
    title: "Merge Sorted Array",
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums1 and nums2 into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array nums1.",
    difficulty: "easy",
    category: "Sorting",
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation: "The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6]."
      }
    ],
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[j] <= 10^9"
    ],
    testCases: [
      { input: { nums1: [1,2,3,0,0,0], m: 3, nums2: [2,5,6], n: 3 }, output: [1,2,2,3,5,6] },
      { input: { nums1: [1], m: 1, nums2: [], n: 0 }, output: [1] }
    ]
  },

  // ===== MATH PROBLEMS (3) =====
  {
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is palindrome integer.\n\nAn integer is a palindrome when it reads the same backward as forward.\n\nFor example, 121 is a palindrome while 123 is not.",
    difficulty: "easy",
    category: "Math",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      }
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    testCases: [
      { input: { x: 121 }, output: true },
      { input: { x: -121 }, output: false },
      { input: { x: 10 }, output: false }
    ]
  },
  {
    title: "FizzBuzz",
    description: "Given an integer n, return a string array answer (1-indexed) where:\n\n- answer[i] == \"FizzBuzz\" if i is divisible by 3 and 5.\n- answer[i] == \"Fizz\" if i is divisible by 3.\n- answer[i] == \"Buzz\" if i is divisible by 5.\n- answer[i] == i (as a string) if none of the above conditions are true.",
    difficulty: "easy",
    category: "Math",
    examples: [
      {
        input: "n = 3",
        output: '[\"1\",\"2\",\"Fizz\"]',
        explanation: "For i = 1, 2, 3: 1 -> \"1\", 2 -> \"2\", 3 -> \"Fizz\" (divisible by 3)"
      },
      {
        input: "n = 5",
        output: '[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]',
        explanation: "For i = 1 to 5: 1 -> \"1\", 2 -> \"2\", 3 -> \"Fizz\", 4 -> \"4\", 5 -> \"Buzz\""
      }
    ],
    constraints: ["1 <= n <= 10^4"],
    testCases: [
      { input: { n: 3 }, output: ["1","2","Fizz"] },
      { input: { n: 5 }, output: ["1","2","Fizz","4","Buzz"] },
      { input: { n: 15 }, output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] }
    ]
  },
  {
    title: "Count Primes",
    description: "Given an integer n, return the number of prime numbers that are less than n.",
    difficulty: "medium",
    category: "Math",
    examples: [
      {
        input: "n = 10",
        output: "4",
        explanation: "There are 4 prime numbers less than 10, they are 2, 3, 5, 7."
      },
      {
        input: "n = 0",
        output: "0",
        explanation: "There are no prime numbers less than 0."
      }
    ],
    constraints: ["0 <= n <= 5 * 10^6"],
    testCases: [
      { input: { n: 10 }, output: 4 },
      { input: { n: 0 }, output: 0 },
      { input: { n: 1 }, output: 0 }
    ]
  },
  {
    title: "Reverse Integer",
    description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    difficulty: "easy",
    category: "Math",
    examples: [
      {
        input: "x = 123",
        output: "321",
        explanation: "Simply reverse the digits of 123."
      },
      {
        input: "x = -123",
        output: "-321",
        explanation: "Reverse the digits while preserving the sign."
      },
      {
        input: "x = 120",
        output: "21",
        explanation: "Leading zeros are dropped in the result."
      }
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    testCases: [
      { input: { x: 123 }, output: 321 },
      { input: { x: -123 }, output: -321 },
      { input: { x: 120 }, output: 21 },
      { input: { x: 0 }, output: 0 }
    ]
  },

  // ===== BINARY SEARCH PROBLEMS (3) =====
  {
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "easy",
    category: "Binary Search",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    testCases: [
      { input: { nums: [-1,0,3,5,9,12], target: 9 }, output: 4 },
      { input: { nums: [-1,0,3,5,9,12], target: 2 }, output: -1 }
    ]
  },
  {
    title: "Search Insert Position",
    description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "easy",
    category: "Binary Search",
    examples: [
      {
        input: "nums = [1,3,5,6], target = 5",
        output: "2",
        explanation: "Target 5 is found at index 2"
      },
      {
        input: "nums = [1,3,5,6], target = 2",
        output: "1",
        explanation: "Target 2 would be inserted at index 1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums contains distinct values sorted in ascending order.",
      "-10^4 <= target <= 10^4"
    ],
    testCases: [
      { input: { nums: [1,3,5,6], target: 5 }, output: 2 },
      { input: { nums: [1,3,5,6], target: 2 }, output: 1 },
      { input: { nums: [1,3,5,6], target: 7 }, output: 4 }
    ]
  },
  {
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    difficulty: "hard",
    category: "Binary Search",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    testCases: [
      { input: { nums1: [1,3], nums2: [2] }, output: 2.0 },
      { input: { nums1: [1,2], nums2: [3,4] }, output: 2.5 }
    ]
  },

  // ===== STRING PROBLEMS (2) =====
  {
    title: "Valid Palindrome",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.",
    difficulty: "easy",
    category: "String",
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.'
      }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    testCases: [
      { input: { s: "A man, a plan, a canal: Panama" }, output: true },
      { input: { s: "race a car" }, output: false },
      { input: { s: " " }, output: true }
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
    category: "String",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    testCases: [
      { input: { s: "abcabcbb" }, output: 3 },
      { input: { s: "bbbbb" }, output: 1 },
      { input: { s: "pwwkew" }, output: 3 }
    ]
  },

  // ===== HASH TABLE PROBLEMS (2) =====
  {
    title: "Valid Anagram",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    difficulty: "easy",
    category: "Hash Table",
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation: "Both strings contain the same characters with the same frequency."
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: "The strings contain different characters."
      }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    testCases: [
      { input: { s: "anagram", t: "nagaram" }, output: true },
      { input: { s: "rat", t: "car" }, output: false }
    ]
  },
  {
    title: "Group Anagrams",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    difficulty: "medium",
    category: "Hash Table",
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: "Words with the same letters are grouped together."
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "Empty string is its own group."
      }
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    testCases: [
      { input: { strs: ["eat","tea","tan","ate","nat","bat"] }, output: [["bat"],["nat","tan"],["ate","eat","tea"]] },
      { input: { strs: [""] }, output: [[""]] },
      { input: { strs: ["a"] }, output: [["a"]] }
    ]
  },

  // ===== STACK PROBLEMS (2) =====
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    difficulty: "easy",
    category: "Stack",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string contains valid parentheses."
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All brackets are properly matched."
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "The brackets are not properly matched."
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    testCases: [
      { input: { s: "()" }, output: true },
      { input: { s: "()[]{}" }, output: true },
      { input: { s: "(]" }, output: false },
      { input: { s: "([)]" }, output: false }
    ]
  },
  {
    title: "Daily Temperatures",
    description: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
    difficulty: "medium",
    category: "Stack",
    examples: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]",
        explanation: "For each day, count how many days until a warmer temperature."
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]",
        explanation: "Each day has a warmer day immediately following."
      }
    ],
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    testCases: [
      { input: { temperatures: [73,74,75,71,69,72,76,73] }, output: [1,1,4,2,1,1,0,0] },
      { input: { temperatures: [30,40,50,60] }, output: [1,1,1,0] },
      { input: { temperatures: [30,60,90] }, output: [1,1,0] }
    ]
  },

  // ===== TREE PROBLEMS (2) =====
  {
    title: "Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    difficulty: "easy",
    category: "Tree",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "The maximum depth is 3 (path: 3 -> 20 -> 7 or 3 -> 20 -> 15)."
      },
      {
        input: "root = [1,null,2]",
        output: "2",
        explanation: "The maximum depth is 2 (path: 1 -> 2)."
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    testCases: [
      { input: { root: [3,9,20,null,null,15,7] }, output: 3 },
      { input: { root: [1,null,2] }, output: 2 },
      { input: { root: [] }, output: 0 }
    ]
  },
  {
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "easy",
    category: "Tree",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "Inorder traversal: left -> root -> right"
      },
      {
        input: "root = []",
        output: "[]",
        explanation: "Empty tree returns empty array."
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    testCases: [
      { input: { root: [1,null,2,3] }, output: [1,3,2] },
      { input: { root: [] }, output: [] },
      { input: { root: [1] }, output: [1] }
    ]
  },

  // ===== DYNAMIC PROGRAMMING PROBLEMS (2) =====
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "easy",
    category: "Dynamic Programming",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1"
      }
    ],
    constraints: ["1 <= n <= 45"],
    testCases: [
      { input: { n: 2 }, output: 2 },
      { input: { n: 3 }, output: 3 },
      { input: { n: 5 }, output: 8 }
    ]
  },
  {
    title: "House Robber",
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    difficulty: "medium",
    category: "Dynamic Programming",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount = 1 + 3 = 4."
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total = 2 + 9 + 1 = 12."
      }
    ],
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    testCases: [
      { input: { nums: [1,2,3,1] }, output: 4 },
      { input: { nums: [2,7,9,3,1] }, output: 12 },
      { input: { nums: [5,1,3,9] }, output: 14 }
    ]
  },

  // ===== BIT MANIPULATION PROBLEMS (2) =====
  {
    title: "Single Number",
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.",
    difficulty: "easy",
    category: "Bit Manipulation",
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1",
        explanation: "1 appears once while 2 appears twice."
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4",
        explanation: "4 appears once while others appear twice."
      }
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once."
    ],
    testCases: [
      { input: { nums: [2,2,1] }, output: 1 },
      { input: { nums: [4,1,2,1,2] }, output: 4 },
      { input: { nums: [1] }, output: 1 }
    ]
  },
  {
    title: "Number of 1 Bits",
    description: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
    difficulty: "easy",
    category: "Bit Manipulation",
    examples: [
      {
        input: "n = 00000000000000000000000000001011",
        output: "3",
        explanation: "The input binary string has three '1' bits."
      },
      {
        input: "n = 00000000000000000000000010000000",
        output: "1",
        explanation: "The input binary string has one '1' bit."
      }
    ],
    constraints: [
      "The input must be a binary string of length 32."
    ],
    testCases: [
      { input: { n: 11 }, output: 3 },
      { input: { n: 128 }, output: 1 },
      { input: { n: 4294967293 }, output: 31 }
    ]
  },

  // ===== GRAPH PROBLEMS (1) =====
  {
    title: "Number of Islands",
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    difficulty: "medium",
    category: "Graph",
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
        explanation: "All connected 1s form a single island."
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
        explanation: "There are 3 separate islands."
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    testCases: [
      { 
        input: { 
          grid: [
            ["1","1","1","1","0"],
            ["1","1","0","1","0"],
            ["1","1","0","0","0"],
            ["0","0","0","0","0"]
          ] 
        }, 
        output: 1 
      },
      { 
        input: { 
          grid: [
            ["1","1","0","0","0"],
            ["1","1","0","0","0"],
            ["0","0","1","0","0"],
            ["0","0","0","1","1"]
          ] 
        }, 
        output: 3 
      }
    ]
  }
];

async function seedProblems() {
  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Clearing existing problems...');
    await Problem.deleteMany({});
    console.log('✅ Cleared existing problems');

    console.log('🌱 Seeding sample problems...');
    const insertResult = await Problem.insertMany(sampleProblems);
    console.log('✅ Successfully seeded problems:');
    
    sampleProblems.forEach((problem, index) => {
      console.log(`   ${index + 1}. ${problem.title} (${problem.difficulty}) - ${problem.category}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Total problems seeded: ${insertResult.length}`);
    
    // Verify that we seeded exactly 24 problems
    const totalCount = await Problem.countDocuments();
    console.log(`🔍 Total problems in database: ${totalCount}`);
    
    if (totalCount !== 24) {
      console.log('⚠️ Warning: Expected 24 problems but found', totalCount);
    }
    
    // Show breakdown by difficulty
    const easyCount = await Problem.countDocuments({ difficulty: 'easy' });
    const mediumCount = await Problem.countDocuments({ difficulty: 'medium' });
    const hardCount = await Problem.countDocuments({ difficulty: 'hard' });
    
    console.log(`\n📈 Difficulty breakdown:`);
    console.log(`   Easy: ${easyCount} problems (${Math.round(easyCount/totalCount*100)}%)`);
    console.log(`   Medium: ${mediumCount} problems (${Math.round(mediumCount/totalCount*100)}%)`);
    console.log(`   Hard: ${hardCount} problems (${Math.round(hardCount/totalCount*100)}%)`);
    
    // Show category breakdown
    const categories = await Problem.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log(`\n🏷️ Category breakdown:`);
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} problems`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedProblems();