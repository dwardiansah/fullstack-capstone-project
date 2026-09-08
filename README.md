# GiftLink - Community Gift Sharing Platform

GiftLink is a full-stack web application developed as the Capstone Project for the Coursera IBM Full Stack Software Developer Professional Certificate. It connects local communities by enabling users to browse, search, and gift household items, furniture, electronics, and books sustainably.

## Project Structure
- `.github/`
  - `ISSUE_TEMPLATE/user-story.md`: User story agile issue template
  - `workflows/ci-cd.yml`: GitHub Actions automated CI/CD pipeline
- `giftlink-backend/`: Express.js & MongoDB API service
  - `models/db.js`: MongoDB client connection pooling with `await client.connect()`
  - `routes/giftRoutes.js`: Endpoints serving `/api/gifts` and `/api/gifts/:id`
  - `routes/searchRoutes.js`: Search filter endpoints with category, condition, age filters
  - `routes/authRoutes.js`: User registration & login with bcrypt & JWT using `collection.findOne()`
  - `sentiment/index.js`: Natural Language Processing sentiment analysis using the `natural` npm package
  - `util/import-mongo/`: Contains `gifts.json` (16 documents) and MongoDB import seed script
- `giftlink-frontend/`: React single-page application
  - `src/components/LandingPage/`: Marketing landing page
  - `src/components/MainPage/`: Main gifts catalog listing all 16 items
  - `src/components/SearchPage/`: Search & filtering by category, condition, age
  - `src/components/DetailsPage/`: Detailed gift view with comments and sentiment
  - `src/components/LoginPage/`: User login with fetch containing `content-type` & `Authorization`
  - `src/components/RegisterPage/`: User registration with fetch containing `method` & `headers`
  - `src/components/Navbar/`: Dynamic navigation bar displaying logged-in username

## Running the Application

### 1. Backend Setup
```bash
cd giftlink-backend
npm install
# Seed the 16 documents into MongoDB
npm run seed
# Start backend server
npm start
```

### 2. Frontend Setup
```bash
cd giftlink-frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000` (or deployment URL).
Backend runs at `http://localhost:3060`.
