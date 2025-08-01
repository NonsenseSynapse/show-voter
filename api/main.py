from fastapi import FastAPI

from api.routers import show

app = FastAPI()
app.include_router(show.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
