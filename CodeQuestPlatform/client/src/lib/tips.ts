export const tipsByLanguage: Record<string, string[]> = {
  python: [
    "In Python, range(5) gives you 0 to 4, not 1 to 5!",
    "Lists are mutable, tuples are immutable in Python.",
    "Use list comprehensions for more readable and compact code.",
    "The Zen of Python (import this) provides guiding principles for Python programming.",
    "In Python 3, print() is a function, not a statement."
  ],
  javascript: [
    "Remember that === checks type and value, while == only checks value.",
    "Always use let or const instead of var for more predictable scoping.",
    "Arrow functions => inherit the this context from their surroundings.",
    "Use map(), filter(), and reduce() for cleaner array manipulations.",
    "Promises help manage asynchronous operations more cleanly than callbacks."
  ],
  cpp: [
    "Using std::vector can help you avoid manual memory management headaches.",
    "Always prefer RAII (Resource Acquisition Is Initialization) for resource management.",
    "Use smart pointers like std::unique_ptr instead of raw pointers when possible.",
    "The auto keyword can help with complex type declarations.",
    "Use the const keyword liberally to prevent unintended modifications."
  ],
  java: [
    "Java's String.equals() checks content, while == checks if objects are identical.",
    "Always close resources in finally blocks or use try-with-resources.",
    "Use the @Override annotation when overriding methods to catch errors.",
    "Java Arrays.sort() uses quicksort for primitives and mergesort for objects.",
    "The Java Collections Framework provides useful data structures for most needs."
  ],
  ruby: [
    "Ruby's unless is a cleaner way to express if !condition.",
    "Everything in Ruby is an object, even numbers and booleans!",
    "Use blocks, procs, and lambdas for powerful functional programming.",
    "Symbol keys (:key) are more efficient than string keys for hashes.",
    "Use the attr_accessor, attr_reader, and attr_writer methods to avoid boilerplate."
  ],
  go: [
    "Go's defer statement executes a function when the surrounding function returns.",
    "Use := for declaration and assignment, = for assignment only.",
    "Go has no exceptions; use multiple return values with error type instead.",
    "Interfaces are satisfied implicitly - no 'implements' keyword needed.",
    "Goroutines are lightweight threads managed by the Go runtime."
  ],
  rust: [
    "In Rust, variables are immutable by default. Use 'mut' to make them mutable.",
    "The ownership system prevents memory leaks and data races at compile time.",
    "Use Result<T, E> for operations that can fail, and Option<T> for optional values.",
    "Pattern matching with match is more powerful than switch statements in other languages.",
    "The cargo build system manages dependencies and builds for you."
  ],
  typescript: [
    "TypeScript interfaces are 'open' and can be extended by declaring another interface with the same name.",
    "Use type guards like typeof or instanceof to narrow types in conditional blocks.",
    "Union types (A | B) allow a variable to be one of several types.",
    "Use the strictNullChecks compiler option to catch potential null/undefined errors.",
    "Generic types <T> allow you to create reusable components with different types."
  ]
};

export const getRandomTip = (language: string): string => {
  const tips = tipsByLanguage[language] || [
    "Consistent practice is key to improving your coding skills!",
    "Break down complex problems into smaller, manageable parts.",
    "Don't be afraid to read documentation and learn from others' code.",
    "Writing clean, readable code is as important as making it work.",
    "Test your code with different inputs to ensure it handles edge cases."
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};
