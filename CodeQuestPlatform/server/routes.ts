import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { togetherAIPromptSchema } from "@shared/schema";
import { z } from "zod";

// Helper function to generate specific instructions based on learning focus
function getLearningFocusInstructions(learningFocus?: string): string {
  if (!learningFocus) return '';
  
  switch(learningFocus) {
    case 'data-structures-algorithms':
      return 'For data structures & algorithms focus: Create problems that emphasize algorithmic thinking, efficiency analysis, and common data structures like arrays, linked lists, trees, graphs, stacks, and queues. Include classic algorithm problems that teach problem-solving patterns.';
      
    case 'job-preparation':
      return 'For job preparation focus: Create problems commonly asked in technical interviews. Include problems that test fundamental concepts but also assess problem-solving abilities under pressure. Add real-world context to problems when possible.';
      
    case 'basic-learning':
      return 'For basic learning focus: Create beginner-friendly problems that gradually introduce fundamental programming concepts. Include detailed explanations in hints and make sure solutions are well-commented and easy to understand.';
      
    case 'framework-specific':
      return 'For framework-specific focus: Create problems that use the specified framework\'s features and patterns. Focus on real-world scenarios where the framework would typically be used. Include framework-specific APIs, methods and best practices in the solution.';
      
    default:
      return '';
  }
}

// Define Zod schemas for code validation and optimization requests
const codeValidateSchema = z.object({
  code: z.string(),
  language: z.string(),
  problemTitle: z.string(),
  problemDescription: z.string(),
  solutionCode: z.string().optional()
});

const codeOptimizeSchema = z.object({
  code: z.string(),
  language: z.string(),
  problemTitle: z.string(),
  problemDescription: z.string()
});

