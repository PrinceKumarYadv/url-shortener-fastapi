url_db = {}

def save_url(code: str, long_url: str):
    url_db[code] = long_url

def get_url(code: str):
    return url_db.get(code)
