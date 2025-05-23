export const topicsByLanguage: Record<string, string[]> = {
  python: [
    // Basic concepts
    'variables', 
    'loops', 
    'functions', 
    'dictionaries', 
    'lists', 
    'tuples',
    'sets',
    'classes', 
    'exception handling', 
    'file I/O', 
    'lambdas', 
    'comprehensions',
    'decorators',
    'generators',
    'context managers',
    
    // Data Structures & Algorithms
    'arrays',
    'linked lists',
    'stacks',
    'queues',
    'hash tables',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'backtracking',
    'greedy algorithms',
    'big O notation',
    'time complexity',
    'space complexity'
  ],
  javascript: [
    // Basic concepts
    'variables', 
    'loops', 
    'functions', 
    'objects', 
    'arrays', 
    'DOM manipulation', 
    'promises', 
    'async/await', 
    'closures', 
    'event handling',
    'higher-order functions',
    'this keyword',
    'prototypes',
    'modules',
    'destructuring',
    'spread operator',
    
    // Data Structures & Algorithms
    'linked lists',
    'stacks',
    'queues',
    'hash tables',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'memoization',
    'backtracking',
    'greedy algorithms',
    'big O notation',
    'time complexity',
    'space complexity'
  ],
  cpp: [
    // Basic concepts
    'variables', 
    'loops', 
    'functions', 
    'arrays', 
    'pointers', 
    'references',
    'classes', 
    'templates', 
    'STL', 
    'memory management', 
    'operator overloading',
    'inheritance',
    'polymorphism',
    'namespace',
    'exception handling',
    'smart pointers',
    
    // Data Structures & Algorithms
    'vectors',
    'linked lists',
    'stacks',
    'queues',
    'hash tables',
    'maps',
    'sets',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'priority queues',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'backtracking',
    'greedy algorithms',
    'divide and conquer',
    'big O notation',
    'time complexity',
    'space complexity'
  ],
  java: [
    // Basic concepts
    'variables', 
    'loops', 
    'methods', 
    'arrays', 
    'classes', 
    'inheritance', 
    'interfaces', 
    'collections', 
    'exception handling', 
    'threads',
    'generics',
    'annotations',
    'lambda expressions',
    'streams',
    'IO operations',
    'serialization',
    
    // Data Structures & Algorithms
    'ArrayList',
    'LinkedList',
    'HashMap',
    'HashSet',
    'Stack',
    'Queue',
    'PriorityQueue',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'backtracking',
    'greedy algorithms',
    'divide and conquer',
    'big O notation',
    'time complexity',
    'space complexity'
  ],
  ruby: [
    // Basic concepts
    'variables', 
    'loops', 
    'methods', 
    'arrays', 
    'hashes', 
    'classes', 
    'modules', 
    'blocks', 
    'procs', 
    'metaprogramming',
    'symbols',
    'lambdas',
    'iterators',
    'mixins',
    'exception handling',
    
    // Data Structures & Algorithms
    'linked lists',
    'stacks',
    'queues',
    'hash tables',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'backtracking',
    'greedy algorithms',
    'big O notation',
    'time complexity',
    'space complexity'
  ],
  go: [
    // Basic concepts
    'variables', 
    'loops', 
    'functions', 
    'arrays', 
    'slices', 
    'maps',
    'structs', 
    'interfaces', 
    'goroutines', 
    'channels', 
    'error handling',
    'pointers',
    'defer statements',
    'type assertions',
    'type switches',
    'reflection',
    
    // Data Structures & Algorithms
    'linked lists',
    'stacks',
    'queues',
    'hash tables',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'backtracking',
    'greedy algorithms',
    'big O notation',
    'time complexity',
    'space complexity'
  ],
  rust: [
    // Basic concepts
    'variables', 
    'loops', 
    'functions', 
    'vectors', 
    'structs', 
    'enums', 
    'traits', 
    'pattern matching', 
    'ownership', 
    'lifetimes',
    'borrowing',
    'references',
    'modules',
    'error handling',
    'generics',
    'closures',
    
    // Data Structures & Algorithms
    'linked lists',
    'stacks',
    'queues',
    'hash tables',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'backtracking',
    'greedy algorithms',
    'big O notation',
    'time complexity',
    'space complexity'
  ],
  typescript: [
    // Basic concepts
    'variables', 
    'loops', 
    'functions', 
    'interfaces', 
    'classes', 
    'generics', 
    'enums', 
    'type assertions', 
    'decorators', 
    'namespaces',
    'type annotations',
    'union types',
    'intersection types',
    'type guards',
    'utility types',
    'async/await',
    
    // Data Structures & Algorithms
    'arrays',
    'linked lists',
    'stacks',
    'queues',
    'hash tables',
    'trees',
    'binary trees',
    'binary search trees',
    'heaps',
    'graphs',
    'sorting algorithms',
    'searching algorithms',
    'dynamic programming',
    'recursion',
    'backtracking',
    'greedy algorithms',
    'big O notation',
    'time complexity',
    'space complexity'
  ]
};

export const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

export const languageOptions = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' }
];

// Map of languages to their popular frameworks
export const frameworksByLanguage: Record<string, { value: string, label: string }[]> = {
  'python': [
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' },
    { value: 'fastapi', label: 'FastAPI' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'pandas', label: 'Pandas' }
  ],
  'javascript': [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'express', label: 'Express.js' },
    { value: 'next', label: 'Next.js' },
    { value: 'node', label: 'Node.js' }
  ],
  'java': [
    { value: 'spring', label: 'Spring' },
    { value: 'springboot', label: 'Spring Boot' },
    { value: 'hibernate', label: 'Hibernate' },
    { value: 'javafx', label: 'JavaFX' },
    { value: 'android', label: 'Android SDK' }
  ],
  'cpp': [
    { value: 'qt', label: 'Qt' },
    { value: 'boost', label: 'Boost' },
    { value: 'opencv', label: 'OpenCV' },
    { value: 'stl', label: 'STL' }
  ],
  'typescript': [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React with TypeScript' },
    { value: 'next', label: 'Next.js with TypeScript' },
    { value: 'nest', label: 'NestJS' },
    { value: 'deno', label: 'Deno' }
  ],
  'ruby': [
    { value: 'rails', label: 'Ruby on Rails' },
    { value: 'sinatra', label: 'Sinatra' }
  ],
  'go': [
    { value: 'gin', label: 'Gin' },
    { value: 'echo', label: 'Echo' },
    { value: 'fiber', label: 'Fiber' }
  ],
  'rust': [
    { value: 'rocket', label: 'Rocket' },
    { value: 'actix', label: 'Actix' },
    { value: 'tokio', label: 'Tokio' }
  ]
};