// Helper function to generate mock coding problems for the MVP
function generateMockProblems(
  language: string,
  topics: string[],
  difficulties: string[],
  count: number
) {
  // Sample problems database organized by language and difficulty
  const problemsByLanguage: Record<string, any[]> = {
    python: [
      {
        title: "Sum of Even Numbers",
        description: "Write a function that takes a list of numbers as an argument and returns the sum of all the even numbers in the list.",
        language: "python",
        difficulty: "easy",
        topics: ["variables", "functions", "loops"],
        hints: [
          "Define a function that takes a list parameter",
          "Initialize a variable to store the sum",
          "Loop through each number in the list",
          "Check if each number is even using the modulo operator (%)",
          "Add even numbers to your sum variable and return the final result"
        ],
        solution: `def sum_of_even_numbers(numbers):
    # Initialize sum variable
    even_sum = 0
    
    # Loop through each number
    for num in numbers:
        # Check if the number is even
        if num % 2 == 0:
            # Add to sum if even
            even_sum += num
            
    # Return the sum of even numbers
    return even_sum

# Example usage
print(sum_of_even_numbers([1, 2, 3, 4, 5, 6]))  # Output: 12 (2+4+6)`
      },
      {
        title: "Count Vowels",
        description: "Write a function that takes a string as input and returns the count of vowels (a, e, i, o, u) in the string. Ignore case sensitivity.",
        language: "python",
        difficulty: "easy",
        topics: ["strings", "loops", "functions"],
        hints: [
          "Define a function that accepts a string parameter",
          "Create a list or string containing all vowels",
          "Initialize a counter variable",
          "Loop through each character in the input string",
          "Check if the lowercase version of each character is in your vowels collection"
        ],
        solution: `def count_vowels(string):
    # Define vowels
    vowels = "aeiou"
    
    # Initialize counter
    count = 0
    
    # Check each character
    for char in string.lower():
        if char in vowels:
            count += 1
            
    return count

# Example usage
print(count_vowels("Hello World"))  # Output: 3 (e, o, o)`
      },
      {
        title: "Fibonacci Sequence",
        description: "Write a function to generate the nth Fibonacci number. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.",
        language: "python",
        difficulty: "medium",
        topics: ["functions", "recursion", "algorithms"],
        hints: [
          "Define a function that accepts an integer n",
          "Remember the base cases: fib(0) = 0 and fib(1) = 1",
          "For n ≥ 2, the Fibonacci number is the sum of the two preceding numbers",
          "You can use either recursion or iteration",
          "For better performance, consider using iteration or memoization"
        ],
        solution: `def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    elif n == 1:
        return 1
    
    # Initialize first two numbers
    a, b = 0, 1
    
    # Iterate to find the nth number
    for _ in range(2, n + 1):
        # Calculate next number
        a, b = b, a + b
        
    return b

# Example usage
print(fibonacci(10))  # Output: 55`
      }
    ],
    javascript: [
      {
        title: "Array Sum",
        description: "Write a function that takes an array of numbers and returns the sum of all numbers in the array.",
        language: "javascript",
        difficulty: "easy",
        topics: ["arrays", "functions", "loops"],
        hints: [
          "Define a function that accepts an array parameter",
          "Initialize a variable to store the sum",
          "Loop through each number in the array",
          "Add each number to your sum variable",
          "Return the final sum"
        ],
        solution: `function sumArray(numbers) {
  // Initialize sum variable
  let sum = 0;
  
  // Loop through each number in the array
  for (let i = 0; i < numbers.length; i++) {
    // Add the current number to the sum
    sum += numbers[i];
  }
  
  // Return the final sum
  return sum;
}

// Example usage
console.log(sumArray([1, 2, 3, 4, 5])); // Output: 15`
      },
      {
        title: "Palindrome Checker",
        description: "Write a function that checks if a given string is a palindrome (reads the same backward as forward), ignoring case sensitivity and non-alphanumeric characters.",
        language: "javascript",
        difficulty: "medium",
        topics: ["strings", "functions", "algorithms"],
        hints: [
          "Define a function that accepts a string parameter",
          "Clean the string by removing non-alphanumeric characters and converting to lowercase",
          "You can use a regular expression to remove non-alphanumeric characters",
          "Compare the cleaned string with its reverse",
          "To reverse a string, you can convert it to an array, reverse it, and join it back"
        ],
        solution: `function isPalindrome(str) {
  // Clean the string - remove non-alphanumeric and convert to lowercase
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  // Reverse the string
  const reversedStr = cleanStr.split('').reverse().join('');
  
  // Check if the cleaned string equals its reverse
  return cleanStr === reversedStr;
}

// Example usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Output: true
console.log(isPalindrome("Hello World")); // Output: false`
      },
      {
        title: "Closure Counter",
        description: "Create a function that returns a counter function. The counter function, when called, should increment and return a count starting from zero.",
        language: "javascript",
        difficulty: "medium",
        topics: ["closures", "functions", "scope"],
        hints: [
          "Define a function that will return another function",
          "Initialize a counter variable in the outer function",
          "The inner function should increment the counter and return its value",
          "The counter variable should be accessible to the inner function through closure",
          "Each call to the returned function should increment the counter"
        ],
        solution: `function createCounter() {
  // Initialize counter in the outer function's scope
  let count = 0;
  
  // Return a function that increments and returns the counter
  return function() {
    return count++;
  };
}

// Example usage
const counter = createCounter();
console.log(counter()); // Output: 0
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2`
      }
    ],
    ruby: [
      {
        title: "Array Element Sum",
        description: "Write a method that takes an array of numbers and returns the sum of all the numbers in the array.",
        language: "ruby",
        difficulty: "easy",
        topics: ["arrays", "methods", "loops"],
        hints: [
          "Define a method that takes an array as a parameter",
          "Use Ruby's enumerable methods to iterate through the array",
          "The reduce method can be used to accumulate values",
          "Alternatively, you can use a loop with a sum variable",
          "Return the final sum"
        ],
        solution: `def sum_array(numbers)
  # Using Ruby's reduce method to sum the array
  numbers.reduce(0) { |sum, num| sum + num }
  
  # Alternatively, you could use the sum method
  # numbers.sum
end

# Example usage
puts sum_array([1, 2, 3, 4, 5]) # Output: 15`
      },
      {
        title: "Word Counter",
        description: "Write a method that takes a string and returns a hash with each word as a key and its frequency as the value.",
        language: "ruby",
        difficulty: "medium",
        topics: ["hashes", "strings", "methods"],
        hints: [
          "Define a method that takes a string parameter",
          "Split the string into words using the split method",
          "Initialize an empty hash to store word counts",
          "Iterate through each word and update its count in the hash",
          "You can use the each_with_object method or a simple each loop"
        ],
        solution: `def word_count(string)
  # Split the string into words
  words = string.downcase.split

  # Count occurrences of each word
  counts = Hash.new(0)
  
  words.each do |word|
    counts[word] += 1
  end
  
  counts
end

# Example usage
puts word_count("hello world hello ruby").inspect
# Output: {"hello"=>2, "world"=>1, "ruby"=>1}`
      }
    ]
  };
  
  // Select problems based on language
  let availableProblems = problemsByLanguage[language.toLowerCase()] || [];
  
  // If no problems available for this language, use python as fallback
  if (availableProblems.length === 0) {
    availableProblems = problemsByLanguage.python;
  }
  
  // Filter by difficulty if specified
  if (difficulties.length > 0) {
    availableProblems = availableProblems.filter(p => 
      difficulties.includes(p.difficulty)
    );
  }
  
  // Filter by topics if specified
  if (topics.length > 0) {
    availableProblems = availableProblems.filter(p => 
      p.topics.some(t => topics.includes(t))
    );
  }
  
  // If no problems match filters, return the original set
  if (availableProblems.length === 0) {
    availableProblems = problemsByLanguage[language.toLowerCase()] || problemsByLanguage.python;
  }
  
  // Generate the requested number of problems
  const result = [];
  for (let i = 0; i < count && i < availableProblems.length; i++) {
    // Clone the problem to avoid modifying the original
    result.push({ ...availableProblems[i] });
  }
  
  // If we need more problems than we have available, repeat some
  while (result.length < count) {
    const index = result.length % availableProblems.length;
    // Clone and slightly modify the title to make it seem different
    const problem = { 
      ...availableProblems[index],
      title: `${availableProblems[index].title} (Variation ${Math.floor(result.length / availableProblems.length) + 1})`
    };
    result.push(problem);
  }
  
  return result;
}

