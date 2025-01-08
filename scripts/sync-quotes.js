const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Define paths
const markdownPath = path.join("/Users/willhathaway/Library/Mobile Documents/iCloud~md~obsidian/Documents/My *Mac* Life/quotes.md");
const outputPath = path.join(__dirname, '..', 'src', 'app', 'quotes', 'getContent.ts');
const quotesArrayPath = path.join(__dirname, '..', 'src', 'app', 'quotes', 'quotesArray.ts');

// Read and convert markdown
const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
const htmlContent = marked.parse(markdownContent);

// Escape backticks and handle LaTeX backslashes
const escapedContent = htmlContent
  .replace(/`/g, '\\`')  // Escape backticks
  .replace(/\\/g, '\\\\');  // Double escape backslashes for LaTeX

// Create the TypeScript content for getContent
const tsContent = `
export function getquotesContent() {
  return \`${escapedContent}\`;
}
`;

// Extract full quote blocks with formatting
const quotes = markdownContent
  .split('\n\n')  // Split by double newline to separate quote blocks
  .filter(block => block.startsWith('> '))  // Only keep blocks that start with quote
  .map(block => block.trim());

// Create the quotes array content
const quotesArrayContent = `
export const quotes = [
  ${quotes.map(quote => `\`${quote.replace(/`/g, '\\`')}\``).join(',\n  ')}
];
`;

// Write both files
fs.writeFileSync(outputPath, tsContent);
fs.writeFileSync(quotesArrayPath, quotesArrayContent);

console.log('Successfully updated quotes content and quotes array');