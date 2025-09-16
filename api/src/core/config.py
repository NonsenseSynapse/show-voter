import os

CORS_ORIGINS = ["http://localhost:3000", "http://localhost:8080", "http://192.168.1.69:3000"]

DATABASE_HOST = os.getenv("DB_HOST", "localhost")
DATABASE_PORT = os.getenv("DB_PORT", "5432")
DATABASE_NAME = os.getenv("DB_NAME", "show-voter")
DATABASE_USER = os.getenv("DB_USER", "localuser")
DATABASE_PASSWORD = os.getenv("DB_PASSWORD", "localpass")
DATABASE_URL = (
    f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}"
    + f"@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"
)
