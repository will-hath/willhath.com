// sync-tidbits.js
const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Define paths
const markdownPath = path.join("/Users/willhathaway/Library/Mobile Documents/iCloud~md~obsidian/Documents/My *Mac* Life/tidbits.md");
const htmlPath = path.join(__dirname, '..', 'public', 'tidbits', 'index.html');

// Read markdown file
const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

// Convert markdown to HTML
const htmlContent = marked.parse(markdownContent);

// Load the existing HTML file
let existingHtml = fs.readFileSync(htmlPath, 'utf-8');

// Define the markers for the start and end of the content section
const startMarker = '<!-- start -->';
const endMarker = '<!-- end -->';

// Extract everything before and after the content section
const startOfHtml = existingHtml.substring(0, existingHtml.indexOf(startMarker) + startMarker.length);
const endOfHtml = existingHtml.substring(existingHtml.indexOf(endMarker));

// Combine the pieces and the new content
const updatedHtml = `${startOfHtml}\n${htmlContent}\n${endOfHtml}`;

// Write the updated HTML back to the file, overwriting the old content
fs.writeFileSync(htmlPath, updatedHtml);

console.log('Tidbits have been recompiled.');