// Helper function to make API calls to Together AI
async function callTogetherAI(prompt: string, apiKey: string) {
  try {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Together AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid API response format");
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Together AI:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for generating coding problems using Together AI
  app.post('/api/problems/generate', async (req, res) => {
    try {
      // Validate the request body
      const validatedPrompt = togetherAIPromptSchema.parse(req.body);
      
      console.log("Generating problems with the following parameters:");
      console.log("Language:", validatedPrompt.language);
      console.log("Topics:", validatedPrompt.topics);
      console.log("Difficulty:", validatedPrompt.difficulty);
      console.log("Count:", validatedPrompt.count);
      if (validatedPrompt.learningFocus) {
        console.log("Learning Focus:", validatedPrompt.learningFocus);
      }
      if (validatedPrompt.frameworkName) {
        console.log("Framework:", validatedPrompt.frameworkName);
      }
      
      // Get Together AI API key from environment variable
      const apiKey = process.env.TOGETHER_AI_API_KEY;
      
      if (!apiKey) {
        console.error("No Together AI API key found in environment variables");
        throw new Error("API key is required to generate problems");
      }
      
      // Build the prompt specifically for JSON output
      const prompt = `<s>[INST]
You are an expert programming teacher who creates coding practice problems for beginner programmers.

Please create ${validatedPrompt.count} unique, educational coding problems in the ${validatedPrompt.language} programming language.
The problems should cover the following topics: ${validatedPrompt.topics.join(', ')}
The problems should be at the following difficulty levels: ${validatedPrompt.difficulty.join(', ')}
${validatedPrompt.learningFocus ? `The problems should focus on ${validatedPrompt.learningFocus.replace(/-/g, ' ')} learning.` : ''}
${validatedPrompt.frameworkName ? `The problems should specifically relate to the ${validatedPrompt.frameworkName} framework.` : ''}
${validatedPrompt.customInstructions ? 'Additional instructions: ' + validatedPrompt.customInstructions : ''}

${getLearningFocusInstructions(validatedPrompt.learningFocus)}

IMPORTANT: Return ONLY a JSON array with problems in the following format:
[
  {
    "title": "Problem Title",
    "description": "Detailed problem description...",
    "language": "${validatedPrompt.language}",
    "difficulty": "easy|medium|hard",
    "topics": ["topic1", "topic2"],
    "hints": ["First hint", "Second hint", "Third hint", "Fourth hint", "Fifth hint"],
    "solution": "Code solution with line breaks as \\n"
  }
]

NO EXPLANATION TEXT. ONLY RETURN VALID JSON.
[/INST]</s>`;

      console.log("Calling Together AI API...");
      
      // Call Together AI API with the chat/completions endpoint
      const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3-8b-chat-hf",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Together AI API error:", errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API response received");
      
      if (!responseData.choices || !responseData.choices[0] || !responseData.choices[0].message) {
        console.error("Invalid response format from Together AI");
        throw new Error("Invalid API response format");
      }
      
      const content = responseData.choices[0].message.content;
      
      try {
        // Parse the response content
        let problemsData;
        
        try {
          // First try parsing the entire content as JSON
          problemsData = JSON.parse(content);
        } catch (initialError) {
          console.log("Initial parsing failed, trying to extract JSON...");
          
          // Try to extract JSON array from the response
          const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
          
          if (!jsonMatch) {
            console.error("Could not find JSON array in response");
            throw new Error("Failed to extract JSON from response");
          }
          
          problemsData = JSON.parse(jsonMatch[0]);
        }
        
        // Handle both array and object with array inside
        let problems = Array.isArray(problemsData) ? problemsData : problemsData.problems || [];
        
        // Validate that we have problems
        if (!problems || !Array.isArray(problems) || problems.length === 0) {
          console.error("No valid problems found in the response");
          throw new Error("No valid problems in API response");
        }
        
        // Add UI state properties to each problem
        const enhancedProblems = problems.map(problem => ({
          ...problem,
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
          showHints: false,
          showSolution: false,
          hintIndex: 0,
          saved: false
        }));
        
        res.json({ problems: enhancedProblems });
      } catch (parseError) {
        console.error("Error parsing API response:", parseError);
        console.log("Response content:", content);
        
        // Fallback to mock problems if parsing fails
        console.log("Using fallback mock problems");
        const mockProblems = generateMockProblems(
          validatedPrompt.language,
          validatedPrompt.topics,
          validatedPrompt.difficulty,
          validatedPrompt.count
        );
        res.json({ problems: mockProblems });
      }
    } catch (error) {
      console.error("Error generating problems:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      
      res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  });

  // API endpoint for validating user's code solution
  app.post('/api/code/validate', async (req, res) => {
    try {
      // Validate the request body
      const { code, language, problemTitle, problemDescription, solutionCode } = codeValidateSchema.parse(req.body);
      
      console.log(`Validating ${language} code solution for problem: ${problemTitle}`);
      
      // Get Together AI API key from environment variable
      const apiKey = process.env.TOGETHER_AI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key is required to validate code");
      }
      
      // Build the prompt for code validation
      const validationPrompt = `
I need to validate a user's code solution for a programming problem.

Problem Title: ${problemTitle}
Problem Description: ${problemDescription}
Programming Language: ${language}

${solutionCode ? `Reference Solution (for comparison only): 
\`\`\`${language}
${solutionCode}
\`\`\`` : ''}

User's Code:
\`\`\`${language}
${code}
\`\`\`

Please evaluate the code and respond with a JSON object containing the following fields:
1. "isValid" (boolean): Whether the code is a valid solution to the problem
2. "output" (string): The simulated output of the code when executed with reasonable test cases
3. "error" (string or null): Any syntax errors or runtime errors in the code
4. "feedback" (string): Constructive feedback on the solution. Mention what's good and what could be improved.

Return ONLY the JSON object, nothing else.
`;
      
      // Call Together AI API for code validation
      const content = await callTogetherAI(validationPrompt, apiKey);
      
      try {
        // Try to parse the response as JSON
        let jsonResponse;
        try {
          // First attempt to parse the entire response
          jsonResponse = JSON.parse(content);
        } catch (error) {
          // If that fails, try to extract JSON with regex
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            throw new Error("Could not extract JSON from API response");
          }
          jsonResponse = JSON.parse(jsonMatch[0]);
        }
        
        res.json(jsonResponse);
      } catch (parseError) {
        console.error("Error parsing validation response:", parseError);
        console.log("Response content:", content);
        
        // If all parsing fails, fall back to a safe default response
        res.json({
          isValid: false,
          output: "Could not execute code.",
          error: "Error parsing API response.",
          feedback: "We encountered an issue validating your code. Please try again later."
        });
      }
    } catch (error) {
      console.error("Error validating code:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to validate code", message: error.message });
      }
    }
  });
  
  // API endpoint for optimizing user's code
  app.post('/api/code/optimize', async (req, res) => {
    try {
      // Validate the request body
      const { code, language, problemTitle, problemDescription } = codeOptimizeSchema.parse(req.body);
      
      console.log(`Optimizing ${language} code for problem: ${problemTitle}`);
      
      // Get Together AI API key from environment variable
      const apiKey = process.env.TOGETHER_AI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key is required to optimize code");
      }
      
      // Build the prompt for code optimization
      const optimizationPrompt = `
I need optimization suggestions for the following code solution to a programming problem.

Problem Title: ${problemTitle}
Problem Description: ${problemDescription}
Programming Language: ${language}

User's Code:
\`\`\`${language}
${code}
\`\`\`

Please analyze this code and provide suggestions for optimizing it in terms of:
1. Time Complexity
2. Space Complexity
3. Code Readability
4. Best Practices for ${language}

Respond with a JSON object containing a single field:
"optimizationFeedback": A detailed string with your optimization suggestions, potential improvements, and explanations.

Return ONLY the JSON object, nothing else.
`;
      
      // Call Together AI API for code optimization
      const content = await callTogetherAI(optimizationPrompt, apiKey);
      
      try {
        // Try to parse the response as JSON
        let jsonResponse;
        try {
          // First attempt to parse the entire response
          jsonResponse = JSON.parse(content);
        } catch (error) {
          // If that fails, try to extract JSON with regex
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            throw new Error("Could not extract JSON from API response");
          }
          jsonResponse = JSON.parse(jsonMatch[0]);
        }
        
        res.json(jsonResponse);
      } catch (parseError) {
        console.error("Error parsing optimization response:", parseError);
        console.log("Response content:", content);
        
        // If all parsing fails, fall back to a safe default response
        res.json({
          optimizationFeedback: "We encountered an issue generating optimization suggestions. Please try again later."
        });
      }
    } catch (error) {
      console.error("Error optimizing code:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to optimize code", message: error.message });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
