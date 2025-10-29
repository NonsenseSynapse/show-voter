from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import CORS_ORIGINS
from src.routers import color, poll, show

app = FastAPI()
app.include_router(show.router)
app.include_router(poll.router)
app.include_router(color.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}
