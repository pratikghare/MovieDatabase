# 🎬 GraphQL Media API

A modular Apollo GraphQL API built with TypeScript for unified movie, TV show, and person data powered by TMDB and OMDB.

This API provides a clean, consistent schema with standardized fields like `name`, `poster`, `overview`, and `mediaType`, making it easy to integrate across clients and platforms.

---

## 🚀 Features

- 🎞 Unified schema for **Movies**, **TV Shows**, and **People**
- 🧱 Modular GraphQL schemas and resolvers
- 🔧 Strongly typed with TypeScript
- 🌐 Integrates with **TMDB** and **OMDB**
- 🧠 Smart transformations to normalize fields and structure
- 🧑‍🤝‍🧑 Credits system with cast, crew, writers, and directors
- 📸 Support for images, videos, recommendations, and similar content

---

## 📁 Project Structure

```
📦 src
├── graphql
│   ├── schemas/
│   │   ├── media.schema.graphql
│   │   └── user.schema.graphql
│   ├── resolvers/
│   │   ├── media.resolver.ts
│   │   └── user.resolver.ts
├── utils/
│   └── media_utils.ts
├── types/
│   └── media.types.ts
├── server.ts
└── index.ts
```

---

## 📦 Installation

```bash
git clone https://github.com/your-username/graphql-media-api.git
cd graphql-media-api
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
TMDB_API_KEY=your_tmdb_api_key
OMDB_API_KEY=your_omdb_api_key
PORT=4000
```

---

## 🧪 Run the Server

```bash
npm run dev
```

Visit GraphQL Playground at: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

## 🧩 Sample Queries

```graphql
query {
  searchMedia(query: "Oppenheimer") {
    id
    name
    mediaType
    poster
    subtext
  }
}

query {
  mediaDetails(id: "872585", mediaType: "MOVIE") {
    name
    overview
    genres
    credits {
      cast { name }
      directors { name }
    }
    recommendations {
      name
      poster
    }
  }
}
```

---

## 🧠 Schema Highlights

- ✅ `CompactMedia` for results, credits, recommendations, and similar
- ✅ `MediaDetails` for detailed view with OMDB fields merged
- ✅ `Credits` includes cast, crew, directors, and writers
- ✅ `Image` and `Video` support
- ✅ Normalized field names (`name`, `overview`, `poster`, `thumbnail`, etc.)

---

## 🛠 Built With

- Apollo Server
- TypeScript
- GraphQL SDL Modules
- TMDB + OMDB APIs

---

## 🚀 Deployment

### 🌐 API Deployment (Render)

1. Go to [Render](https://render.com/).
2. Create a new web service and link your GitHub repository.
3. Set the environment variables (`TMDB_API_KEY`, `OMDB_API_KEY`, and `PORT`).
4. Deploy your service. Render will automatically handle your build process and provide you with a URL to access your GraphQL API.

### 🌍 UI Deployment (Vercel)

1. Go to [Vercel](https://vercel.com/).
2. Import your frontend project from GitHub.
3. Vercel will automatically deploy the project and provide you with a URL.

> Replace the following link with your live Netlify link later:

Visit the live UI at: [Your Netlify URL here](https://your-netlify-url.netlify.app)

---

## 📄 License

MIT License © 2025 [Pratik Pramod Ghare](mailto:pratikghare888@gmail.com)

---

## 🙋‍♂️ Author

Pratik Pramod Ghare  
📧 pratikghare888@gmail.com  
🏠 Pune, India
