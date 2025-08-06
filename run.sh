#!/bin/bash

DB_FILE="users.db"

echo "📦 Setup wird gestartet..."

# --- Lade Variablen aus .env ---
if [ ! -f .env ]; then
    echo "❌ .env-Datei nicht gefunden!"
    exit 1
fi

export $(grep -v '^#' .env | xargs)

# --- Prüfe TMDB_API_KEY ---
if [ -z "$TMDB_API_KEY" ]; then
    echo "❌ TMDB_API_KEY ist in der .env-Datei nicht gesetzt."
    exit 1
fi

# --- Prüfe USER_PORT ---
if [ -z "$USER_PORT" ]; then
    echo "❌ USER_PORT ist nicht in der .env-Datei gesetzt."
    exit 1
fi

# --- Prüfe und erstelle users.db ---
if ! command -v sqlite3 &> /dev/null; then
    echo "❌ sqlite3 ist nicht installiert. Bitte installiere es zuerst."
    exit 1
fi

if [ -f "$DB_FILE" ]; then
    echo "✅ $DB_FILE existiert bereits. Keine Aktion notwendig."
else
    echo "📦 Erstelle $DB_FILE mit eingebettetem Schema..."
    sqlite3 "$DB_FILE" <<EOF
CREATE TABLE ratings(user_id int, movie_id int, date DATETIME, rating int);
CREATE TABLE reviews(review_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id int, movie_id int, date DATETIME, text VARCHAR(65000));
CREATE TABLE sqlite_sequence(name TEXT, seq INTEGER);
CREATE TABLE watchlist(user_id int, movie_id int, watchlist_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);
CREATE TABLE userInfo(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT NOT NULL, hash TEXT NOT NULL, loggedfilms int);
CREATE TABLE listEntries(list_id int, user_id int, movie_id int);
CREATE TABLE list(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, listname TEXT NOT NULL, description TEXT NOT NULL, user_id int, moviecount int);
EOF

    if [ $? -eq 0 ]; then
        echo "✅ $DB_FILE wurde erfolgreich erstellt."
    else
        echo "❌ Fehler beim Erstellen von $DB_FILE."
        exit 1
    fi
fi

# --- Docker Image bauen ---
echo "🐳 Baue Docker-Image..."
docker build -t movie-search-app .

# --- Docker Container starten ---
echo "🚀 Starte Container auf Port $USER_PORT ..."
docker run -p $USER_PORT:5000 \
  -e TMDB_API_KEY="$TMDB_API_KEY" \
  -v "$(pwd)/users.db:/app/users.db" \
  movie-search-app

