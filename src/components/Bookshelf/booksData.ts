import { Book } from '@/types/types';

// Define each book separately in a mapping from book name to book object
export const bookMap: { [name: string]: Book } = {
  "The Design of Everyday Things": {
    id: '1',
    title: 'The Design of Everyday Things',
    author: 'Donald A. Norman',
    date: '1988',
    link: '/books/design-everyday-things',
    spineColor: '#2c3e50',
    textColor: '#ecf0f1',
    height: 85,
    pages: 368
  },
  "Clean Code": {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    date: '2008',
    link: '/books/clean-code',
    spineColor: '#e74c3c',
    textColor: '#ffffff',
    height: 78,
    pages: 464
  },
  "Structure and Interpretation of Computer Programs": {
    id: '3',
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Harold Abelson, Gerald Jay Sussman',
    date: '1985',
    link: '/books/sicp',
    spineColor: '#3498db',
    textColor: '#ffffff',
    height: 90,
    pages: 657
  },
  "The Pragmatic Programmer": {
    id: '4',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    date: '1999',
    link: '/books/pragmatic-programmer',
    spineColor: '#f39c12',
    textColor: '#2c3e50',
    height: 70,
    pages: 352
  },
  "Design Patterns": {
    id: '5',
    title: 'Design Patterns',
    author: 'Gang of Four',
    date: '1994',
    link: '/books/design-patterns',
    spineColor: '#9b59b6',
    textColor: '#ffffff',
    height: 88,
    pages: 395
  },
  "Code Complete": {
    id: '6',
    title: 'Code Complete',
    author: 'Steve McConnell',
    date: '1993',
    link: '/books/code-complete',
    spineColor: '#1abc9c',
    textColor: '#ffffff',
    height: 82,
    pages: 914
  },
  "The Art of Computer Programming": {
    id: '7',
    title: 'The Art of Computer Programming',
    author: 'Donald E. Knuth',
    date: '1968',
    link: '/books/taocp',
    spineColor: '#34495e',
    textColor: '#ecf0f1',
    height: 90,
    pages: 672
  },
  "JavaScript: The Good Parts": {
    id: '8',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    date: '2008',
    link: '/books/js-good-parts',
    spineColor: '#e67e22',
    textColor: '#ffffff',
    height: 65,
    pages: 176
  },
  "Thinking, Fast and Slow": {
    id: '9',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    date: '2011',
    link: '/books/thinking-fast-slow',
    spineColor: '#27ae60',
    textColor: '#ffffff',
    height: 75,
    pages: 499
  },
  "The Lean Startup": {
    id: '10',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    date: '2011',
    link: '/books/lean-startup',
    spineColor: '#8e44ad',
    textColor: '#ffffff',
    height: 68,
    pages: 336
  },
  "Gödel, Escher, Bach": {
    id: '11',
    title: 'Gödel, Escher, Bach',
    author: 'Douglas Hofstadter',
    date: '1979',
    link: '/books/geb',
    spineColor: '#d35400',
    textColor: '#ffffff',
    height: 87,
    pages: 777
  },
  "The Mythical Man-Month": {
    id: '12',
    title: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    date: '1975',
    link: '/books/mythical-man-month',
    spineColor: '#16a085',
    textColor: '#ffffff',
    height: 60,
    pages: 322
  }
};

// Example bookshelves, each with a set of books (by reference)
export const bookshelves: Book[][] = [
  [
    bookMap["The Design of Everyday Things"],
    bookMap["Clean Code"],
    bookMap["Structure and Interpretation of Computer Programs"],
    bookMap["The Pragmatic Programmer"],
    bookMap["Design Patterns"],
    bookMap["Code Complete"]
  ],
  [
    bookMap["The Art of Computer Programming"],
    bookMap["JavaScript: The Good Parts"],
    bookMap["Thinking, Fast and Slow"],
    bookMap["The Lean Startup"],
    bookMap["Gödel, Escher, Bach"],
    bookMap["The Mythical Man-Month"]
  ],
  [
    bookMap["The Art of Computer Programming"],
    bookMap["JavaScript: The Good Parts"],
    bookMap["Thinking, Fast and Slow"],
    bookMap["The Lean Startup"],
    bookMap["Gödel, Escher, Bach"],
    bookMap["The Mythical Man-Month"]
  ],
  [
    bookMap["The Art of Computer Programming"],
    bookMap["JavaScript: The Good Parts"],
    bookMap["Thinking, Fast and Slow"],
    bookMap["The Lean Startup"],
    bookMap["Gödel, Escher, Bach"],
    bookMap["The Mythical Man-Month"]
  ],
  [
    bookMap["The Art of Computer Programming"],
    bookMap["JavaScript: The Good Parts"],
    bookMap["Thinking, Fast and Slow"],
    bookMap["The Lean Startup"],
    bookMap["Gödel, Escher, Bach"],
    bookMap["The Mythical Man-Month"]
  ]
];
