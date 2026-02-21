# ⚡ Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Neon account created (https://neon.tech)
- [ ] Clerk account created (https://clerk.com)

## 5-Minute Setup

### 1️⃣ Get Your Database (2 min)

1. Go to https://neon.tech
2. Click "Sign up" → Create account
3. Click "Create Project"
4. Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.aws.neon.tech/db`)

### 2️⃣ Get Your Auth Keys (2 min)

1. Go to https://clerk.com
2. Click "Sign up" → Create account
3. Click "Create Application" → Name it "DSA Notes"
4. Go to "API Keys" section
5. Copy:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 3️⃣ Configure Your App (1 min)

Open `.env` and paste your credentials:

```env
DATABASE_URL="<YOUR_NEON_CONNECTION_STRING>"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<YOUR_CLERK_PUBLISHABLE_KEY>"
CLERK_SECRET_KEY="<YOUR_CLERK_SECRET_KEY>"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 4️⃣ Start Building! (30 sec)

```bash
# Push database schema
npm run db:push

# Start dev server
npm run dev
```

### 5️⃣ Test It Out

1. Open http://localhost:3000
2. Click "Get Started"
3. Sign up with email
4. Create your first DSA note! 🎉

## 📝 Your First Note

Try creating a note with:

- **Title**: Kadane's Algorithm
- **Topic**: Array
- **Difficulty**: Medium
- **Content**:

```markdown
## Algorithm

Find maximum sum contiguous subarray

## Approach

- Keep track of max ending here and max so far
- Update max ending at each position

## Code

\`\`\`python
def maxSubArray(nums):
max_so_far = max_current = nums[0]
for num in nums[1:]:
max_current = max(num, max_current + num)
max_so_far = max(max_so_far, max_current)
return max_so_far
\`\`\`

## Time Complexity

O(n) - single pass through array
```

## 🚀 Deploy to Vercel (Optional - 2 min)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add the same environment variables from `.env`
6. Click "Deploy"

Done! Your app is live at `your-app.vercel.app`

## 🆘 Troubleshooting

### "Database connection failed"

- ✅ Check your `DATABASE_URL` is correct
- ✅ Ensure it ends with `?sslmode=require`
- ✅ Verify your Neon project is active

### "Authentication not working"

- ✅ Verify both Clerk keys are set correctly
- ✅ Check no extra spaces in `.env`
- ✅ Restart dev server after changing `.env`

### "Prisma Client not generated"

```bash
npx prisma generate
npm run dev
```

## 🎯 What's Next?

- ✅ **Explore the UI**: Notice how fast everything loads? That's optimistic updates!
- ✅ **Test filtering**: Try filtering by topic and difficulty
- ✅ **Try search**: Search for keywords in your notes
- ✅ **Delete & undo**: Delete a note and click undo within 3 seconds
- ✅ **Edit notes**: Click edit icon on any note card
- ✅ **View markdown**: See your code blocks with syntax highlighting

## 💡 Pro Tips

1. **Use markdown formatting** for better notes:
   - Headers: `## Title`
   - Code blocks: Triple backticks with language
   - Lists: `-` or `1.`
   - Bold: `**text**`
   - Links: `[text](url)`

2. **Organize with topics**:
   - Array, String, LinkedList, Tree, Graph, DP, etc.
   - Color-coded badges for quick identification

3. **Tag difficulty accurately**:
   - Easy (green), Medium (yellow), Hard (red)
   - Helps you track your progress

4. **Use search effectively**:
   - Searches both title and content
   - Great for finding algorithms quickly

Enjoy building your DSA knowledge base! 🚀
