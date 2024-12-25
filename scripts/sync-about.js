const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Define paths
const markdownPath = path.join("/Users/willhathaway/Library/Mobile Documents/iCloud~md~obsidian/Documents/My *Mac* Life/about.md");
const outputPath = path.join(__dirname, '..', 'src', 'app', 'about', 'getContent.ts');

// Read and convert markdown
const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
const htmlContent = marked.parse(markdownContent);

// Escape backticks and handle LaTeX backslashes
const escapedContent = htmlContent
  .replace(/`/g, '\\`')  // Escape backticks
  .replace(/\\/g, '\\\\');  // Double escape backslashes for LaTeX

// Create the TypeScript content
const tsContent = `
export function getAboutContent() {
  return \`${escapedContent}\`;
}
`;

// Write the file
fs.writeFileSync(outputPath, tsContent);

console.log('Successfully updated about content');