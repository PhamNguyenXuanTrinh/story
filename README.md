# Full Stack Story

This project is a full stack web application for scraping stories and chapters from [Metruyencv](https://metruyencv.com), storing the data in MongoDB, and displaying it on a React.js frontend. The project is divided into three main parts:

1. **Backend (Node.js)**: Handles API routes, data management, and database interaction using MongoDB.
2. **Frontend (React.js)**: Displays the stories and chapters to users.
3. **Data Scraping**: Scrapes stories and chapters using Puppeteer and saves them to MongoDB.

## Features

- Scrapes story data from a specified website.
- Saves story and chapter details to MongoDB.
- Provides a RESTful API for fetching stories and chapters.
- Displays stories and chapters in a React.js client.
- Includes pagination for managing large datasets.

## Project Structure

```
/server          # Node.js backend with Express and MongoDB
/client          # React.js frontend to display stories and chapters
/data            # Puppeteer-based scraping script for collecting story data
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud via MongoDB Atlas)
- Puppeteer (for scraping)
- React.js (for frontend)

## Setup

### Backend (Node.js)

1. Navigate to the `/server` directory:

```bash
cd server
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file in `/server` and add your MongoDB connection string:

```
MONGODB_URI=your-mongodb-connection-string
PORT=3001
```

4. Run the backend server:

```bash
npm run dev
```

The backend will be running on `http://localhost:3001`.

### Frontend (React.js)

1. Navigate to the `/client` directory:

```bash
cd client
```

2. Install frontend dependencies:

```bash
npm install
```

3. Create a `.env` file in `/client`:

```
REACT_APP_API_URL=http://localhost:3001/api
```

4. Start the React development server:

```bash
npm start
```

The frontend will be running on `http://localhost:3000`.

### Data Scraping

1. Navigate to the `/data` directory:

```bash
cd data
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `/data`:

```
MONGODB_URI=your-mongodb-connection-string
```

4. Run the scraper:

```bash
node scrape.js
```

This will scrape story chapters and save them into MongoDB.

## API Endpoints

The backend provides the following API routes:

Story Endpoints

- `GET /api/story` - Fetch all stories.
- `GET /api/story/:slug` - Fetch a specific story by its slug.
- `POST /api/story/` - Create story.
- `DELETE /api/story/:_id` - delete story by \_id.
- `PUT /api/story/:_id` - Update story by \_id.

Chapter endpoints

- `GET /api/chapter` - Fetch all stories.
- `GET /api/chapter/:storySlug/:chapterSlug` - Fetch a specific chapter by its slug.
- `POST /api/chapter/` - Create chapter.
- `DELETE /api/chapter/:_id` - delete chapter by \_id.
- `PUT /api/chapter/:_id` - Update chapter by \_id.

genre endpoints

- `GET /api/genre` - Fetch all genre.
- `GET /api/genre/:slug` - Fetch a specific genre by its slug.
- `POST /api/genre/` - Create genre.
- `DELETE /api/genre/:_id` - delete genre by \_id.
- `PUT /api/genre/:_id` - Update genre by \_id.

author endpoints

- `GET /api/author/:id` - Fetch a specific author by its slug.
- `POST /api/author/` - Create author.
- `DELETE /api/author/:_id` - delete author by \_id.
- `PUT /api/author/:_id` - Update author by \_id.

These routes are used by the React frontend to display the story and chapter data.

## Frontend Features

- **Story List**: Displays a list of all stories.
- **Story Details**: Displays a specific story and its chapters.
- **Chapter Viewer**: Allows users to read specific chapters with proper formatting.
- **Pagination**: For stories and chapters to easily navigate through large datasets.

## Customizing Scraping

To adjust the scraping process:

- Add more stories to the `storyNames` array in `scrape.js` located in the `/data` folder.
- Adjust the `totalPages` variable to change the number of chapters scraped.

```javascript
const totalPages = 30; // Number of chapters to scrape
```

## Running the Full Application

To run the full application (backend, frontend, and data scraping):

1. Start the backend in `/server`.
2. Start the frontend in `/client`.
3. Run the scraper in `/data` to populate the database.

## License

This project is licensed under the MIT License.
