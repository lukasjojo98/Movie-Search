import requests, os
from dotenv import load_dotenv

BASE_URL = "https://api.themoviedb.org/3/find/tt"
BASE_IMAGE_URL = "https://image.tmdb.org/t/p/"
IMAGE_SIZE = "w154"

BASE_URL_MOVIES = "https://api.themoviedb.org/3/"
MOVIE_IMAGE_SIZE = "w185"

BASE_URL_TT = "https://api.themoviedb.org/3/find/tt";

load_dotenv(".env")
TMDB_API_KEY = os.environ.get('TMDB_API_KEY')

def add_leading_zeros(number, total_length):
    return str(number).rjust(total_length, '0')

def find_poster_by_imdb_id(imdb_id):
    imdb_id_with_zeroes = add_leading_zeros(imdb_id, 7)
    url = f"{BASE_URL}{imdb_id_with_zeroes}?api_key={TMDB_API_KEY}&external_source=imdb_id"
    response = requests.get(url)
    data = response.json()
    try: image_url = f"{BASE_IMAGE_URL}{IMAGE_SIZE}{data['movie_results'][0]['poster_path']}"
    except: return "https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg?forcejpeg=true"
    return image_url

def run_search(keyword):
    url = f"{BASE_URL_MOVIES}search/movie?api_key={TMDB_API_KEY}&query={keyword}"
    response = requests.get(url)
    data = response.json()
    poster_path = data["results"][0]["poster_path"]
    id = data["results"][0]["id"]
    actor_list = find_actors(id)
    image_url = f"{BASE_IMAGE_URL}{IMAGE_SIZE}{poster_path}"
    overview_text = data["results"][0]["overview"]
    return image_url, actor_list, overview_text

def find_actors(id):
    actor_url = f"{BASE_URL_MOVIES}movie/{id}/credits?api_key={TMDB_API_KEY}&language=en-US"
    response = requests.get(actor_url)
    data = response.json()
    actor_list = data["cast"]
    return actor_list

def get_actor_image(actor_name):
    id_url = f"{BASE_URL_MOVIES}search/person?api_key={TMDB_API_KEY}&language=en-US&query={actor_name}&page=1&include_adult=false"
    response = requests.get(id_url)
    data = response.json()

    if not data['results']:
        print("Schauspieler nicht gefunden.")
        return

    actor_id = data['results'][0]['id']
    
    profile_url = f"{BASE_URL_MOVIES}person/{actor_id}/images?api_key={TMDB_API_KEY}"
    response = requests.get(profile_url)
    data = response.json()

    if not data['profiles']:
        print("Kein Profilbild gefunden.")
        profile_path = None
    else:
        profile_path = data['profiles'][0]['file_path']

    bio_url = f"{BASE_URL_MOVIES}person/{actor_id}?api_key={TMDB_API_KEY}&language=en-US"
    response = requests.get(bio_url)
    data = response.json()

    bio_text = data.get("biography", "Keine Biografie gefunden.")

    if profile_path:
        image_url = f"https://image.tmdb.org/t/p/w200/{profile_path}"
    else:
        image_url = None

    return image_url, bio_text