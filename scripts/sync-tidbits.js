const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Define paths
const markdownPath = path.join("/Users/willhathaway/Library/Mobile Documents/iCloud~md~obsidian/Documents/My *Mac* Life/willhath.com/tidbits.md");
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

// Extract tidbits as objects with date and text
const tidbits = markdownContent
  .split('####')
  .slice(1)
  .map(block => {
    const lines = block.split('\n');
    const date = lines[0].trim();
    const text = lines.slice(1).filter(line => line.trim()).join('\n').trim();
    return { date, text };
  })
  .filter(tidbit => tidbit.text.length > 0 && tidbit.date.length > 0);

// Create the tidbits array content as array of objects
const tidbitsArrayContent = `
export const tidbits = [
  ${tidbits.map(t => `{
    date: \`${t.date.replace(/`/g, '\\`')}\`,
    text: \`${t.text.replace(/`/g, '\\`')}\`
  }`).join(',\n  ')}
];
`;

// Write both files
fs.writeFileSync(outputPath, tsContent);
fs.writeFileSync(tidbitsArrayPath, tidbitsArrayContent);

console.log('Successfully updated tidbits content and tidbits array');