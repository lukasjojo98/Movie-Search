# 🎬 Movie Search App

A minimalist, Letterboxd-style movie search and review platform built with Python. This app allows users to search movies, view details, and write reviews using data from [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api).

Everything is packaged in a Docker container for quick and consistent deployment.

---

## ✨ Features

- 🔍 Search movies via the TMDb API
- 📝 Add and view user reviews
- ⭐ Rate and comment on films
- 📦 Dockerized for easy deployment
- 🖥️ Clean and simple UI (customizable)

---

## 📦 Tech Stack

- **Python 3.11**
- **TMDb API**
- **Flask** (or similar web framework)
- **Docker**
- **OpenJDK 17** (for compatibility with certain dependencies)

---

## 🧪 Prerequisites

- [Docker](https://www.docker.com/)
- [TMDb API Key](https://www.themoviedb.org/settings/api)

> ⚠️ You’ll need to set your TMDb API key as an environment variable or include it in a config file, depending on how your app handles authentication.

---

## 🚀 Getting Started

### 🔧 1. Clone the repository

```bash
git clone https://github.com/yourusername/movie-search-app.git
cd movie-search-app
```

### 2. Build the Docker image
```bash
docker build -t movie-search-app .
```

### 3. Run the container
```bash
docker run -p 5000:5000 movie-search-app
```

## 🛠️ Run shell-script

```bash
./run.sh
```



