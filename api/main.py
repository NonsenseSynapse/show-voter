from fastapi import FastAPI
from src.routers import poll, show
from src.core.config import CORS_ORIGINS
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.include_router(show.router)
app.include_router(poll.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    return {"message": "Hello World"}
