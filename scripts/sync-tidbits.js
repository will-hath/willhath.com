const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Define paths
const markdownPath = path.join("/Users/willhathaway/Library/Mobile Documents/iCloud~md~obsidian/Documents/My *Mac* Life/tidbits.md");
const outputPath = path.join(__dirname, '..', 'src', 'app', 'tidbits', 'getContent.ts');
const tidbitsArrayPath = path.join(__dirname, '..', 'src', 'app', 'tidbits', 'tidbitsArray.ts');

// Read and convert markdown
const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
const htmlContent = marked.parse(markdownContent);

// Escape backticks and handle LaTeX backslashes
const escapedContent = htmlContent
  .replace(/`/g, '\\`')  // Escape backticks
  .replace(/\\/g, '\\\\');  // Double escape backslashes for LaTeX

// Create the TypeScript content for getContent
const tsContent = `
export function getTidbitsContent() {
  return \`${escapedContent}\`;
}
`;

// Extract tidbits (content between dates, excluding the dates)
const tidbits = markdownContent
  .split('####')  // Split by headers
  .slice(1)  // Remove any content before first header
  .map(block => {
    const lines = block.split('\n');
    // Skip the date line and any empty lines, join the rest
    return lines.slice(1).filter(line => line.trim()).join('\n').trim();
  })
  .filter(tidbit => tidbit.length > 0);

// Create the tidbits array content
const tidbitsArrayContent = `
export const tidbits = [
  ${tidbits.map(tidbit => `\`${tidbit.replace(/`/g, '\\`')}\``).join(',\n  ')}
];
`;

// Write both files
fs.writeFileSync(outputPath, tsContent);
fs.writeFileSync(tidbitsArrayPath, tidbitsArrayContent);

console.log('Successfully updated tidbits content and tidbits array');