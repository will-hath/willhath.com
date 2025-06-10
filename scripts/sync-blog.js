const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Define paths
const blogFolderPath = path.join("/Users/willhathaway/Library/Mobile Documents/iCloud~md~obsidian/Documents/My *Mac* Life/willhath.com/unrambling");
const outputPath = path.join(__dirname, '..', 'src', 'app', 'unrambling', 'blogPosts.ts');

// Function to extract frontmatter
function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const metadata = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts.join(':').trim();
    }
  });

  return metadata;
}

// Function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Read all markdown files from the blog folder
const blogPosts = [];
const files = fs.readdirSync(blogFolderPath);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(blogFolderPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter
    const metadata = extractFrontmatter(content);
    if (!metadata || !metadata.title) {
      console.warn(`Skipping ${file} - missing title in frontmatter`);
      return;
    }

    // Remove frontmatter from content
    const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(contentWithoutFrontmatter);

    // Create blog post object
    const post = {
      title: metadata.title,
      slug: metadata.slug || createSlug(metadata.title),
      date: metadata.date || new Date().toISOString().split('T')[0],
      excerpt: metadata.excerpt || '',
      content: htmlContent
    };

    blogPosts.push(post);
  }
});

// Sort posts by date (newest first)
blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Create the TypeScript content
const tsContent = `
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};
`;

// Write the file
fs.writeFileSync(outputPath, tsContent);

console.log(`Successfully synced ${blogPosts.length} blog posts`); 