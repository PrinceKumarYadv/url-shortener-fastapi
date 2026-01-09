from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import string

from models import URLRequest, URLResponse
from database import save_url, get_url

app = FastAPI(title="Python URL Shortener")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_code(length: int = 6):
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))

@app.post("/shorten", response_model=URLResponse)
def shorten_url(data: URLRequest, request: Request):
    code = generate_code()
    save_url(code, data.long_url)
    base_url = str(request.base_url).rstrip("/")
    return {"short_url": f"{base_url}/{code}"}

@app.get("/{code}")
def redirect_url(code: str):
    long_url = get_url(code)
    if not long_url:
        raise HTTPException(status_code=404, detail="URL not found")
    return RedirectResponse(url=long_url)
