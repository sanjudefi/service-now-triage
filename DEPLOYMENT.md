# Deployment Guide - PulseTriage

## Vercel Deployment (Frontend)

### Option 1: Deploy Frontend Only (Recommended for Quick Demo)

If you just want to deploy the frontend for demo purposes:

#### Step 1: Update Frontend for Vercel

1. **Add `vercel.json` to frontend directory** (already created)

2. **Add build script to frontend/package.json** (verify it exists):
```json
{
  "scripts": {
    "build": "tsc && vite build"
  }
}
```

#### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
cd frontend
npm install -g vercel
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - `VITE_API_URL`: Your backend API URL (see backend deployment below)

6. Click "Deploy"

#### Step 3: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

Add:
```
VITE_API_URL=https://your-backend-api.railway.app
```

---

## Backend Deployment Options

### Option 1: Railway (Recommended - Free Tier Available)

#### Step 1: Prepare Backend

1. Make sure `backend/.env` is in `.gitignore` ✓ (already done)

2. Railway will use these environment variables (set in Railway dashboard):
```
NODE_ENV=production
PORT=3000
DB_HOST=your-railway-postgres-host
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=your-db-password
```

#### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js

#### Step 3: Add PostgreSQL Database

1. In Railway project, click "New" → "Database" → "Add PostgreSQL"
2. Railway will automatically create connection environment variables
3. Update your backend service environment variables:
   - Copy DATABASE_URL from PostgreSQL service
   - Or use individual variables (DB_HOST, DB_PORT, etc.)

#### Step 4: Run Database Initialization

Option A: Using Railway CLI:
```bash
railway run psql $DATABASE_URL < database/init.sql
```

Option B: Using Web Shell in Railway dashboard:
```bash
psql $DATABASE_URL < database/init.sql
```

#### Step 5: Get Backend URL

Railway will provide a URL like: `https://your-app.railway.app`

Update your Vercel frontend environment variable:
```
VITE_API_URL=https://your-app.railway.app
```

---

### Option 2: Render.com (Free Tier Available)

#### Backend Deployment

1. Go to https://render.com
2. New → Web Service
3. Connect your GitHub repository
4. Configure:
   - **Name**: pulsetriage-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. Add Environment Variables:
```
NODE_ENV=production
PORT=3000
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=pulsetriage
DB_USER=postgres
DB_PASSWORD=your-password
```

#### PostgreSQL Database

1. New → PostgreSQL
2. Note the connection details
3. Update backend environment variables with these values

---

### Option 3: Heroku (Paid Plans)

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create pulsetriage-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Initialize database
heroku pg:psql < ../database/init.sql
```

---

## Full Stack Deployment (Docker)

### Option 1: DigitalOcean App Platform

1. Push your code to GitHub
2. Go to DigitalOcean → Create → Apps
3. Connect GitHub repository
4. DigitalOcean will auto-detect docker-compose.yml
5. Configure:
   - Detect 3 services (postgres, backend, frontend)
   - Set environment variables
6. Deploy

### Option 2: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p docker pulsetriage

# Create environment
eb create pulsetriage-prod

# Deploy
eb deploy
```

### Option 3: Google Cloud Run

```bash
# Build images
docker build -t gcr.io/YOUR_PROJECT/pulsetriage-backend ./backend
docker build -t gcr.io/YOUR_PROJECT/pulsetriage-frontend ./frontend

# Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT/pulsetriage-backend
docker push gcr.io/YOUR_PROJECT/pulsetriage-frontend

# Deploy
gcloud run deploy pulsetriage-backend --image gcr.io/YOUR_PROJECT/pulsetriage-backend
gcloud run deploy pulsetriage-frontend --image gcr.io/YOUR_PROJECT/pulsetriage-frontend
```

---

## Quick Fix for Your Current Issue

Since you're getting a 404 on Vercel, here's the immediate fix:

### 1. Add vercel.json to frontend directory

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Redeploy to Vercel

**Using CLI:**
```bash
cd frontend
vercel --prod
```

**Using Dashboard:**
- Go to your Vercel project
- Settings → Git → Redeploy

### 3. Temporary Backend Solution (For Demo Only)

If you don't have a backend deployed yet, you can:

**Option A: Mock API Mode**
Update `frontend/src/services/api.ts`:
```typescript
// Add this at the top for demo mode
const DEMO_MODE = true;

// Modify API calls to return mock data
export const incidentAPI = {
  getAll: async () => {
    if (DEMO_MODE) {
      return {
        data: [
          {
            id: 1,
            short_description: "Demo: Cannot access email",
            // ... mock data
          }
        ]
      };
    }
    // ... rest of code
  }
};
```

**Option B: Deploy Backend to Railway (15 minutes)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to new project
cd backend
railway init

# Deploy
railway up

# Add PostgreSQL
railway add postgresql

# Get your URL
railway domain
```

---

## Troubleshooting

### Issue: 404 on Vercel
**Solution**: Add `vercel.json` with rewrites (see above)

### Issue: CORS errors
**Solution**: Update backend CORS configuration:
```typescript
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app'],
  credentials: true
}));
```

### Issue: Environment variables not working
**Solution**:
- Vercel: Prefix with `VITE_`
- Railway/Render: Use dashboard to set variables
- Redeploy after changing variables

### Issue: Database connection fails
**Solution**:
- Check DATABASE_URL or individual DB variables
- Ensure database allows external connections
- Run `database/init.sql` to initialize schema

---

## Recommended Quick Deployment

For fastest demo deployment:

1. **Frontend → Vercel** (5 minutes)
   - Push code to GitHub
   - Import to Vercel
   - Add `vercel.json`
   - Redeploy

2. **Backend → Railway** (10 minutes)
   - Install Railway CLI
   - `railway init`
   - Add PostgreSQL
   - `railway up`

3. **Connect them** (2 minutes)
   - Get Railway backend URL
   - Add to Vercel environment variables as `VITE_API_URL`
   - Redeploy Vercel

Total time: ~15-20 minutes for live demo

---

## Cost Estimates

- **Vercel (Frontend)**: Free tier (100GB bandwidth)
- **Railway (Backend + DB)**: Free tier ($5 credit/month)
- **Render**: Free tier (750 hours/month)
- **Total for hobby/portfolio**: $0-5/month

---

Need help with any specific step? Let me know!
