# Navigate to the directory
cd ~/willhath.com

# Run your commands
/opt/homebrew/bin/node scripts/sync-tidbits.js
/opt/homebrew/bin/node scripts/sync-about.js 
/opt/homebrew/bin/node scripts/sync-quotes.js 
git add src/app/tidbits/getContent.ts
git add src/app/about/getContent.ts
git add src/app/quotes/getContent.ts
git commit -m "updated content"
git push
echo "Attempted to update content at $(date)"

