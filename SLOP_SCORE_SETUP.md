# Slop Score Setup Guide

This guide explains how to set up the Slop Score functionality that has been integrated into your main project.

## Prerequisites

1. PostgreSQL database
2. Twitter API key (from TwitterAPI.io)

## Environment Variables

Create a `.env` file in the project root with:

```
DATABASE_URL="postgresql://username:password@localhost:5432/slopscore"
TWITTER_API_KEY="your_twitter_api_key_here"
```

For the Twitter API key, sign up at https://twitterapi.io

## Database Setup

1. Create a PostgreSQL database named `slopscore` (or whatever you named it in DATABASE_URL)

2. Run Prisma migrations:
```bash
npx prisma migrate deploy
```

3. Generate Prisma client:
```bash
npx prisma generate
```

## Routes Available

The following routes are now available:

- `/slop-score` - Main slop score analyzer page
- `/slop-score/signaltonoise/:username` - Analysis results for a specific user
- `/slop-score/leaderboard` - Leaderboard of analyzed users
- `/slop-score/calc-logic` - Explanation of how the scoring works

## Features

- Analyzes Twitter accounts for signal-to-noise ratio
- Calculates scores based on engagement, content quality, and posting patterns
- Leaderboard functionality with search and pagination
- Shareable score cards
- 1-hour cooldown between refreshes

## File Structure

- `app/lib/db.server.ts` - Database connection
- `app/lib/services/` - Tweet fetching and analysis logic
- `app/lib/utils/` - Scoring utilities
- `app/routes/slopScore/` - Route components and UI
- `prisma/` - Database schema and migrations

## Troubleshooting

1. Make sure PostgreSQL is running
2. Verify your DATABASE_URL is correct
3. Ensure Twitter API key is valid
4. Check that all Prisma migrations have been applied

The integration maintains all original functionality while fitting into your main project structure.
