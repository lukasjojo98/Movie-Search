#!/bin/bash

# Exit on error
set -e

# Prompt for port (default: 8080)
read -p "🔌 Auf welchem Port soll die App laufen? [8080]: " USER_PORT
USER_PORT=${USER_PORT:-8080}  # Default auf 8080 setzen, wenn leer

# Load .env variables
if [ ! -f .env ]; then
  echo "❌ .env-Datei nicht gefunden!"
  exit 1
fi

# Export variables from .env
export $(grep -v '^#' .env | xargs)

# Check if TMDB_API_KEY is set
if [ -z "$TMDB_API_KEY" ]; then
  echo "❌ TMDB_API_KEY ist in der .env-Datei nicht gesetzt."
  exit 1
fi

# Create env.js with the API key
cat <<EOF > static/env.js
export const API_KEY = "$TMDB_API_KEY";
export default API_KEY;
EOF

echo "✅ static/env.js wurde mit TMDB_API_KEY erstellt."

# Build Docker image
docker build -t movie-search-app .

# Run Docker container on specified port
echo "🚀 Starte Container auf Port $USER_PORT ..."
docker run -p $USER_PORT:5000 -e TMDB_API_KEY="$TMDB_API_KEY" movie-search-app
