from fastapi import FastAPI

from api.routers import poll, show

app = FastAPI()
app.include_router(show.router)
app.include_router(poll.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
