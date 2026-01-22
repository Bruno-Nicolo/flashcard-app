import type { Card, Deck, User } from "@/types/types";

// Mock user
export const mockUser: User = {
  id: "user-1",
  email: "john.doe@example.com",
  name: "John Doe",
  avatarUrl: null,
};

// Mock decks with nested structure
export const mockDecks: Deck[] = [
  {
    id: "deck-1",
    name: "JavaScript",
    parentId: null,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "deck-2",
    name: "React Fundamentals",
    parentId: "deck-1",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "deck-3",
    name: "TypeScript",
    parentId: null,
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-12"),
  },
  {
    id: "deck-4",
    name: "Advanced Types",
    parentId: "deck-3",
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-14"),
  },
  {
    id: "deck-5",
    name: "Python",
    parentId: null,
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-16"),
  },
];

// Helper to create dates relative to today
const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(0, 0, 0, 0);
  return date;
};

// Mock cards with various due dates
export const mockCards: Card[] = [
  // Due today
  {
    id: "card-1",
    title: "What is a closure?",
    content: `A **closure** is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned.

\`\`\`javascript
function outer() {
  const message = "Hello";
  return function inner() {
    console.log(message);
  };
}

const greet = outer();
greet(); // "Hello"
\`\`\`

Key points:
- Closures "remember" the environment where they were created
- Used for data privacy and factory functions
- Common in event handlers and callbacks`,
    deckId: "deck-1",
    nextDueDate: daysFromNow(0),
    lastReviewedDate: daysFromNow(-3),
    lastScore: 4,
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-19"),
  },
  {
    id: "card-2",
    title: "useState Hook",
    content: `\`useState\` is a React Hook that lets you add state to functional components.

\`\`\`tsx
const [count, setCount] = useState(0);

// Update state
setCount(count + 1);

// Or with updater function
setCount(prev => prev + 1);
\`\`\`

Returns an array with:
1. Current state value
2. Setter function to update state`,
    deckId: "deck-2",
    nextDueDate: daysFromNow(0),
    lastReviewedDate: daysFromNow(-1),
    lastScore: 5,
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-21"),
  },
  // Overdue
  {
    id: "card-3",
    title: "What is the event loop?",
    content: `The **event loop** is JavaScript's mechanism for handling asynchronous operations.

Components:
1. **Call Stack** - Executes synchronous code
2. **Task Queue** - Holds callbacks (setTimeout, events)
3. **Microtask Queue** - Holds promises, queueMicrotask

Order of execution:
1. Run all synchronous code
2. Process all microtasks
3. Process one task from the task queue
4. Repeat`,
    deckId: "deck-1",
    nextDueDate: daysFromNow(-2),
    lastReviewedDate: daysFromNow(-7),
    lastScore: 3,
    createdAt: new Date("2025-01-04"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "card-4",
    title: "Generic Types in TypeScript",
    content: `**Generics** allow you to write reusable code that works with multiple types.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
identity<string>("hello");
identity(42); // Type inferred as number
\`\`\`

Common patterns:
- \`Array<T>\` or \`T[]\`
- \`Promise<T>\`
- \`Record<K, V>\``,
    deckId: "deck-4",
    nextDueDate: daysFromNow(-1),
    lastReviewedDate: daysFromNow(-5),
    lastScore: 4,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-17"),
  },
  // Due tomorrow
  {
    id: "card-5",
    title: "useEffect Hook",
    content: `\`useEffect\` lets you perform side effects in functional components.

\`\`\`tsx
useEffect(() => {
  // Effect code runs after render
  document.title = \`Count: \${count}\`;
  
  return () => {
    // Cleanup function (optional)
  };
}, [count]); // Dependency array
\`\`\`

Rules:
- Empty \`[]\` = run once on mount
- No array = run on every render
- With deps = run when deps change`,
    deckId: "deck-2",
    nextDueDate: daysFromNow(1),
    lastReviewedDate: daysFromNow(-2),
    lastScore: 5,
    createdAt: new Date("2025-01-07"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "card-6",
    title: "Union Types",
    content: `A **union type** allows a value to be one of several types.

\`\`\`typescript
type Status = "pending" | "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "Loading...";
    case "success":
      return "Done!";
    case "error":
      return "Failed";
  }
}
\`\`\``,
    deckId: "deck-3",
    nextDueDate: daysFromNow(1),
    lastReviewedDate: daysFromNow(-4),
    lastScore: 4,
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-18"),
  },
  // Due in future
  {
    id: "card-7",
    title: "Python List Comprehension",
    content: `**List comprehensions** provide a concise way to create lists.

\`\`\`python
# Basic syntax
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested
matrix = [[i*j for j in range(3)] for i in range(3)]
\`\`\``,
    deckId: "deck-1",
    nextDueDate: daysFromNow(3),
    lastReviewedDate: daysFromNow(-1),
    lastScore: 5,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-21"),
  },
  {
    id: "card-8",
    title: "Promises vs Async/Await",
    content: `Both handle asynchronous operations, but with different syntax.

**Promises:**
\`\`\`javascript
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
\`\`\`

**Async/Await:**
\`\`\`javascript
async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
\`\`\``,
    deckId: "deck-1",
    nextDueDate: daysFromNow(5),
    lastReviewedDate: daysFromNow(-3),
    lastScore: 4,
    createdAt: new Date("2025-01-09"),
    updatedAt: new Date("2025-01-19"),
  },
  {
    id: "card-9",
    title: "Context API",
    content: `React **Context** provides a way to pass data through the component tree without prop drilling.

\`\`\`tsx
// Create context
const ThemeContext = createContext("light");

// Provider
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Consumer (hook)
const theme = useContext(ThemeContext);
\`\`\`

Best for:
- Theme, locale, auth state
- Data needed by many components at different levels`,
    deckId: "deck-2",
    nextDueDate: daysFromNow(7),
    lastReviewedDate: null,
    lastScore: null,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "card-10",
    title: "Type Guards",
    content: `**Type guards** narrow down the type within a conditional block.

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: string | number) {
  if (isString(value)) {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }
  // value is number here
  return value.toFixed(2);
}
\`\`\`

Built-in guards: \`typeof\`, \`instanceof\`, \`in\``,
    deckId: "deck-4",
    nextDueDate: daysFromNow(4),
    lastReviewedDate: daysFromNow(-2),
    lastScore: 3,
    createdAt: new Date("2025-01-11"),
    updatedAt: new Date("2025-01-20"),
  },
];

// Helper functions
export function getDueCards(): Card[] {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return mockCards
    .filter((card) => card.nextDueDate <= today)
    .sort((a, b) => a.nextDueDate.getTime() - b.nextDueDate.getTime());
}

export function getUpcomingCards(): Card[] {
  return [...mockCards].sort(
    (a, b) => a.nextDueDate.getTime() - b.nextDueDate.getTime(),
  );
}

export function getCardsByDeck(deckId: string): Card[] {
  return mockCards.filter((card) => card.deckId === deckId);
}

export function getDeckWithChildren(
  deckId: string | null,
): (Deck & { children: Deck[] })[] {
  return mockDecks
    .filter((d) => d.parentId === deckId)
    .map((deck) => ({
      ...deck,
      children: mockDecks.filter((d) => d.parentId === deck.id),
    }));
}

export function getDeckById(deckId: string): Deck | undefined {
  return mockDecks.find((d) => d.id === deckId);
}

export function getCardsCountForDeck(deckId: string): number {
  return mockCards.filter((card) => card.deckId === deckId).length;
}

export function getSubDecks(parentId: string): Deck[] {
  return mockDecks.filter((d) => d.parentId === parentId);
}
